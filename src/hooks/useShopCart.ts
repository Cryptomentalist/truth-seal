import { useCallback, useEffect, useState } from "react";
import { PRODUCTS } from "@/data/shopProducts";
import {
  CART_LINK_TTL_HOURS,
  CART_PARAM,
  buildCartLink,
  verifyCart,
  type CartCodeLine,
  type CartDecodeStatus,
} from "@/lib/cartLink";




export interface CartLine {
  key: string;
  pid: string;
  vid: string;
  qty: number;
  price: number;
}

const KEY = "konstelacja_shop_cart_v2";

/** Maksymalna ilość, jaką można kupić — stan magazynowy wariantu (0 = brak). */
export const maxQty = (pid: string, vid: string): number => {
  const p = PRODUCTS.find((x) => x.id === pid);
  const v = p?.variants.find((x) => x.id === vid);
  return v ? Math.max(0, v.stock) : 0;
};

/** Podsumowanie korekt po odświeżeniu koszyka względem aktualnego katalogu. */
export interface CartAdjust {
  removed: number;   // pozycje niedostępne / wyprzedane
  reduced: number;   // pozycje z przyciętą ilością (mniejszy stan magazynowy)
  repriced: number;  // pozycje z inną ceną niż zapisana
}

export const emptyAdjust: CartAdjust = { removed: 0, reduced: 0, repriced: 0 };
export const hasAdjust = (a: CartAdjust) => a.removed + a.reduced + a.repriced > 0;
export const mergeAdjust = (a: CartAdjust, b: CartAdjust): CartAdjust => ({
  removed: a.removed + b.removed,
  reduced: a.reduced + b.reduced,
  repriced: a.repriced + b.repriced,
});

/**
 * Odświeża pozycje względem aktualnego katalogu: aktualna cena, stan magazynowy
 * (przycięcie ilości), usunięcie pozycji, których już nie ma lub są wyprzedane.
 */
export const refreshLines = (
  raw: Array<{ pid: string; vid: string; qty: number; price?: number }>,
): { lines: CartLine[]; adjust: CartAdjust } => {
  const adjust: CartAdjust = { ...emptyAdjust };
  const lines: CartLine[] = [];
  for (const l of raw) {
    const p = PRODUCTS.find((x) => x.id === l?.pid);
    const v = p?.variants.find((x) => x.id === l?.vid);
    const want = Math.floor(Number(l?.qty));
    if (!p || !v || !Number.isFinite(want) || want <= 0) {
      adjust.removed += 1;
      continue;
    }
    const max = maxQty(l.pid, l.vid);
    if (max <= 0) {
      adjust.removed += 1;
      continue;
    }
    const qty = Math.min(want, max);
    if (qty < want) adjust.reduced += 1;
    if (typeof l.price === "number" && l.price !== p.price) adjust.repriced += 1;
    lines.push({ key: `${l.pid}::${l.vid}`, pid: l.pid, vid: l.vid, qty, price: p.price });
  }
  return { lines, adjust };
};

const read = (): { lines: CartLine[]; adjust: CartAdjust } => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { lines: [], adjust: { ...emptyAdjust } };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { lines: [], adjust: { ...emptyAdjust } };
    return refreshLines(parsed);
  } catch {
    return { lines: [], adjust: { ...emptyAdjust } };
  }
};

/** Zamienia surowe pozycje (pid/vid/qty) na prawidłowe linie koszyka. */
const normalize = (lines: CartCodeLine[]) => refreshLines(lines);

/** Status linku wykryty przy starcie: null = brak linku w adresie. */
export type CartLinkStatus = CartDecodeStatus | "merged" | null;


/**
 * Scala dwa koszyki: ilości tej samej pozycji sumują się (do stanu magazynowego),
 * pozycje unikalne trafiają do wyniku. Nic nie jest nadpisywane.
 */
export const mergeCarts = (base: CartLine[], incoming: CartLine[]): CartLine[] => {
  const out = base.map((l) => ({ ...l }));
  for (const l of incoming) {
    const i = out.findIndex((x) => x.key === l.key);
    if (i >= 0) out[i] = { ...out[i], qty: Math.min(out[i].qty + l.qty, maxQty(l.pid, l.vid)) };
    else out.push({ ...l });
  }
  return out.filter((l) => l.qty > 0);
};

/** Token z adresu (jeśli jest) — weryfikowany później po stronie serwera. */
const readToken = (): string | null => {
  try {
    return new URLSearchParams(window.location.search).get(CART_PARAM);
  } catch {
    return null;
  }
};

export const useShopCart = () => {
  const [cart, setCart] = useState<CartLine[]>(read);
  const [linkStatus, setLinkStatus] = useState<CartLinkStatus>(null);

  // koszyk z podpisanego linku scalamy z lokalnym (bez nadpisywania pozycji)
  useEffect(() => {
    const token = readToken();
    // parametr znika z adresu od razu — token nie zostaje w historii przeglądarki
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has(CART_PARAM)) {
        url.searchParams.delete(CART_PARAM);
        window.history.replaceState({}, "", url.toString());
      }
    } catch {
      /* ignore */
    }
    if (!token) return;

    let cancelled = false;
    void (async () => {
      const res = await verifyCart(token);
      if (cancelled) return;
      if (res.status !== "ok") {
        setLinkStatus(res.status);
        return;
      }
      const restored = normalize(res.lines);
      if (!restored.length) {
        setLinkStatus("invalid");
        return;
      }
      setCart((local) => {
        setLinkStatus(local.length ? "merged" : "ok");
        return mergeCarts(local, restored);
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);




  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
      /* storage niedostępny — koszyk działa tylko w pamięci */
    }
  }, [cart]);

  const add = useCallback((pid: string, vid: string, qty: number) => {
    const p = PRODUCTS.find((x) => x.id === pid);
    if (!p) return;
    const max = maxQty(pid, vid);
    if (max <= 0) return;
    const key = `${pid}::${vid}`;
    setCart((c) => {
      const i = c.findIndex((l) => l.key === key);
      if (i >= 0) {
        const n = [...c];
        n[i] = { ...n[i], qty: Math.min(max, n[i].qty + qty) };
        return n;
      }
      return [...c, { key, pid, vid, qty: Math.min(max, qty), price: p.price }];
    });
  }, []);

  const setQty = useCallback((key: string, q: number) => {
    setCart((c) =>
      q <= 0
        ? c.filter((l) => l.key !== key)
        : c.map((l) => (l.key === key ? { ...l, qty: Math.min(q, maxQty(l.pid, l.vid)) } : l)),
    );
  }, []);

  const clear = useCallback(() => setCart([]), []);

  /** Link przywracający aktualny koszyk na innym urządzeniu / po powrocie. */
  const cartLink = useCallback(
    () => buildCartLink(cart.map((l) => ({ pid: l.pid, vid: l.vid, qty: l.qty }))),
    [cart],
  );

  // ceny zawsze z katalogu, nigdy z przeglądarki
  const subtotal = cart.reduce((s, l) => {
    const p = PRODUCTS.find((x) => x.id === l.pid);
    return s + (p ? p.price * l.qty : 0);
  }, 0);

  const allNoShip =
    cart.length > 0 &&
    cart.every((l) => {
      const p = PRODUCTS.find((x) => x.id === l.pid);
      return !!(p?.digital || p?.noship);
    });

  const hasDigital = cart.some((l) => PRODUCTS.find((p) => p.id === l.pid)?.digital);
  const shipping = allNoShip || subtotal === 0 ? 0 : subtotal >= 250 ? 0 : 16;
  const total = subtotal + shipping;
  const count = cart.reduce((s, l) => s + l.qty, 0);

  return {
    cart, add, setQty, clear, cartLink, subtotal, shipping, total, count, allNoShip, hasDigital,
    linkStatus, linkTtlHours: CART_LINK_TTL_HOURS,
  };
};

