/** Walidacja danych klienta po stronie serwera (D1/D4/D5). */
export const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com",
  "throwawaymail.com",
];

export const EMAIL_RE =
  /^[^\s@,;:"'()[\]<>]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;

export const normalizeEmail = (v: string) => v.trim().toLowerCase().replace(/\s+/g, "");

export function isDisposableEmail(email: string) {
  const domain = normalizeEmail(email).split("@")[1] ?? "";
  return DISPOSABLE_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
}

export function validEmail(email: string) {
  const e = normalizeEmail(email);
  return EMAIL_RE.test(e) && e.length <= 255 && !isDisposableEmail(e);
}

export interface AddressInput {
  street?: string;
  zip?: string;
  city?: string;
  phone?: string;
  countryCode?: string;
}

/** Zwraca listę błędów adresu; pusta tablica = adres nadaje się do wysyłki. */
export function validateAddress(a: AddressInput): string[] {
  const errors: string[] = [];
  const country = (a.countryCode || "PL").toUpperCase();
  if (!a.street || a.street.trim().length < 3) errors.push("street");
  if (!a.city || a.city.trim().length < 2) errors.push("city");
  const zip = (a.zip || "").trim();
  if (country === "PL" ? !/^\d{2}-\d{3}$/.test(zip) : zip.length < 3) errors.push("zip");
  if (a.phone) {
    const digits = a.phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) errors.push("phone");
  }
  return errors;
}

/** Sprawdza listę wykluczeń (bounce/skarga/unsubscribe) przed wysyłką e-maila. */
export async function isSuppressed(
  supabase: { from: (t: string) => any },
  email: string,
): Promise<boolean> {
  try {
    const { data } = await supabase
      .from("suppressed_emails")
      .select("email")
      .eq("email", normalizeEmail(email))
      .limit(1);
    return Array.isArray(data) && data.length > 0;
  } catch {
    return false;
  }
}
