/** Kodowanie/dekodowanie koszyka do linku (zapis między sesjami i urządzeniami). */

export interface CartCodeLine {
  pid: string;
  vid: string;
  qty: number;
}

const b64urlEncode = (s: string) =>
  btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const b64urlDecode = (s: string) =>
  decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))); 

export const encodeCart = (lines: CartCodeLine[]): string =>
  b64urlEncode(JSON.stringify(lines.map((l) => [l.pid, l.vid, l.qty])));

export const decodeCart = (code: string): CartCodeLine[] => {
  try {
    const parsed = JSON.parse(b64urlDecode(code));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (t: unknown): t is [string, string, number] =>
          Array.isArray(t) && typeof t[0] === "string" && typeof t[1] === "string" && typeof t[2] === "number",
      )
      .map(([pid, vid, qty]) => ({ pid, vid, qty }));
  } catch {
    return [];
  }
};

export const CART_PARAM = "cart";

export const buildCartLink = (lines: CartCodeLine[]): string => {
  const url = new URL(window.location.href);
  url.hash = "";
  url.searchParams.set(CART_PARAM, encodeCart(lines));
  return url.toString();
};
