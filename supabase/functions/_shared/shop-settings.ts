// Ustawienia sklepu ustawiane w panelu admina: nadpisane ceny, ukrycie produktu
// i kategorii oraz oznaczenie „wyprzedane”. Serwer zawsze bierze cenę stąd.

export interface ShopSettings {
  price: (pid: string, fallback: number) => number;
  blocked: (pid: string) => "hidden" | "sold_out" | null;
}

const CAT_OF: Record<string, string> = {
  "mug-cww": "drinkware",
  "tee-comp": "apparel",
  "poster-pyr": "print",
  "book-zw": "book",
  "geo-guide": "digital",
  "ebook-claude": "digital",
  support: "support",
};

// deno-lint-ignore no-explicit-any
export const loadShopSettings = async (supabase: any): Promise<ShopSettings> => {
  const [prods, cats] = await Promise.all([
    supabase.from("shop_product_settings").select("product_id, price, visible, sold_out"),
    supabase.from("shop_category_settings").select("cat, visible"),
  ]);

  const pm = new Map<string, { price: number | null; visible: boolean; sold_out: boolean }>();
  for (const r of prods.data ?? []) {
    pm.set(r.product_id, {
      price: r.price == null ? null : Number(r.price),
      visible: r.visible,
      sold_out: r.sold_out,
    });
  }
  const cm = new Map<string, boolean>();
  for (const r of cats.data ?? []) cm.set(r.cat, r.visible);

  return {
    price: (pid, fallback) => {
      const s = pm.get(pid);
      return s?.price != null ? s.price : fallback;
    },
    blocked: (pid) => {
      const s = pm.get(pid);
      if (s && !s.visible) return "hidden";
      if (cm.get(CAT_OF[pid] ?? "") === false) return "hidden";
      if (s?.sold_out) return "sold_out";
      return null;
    },
  };
};
