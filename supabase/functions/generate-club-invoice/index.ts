import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { buildInvoicePdf } from "../_shared/invoice-pdf.ts";
import { isSuppressed, validEmail } from "../_shared/customer-validation.ts";

const SITE_URL = Deno.env.get("SITE_URL") || "https://konstelacja.org";
const BUCKET = "invoices";

/**
 * Faktura za okres rozliczeniowy Klubu. Wywoływana z webhooka dostawcy
 * płatności po zdarzeniu opłaconej faktury cyklicznej (pierwsza płatność
 * i każde odnowienie).
 */
const BodySchema = z.object({
  stripeInvoiceId: z.string().min(3).max(255),
  userId: z.string().uuid(),
  total: z.number().nonnegative(),
  currency: z.string().min(3).max(8).default("PLN"),
  periodStart: z.string().datetime().nullable().optional(),
  periodEnd: z.string().datetime().nullable().optional(),
  planLabel: z.string().max(120).default("Klub Konstelacji"),
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // Tylko wywołania serwerowe (webhook / panel admina).
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token || token !== Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) {
    return json({ error: "unauthorized" }, 401);
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { stripeInvoiceId, userId, total, currency, periodStart, periodEnd, planLabel } = parsed.data;

  const supabase = serviceClient();

  // Idempotencja: jeden dokument na jedną fakturę u dostawcy płatności.
  const { data: existing } = await supabase
    .from("invoices")
    .select("*")
    .eq("stripe_invoice_id", stripeInvoiceId)
    .maybeSingle();

  let invoice = existing;

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
    .maybeSingle();

  const buyerEmail = String(profile?.email || "").trim().toLowerCase();
  if (!buyerEmail) return json({ error: "profile_email_missing" }, 404);

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
        order_id: null,
        user_id: userId,
        kind: "club",
        stripe_invoice_id: stripeInvoiceId,
        number: numberData as string,
        total,
        currency,
        period_start: periodStart ?? null,
        period_end: periodEnd ?? null,
        access_token: accessToken,
      })
      .select("*")
      .single();
    if (insertErr) {
      // Równoległy webhook mógł już wstawić dokument.
      const { data: retry } = await supabase
        .from("invoices").select("*").eq("stripe_invoice_id", stripeInvoiceId).maybeSingle();
      if (!retry) {
        console.error("Club invoice insert failed:", insertErr.message);
        return json({ error: "invoice_insert_failed" }, 500);
      }
      invoice = retry;
    } else {
      invoice = inserted;
    }
  }

  const periodLabel = periodStart && periodEnd
    ? `${periodStart.slice(0, 10)} — ${periodEnd.slice(0, 10)}`
    : "";

  let pdfPath = invoice.pdf_path as string | null;
  if (!pdfPath) {
    let pdfBytes: Uint8Array;
    try {
      pdfBytes = await buildInvoicePdf({
        number: invoice.number,
        issuedAt: new Date(invoice.issued_at),
        orderNo: stripeInvoiceId,
        lang: "pl",
        buyer: {
          name: (profile?.full_name as string | null) || buyerEmail,
          email: buyerEmail,
        },
        items: [
          {
            name: periodLabel ? `${planLabel} (${periodLabel})` : planLabel,
            qty: 1,
            price: total,
          },
        ],
        subtotal: total,
        shipping: 0,
        total,
        currency,
      });
    } catch (e) {
      console.error("Club invoice PDF failed:", e);
      return json({ error: "pdf_generation_failed" }, 500);
    }

    pdfPath = `klub/${userId}/${String(invoice.number).replace(/\//g, "-")}.pdf`;
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(pdfPath, pdfBytes, { contentType: "application/pdf", upsert: true });
    if (uploadErr) {
      console.error("Club invoice upload failed:", uploadErr.message);
      return json({ error: "invoice_upload_failed" }, 500);
    }
    await supabase.from("invoices").update({ pdf_path: pdfPath }).eq("id", invoice.id);
    invoice.pdf_path = pdfPath;
  }

  const panelUrl = `${SITE_URL}/faktura/${invoice.access_token}`;

  let emailed = false;
  let emailError: string | null = null;
  if (!invoice.email_sent_at) {
    if (!validEmail(buyerEmail)) emailError = "invalid_email";
    else if (await isSuppressed(supabase, buyerEmail)) emailError = "email_suppressed";
    else {
      const { error: sendErr } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "invoice-issued",
          recipientEmail: buyerEmail,
          idempotencyKey: `club-invoice-${invoice.id}`,
          templateData: {
            name: profile?.full_name || undefined,
            orderNo: planLabel,
            lang: "pl",
            invoiceNumber: invoice.number,
            invoiceUrl: panelUrl,
            issuedAt: new Date(invoice.issued_at).toISOString().slice(0, 10),
            items: [{ name: periodLabel ? `${planLabel} (${periodLabel})` : planLabel, qty: 1, price: total }],
            subtotal: total,
            shipping: 0,
            total,
            currency,
          },
        },
      });
      if (sendErr) emailError = String(sendErr.message || sendErr).slice(0, 400);
      else emailed = true;
    }
    await supabase
      .from("invoices")
      .update({
        email_sent_at: emailed ? new Date().toISOString() : invoice.email_sent_at,
        email_error: emailError,
      })
      .eq("id", invoice.id);
  }

  return json({ invoiceNumber: invoice.number, panelUrl, emailed, emailError });
});
