ALTER TABLE public.shop_orders
  ADD COLUMN IF NOT EXISTS consent_rules boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_privacy boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_digital boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_version text,
  ADD COLUMN IF NOT EXISTS consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS consent_ip text,
  ADD COLUMN IF NOT EXISTS consent_user_agent text;