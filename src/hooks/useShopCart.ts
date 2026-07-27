import { useCallback, useEffect, useState } from "react";
import { SHOP_PRODUCTS } from "@/data/shopProducts";

export interface CartLine {
  id: string;
  slug: string;
  variant?: string;
  qty: number;
}

const KEY = "konstelacja_shop_cart_v1";

const read = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => l && typeof l.slug === "string" && SHOP_PRODUCTS.some((p) => p.slug === l.slug),
    );
  } catch {
    return [];
  }
};

export const useShopCart = () => {
  const [items, setItems] = useState<CartLine[]>(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage niedostępny — koszyk działa tylko w pamięci */
    }
  }, [items]);

  const add = useCallback((slug: string, variant?: string) => {
    const id = variant ? `${slug}__${variant}` : slug;
    setItems((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, slug, variant, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, l) => {
    const p = SHOP_PRODUCTS.find((x) => x.slug === l.slug);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);

  const count = items.reduce((sum, l) => sum + l.qty, 0);

  return { items, add, setQty, remove, clear, total, count };
};
