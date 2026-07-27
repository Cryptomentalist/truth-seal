import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { buildInvoicePdf } from "../_shared/invoice-pdf.ts";
import { isSuppressed, validEmail } from "../_shared/customer-validation.ts";

const SITE_URL = Deno.env.get("SITE_URL") || "https://konstelacja.org";
const BUCKET = "invoices";

const BodySchema = z.object({
  orderId: z.string().uuid().optional(),
  orderNo: z.string().min(3).max(64).optional(),
  resend: z.boolean().optional().default(false),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const serviceClient = () =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

async function authorize(req: Request): Promise<boolean> {
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;
  if (token === Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) return true;

  const supabase = serviceClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return false;
  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: data.user.id,
    _role: "admin",
  });
  return isAdmin === true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (!(await authorize(req))) return json({ error: "unauthorized" }, 401);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { orderId, orderNo, resend } = parsed.data;
  if (!orderId && !orderNo) return json({ error: "orderId_or_orderNo_required" }, 400);

  const supabase = serviceClient();

  const query = supabase.from("shop_orders").select("*").limit(1);
  const { data: order, error: orderErr } = orderId
    ? await query.eq("id", orderId).maybeSingle()
    : await query.eq("order_no", orderNo!).maybeSingle();

  if (orderErr) {
    console.error("Order lookup failed:", orderErr.message);
    return json({ error: "order_lookup_failed" }, 500);
  }
  if (!order) return json({ error: "order_not_found" }, 404);

  // Faktura już istnieje — nie duplikujemy numeracji
  const { data: existing } = await supabase
    .from("invoices")
    .select("*")
    .eq("order_id", order.id)
    .maybeSingle();

  let invoice = existing;

  if (!invoice) {
    const { data: numberData, error: numberErr } = await supabase.rpc("next_invoice_number");
    if (numberErr || !numberData) {
      console.error("Numbering failed:", numberErr?.message);
      return json({ error: "numbering_failed" }, 500);
    }
    const accessToken = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().slice(0, 8);
    const { data: inserted, error: insertErr } = await supabase
      .from("invoices")
      .insert({
        order_id: order.id,
        number: numberData as string,
        total: order.total,
        currency: order.currency || "PLN",
        access_token: accessToken,
      })
      .select("*")
      .single();
    if (insertErr) {
      console.error("Invoice insert failed:", insertErr.message);
      return json({ error: "invoice_insert_failed" }, 500);
    }
    invoice = inserted;
  }

  // --- PDF ---
  let pdfPath = invoice.pdf_path as string | null;
  if (!pdfPath) {
    let pdfBytes: Uint8Array;
    try {
      pdfBytes = await buildInvoicePdf({
        number: invoice.number,
        issuedAt: new Date(invoice.issued_at),
        orderNo: order.order_no,
        lang: order.lang || "pl",
        buyer: {
          name: order.name,
          company: order.company_name,
          taxId: order.tax_id,
          street: order.street,
          zip: order.zip,
          city: order.city,
          email: order.email,
        },
        items: Array.isArray(order.items) ? order.items : [],
        subtotal: Number(order.subtotal || 0),
        shipping: Number(order.shipping || 0),
        total: Number(order.total || 0),
        currency: order.currency || "PLN",
      });
    } catch (e) {
      console.error("PDF generation failed:", e);
      return json({ error: "pdf_generation_failed", details: String(e).slice(0, 400) }, 500);
    }

    pdfPath = `${order.id}/${invoice.number.replace(/\//g, "-")}.pdf`;
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(pdfPath, pdfBytes, { contentType: "application/pdf", upsert: true });
    if (uploadErr) {
      console.error("Invoice upload failed:", uploadErr.message);
      return json({ error: "invoice_upload_failed" }, 500);
    }
    await supabase.from("invoices").update({ pdf_path: pdfPath }).eq("id", invoice.id);
    invoice.pdf_path = pdfPath;
  }

  const panelUrl = `${SITE_URL}/faktura/${invoice.access_token}`;

  // --- e-mail z numerem dokumentu i linkiem do panelu klienta ---
  let emailed = false;
  let emailError: string | null = null;

  if (!invoice.email_sent_at || resend) {
    const email = String(order.email || "").trim().toLowerCase();
    if (!validEmail(email)) {
      emailError = "invalid_email";
    } else if (await isSuppressed(supabase, email)) {
      emailError = "email_suppressed";
    } else {
      const { error: sendErr } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "invoice-issued",
          recipientEmail: email,
          idempotencyKey: `invoice-issued-${invoice.id}${resend ? `-${Date.now()}` : ""}`,
          templateData: {
            name: order.name,
            orderNo: order.order_no,
            lang: order.lang || "pl",
            invoiceNumber: invoice.number,
            invoiceUrl: panelUrl,
            issuedAt: new Date(invoice.issued_at).toISOString().slice(0, 10),
            items: Array.isArray(order.items) ? order.items : [],
            subtotal: Number(order.subtotal || 0),
            shipping: Number(order.shipping || 0),
            total: Number(order.total || 0),
            currency: order.currency || "PLN",
            shippingMethod: order.shipping_method || undefined,
            street: order.street || undefined,
            zip: order.zip || undefined,
            city: order.city || undefined,
          },
        },
      });
      if (sendErr) {
        emailError = String(sendErr.message || sendErr).slice(0, 400);
        console.error("Invoice email failed:", emailError);
      } else {
        emailed = true;
      }
    }
    await supabase
      .from("invoices")
      .update({
        email_sent_at: emailed ? new Date().toISOString() : invoice.email_sent_at,
        email_error: emailError,
      })
      .eq("id", invoice.id);
  }

  return json({
    invoiceNumber: invoice.number,
    invoiceId: invoice.id,
    orderNo: order.order_no,
    panelUrl,
    pdfPath: invoice.pdf_path,
    emailed,
    emailError,
  });
});
