import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { findProduct, findVariant } from "../_shared/catalog.ts";
import { evaluateDiscount, fetchDiscount, normalizeCode } from "../_shared/discounts.ts";

const BodySchema = z.object({
  code: z.string().min(1).max(40),
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
  if (!parsed.success) return json({ error: "invalid_request" }, 400);

  // Wartość koszyka liczymy z katalogu serwerowego, nigdy z przeglądarki.
  let subtotal = 0;
  for (const it of parsed.data.items) {
    const p = findProduct(it.pid);
    if (!p) return json({ error: "invalid_request" }, 400);
    const v = findVariant(p, it.vid);
    if (!v) return json({ error: "invalid_request" }, 400);
    subtotal += p.price * it.qty;
  }

  const code = normalizeCode(parsed.data.code);
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const row = await fetchDiscount(supabase, code);
  const res = evaluateDiscount(row, subtotal);
  if (!res.ok) return json({ error: res.error, minSubtotal: res.minSubtotal }, 400);

  return json({ ...res.result, subtotal });
});
