import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient, verifyWebhook } from "../_shared/stripe.ts";

const SITE_URL = "https://konstelacja.org";

function sendMail(templateName: string, recipientEmail: string, idempotencyKey: string, templateData: Record<string, unknown>) {
  return getSupabase()
    .functions.invoke("send-transactional-email", {
      body: { templateName, recipientEmail, idempotencyKey, templateData },
      headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` },
    })
    .then(({ error }) => {
      if (error) console.error(`Email ${templateName} failed:`, error.message);
    })
    .catch((e) => console.error(`Email ${templateName} threw:`, e));
}

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );
  }
  return _supabase;
}

async function markPaid(session: any) {
  const orderId = session?.metadata?.orderId;
  const orderNo = session?.metadata?.orderNo || session?.client_reference_id;
  if (!orderId && !orderNo) {
    console.error("Webhook session without order reference", session?.id);
    return;
  }

  const supabase = getSupabase();

  // Idempotentnie: podnosimy status tylko z etapów przedpłatnych, żeby retry
  // webhooka nie cofnął zamówienia z „wysłane" do „opłacone".
  const query = supabase
    .from("shop_orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      stripe_session_id: session?.id ?? null,
      updated_at: new Date().toISOString(),
    })
    .in("status", ["pending", "pending_pod_error", "expired"]);

  const cols = "id, order_no, email, lang, printful_order_id, printful_confirmed_at";
  const { data, error } = orderId
    ? await query.eq("id", orderId).select(cols).maybeSingle()
    : await query.eq("order_no", orderNo).select(cols).maybeSingle();

  if (error) {
    console.error("Failed to mark order paid:", error.message);
    return;
  }
  if (!data) {
    console.log("Order already processed, skipping:", orderId || orderNo);
    return;
  }
  console.log("Order marked paid:", data.order_no);

  // --- faktura PDF (numer nadawany dopiero po zaksięgowaniu płatności) ---
  try {
    const { error: invErr } = await supabase.functions.invoke("generate-invoice", {
      body: { orderId: data.id },
      headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` },
    });
    if (invErr) console.error("Invoice generation failed:", invErr.message);
  } catch (e) {
    console.error("Invoice generation threw:", e);
  }

  // --- Printful: potwierdzamy draft, dopiero teraz rusza produkcja ---
  await confirmPrintful(data);

  // Potwierdzenie zamówienia / faktura e-mailem (idempotentnie po zamówieniu)
  if (data.email) {
    const { error: mailErr } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "invoice-issued",
        recipientEmail: data.email,
        idempotencyKey: `order-paid-${data.id}`,
        templateData: { orderNo: data.order_no, lang: data.lang },
      },
      headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` },
    });
    if (mailErr) console.error("Paid confirmation email failed:", mailErr.message);
  }
}

/** Potwierdzenie draftu w Printful — bez tego opłacone zamówienie nigdy nie trafia do produkcji. */
async function confirmPrintful(order: any) {
  if (!order?.printful_order_id || order.printful_confirmed_at) return;
  const key = Deno.env.get("PRINTFUL_API_KEY");
  if (!key) {
    console.error("PRINTFUL_API_KEY missing — cannot confirm order", order.order_no);
    return;
  }
  try {
    const res = await fetch(
      `https://api.printful.com/orders/${encodeURIComponent(order.printful_order_id)}/confirm`,
      { method: "POST", headers: { Authorization: `Bearer ${key}` } },
    );
    const body = await res.text();
    if (!res.ok) {
      console.error(`Printful confirm failed [${res.status}]: ${body}`);
      await getSupabase()
        .from("shop_orders")
        .update({ printful_error: `[confirm ${res.status}] ${body}`.slice(0, 900) })
        .eq("id", order.id);
      return;
    }
    const parsed = JSON.parse(body);
    await getSupabase()
      .from("shop_orders")
      .update({
        printful_confirmed_at: new Date().toISOString(),
        printful_status: parsed?.result?.status ?? "pending",
        printful_error: null,
      })
      .eq("id", order.id);
  } catch (e) {
    console.error("Printful confirm threw:", e);
  }
}

/** Nieopłacona sesja wygasła — zamówienie oznaczamy jako wygasłe (po ~24h). */
async function markExpired(session: any) {
  const orderId = session?.metadata?.orderId;
  if (!orderId) return;
  const { error } = await getSupabase()
    .from("shop_orders")
    .update({ status: "expired", updated_at: new Date().toISOString() })
    .eq("id", orderId)
    .eq("status", "pending");
  if (error) console.error("Failed to expire order:", error.message);
}

/** Anulowanie draftu w Printful — nic nie może wisieć u producenta po nieudanej płatności. */
async function cancelPrintful(order: any) {
  if (!order?.printful_order_id || order.printful_confirmed_at) return;
  const key = Deno.env.get("PRINTFUL_API_KEY");
  if (!key) return;
  try {
    const res = await fetch(
      `https://api.printful.com/orders/${encodeURIComponent(order.printful_order_id)}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) {
      console.error(`Printful cancel failed [${res.status}]: ${await res.text()}`);
      return;
    }
    await getSupabase()
      .from("shop_orders")
      .update({ printful_status: "canceled" })
      .eq("id", order.id);
  } catch (e) {
    console.error("Printful cancel threw:", e);
  }
}

/**
 * BLIK/Przelewy24 potrafią odmówić już po zamknięciu formularza — wtedy
 * zamówienie musi wypaść z kolejki, a draft u producenta zniknąć.
 */
async function markPaymentFailed(session: any) {
  const orderId = session?.metadata?.orderId;
  const orderNo = session?.metadata?.orderNo || session?.client_reference_id;
  if (!orderId && !orderNo) return;

  const base = getSupabase()
    .from("shop_orders")
    .update({ status: "payment_failed", updated_at: new Date().toISOString() })
    .in("status", ["pending", "pending_pod_error", "expired"]);

  const cols = "id, order_no, email, name, lang, printful_order_id, printful_confirmed_at";
  const { data, error } = orderId
    ? await base.eq("id", orderId).select(cols).maybeSingle()
    : await base.eq("order_no", orderNo).select(cols).maybeSingle();

  if (error) {
    console.error("Failed to mark payment failed:", error.message);
    return;
  }
  if (!data) return;

  await cancelPrintful(data);

  if (data.email) {
    await sendMail("payment-failed", data.email as string, `order-failed-${data.id}`, {
      name: data.name,
      orderNo: data.order_no,
      lang: data.lang,
      retryUrl: `${SITE_URL}/sklep`,
    });
  }
}

/**
 * Zwrot wykonany w panelu dostawcy płatności. Pliki cyfrowe zostają u klienta
 * — zmieniamy tylko status zamówienia i wysyłamy potwierdzenie.
 */
async function handleRefund(charge: any, env: StripeEnv) {
  const paymentIntent = charge?.payment_intent;
  if (!paymentIntent) return;

  let orderId: string | undefined;
  let orderNo: string | undefined;
  try {
    const stripe = createStripeClient(env);
    const sessions = await stripe.checkout.sessions.list({ payment_intent: paymentIntent, limit: 1 });
    const session: any = sessions.data[0];
    orderId = session?.metadata?.orderId;
    orderNo = session?.metadata?.orderNo || session?.client_reference_id;
    if (!orderId && !orderNo && session?.id) {
      const { data } = await getSupabase()
        .from("shop_orders").select("id").eq("stripe_session_id", session.id).maybeSingle();
      orderId = data?.id as string | undefined;
    }
  } catch (e) {
    console.error("Refund lookup failed:", e);
    return;
  }
  if (!orderId && !orderNo) {
    console.error("Refund without order reference, charge:", charge?.id);
    return;
  }

  const partial = Number(charge?.amount_refunded ?? 0) < Number(charge?.amount ?? 0);
  const base = getSupabase()
    .from("shop_orders")
    .update({
      status: partial ? "partially_refunded" : "refunded",
      updated_at: new Date().toISOString(),
    })
    .not("status", "in", '("refunded")');

  const cols = "id, order_no, email, name, lang, currency";
  const { data, error } = orderId
    ? await base.eq("id", orderId).select(cols).maybeSingle()
    : await base.eq("order_no", orderNo!).select(cols).maybeSingle();

  if (error) {
    console.error("Failed to mark order refunded:", error.message);
    return;
  }
  if (!data?.email) return;

  await sendMail("order-refunded", data.email as string, `order-refund-${data.id}-${charge?.amount_refunded}`, {
    name: data.name,
    orderNo: data.order_no,
    lang: data.lang,
    amount: Number(charge?.amount_refunded ?? 0) / 100,
    currency: (charge?.currency ?? data.currency ?? "PLN").toUpperCase(),
    partial,
  });
}

/** Adres i imię członka Klubu — potrzebne do e-maili cyklu życia subskrypcji. */
async function memberContact(userId?: string | null) {
  if (!userId) return null;
  const { data } = await getSupabase()
    .from("profiles").select("email, full_name").eq("id", userId).maybeSingle();
  if (!data?.email) return null;
  return { email: data.email as string, name: (data.full_name as string | null) ?? undefined };
}

const dateLabel = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("pl-PL") : undefined;

async function clubMail(
  userId: string | null | undefined,
  variant: "welcome" | "payment_failed" | "canceled" | "expired",
  idempotencyKey: string,
  extra: Record<string, unknown> = {},
) {
  const contact = await memberContact(userId);
  if (!contact) return;
  await sendMail("club-notice", contact.email, idempotencyKey, {
    name: contact.name,
    lang: "pl",
    variant,
    actionUrl: variant === "payment_failed" ? `${SITE_URL}/klub` : `${SITE_URL}/konto`,
    ...extra,
  });
}



function subRow(sub: any, env: StripeEnv) {
  const item = sub.items?.data?.[0];
  const priceId = item?.price?.lookup_key
    || item?.price?.metadata?.lovable_external_id
    || item?.price?.id;
  const periodStart = item?.current_period_start ?? sub.current_period_start;
  const periodEnd = item?.current_period_end ?? sub.current_period_end;
  return {
    stripe_subscription_id: sub.id,
    stripe_customer_id: sub.customer,
    product_id: item?.price?.product,
    price_id: priceId,
    status: sub.status,
    current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: Boolean(sub.cancel_at_period_end),
    environment: env,
    updated_at: new Date().toISOString(),
  };
}

async function upsertSubscription(sub: any, env: StripeEnv) {
  const userId = sub?.metadata?.userId;
  if (!userId) {
    console.error("Subscription without userId metadata:", sub?.id);
    return;
  }
  const { error } = await getSupabase()
    .from("subscriptions")
    .upsert({ user_id: userId, ...subRow(sub, env) }, { onConflict: "stripe_subscription_id" });
  if (error) {
    console.error("Subscription upsert failed:", error.message);
    return;
  }
  if (["active", "trialing"].includes(sub.status)) {
    const row = subRow(sub, env);
    await clubMail(userId, "welcome", `club-welcome-${sub.id}`, {
      accessUntil: dateLabel(row.current_period_end),
    });
  }
}

/**
 * Aktualizacja: `upsert`, bo zdarzenie „created" potrafi przepaść — wtedy
 * wiersz i tak musi powstać. Wysyłamy też potwierdzenie anulowania.
 */
async function updateSubscription(sub: any, env: StripeEnv) {
  const supabase = getSupabase();
  const { data: prev } = await supabase
    .from("subscriptions")
    .select("user_id, cancel_at_period_end")
    .eq("stripe_subscription_id", sub.id)
    .eq("environment", env)
    .maybeSingle();

  const userId = sub?.metadata?.userId ?? prev?.user_id;
  if (!userId) {
    console.error("Subscription update without resolvable user:", sub?.id);
    return;
  }

  const row = subRow(sub, env);
  const { error } = await supabase
    .from("subscriptions")
    .upsert({ user_id: userId, ...row }, { onConflict: "stripe_subscription_id" });
  if (error) {
    console.error("Subscription update failed:", error.message);
    return;
  }

  if (row.cancel_at_period_end && !prev?.cancel_at_period_end) {
    await clubMail(userId as string, "canceled", `club-canceled-${sub.id}-${row.current_period_end}`, {
      accessUntil: dateLabel(row.current_period_end),
    });
  }
}

/** Nieudana płatność odnowieniowa — prosimy o aktualizację karty, zanim dostęp wygaśnie. */
async function handleInvoiceFailed(invoice: any, env: StripeEnv) {
  const subId = invoice?.subscription
    ?? invoice?.parent?.subscription_details?.subscription
    ?? invoice?.lines?.data?.[0]?.parent?.subscription_item_details?.subscription;
  if (!subId) return;
  const { data } = await getSupabase()
    .from("subscriptions")
    .select("user_id, current_period_end")
    .eq("stripe_subscription_id", subId)
    .eq("environment", env)
    .maybeSingle();
  if (!data?.user_id) return;
  await clubMail(data.user_id as string, "payment_failed", `club-dunning-${invoice?.id}`, {
    accessUntil: dateLabel(data.current_period_end as string | null),
  });
}


/**
 * Anulowanie: dostęp zostaje do końca opłaconego okresu — nie kasujemy daty
 * `current_period_end`, tylko oznaczamy status jako anulowany.
 */
async function cancelSubscription(sub: any, env: StripeEnv) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", sub.id)
    .eq("environment", env)
    .select("user_id, current_period_end")
    .maybeSingle();
  if (error) {
    console.error("Subscription cancel failed:", error.message);
    return;
  }
  const userId = (data?.user_id as string | undefined) ?? sub?.metadata?.userId;
  const endsAt = (data?.current_period_end as string | null) ?? null;
  // Okres już się skończył → dostęp faktycznie wygasł; inaczej to zwykłe anulowanie.
  const expired = !endsAt || new Date(endsAt).getTime() <= Date.now();
  await clubMail(
    userId,
    expired ? "expired" : "canceled",
    `club-${expired ? "expired" : "canceled"}-${sub.id}`,
    { accessUntil: expired ? undefined : dateLabel(endsAt) },
  );
}


/**
 * Zabezpieczenie na wypadek zgubionego zdarzenia `customer.subscription.created`:
 * po zamknięciu sesji subskrypcyjnej dociągamy subskrypcję z API i zapisujemy wiersz,
 * żeby nikt nie zapłacił bez odblokowanego dostępu.
 */
async function ensureSubscriptionFromSession(session: any, env: StripeEnv) {
  const subId = typeof session?.subscription === "string"
    ? session.subscription
    : session?.subscription?.id;
  if (!subId) return;
  const { data: existing } = await getSupabase()
    .from("subscriptions")
    .select("id")
    .eq("stripe_subscription_id", subId)
    .eq("environment", env)
    .maybeSingle();
  if (existing) return;
  try {
    const stripe = createStripeClient(env);
    const sub: any = await stripe.subscriptions.retrieve(subId);
    if (!sub.metadata?.userId && session?.metadata?.userId) {
      sub.metadata = { ...(sub.metadata ?? {}), userId: session.metadata.userId };
    }
    await upsertSubscription(sub, env);
  } catch (e) {
    console.error("ensureSubscriptionFromSession failed:", e);
  }
}

/** Spór/chargeback — odnotowujemy status zamówienia, bez automatycznych powiadomień. */
async function handleDispute(dispute: any, env: StripeEnv) {
  const paymentIntent = typeof dispute?.payment_intent === "string"
    ? dispute.payment_intent
    : dispute?.payment_intent?.id;
  if (!paymentIntent) return;
  const closedWon = dispute?.status === "won";
  try {
    const stripe = createStripeClient(env);
    const sessions = await stripe.checkout.sessions.list({ payment_intent: paymentIntent, limit: 1 });
    const session: any = sessions.data[0];
    const orderId = session?.metadata?.orderId;
    const orderNo = session?.metadata?.orderNo || session?.client_reference_id;
    if (!orderId && !orderNo) return;
    const base = getSupabase()
      .from("shop_orders")
      .update({ status: closedWon ? "paid" : "disputed", updated_at: new Date().toISOString() });
    const { error } = orderId
      ? await base.eq("id", orderId)
      : await base.eq("order_no", orderNo);
    if (error) console.error("Dispute status update failed:", error.message);
  } catch (e) {
    console.error("Dispute handling failed:", e);
  }
}

/** Opłacony okres rozliczeniowy Klubu → faktura PDF z numerem i e-mail do członka. */
async function handleInvoicePaid(invoice: any, env: StripeEnv) {
  const subId = invoice?.subscription
    ?? invoice?.parent?.subscription_details?.subscription
    ?? invoice?.lines?.data?.[0]?.parent?.subscription_item_details?.subscription;
  if (!subId) return; // faktury jednorazowe obsługuje ścieżka zamówień
  if (Number(invoice?.amount_paid ?? 0) <= 0) return;

  const { data: sub } = await getSupabase()
    .from("subscriptions")
    .select("user_id, price_id")
    .eq("stripe_subscription_id", subId)
    .eq("environment", env)
    .maybeSingle();
  if (!sub?.user_id) {
    console.error("invoice.paid without known subscription:", subId);
    return;
  }

  const line = invoice?.lines?.data?.[0];
  const periodStart = line?.period?.start ? new Date(line.period.start * 1000).toISOString() : null;
  const periodEnd = line?.period?.end ? new Date(line.period.end * 1000).toISOString() : null;
  const planLabel = sub.price_id === "klub_yearly"
    ? "Klub Konstelacji — plan roczny"
    : "Klub Konstelacji — plan miesięczny";

  const { error } = await getSupabase().functions.invoke("generate-club-invoice", {
    body: {
      stripeInvoiceId: String(invoice.id),
      userId: sub.user_id,
      total: Number(invoice.amount_paid ?? 0) / 100,
      currency: String(invoice.currency ?? "pln").toUpperCase(),
      periodStart,
      periodEnd,
      planLabel,
    },
    headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` },
  });
  if (error) console.error("Club invoice generation failed:", error.message);
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    console.error("Webhook received with invalid env:", rawEnv);
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;

  try {
    const event = await verifyWebhook(req, env);
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session: any = event.data.object;
        // BLIK/P24 zamykają formularz zanim bank potwierdzi przelew — wtedy
        // czekamy na `async_payment_succeeded`, żeby nie ruszyć produkcji za wcześnie.
        const settled = ["paid", "no_payment_required"].includes(session?.payment_status);
        if (session?.mode === "subscription") await ensureSubscriptionFromSession(session, env);
        else if (settled) await markPaid(session);
        break;
      }
      case "checkout.session.async_payment_failed":
        await markPaymentFailed(event.data.object);
        break;
      case "checkout.session.expired":
        await markExpired(event.data.object);
        break;
      case "charge.refunded":
        await handleRefund(event.data.object, env);
        break;
      case "charge.dispute.created":
      case "charge.dispute.closed":
        await handleDispute(event.data.object, env);
        break;
      case "invoice.paid":
      case "invoice.payment_succeeded":
        await handleInvoicePaid(event.data.object, env);
        break;
      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object, env);
        break;
      case "customer.subscription.created":
        await upsertSubscription(event.data.object, env);
        break;
      case "customer.subscription.updated":
        await updateSubscription(event.data.object, env);
        break;
      case "customer.subscription.deleted":
        await cancelSubscription(event.data.object, env);
        break;
      default:
        console.log("Unhandled event:", event.type);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
