import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { findProduct, findVariant } from "../_shared/catalog.ts";
import { isSuppressed, validEmail, validateAddress } from "../_shared/customer-validation.ts";
import { evaluateDiscount, fetchDiscount, normalizeCode } from "../_shared/discounts.ts";
import { loadShopSettings } from "../_shared/shop-settings.ts";

export const CONSENT_VERSION = "2026-07-27";

const BodySchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(255),
  street: z.string().max(255).optional().default(""),
  zip: z.string().max(20).optional().default(""),
  city: z.string().max(120).optional().default(""),
  phone: z.string().max(40).optional().default(""),
  cname: z.string().max(255).optional().default(""),
  nip: z.string().max(40).optional().default(""),
  shippingMethod: z.enum(["courier", "locker"]).optional().default("courier"),
  paymentMethod: z.enum(["blik", "p24", "card", "wallet"]).optional().default("blik"),
  lang: z.enum(["pl", "en"]).optional().default("pl"),
  discountCode: z.string().max(40).optional().default(""),
  consentNews: z.boolean().optional().default(false),
  consentRules: z.boolean().optional().default(false),
  consentPrivacy: z.boolean().optional().default(false),
  consentDigital: z.boolean().optional().default(false),
  items: z
    .array(
      z.object({
        pid: z.string().max(64),
        vid: z.string().max(64),
        qty: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(30),
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
  const b = parsed.data;
  const email = b.email.trim().toLowerCase();

  // --- zgody (D1/D4/D5) ---
  if (!b.consentRules || !b.consentPrivacy) {
    return json({ error: "consent_required" }, 400);
  }

  // --- walidacja adresu klienta przed wysyłką ---
  if (!validEmail(email)) return json({ error: "invalid_email" }, 400);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  // --- wycena po stronie serwera (z nadpisaniami z panelu admina) ---
  const settings = await loadShopSettings(supabase);
  const lines: { pid: string; vid: string; qty: number; name: string; variant: string; price: number; pf?: number }[] = [];
  const wanted = new Map<string, number>();
  for (const it of b.items) {
    const p = findProduct(it.pid);
    if (!p) return json({ error: `Unknown product: ${it.pid}` }, 400);
    const v = findVariant(p, it.vid);
    if (!v) return json({ error: `Unknown variant: ${it.vid}` }, 400);
    const block = settings.blocked(p.id);
    if (block) return json({ error: block === "hidden" ? "product_unavailable" : "out_of_stock", pid: p.id, available: 0 }, 400);
    const key = `${p.id}::${v.id}`;
    const qty = (wanted.get(key) ?? 0) + it.qty;
    wanted.set(key, qty);
    if (qty > v.stock) {
      return json({ error: "out_of_stock", pid: p.id, vid: v.id, available: v.stock }, 400);
    }
    lines.push({ pid: p.id, vid: v.id, qty: it.qty, name: p.name, variant: v.label, price: settings.price(p.id, p.price), pf: v.pf });
  }


  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const allNoShip = b.items.every((it) => {
    const p = findProduct(it.pid)!;
    return !!(p.digital || p.noship);
  });
  let shipping = allNoShip || subtotal >= 250 ? 0 : b.shippingMethod === "locker" ? 12 : 16;

  const requiresDigitalConsent = b.items.some((it) => !!findProduct(it.pid)?.digital);
  if (requiresDigitalConsent && !b.consentDigital) {
    return json({ error: "consent_digital_required" }, 400);
  }

  if (!allNoShip) {
    const addrErrors = validateAddress({ street: b.street, zip: b.zip, city: b.city, phone: b.phone });
    if (addrErrors.length) return json({ error: "invalid_address", fields: addrErrors }, 400);
  }

  const orderNo = `KON-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  // --- kod rabatowy: zawsze przeliczany po stronie serwera ---
  const discountCode = normalizeCode(b.discountCode);
  let discount = 0;
  let appliedCode: string | null = null;
  if (discountCode) {
    const row = await fetchDiscount(supabase, discountCode);
    const res = evaluateDiscount(row, subtotal);
    if (!res.ok) return json({ error: res.error, minSubtotal: res.minSubtotal }, 400);
    discount = res.result.discount;
    appliedCode = res.result.code;
    if (res.result.freeShipping) shipping = 0;
  }
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;

  // Nie wysyłamy na adresy z listy wykluczeń (bounce/skarga/rezygnacja)
  const suppressed = await isSuppressed(supabase, email);
  if (suppressed) return json({ error: "email_suppressed" }, 400);

  // Zakup jako gość jest dozwolony; gdy klient jest zalogowany, wiążemy
  // zamówienie z jego kontem (historia zamówień, faktury, pobrania).
  let userId: string | null = null;
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    try {
      const authClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { auth: { persistSession: false } },
      );
      const { data: claimsData } = await authClient.auth.getClaims(
        authHeader.replace("Bearer ", ""),
      );
      const sub = claimsData?.claims?.sub;
      if (typeof sub === "string") userId = sub;
    } catch (e) {
      console.error("Optional auth resolution failed:", e);
    }
  }

  const { data: order, error: dbError } = await supabase
    .from("shop_orders")
    .insert({
      order_no: orderNo,
      user_id: userId,
      email,
      name: b.name,

      phone: b.phone || null,
      street: b.street || null,
      zip: b.zip || null,
      city: b.city || null,
      company_name: b.cname || null,
      tax_id: b.nip || null,
      items: lines,
      subtotal,
      discount,
      discount_code: appliedCode,
      shipping,
      total,
      shipping_method: allNoShip ? null : b.shippingMethod,
      payment_method: b.paymentMethod,
      lang: b.lang,
      consent_news: b.consentNews,
      consent_rules: b.consentRules,
      consent_privacy: b.consentPrivacy,
      consent_digital: b.consentDigital,
      consent_version: CONSENT_VERSION,
      consent_at: new Date().toISOString(),
      consent_ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
      consent_user_agent: (req.headers.get("user-agent") || "").slice(0, 300) || null,
      status: "pending",
    })
    .select("id, order_no")
    .single();

  if (dbError) {
    console.error("Order insert failed:", dbError.message);
    return json({ error: "Could not save order" }, 500);
  }

  // --- Printful: draft zamówienia dla pozycji POD ---
  const podItems = lines.filter((l) => typeof l.pf === "number").map((l) => ({ sync_variant_id: l.pf, quantity: l.qty }));
  let printful: { id?: string; status?: string; error?: string; skipped?: boolean } = {};

  if (podItems.length === 0) {
    printful = { skipped: true };
  } else {
    const key = Deno.env.get("PRINTFUL_API_KEY");
    if (!key) {
      printful = { error: "PRINTFUL_API_KEY is not configured" };
    } else {
      try {
        const res = await fetch("https://api.printful.com/orders", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            external_id: orderNo,
            confirm: false, // draft — potwierdzamy dopiero po opłaceniu
            recipient: {
              name: b.name,
              address1: b.street,
              city: b.city,
              zip: b.zip,
              country_code: "PL",
              email,
              phone: b.phone || undefined,
            },
            items: podItems,
          }),
        });
        const body = await res.text();
        if (!res.ok) {
          console.error(`Printful request failed [${res.status}]: ${body}`);
          printful = { error: `[${res.status}] ${body}`.slice(0, 900) };
        } else {
          const parsedBody = JSON.parse(body);
          printful = { id: String(parsedBody?.result?.id ?? ""), status: parsedBody?.result?.status ?? "draft" };
        }
      } catch (e) {
        console.error("Printful call threw:", e);
        printful = { error: String(e).slice(0, 900) };
      }
    }
  }

  await supabase
    .from("shop_orders")
    .update({
      printful_order_id: printful.id || null,
      printful_status: printful.status || null,
      printful_error: printful.error || null,
      status: printful.error ? "pending_pod_error" : "pending",
    })
    .eq("id", order.id);

  // Licznik użyć kodu rabatowego (limit max_redemptions).
  if (appliedCode) {
    const { error: redeemError } = await supabase.rpc("redeem_discount_code", { _code: appliedCode });
    if (redeemError) console.error("redeem_discount_code failed:", redeemError.message);
  }

  // Faktura powstaje dopiero po zaksięgowaniu płatności (payments-webhook),
  // żeby nieopłacone zamówienia nie zużywały numeracji.

  return json({
    orderId: order.id,
    orderNo: order.order_no,

    subtotal,
    discount,
    discountCode: appliedCode,
    shipping,
    total,
    pod: printful,
  });
});

