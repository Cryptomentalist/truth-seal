import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const BodySchema = z.object({
  priceId: z.enum(["klub_monthly", "klub_yearly"]),
  returnUrl: z.string().url().max(500),
  environment: z.enum(["sandbox", "live"]),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/** Znajduje lub tworzy klienta u dostawcy płatności, z powiązaniem do konta użytkownika. */
async function resolveCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  opts: { email?: string; userId: string },
): Promise<string> {
  if (!/^[a-zA-Z0-9_-]+$/.test(opts.userId)) throw new Error("Invalid userId");

  const found = await stripe.customers.search({
    query: `metadata['userId']:'${opts.userId}'`,
    limit: 1,
  });
  if (found.data.length) return found.data[0].id;

  if (opts.email) {
    const existing = await stripe.customers.list({ email: opts.email, limit: 1 });
    if (existing.data.length) {
      const c = existing.data[0];
      if (c.metadata?.userId !== opts.userId) {
        await stripe.customers.update(c.id, { metadata: { ...c.metadata, userId: opts.userId } });
      }
      return c.id;
    }
  }

  const created = await stripe.customers.create({
    ...(opts.email && { email: opts.email }),
    metadata: { userId: opts.userId },
  });
  return created.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } },
  );
  const { data: claimsData, error: authError } = await supabase.auth.getClaims(
    authHeader.replace("Bearer ", ""),
  );
  const claims = claimsData?.claims;
  if (authError || !claims?.sub) return json({ error: "Unauthorized" }, 401);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { priceId, returnUrl, environment } = parsed.data;

  // Aktywny członek nie może kupić drugiego planu — kieruje go portal dostawcy płatności.
  const { data: alreadyActive } = await supabase.rpc("has_active_subscription", {
    user_uuid: String(claims.sub),
    check_env: environment,
  });
  if (alreadyActive === true) return json({ error: "already_subscribed" }, 409);

  try {
    const stripe = createStripeClient(environment as StripeEnv);

    const prices = await stripe.prices.list({ lookup_keys: [priceId], limit: 1 });
    if (!prices.data.length) return json({ error: "price_not_found" }, 404);
    const price = prices.data[0];

    const userId = String(claims.sub);
    const email = typeof claims.email === "string" ? claims.email : undefined;
    const customerId = await resolveCustomer(stripe, { email, userId });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "subscription",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      customer: customerId,
      metadata: { userId },
      subscription_data: { metadata: { userId } },
    });

    return json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error("create-subscription-checkout failed:", e);
    return json({ error: e instanceof Error ? e.message : "checkout_failed" }, 500);
  }
});
