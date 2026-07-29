import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { SERVER_CATALOG, isPaid } from "../_shared/catalog.ts";

const DIGITAL_BUCKET = "digital-products";

const BodySchema = z.object({
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

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { environment } = parsed.data;

  const anon = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { auth: { persistSession: false } },
  );
  const { data: claimsData, error: authError } = await anon.auth.getClaims(
    authHeader.replace("Bearer ", ""),
  );
  const userId = claimsData?.claims?.sub;
  if (authError || typeof userId !== "string") return json({ error: "Unauthorized" }, 401);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  // 1. Aktywna subskrypcja Klubu odblokowuje całą bibliotekę cyfrową.
  const { data: subActive, error: subErr } = await admin.rpc("has_active_subscription", {
    user_uuid: userId,
    check_env: environment,
  });
  if (subErr) console.error("has_active_subscription failed:", subErr.message);
  const memberAccess = subActive === true;

  // 2. Pojedyncze zakupy: opłacone zamówienia powiązane z kontem.
  const purchased = new Set<string>();
  const { data: orders, error: ordErr } = await admin
    .from("shop_orders")
    .select("items, status")
    .eq("user_id", userId);
  if (ordErr) console.error("Order lookup failed:", ordErr.message);
  for (const o of orders ?? []) {
    if (!isPaid(String((o as any).status))) continue;
    const items = Array.isArray((o as any).items) ? ((o as any).items as { pid?: string }[]) : [];
    for (const it of items) if (it?.pid) purchased.add(it.pid);
  }

  const items: { pid: string; name: string; url: string | null; source: string | null }[] = [];
  for (const p of SERVER_CATALOG) {
    if (!p.digital || !p.file) continue;
    const source = memberAccess ? "klub" : purchased.has(p.id) ? "zakup" : null;
    let url: string | null = null;
    if (source) {
      const { data: signed, error: sErr } = await admin.storage
        .from(DIGITAL_BUCKET)
        .createSignedUrl(p.file, 60 * 60, { download: p.file.split("/").pop() });
      if (sErr) console.error("Signed URL failed:", sErr.message);
      url = signed?.signedUrl ?? null;
    }
    items.push({ pid: p.id, name: p.name, url, source });
  }

  return json({ memberAccess, items });
});
