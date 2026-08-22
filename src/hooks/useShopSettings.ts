import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { applyShopSettings, type ProductSetting } from "@/data/shopProducts";

/**
 * Pobiera ustawienia sklepu (ceny, widoczność produktów i kategorii) z bazy
 * i nakłada je na katalog. Zwraca licznik, który wymusza ponowne renderowanie.
 */
export const useShopSettings = () => {
  const [version, setVersion] = useState(0);
  const [hiddenCats, setHiddenCats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [prods, cats] = await Promise.all([
        supabase.from("shop_product_settings").select("product_id, price, visible, sold_out"),
        supabase.from("shop_category_settings").select("cat, visible"),
      ]);
      if (cancelled) return;
      const catMap: Record<string, boolean> = {};
      (cats.data ?? []).forEach((c) => {
        catMap[c.cat] = c.visible;
      });
      applyShopSettings((prods.data ?? []) as ProductSetting[], catMap);
      setHiddenCats(Object.keys(catMap).filter((k) => catMap[k] === false));
      setVersion((v) => v + 1);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { version, hiddenCats, loading };
};
