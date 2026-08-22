UPDATE public.discount_codes
SET percent_off = NULL,
    amount_off = 1188,
    max_redemptions = 3,
    min_subtotal = 1200,
    active = true,
    description = 'Puzzle 369 — cena 12 zł dla 3 pierwszych osób (warunek: promocja Konstelacja.org w social media z oznaczeniem)',
    updated_at = now()
WHERE upper(code) = 'PUZZLE3';