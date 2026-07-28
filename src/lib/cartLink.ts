/** Podpisane linki do koszyka — token generuje i weryfikuje backend (HMAC). */

import { supabase } from "@/integrations/supabase/client";

export interface CartCodeLine {
  pid: string;
  vid: string;
  qty: number;
}

/** Ważność linku do koszyka. */
export const CART_LINK_TTL_HOURS = 48;

export type CartDecodeStatus = "ok" | "expired" | "invalid";

export interface CartDecodeResult {
  status: CartDecodeStatus;
  lines: CartCodeLine[];
  /** Znacznik czasu wygaśnięcia (ms), jeśli link go zawiera. */
  expiresAt?: number;
}

export const CART_PARAM = "cart";

const parseLines = (raw: unknown): CartCodeLine[] =>
  Array.isArray(raw)
    ? raw
        .filter(
          (l: unknown): l is CartCodeLine =>
            !!l &&
            typeof (l as CartCodeLine).pid === "string" &&
            typeof (l as CartCodeLine).vid === "string" &&
            typeof (l as CartCodeLine).qty === "number",
        )
        .map((l) => ({ pid: l.pid, vid: l.vid, qty: l.qty }))
    : [];

/** Prosi backend o podpisany token dla podanych pozycji. */
export const signCart = async (lines: CartCodeLine[]): Promise<string | null> => {
  if (!lines.length) return null;
  const { data, error } = await supabase.functions.invoke("cart-link", {
    body: { action: "sign", items: lines },
  });
  if (error || !data?.token) return null;
  return data.token as string;
};

/** Weryfikuje podpis tokenu po stronie serwera — bez podpisu nic nie odczytamy. */
export const verifyCart = async (token: string): Promise<CartDecodeResult> => {
  try {
    const { data, error } = await supabase.functions.invoke("cart-link", {
      body: { action: "verify", token },
    });
    if (error || !data) return { status: "invalid", lines: [] };
    const status: CartDecodeStatus =
      data.status === "ok" || data.status === "expired" ? data.status : "invalid";
    return {
      status,
      lines: status === "ok" ? parseLines(data.items) : [],
      expiresAt: typeof data.expiresAt === "number" ? data.expiresAt : undefined,
    };
  } catch {
    return { status: "invalid", lines: [] };
  }
};

/** Buduje pełny adres z podpisanym tokenem (null, gdy podpisanie się nie uda). */
export const buildCartLink = async (lines: CartCodeLine[]): Promise<string | null> => {
  const token = await signCart(lines);
  if (!token) return null;
  const url = new URL(window.location.href);
  url.hash = "";
  url.searchParams.set(CART_PARAM, token);
  return url.toString();
};
