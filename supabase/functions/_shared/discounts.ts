// Wspólna, serwerowa logika kodów rabatowych.
// Rabat liczymy zawsze po stronie serwera — przeglądarka podaje wyłącznie kod.

export interface DiscountRow {
  code: string;
  description: string | null;
  percent_off: number | null;
  amount_off: number | null;
  min_subtotal: number;
  free_shipping: boolean;
  active: boolean;
  starts_at: string | null;
  expires_at: string | null;
  max_redemptions: number | null;
  times_redeemed: number;
}

export type DiscountError =
  | "code_not_found"
  | "code_inactive"
  | "code_expired"
  | "code_not_started"
  | "code_used_up"
  | "code_min_subtotal";

export interface DiscountResult {
  code: string;
  description: string | null;
  /** Rabat od wartości produktów (bez dostawy), zaokrąglony do groszy. */
  discount: number;
  /** Kod znosi koszt dostawy. */
  freeShipping: boolean;
  minSubtotal: number;
}

export const normalizeCode = (raw: unknown): string =>
  String(raw ?? "").trim().toUpperCase().slice(0, 40);

const round2 = (v: number) => Math.round(v * 100) / 100;

/** Pobiera kod z bazy (case-insensitive). */
export async function fetchDiscount(
  supabase: { from: (t: string) => any },
  code: string,
): Promise<DiscountRow | null> {
  const { data } = await supabase
    .from("discount_codes")
    .select(
      "code, description, percent_off, amount_off, min_subtotal, free_shipping, active, starts_at, expires_at, max_redemptions, times_redeemed",
    )
    .ilike("code", code)
    .maybeSingle();
  return (data as DiscountRow | null) ?? null;
}

/** Waliduje kod dla danej wartości koszyka i zwraca kwotę rabatu. */
export function evaluateDiscount(
  row: DiscountRow | null,
  subtotal: number,
): { ok: true; result: DiscountResult } | { ok: false; error: DiscountError; minSubtotal?: number } {
  if (!row) return { ok: false, error: "code_not_found" };
  if (!row.active) return { ok: false, error: "code_inactive" };

  const now = Date.now();
  if (row.starts_at && new Date(row.starts_at).getTime() > now) {
    return { ok: false, error: "code_not_started" };
  }
  if (row.expires_at && new Date(row.expires_at).getTime() < now) {
    return { ok: false, error: "code_expired" };
  }
  if (row.max_redemptions !== null && row.times_redeemed >= row.max_redemptions) {
    return { ok: false, error: "code_used_up" };
  }
  const min = Number(row.min_subtotal ?? 0);
  if (subtotal < min) {
    return { ok: false, error: "code_min_subtotal", minSubtotal: min };
  }

  let discount = 0;
  if (row.percent_off) discount += (subtotal * Number(row.percent_off)) / 100;
  if (row.amount_off) discount += Number(row.amount_off);
  discount = Math.min(round2(discount), round2(subtotal));

  return {
    ok: true,
    result: {
      code: row.code.toUpperCase(),
      description: row.description,
      discount,
      freeShipping: !!row.free_shipping,
      minSubtotal: min,
    },
  };
}
