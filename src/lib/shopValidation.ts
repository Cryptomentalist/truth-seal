import { z } from "zod";

export type ShopLang = "pl" | "en";

const M = {
  pl: {
    email: "Podaj poprawny adres e-mail (np. jan@example.com).",
    email_domain: "Ten adres e-mail wygląda na tymczasowy — podaj stały adres.",
    name: "Podaj imię i nazwisko (min. 3 znaki).",
    street: "Podaj ulicę i numer domu/mieszkania.",
    zip: "Kod pocztowy w formacie 00-000.",
    city: "Podaj miejscowość (min. 2 znaki).",
    phone: "Podaj poprawny numer telefonu (9–15 cyfr).",
    nip: "NIP musi mieć 10 cyfr.",
    cname: "Podaj nazwę firmy.",
    consent: "Ta zgoda jest wymagana, aby zrealizować zamówienie.",
  },
  en: {
    email: "Enter a valid email address (e.g. jane@example.com).",
    email_domain: "This looks like a disposable address — please use a permanent one.",
    name: "Enter your full name (min. 3 characters).",
    street: "Enter street and building/flat number.",
    zip: "Postcode must follow the 00-000 format.",
    city: "Enter your city (min. 2 characters).",
    phone: "Enter a valid phone number (9–15 digits).",
    nip: "VAT ID must contain 10 digits.",
    cname: "Enter the company name.",
    consent: "This consent is required to place the order.",
  },
} as const;

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

const EMAIL_RE = /^[^\s@,;:"'()[\]<>]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;

export const normalizeEmail = (v: string) => v.trim().toLowerCase().replace(/\s+/g, "");
export const normalizeZip = (v: string) => {
  const d = v.replace(/[^\d]/g, "").slice(0, 5);
  return d.length > 2 ? `${d.slice(0, 2)}-${d.slice(2)}` : d;
};
export const normalizePhone = (v: string) => v.replace(/[^\d+]/g, "").slice(0, 16);

export function isDisposableEmail(email: string) {
  const domain = normalizeEmail(email).split("@")[1] ?? "";
  return DISPOSABLE_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
}

export interface CheckoutValues {
  email: string;
  name: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  cname: string;
  nip: string;
}

export interface ConsentValues {
  rules: boolean;
  privacy: boolean;
  digital: boolean;
  news: boolean;
}

export type FieldErrors = Partial<Record<keyof CheckoutValues | keyof ConsentValues, string>>;

/** Waliduje dane klienta przed wysyłką zamówienia i e-maili (D1/D4/D5). */
export function validateCheckout(
  v: CheckoutValues,
  consents: ConsentValues,
  opts: { lang: ShopLang; needsAddress: boolean; needsDigital: boolean; invoice: boolean },
): FieldErrors {
  const m = M[opts.lang];
  const e: FieldErrors = {};
  const email = normalizeEmail(v.email);

  if (!EMAIL_RE.test(email) || email.length > 255) e.email = m.email;
  else if (isDisposableEmail(email)) e.email = m.email_domain;

  if (v.name.trim().length < 3 || v.name.trim().length > 120) e.name = m.name;

  if (opts.needsAddress) {
    if (v.street.trim().length < 3) e.street = m.street;
    if (!/^\d{2}-\d{3}$/.test(v.zip.trim())) e.zip = m.zip;
    if (v.city.trim().length < 2) e.city = m.city;
    const digits = v.phone.replace(/\D/g, "");
    if (v.phone.trim() && (digits.length < 9 || digits.length > 15)) e.phone = m.phone;
  }

  if (opts.invoice) {
    if (v.cname.trim().length < 2) e.cname = m.cname;
    if (v.nip.replace(/\D/g, "").length !== 10) e.nip = m.nip;
  }

  if (!consents.rules) e.rules = m.consent;
  if (!consents.privacy) e.privacy = m.consent;
  if (opts.needsDigital && !consents.digital) e.digital = m.consent;

  return e;
}

export const checkoutSchema = z.object({
  email: z.string().trim().toLowerCase().max(255).regex(EMAIL_RE),
  name: z.string().trim().min(3).max(120),
  street: z.string().trim().max(160).optional(),
  zip: z.string().trim().max(10).optional(),
  city: z.string().trim().max(80).optional(),
  phone: z.string().trim().max(20).optional(),
});
