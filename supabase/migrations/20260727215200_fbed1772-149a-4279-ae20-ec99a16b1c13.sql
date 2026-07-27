CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.shop_orders(id) ON DELETE CASCADE,
  number TEXT NOT NULL UNIQUE,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PLN',
  pdf_path TEXT,
  access_token TEXT NOT NULL UNIQUE,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_invoices_order_id ON public.invoices(order_id);

GRANT ALL ON public.invoices TO service_role;
GRANT SELECT ON public.invoices TO authenticated;

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read invoices"
ON public.invoices FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can manage invoices"
ON public.invoices FOR ALL
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

CREATE OR REPLACE FUNCTION public.next_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  yr TEXT := to_char(now(), 'YYYY');
  seq INTEGER;
BEGIN
  PERFORM pg_advisory_xact_lock(7700000000000002);
  SELECT COALESCE(MAX(NULLIF(split_part(number, '/', 3), '')::INTEGER), 0) + 1
    INTO seq
    FROM public.invoices
   WHERE split_part(number, '/', 2) = yr;
  RETURN 'FV/' || yr || '/' || lpad(seq::TEXT, 4, '0');
END;
$$;

CREATE TRIGGER update_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();