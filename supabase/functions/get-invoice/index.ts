import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const BUCKET = "invoices";
const TokenSchema = z.string().regex(/^[a-zA-Z0-9]{16,64}$/);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  let token = url.searchParams.get("token") || "";
  if (req.method === "POST") {
    try {
      const body = await req.json();
      token = String(body?.token ?? token);
    } catch {
      /* ignore */
    }
  }

  const parsed = TokenSchema.safeParse(token);
  if (!parsed.success) return json({ error: "invalid_token" }, 400);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("id, number, issued_at, total, currency, pdf_path, order_id")
    .eq("access_token", parsed.data)
    .maybeSingle();

  if (error) {
    console.error("Invoice lookup failed:", error.message);
    return json({ error: "lookup_failed" }, 500);
  }
  if (!invoice) return json({ error: "not_found" }, 404);

  const { data: order } = await supabase
    .from("shop_orders")
    .select("order_no, name, email, items, subtotal, shipping, total, currency, status, lang, tracking_number, tracking_url")
    .eq("id", invoice.order_id)
    .maybeSingle();

  let downloadUrl: string | null = null;
  if (invoice.pdf_path) {
    const { data: signed, error: signErr } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(invoice.pdf_path, 60 * 60, { download: `${invoice.number.replace(/\//g, "-")}.pdf` });
    if (signErr) console.error("Signed URL failed:", signErr.message);
    downloadUrl = signed?.signedUrl ?? null;
  }

  const maskEmail = (e?: string | null) =>
    e ? e.replace(/^(.).*(@.*)$/, (_m, a, b) => `${a}***${b}`) : null;

  return json({
    invoice: {
      number: invoice.number,
      issuedAt: invoice.issued_at,
      total: Number(invoice.total),
      currency: invoice.currency,
      downloadUrl,
    },
    order: order
      ? {
          orderNo: order.order_no,
          name: order.name,
          email: maskEmail(order.email),
          items: order.items,
          subtotal: Number(order.subtotal || 0),
          shipping: Number(order.shipping || 0),
          total: Number(order.total || 0),
          currency: order.currency || "PLN",
          status: order.status,
          lang: order.lang,
          trackingNumber: order.tracking_number,
          trackingUrl: order.tracking_url,
        }
      : null,
  });
});
