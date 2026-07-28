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
