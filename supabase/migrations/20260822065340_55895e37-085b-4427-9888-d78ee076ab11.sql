CREATE TABLE public.shop_product_settings (
  product_id text PRIMARY KEY,
  price numeric,
  visible boolean NOT NULL DEFAULT true,
  sold_out boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.shop_product_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_product_settings TO authenticated;
GRANT ALL ON public.shop_product_settings TO service_role;
ALTER TABLE public.shop_product_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read product settings" ON public.shop_product_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage product settings" ON public.shop_product_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER shop_product_settings_updated_at BEFORE UPDATE ON public.shop_product_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.shop_category_settings (
  cat text PRIMARY KEY,
  visible boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.shop_category_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_category_settings TO authenticated;
GRANT ALL ON public.shop_category_settings TO service_role;
ALTER TABLE public.shop_category_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read category settings" ON public.shop_category_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage category settings" ON public.shop_category_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER shop_category_settings_updated_at BEFORE UPDATE ON public.shop_category_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.shop_category_settings (cat) VALUES ('apparel'),('drinkware'),('print'),('book'),('digital'),('support');