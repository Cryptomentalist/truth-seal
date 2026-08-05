import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

/**
 * Przypisuje zamówienia złożone „na gościa" do konta klienta po zalogowaniu.
 * Warunek: ten sam, potwierdzony adres e-mail — inaczej ktoś mógłby przejąć
 * cudzą historię zakupów samym wpisaniem adresu.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return json({ error: "unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user?.email) return json({ error: "unauthorized" }, 401);
    if (!user.email_confirmed_at) return json({ claimed: 0, reason: "email_unconfirmed" });

    const { data, error } = await supabase
      .from("shop_orders")
      .update({ user_id: user.id, updated_at: new Date().toISOString() })
      .is("user_id", null)
      .ilike("email", user.email)
      .select("id");

    if (error) {
      console.error("Claim orders failed:", error.message);
      return json({ error: "claim_failed" }, 500);
    }

    return json({ claimed: data?.length ?? 0 });
  } catch (e) {
    console.error("claim-orders threw:", e);
    return json({ error: "unexpected" }, 500);
  }
});
