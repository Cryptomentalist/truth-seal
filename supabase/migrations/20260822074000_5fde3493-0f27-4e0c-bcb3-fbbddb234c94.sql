CREATE TABLE public.puzzle_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  email text NOT NULL,
  full_name text NOT NULL,
  city text,
  order_no text,
  headline text,
  about text,
  interests text[] NOT NULL DEFAULT '{}',
  looking_for text,
  skills text,
  links text,
  style_pref text,
  color_pref text,
  consent_publish boolean NOT NULL DEFAULT false,
  lang text NOT NULL DEFAULT 'pl',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.puzzle_briefs TO anon;
GRANT SELECT, INSERT ON public.puzzle_briefs TO authenticated;
GRANT ALL ON public.puzzle_briefs TO service_role;

ALTER TABLE public.puzzle_briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a puzzle brief"
  ON public.puzzle_briefs FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can view own briefs"
  ON public.puzzle_briefs FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can read puzzle briefs"
  ON public.puzzle_briefs FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_puzzle_briefs_updated_at
  BEFORE UPDATE ON public.puzzle_briefs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.discount_codes (code, description, percent_off, min_subtotal, max_redemptions, active, expires_at)
VALUES
  ('PUZZLE369', 'Puzzle 369 — 90% rabatu na unikalną stronę-puzzel (1200 zł → 120 zł)', 90, 1200, 369, true, '2026-12-31T22:59:59Z'),
  ('PUZZLE3', 'Puzzle 369 — 99% rabatu dla trzech pierwszych osób (1200 zł → 12 zł)', 99, 1200, 3, true, '2026-12-31T22:59:59Z');