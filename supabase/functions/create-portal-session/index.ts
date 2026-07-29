import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const BodySchema = z.object({
  returnUrl: z.string().url().max(500).optional(),
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

  const authed = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } },
  );
  const { data: claimsData, error: authError } = await authed.auth.getClaims(
    authHeader.replace("Bearer ", ""),
  );
  if (authError || !claimsData?.claims?.sub) return json({ error: "Unauthorized" }, 401);
  const userId = String(claimsData.claims.sub);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { returnUrl, environment } = parsed.data;

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: sub } = await admin
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .eq("environment", environment)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!sub?.stripe_customer_id) return json({ error: "no_subscription" }, 404);

  try {
    const stripe = createStripeClient(environment as StripeEnv);
    const portal = await stripe.billingPortal.sessions.create({
      customer: String(sub.stripe_customer_id),
      ...(returnUrl && { return_url: returnUrl }),
    });
    return json({ url: portal.url });
  } catch (e) {
    console.error("create-portal-session failed:", e);
    return json({ error: e instanceof Error ? e.message : "portal_failed" }, 500);
  }
});
