import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

/**
 * Podpisywanie i weryfikacja linków do koszyka.
 * Token = base64url(payload) + "." + base64url(HMAC-SHA256(payload, CART_LINK_SECRET)).
 * Payload zawiera losowy nonce (link nie do zgadnięcia) i datę wygaśnięcia.
 */

const TTL_HOURS = 48;
const MAX_ITEMS = 50;
const MAX_QTY = 999;

const enc = new TextEncoder();

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const b64urlDecode = (s: string) => {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

const getKey = async () => {
  const secret = Deno.env.get("CART_LINK_SECRET");
  if (!secret) throw new Error("missing_secret");
  return await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
};

const sign = async (payloadB64: string) => {
  const sig = await crypto.subtle.sign("HMAC", await getKey(), enc.encode(payloadB64));
  return b64url(new Uint8Array(sig));
};

/** Porównanie w stałym czasie — bez wycieku informacji przez czas odpowiedzi. */
const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

type Item = { pid: string; vid: string; qty: number };

const parseItems = (raw: unknown): Item[] | null => {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_ITEMS) return null;
  const out: Item[] = [];
  for (const r of raw) {
    if (!r || typeof r !== "object") return null;
    const { pid, vid, qty } = r as Record<string, unknown>;
    if (typeof pid !== "string" || pid.length === 0 || pid.length > 80) return null;
    if (typeof vid !== "string" || vid.length === 0 || vid.length > 80) return null;
    if (typeof qty !== "number" || !Number.isFinite(qty)) return null;
    const q = Math.floor(qty);
    if (q < 1 || q > MAX_QTY) return null;
    out.push({ pid, vid, qty: q });
  }
  return out;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  try {
    if (body.action === "sign") {
      const items = parseItems(body.items);
      if (!items) return json({ error: "invalid_items" }, 400);

      const nonce = b64url(crypto.getRandomValues(new Uint8Array(16)));
      const payload = JSON.stringify({
        v: 3,
        n: nonce,
        e: Date.now() + TTL_HOURS * 3600_000,
        i: items.map((l) => [l.pid, l.vid, l.qty]),
      });
      const payloadB64 = b64url(enc.encode(payload));
      const token = `${payloadB64}.${await sign(payloadB64)}`;
      return json({ token, ttlHours: TTL_HOURS });
    }

    if (body.action === "verify") {
      const token = body.token;
      if (typeof token !== "string" || token.length > 8000) return json({ status: "invalid", items: [] });

      const dot = token.indexOf(".");
      if (dot <= 0) return json({ status: "invalid", items: [] });
      const payloadB64 = token.slice(0, dot);
      const sig = token.slice(dot + 1);

      let expected: string;
      try {
        expected = await sign(payloadB64);
      } catch {
        return json({ error: "server_misconfigured" }, 500);
      }
      // niepoprawny podpis = brak jakiejkolwiek informacji o zawartości
      if (!timingSafeEqual(sig, expected)) return json({ status: "invalid", items: [] });

      let parsed: { e?: number; i?: unknown };
      try {
        parsed = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64)));
      } catch {
        return json({ status: "invalid", items: [] });
      }

      if (typeof parsed.e === "number" && Date.now() > parsed.e) {
        return json({ status: "expired", items: [] });
      }

      const items = parseItems(
        Array.isArray(parsed.i)
          ? parsed.i.map((t: unknown) =>
              Array.isArray(t) ? { pid: t[0], vid: t[1], qty: t[2] } : null,
            )
          : null,
      );
      if (!items) return json({ status: "invalid", items: [] });

      return json({ status: "ok", items, expiresAt: parsed.e ?? null });
    }

    return json({ error: "unknown_action" }, 400);
  } catch (e) {
    console.error("cart-link error", e);
    return json({ error: "server_error" }, 500);
  }
});
