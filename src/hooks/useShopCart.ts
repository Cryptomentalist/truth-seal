import { useCallback, useEffect, useState } from "react";
import { PRODUCTS } from "@/data/shopProducts";
import {
  CART_LINK_TTL_HOURS,
  CART_PARAM,
  buildCartLink,
  decodeCartResult,
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

const read = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => {
        const p = PRODUCTS.find((x) => x.id === l?.pid);
        return !!p && p.variants.some((v) => v.id === l.vid) && typeof l.qty === "number";
      })
      .map((l) => ({ ...l, qty: Math.min(l.qty, maxQty(l.pid, l.vid)) }))
      .filter((l) => l.qty > 0);
  } catch {
    return [];
  }
};

/** Zamienia surowe pozycje (pid/vid/qty) na prawidłowe linie koszyka. */
const normalize = (lines: CartCodeLine[]): CartLine[] =>
  lines
    .map((l) => {
      const p = PRODUCTS.find((x) => x.id === l.pid);
      if (!p || !p.variants.some((v) => v.id === l.vid)) return null;
      const qty = Math.min(Math.max(0, Math.floor(l.qty)), maxQty(l.pid, l.vid));
      if (qty <= 0) return null;
      return { key: `${l.pid}::${l.vid}`, pid: l.pid, vid: l.vid, qty, price: p.price };
    })
    .filter((l): l is CartLine => !!l);

/** Koszyk z linku (?cart=...) ma pierwszeństwo nad zapisanym lokalnie. */
const initial = (): CartLine[] => {
  try {
    const code = new URLSearchParams(window.location.search).get(CART_PARAM);
    if (code) {
      const restored = normalize(decodeCart(code));
      if (restored.length) return restored;
    }
  } catch {
    /* brak URL API — ignorujemy */
  }
  return read();
};

export const useShopCart = () => {
  const [cart, setCart] = useState<CartLine[]>(initial);

  // po przywróceniu koszyka z linku czyścimy parametr z adresu
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has(CART_PARAM)) {
        url.searchParams.delete(CART_PARAM);
        window.history.replaceState({}, "", url.toString());
      }
    } catch {
      /* ignore */
    }
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

  return { cart, add, setQty, clear, cartLink, subtotal, shipping, total, count, allNoShip, hasDigital };
};
