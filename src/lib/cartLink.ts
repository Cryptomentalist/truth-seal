/** Kodowanie/dekodowanie koszyka do linku (zapis między sesjami i urządzeniami). */

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

const b64urlEncode = (s: string) =>
  btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const b64urlDecode = (s: string) =>
  decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));

const parseLines = (raw: unknown): CartCodeLine[] =>
  Array.isArray(raw)
    ? raw
        .filter(
          (t: unknown): t is [string, string, number] =>
            Array.isArray(t) && typeof t[0] === "string" && typeof t[1] === "string" && typeof t[2] === "number",
        )
        .map(([pid, vid, qty]) => ({ pid, vid, qty }))
    : [];

export const encodeCart = (lines: CartCodeLine[], ttlHours: number = CART_LINK_TTL_HOURS): string =>
  b64urlEncode(
    JSON.stringify({
      v: 2,
      e: Date.now() + ttlHours * 3600_000,
      i: lines.map((l) => [l.pid, l.vid, l.qty]),
    }),
  );

export const decodeCartResult = (code: string): CartDecodeResult => {
  try {
    const parsed = JSON.parse(b64urlDecode(code));

    // format v2 — z datą wygaśnięcia
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const expiresAt = typeof parsed.e === "number" ? parsed.e : undefined;
      const lines = parseLines(parsed.i);
      if (!lines.length) return { status: "invalid", lines: [] };
      if (expiresAt !== undefined && Date.now() > expiresAt) return { status: "expired", lines: [], expiresAt };
      return { status: "ok", lines, expiresAt };
    }

    // legacy (tablica pozycji, bez wygaśnięcia) — traktujemy jako przeterminowany
    const legacy = parseLines(parsed);
    if (legacy.length) return { status: "expired", lines: [] };
    return { status: "invalid", lines: [] };
  } catch {
    return { status: "invalid", lines: [] };
  }
};

export const decodeCart = (code: string): CartCodeLine[] => decodeCartResult(code).lines;

export const CART_PARAM = "cart";

export const buildCartLink = (lines: CartCodeLine[]): string => {
  const url = new URL(window.location.href);
  url.hash = "";
  url.searchParams.set(CART_PARAM, encodeCart(lines));
  return url.toString();
};
