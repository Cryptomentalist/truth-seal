import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

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
  const query = supabase
    .from("shop_orders")
    .update({ status: "paid", updated_at: new Date().toISOString() });

  const { data, error } = orderId
    ? await query.eq("id", orderId).select("id, order_no, email, lang").maybeSingle()
    : await query.eq("order_no", orderNo).select("id, order_no, email, lang").maybeSingle();

  if (error) {
    console.error("Failed to mark order paid:", error.message);
    return;
  }
  console.log("Order marked paid:", data?.order_no);

  // Potwierdzenie zamówienia / faktura e-mailem (idempotentnie po numerze zamówienia)
  if (data?.email) {
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
  if (error) console.error("Subscription upsert failed:", error.message);
}

async function updateSubscription(sub: any, env: StripeEnv) {
  const { error } = await getSupabase()
    .from("subscriptions")
    .update(subRow(sub, env))
    .eq("stripe_subscription_id", sub.id)
    .eq("environment", env);
  if (error) console.error("Subscription update failed:", error.message);
}

/**
 * Anulowanie: dostęp zostaje do końca opłaconego okresu — nie kasujemy daty
 * `current_period_end`, tylko oznaczamy status jako anulowany.
 */
async function cancelSubscription(sub: any, env: StripeEnv) {
  const { error } = await getSupabase()
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", sub.id)
    .eq("environment", env);
  if (error) console.error("Subscription cancel failed:", error.message);
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
      case "checkout.session.async_payment_succeeded":
        await markPaid(event.data.object);
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
