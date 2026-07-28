import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const BodySchema = z.object({
  orderId: z.string().uuid(),
  returnUrl: z.string().url().max(500),
  environment: z.enum(["sandbox", "live"]),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { orderId, returnUrl, environment } = parsed.data;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: order, error } = await supabase
    .from("shop_orders")
    .select("id, order_no, email, name, items, subtotal, shipping, total, currency, status, lang")
    .eq("id", orderId)
    .maybeSingle();

  if (error || !order) return json({ error: "order_not_found" }, 404);
  if (["paid", "processing", "fulfilled", "shipped", "delivered", "completed"].includes(String(order.status))) {
    return json({ error: "order_already_paid" }, 409);
  }

  const currency = (order.currency || "PLN").toLowerCase();
  const lines = Array.isArray(order.items) ? (order.items as any[]) : [];

  const lineItems = lines.map((l) => ({
    price_data: {
      currency,
      product_data: { name: `${l.name}${l.variant ? ` — ${l.variant}` : ""}`.slice(0, 250) },
      unit_amount: Math.round(Number(l.price) * 100),
    },
    quantity: Number(l.qty) || 1,
  }));

  if (Number(order.shipping) > 0) {
    lineItems.push({
      price_data: {
        currency,
        product_data: { name: order.lang === "en" ? "Shipping" : "Dostawa" },
        unit_amount: Math.round(Number(order.shipping) * 100),
      },
      quantity: 1,
    });
  }

  if (!lineItems.length) return json({ error: "empty_order" }, 400);

  try {
    const stripe = createStripeClient(environment as StripeEnv);
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      customer_email: order.email,
      client_reference_id: order.order_no,
      payment_intent_data: { description: `Konstelacja ${order.order_no}` },
      metadata: { orderId: order.id, orderNo: order.order_no },
    });

    return json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error("Stripe checkout session failed:", e);
    return json({ error: "stripe_error", details: String(e).slice(0, 500) }, 500);
  }
});
