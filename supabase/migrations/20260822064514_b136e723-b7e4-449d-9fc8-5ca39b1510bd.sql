CREATE TABLE public.discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  description text,
  percent_off numeric,
  amount_off numeric,
  min_subtotal numeric NOT NULL DEFAULT 0,
  free_shipping boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  starts_at timestamptz,
  expires_at timestamptz,
  max_redemptions integer,
  times_redeemed integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.discount_codes TO service_role;
GRANT SELECT ON public.discount_codes TO authenticated;

ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage discount codes" ON public.discount_codes
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can read discount codes" ON public.discount_codes
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_discount_codes_updated_at
  BEFORE UPDATE ON public.discount_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.shop_orders
  ADD COLUMN IF NOT EXISTS discount_code text,
  ADD COLUMN IF NOT EXISTS discount numeric NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.redeem_discount_code(_code text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  UPDATE public.discount_codes
  SET times_redeemed = times_redeemed + 1
  WHERE upper(code) = upper(_code);
$$;

REVOKE ALL ON FUNCTION public.redeem_discount_code(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_discount_code(text) TO service_role;

INSERT INTO public.discount_codes (code, description, percent_off, min_subtotal)
VALUES ('KONSTELACJA10', 'Rabat powitalny 10%', 10, 0)
ON CONFLICT (code) DO NOTHING;