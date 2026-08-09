ALTER TABLE public.invoices
  ALTER COLUMN order_id DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS user_id UUID,
  ADD COLUMN IF NOT EXISTS kind TEXT NOT NULL DEFAULT 'shop',
  ADD COLUMN IF NOT EXISTS stripe_invoice_id TEXT,
  ADD COLUMN IF NOT EXISTS period_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS period_end TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS invoices_stripe_invoice_id_key
  ON public.invoices (stripe_invoice_id) WHERE stripe_invoice_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS invoices_user_id_idx ON public.invoices (user_id);

DROP POLICY IF EXISTS "Users can view own invoices" ON public.invoices;
CREATE POLICY "Users can view own invoices"
ON public.invoices FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.shop_orders o
    WHERE o.id = invoices.order_id AND o.user_id = auth.uid()
  )
);