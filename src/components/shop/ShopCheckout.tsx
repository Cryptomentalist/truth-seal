import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { C, F, PRODUCTS } from "@/data/shopProducts";
import type { ShopLang, ShopStrings } from "@/data/shopStrings";
import type { CartLine } from "@/hooks/useShopCart";
import { Btn, Check, Field, H, Motif, Price, Row, money } from "@/components/shop/ShopUI";
import {
  normalizeEmail,
  normalizePhone,
  normalizeZip,
  validateCheckout,
  type FieldErrors,
} from "@/lib/shopValidation";

export interface CheckoutData {
  email: string;
  name: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  cname: string;
  nip: string;
}

export interface CheckoutSubmit extends CheckoutData {
  discountCode: string;
  shippingMethod: string;
  paymentMethod: string;
  consentNews: boolean;
  consentRules: boolean;
  consentPrivacy: boolean;
  consentDigital: boolean;
}

interface Props {
  lang: ShopLang;
  t: ShopStrings;
  cart: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  hasDigital: boolean;
  allNoShip: boolean;
  onBack: () => void;
  onSetQty?: (key: string, qty: number) => void;
  onRemove?: (key: string) => void;
  onDone: (data: CheckoutSubmit) => Promise<void> | void;
}

const ShopCheckout = ({ lang, t, cart, subtotal, shipping, total, hasDigital, allNoShip, onBack, onSetQty, onRemove, onDone }: Props) => {
  const [f, setF] = useState<CheckoutData>({ email: "", name: "", street: "", zip: "", city: "", phone: "", cname: "", nip: "" });
  const [ship, setShip] = useState("courier");
  const [inv, setInv] = useState(false);
  const [cRules, setCRules] = useState(false);
  const [cPrivacy, setCPrivacy] = useState(false);
  const [cDigital, setCDigital] = useState(false);
  const [cNews, setCNews] = useState(false);
  const [pay, setPay] = useState("blik");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState(false);

  // --- kod rabatowy (walidowany po stronie serwera) ---
  const [codeInput, setCodeInput] = useState("");
  const [discount, setDiscount] = useState<{ code: string; discount: number; freeShipping: boolean } | null>(null);
  const [codeBusy, setCodeBusy] = useState(false);
  const [codeErr, setCodeErr] = useState("");

  // zmiana koszyka unieważnia policzony wcześniej rabat
  const cartKey = cart.map((l) => `${l.key}:${l.qty}`).join("|");
  useEffect(() => {
    setDiscount(null);
  }, [cartKey]);

  const discountErrors: Record<string, { pl: string; en: string }> = {
    code_not_found: { pl: "Nie znamy takiego kodu.", en: "We don't recognise this code." },
    code_inactive: { pl: "Ten kod jest nieaktywny.", en: "This code is inactive." },
    code_expired: { pl: "Ten kod stracił ważność.", en: "This code has expired." },
    code_not_started: { pl: "Ten kod jeszcze nie obowiązuje.", en: "This code is not active yet." },
    code_used_up: { pl: "Limit użyć tego kodu został wyczerpany.", en: "This code has reached its usage limit." },
    code_min_subtotal: { pl: "Koszyk jest za mały dla tego kodu.", en: "Your cart is below this code's minimum." },
  };

  const applyCode = async () => {
    const code = codeInput.trim().toUpperCase();
    setCodeErr("");
    if (!code) return;
    if (!cart.length) return;
    setCodeBusy(true);
    const { data, error } = await supabase.functions.invoke("validate-discount", {
      body: { code, items: cart.map((l) => ({ pid: l.pid, vid: l.vid, qty: l.qty })) },
    });
    setCodeBusy(false);
    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      let key = "";
      try {
        key = String(JSON.parse(details ?? "{}")?.error ?? "");
      } catch {
        /* brak szczegółów */
      }
      setDiscount(null);
      setCodeErr(discountErrors[key]?.[lang] ?? (lang === "pl" ? "Nie udało się sprawdzić kodu." : "Could not check this code."));
      return;
    }
    setCodeInput(code);
    setDiscount({
      code: String(data.code),
      discount: Number(data.discount) || 0,
      freeShipping: !!data.freeShipping,
    });
  };

  const clearCode = () => {
    setDiscount(null);
    setCodeInput("");
    setCodeErr("");
  };
  const set = (k: keyof CheckoutData) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  const consents = { rules: cRules, privacy: cPrivacy, digital: cDigital, news: cNews };
  const opts = { lang, needsAddress: !allNoShip, needsDigital: hasDigital, invoice: inv };

  const revalidate = (next?: Partial<CheckoutData>) => {
    const values = { ...f, ...next };
    const e = validateCheckout(values, consents, opts);
    setErrors(e);
    return e;
  };

  const submit = async () => {
    setErr("");
    setTouched(true);
    const normalized: CheckoutData = {
      ...f,
      email: normalizeEmail(f.email),
      name: f.name.trim(),
      street: f.street.trim(),
      city: f.city.trim(),
      zip: normalizeZip(f.zip),
      phone: normalizePhone(f.phone),
      cname: f.cname.trim(),
      nip: f.nip.trim(),
    };
    setF(normalized);
    const e = validateCheckout(normalized, consents, opts);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setErr(t.validation_intro);
      return;
    }
    setBusy(true);
    try {
      await onDone({
        ...normalized,
        discountCode: discount?.code ?? "",
        shippingMethod: ship,
        paymentMethod: pay,
        consentNews: cNews,
        consentRules: cRules,
        consentPrivacy: cPrivacy,
        consentDigital: cDigital,
      });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : String(e2));
      setBusy(false);
    }
  };

  // dostawa liczona zgodnie z wybraną metodą — identycznie jak na serwerze
  const baseShip =
    cart.length === 0 || subtotal === 0 || allNoShip || subtotal >= 250 ? 0 : ship === "locker" ? 12 : 16;
  const shipCost = discount?.freeShipping ? 0 : baseShip;
  const discountValue = Math.min(discount?.discount ?? 0, subtotal);
  const grandTotal = Math.max(0, subtotal - discountValue + shipCost);

  const show = (k: keyof FieldErrors) => (touched ? errors[k] : undefined);

  const ready = cart.length > 0 && cRules && cPrivacy && (!hasDigital || cDigital);

  const methods: [string, string][] = [
    ["blik", "BLIK"],
    ["p24", "Przelewy24"],
    ["card", lang === "pl" ? "Karta płatnicza" : "Card"],
    ["wallet", "Apple Pay / Google Pay"],
  ];


  return (
    <section className="mx-auto px-5 py-10" style={{ maxWidth: 1080 }}>
      <button onClick={onBack} style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.ink2 }}>
        ← {t.back}
      </button>
      <h1 style={{ fontFamily: F.display, fontSize: "1.7rem", color: C.indigo, margin: "16px 0 28px" }}>{t.co_title}</h1>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <H>{t.co_contact}</H>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="co-email"
              label={t.email}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={f.email}
              onChange={set("email")}
              onBlur={() => {
                const v = normalizeEmail(f.email);
                setF((s) => ({ ...s, email: v }));
                revalidate({ email: v });
                setTouched(true);
              }}
              error={show("email")}
              hint={t.hint_email}
              required
            />
            <Field
              id="co-name"
              label={t.name}
              autoComplete="name"
              value={f.name}
              onChange={set("name")}
              onBlur={() => { revalidate(); setTouched(true); }}
              error={show("name")}
              required
            />
          </div>

          {!allNoShip && (
            <>
              <H mt={34}>{t.co_addr}</H>
              <div className="grid gap-4">
                <Field
                  id="co-street"
                  label={t.street}
                  autoComplete="street-address"
                  value={f.street}
                  onChange={set("street")}
                  onBlur={() => { revalidate(); setTouched(true); }}
                  error={show("street")}
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="co-zip"
                    label={t.zip}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={f.zip}
                    onChange={(v) => set("zip")(normalizeZip(v))}
                    onBlur={() => { revalidate(); setTouched(true); }}
                    error={show("zip")}
                    hint={t.hint_zip}
                    required
                  />
                  <Field
                    id="co-city"
                    label={t.city}
                    autoComplete="address-level2"
                    value={f.city}
                    onChange={set("city")}
                    onBlur={() => { revalidate(); setTouched(true); }}
                    error={show("city")}
                    required
                  />
                </div>
                <Field
                  id="co-phone"
                  label={t.phone}
                  inputMode="tel"
                  autoComplete="tel"
                  value={f.phone}
                  onChange={set("phone")}
                  onBlur={() => { revalidate(); setTouched(true); }}
                  error={show("phone")}
                />
              </div>


              <H mt={34}>{t.co_ship}</H>
              <div className="grid gap-3">
                {([["courier", t.courier, 16], ["locker", t.locker, 12]] as [string, string, number][]).map(([id, label, price]) => (
                  <button
                    key={id}
                    onClick={() => setShip(id)}
                    aria-pressed={ship === id}
                    className="flex justify-between items-center"
                    style={{ border: `1px solid ${ship === id ? C.indigo : C.rule}`, borderRadius: 8, padding: "13px 15px", background: "transparent" }}
                  >
                    <span style={{ fontFamily: F.body, fontSize: "0.88rem", color: C.indigo }}>{label}</span>
                    <span style={{ fontFamily: F.mono, fontSize: "0.82rem", color: C.ink2 }}>
                      {subtotal >= 250 ? t.free : `${price},00 zł`}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          <H mt={34}>{t.co_pay}</H>
          <div className="grid gap-3">
            {methods.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setPay(id)}
                aria-pressed={pay === id}
                className="flex items-center gap-3"
                style={{ border: `1px solid ${pay === id ? C.indigo : C.rule}`, borderRadius: 8, padding: "13px 15px", background: "transparent" }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 99,
                    border: `1px solid ${pay === id ? C.indigo : C.rule}`,
                    background: pay === id ? C.indigo : "transparent",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: F.body, fontSize: "0.88rem", color: C.indigo }}>{label}</span>
              </button>
            ))}
          </div>
          <p style={{ fontFamily: F.mono, fontSize: "0.68rem", color: C.ink2, marginTop: 10 }}>{t.pay_pending}</p>

          <div className="grid gap-3 mt-8">
            <Check id="co-inv" checked={inv} onChange={setInv}>
              {t.inv}
            </Check>
            {inv && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="co-cname"
                  label={t.inv_name}
                  value={f.cname}
                  onChange={set("cname")}
                  onBlur={() => { revalidate(); setTouched(true); }}
                  error={show("cname")}
                />
                <Field
                  id="co-nip"
                  label={t.inv_nip}
                  inputMode="numeric"
                  value={f.nip}
                  onChange={set("nip")}
                  onBlur={() => { revalidate(); setTouched(true); }}
                  error={show("nip")}
                />
              </div>
            )}
          </div>

          <H mt={34}>{t.consent_title}</H>
          <p style={{ fontFamily: F.body, fontSize: "0.74rem", color: C.ink2, lineHeight: 1.6, marginBottom: 14 }}>
            {t.consent_admin}
          </p>
          <div className="grid gap-3">
            <div>
              <Check id="co-rules" checked={cRules} onChange={(v) => { setCRules(v); }}>
                {t.consent_rules} <span style={{ color: C.amber }}>*</span>
              </Check>
              {touched && !cRules && (
                <p role="alert" style={{ fontFamily: F.body, fontSize: "0.72rem", color: "#B3261E", marginTop: 4, paddingLeft: 28 }}>
                  {t.consent_required}
                </p>
              )}
            </div>
            <div>
              <Check id="co-privacy" checked={cPrivacy} onChange={setCPrivacy}>
                {t.consent_privacy} <span style={{ color: C.amber }}>*</span>
              </Check>
              {touched && !cPrivacy && (
                <p role="alert" style={{ fontFamily: F.body, fontSize: "0.72rem", color: "#B3261E", marginTop: 4, paddingLeft: 28 }}>
                  {t.consent_required}
                </p>
              )}
            </div>
            {hasDigital && (
              <div>
                <Check id="co-digital" checked={cDigital} onChange={setCDigital}>
                  {t.consent_digital} <span style={{ color: C.amber }}>*</span>
                </Check>
                {touched && !cDigital && (
                  <p role="alert" style={{ fontFamily: F.body, fontSize: "0.72rem", color: "#B3261E", marginTop: 4, paddingLeft: 28 }}>
                    {t.consent_required}
                  </p>
                )}
              </div>
            )}
            <div>
              <Check id="co-news" checked={cNews} onChange={setCNews}>
                {t.consent_news}
              </Check>
              <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, lineHeight: 1.6, marginTop: 4, paddingLeft: 28 }}>
                {t.consent_news_detail}
              </p>
            </div>
            <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, lineHeight: 1.6, marginTop: 4 }}>
              {t.consent_tx_note}
            </p>
          </div>


          <div className="mt-8">
            <Btn full disabled={!ready || busy} onClick={submit}>
              {busy ? (lang === "pl" ? "Przetwarzanie…" : "Processing…") : `${t.pay} · ${money(grandTotal)}`}
            </Btn>
            {err && (
              <p style={{ fontFamily: F.mono, fontSize: "0.72rem", color: "#B3261E", marginTop: 10 }}>{err}</p>
            )}
          </div>

        </div>

        <aside>
          <div style={{ border: `1px solid ${C.rule}`, borderRadius: 10, padding: 18, background: C.surface }}>
            {cart.length === 0 && (
              <p style={{ fontFamily: F.body, fontSize: "0.82rem", color: C.ink2 }}>
                {lang === "pl" ? "Koszyk jest pusty." : "Your cart is empty."}
              </p>
            )}
            {cart.map((l) => {
              const p = PRODUCTS.find((x) => x.id === l.pid)!;
              const v = p.variants.find((x) => x.id === l.vid)!;
              const atMax = l.qty >= v.stock;
              return (
                <div key={l.key} className="flex gap-3 items-center py-3" style={{ borderBottom: `1px solid ${C.rule}` }}>
                  <div style={{ width: 52, flexShrink: 0 }}>
                    <Motif p={p} small />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: F.body, fontSize: "0.82rem", color: C.indigo }}>{p[lang].name}</p>
                    <p style={{ fontFamily: F.mono, fontSize: "0.68rem", color: C.ink2 }}>{v[lang]}</p>
                    {onSetQty && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center" style={{ border: `1px solid ${C.rule}`, borderRadius: 6 }}>
                          <button
                            type="button"
                            onClick={() => (l.qty <= 1 && onRemove ? onRemove(l.key) : onSetQty(l.key, l.qty - 1))}
                            aria-label={lang === "pl" ? "Zmniejsz ilość" : "Decrease quantity"}
                            style={{ padding: "1px 8px", fontFamily: F.mono, color: C.ink2 }}
                          >
                            −
                          </button>
                          <span style={{ fontFamily: F.mono, fontSize: "0.72rem", color: C.indigo, minWidth: 18, textAlign: "center" }}>
                            {l.qty}
                          </span>
                          <button
                            type="button"
                            disabled={atMax}
                            onClick={() => onSetQty(l.key, l.qty + 1)}
                            aria-label={lang === "pl" ? "Zwiększ ilość" : "Increase quantity"}
                            style={{ padding: "1px 8px", fontFamily: F.mono, color: C.ink2, opacity: atMax ? 0.35 : 1, cursor: atMax ? "not-allowed" : "pointer" }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => (onRemove ? onRemove(l.key) : onSetQty(l.key, 0))}
                          style={{ fontFamily: F.mono, fontSize: "0.68rem", color: "#B3261E", textDecoration: "underline" }}
                        >
                          {lang === "pl" ? "Usuń" : "Remove"}
                        </button>
                      </div>
                    )}
                    {atMax && !p.digital && !p.noship && (
                      <p style={{ fontFamily: F.mono, fontSize: "0.64rem", color: C.amber, marginTop: 4 }}>
                        {lang === "pl" ? `Dostępne maks. ${v.stock} szt.` : `Max ${v.stock} available`}
                      </p>
                    )}
                  </div>

                  <Price v={p.price * l.qty} size="0.82rem" />
                </div>
              );
            })}
            <div className="pt-4" style={{ borderBottom: `1px solid ${C.rule}`, paddingBottom: 16 }}>
              <label
                htmlFor="co-code"
                style={{ fontFamily: F.mono, fontSize: "0.68rem", color: C.ink2, letterSpacing: "0.06em" }}
              >
                {lang === "pl" ? "KOD RABATOWY" : "DISCOUNT CODE"}
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  id="co-code"
                  value={codeInput}
                  disabled={!!discount}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void applyCode();
                    }
                  }}
                  placeholder={lang === "pl" ? "np. KONSTELACJA10" : "e.g. KONSTELACJA10"}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontFamily: F.mono,
                    fontSize: "0.78rem",
                    color: C.indigo,
                    background: "transparent",
                    border: `1px solid ${C.rule}`,
                    borderRadius: 8,
                    padding: "9px 11px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => (discount ? clearCode() : void applyCode())}
                  disabled={codeBusy || (!discount && !codeInput.trim())}
                  style={{
                    fontFamily: F.mono,
                    fontSize: "0.72rem",
                    color: C.indigo,
                    border: `1px solid ${C.indigo}`,
                    borderRadius: 8,
                    padding: "9px 13px",
                    opacity: codeBusy || (!discount && !codeInput.trim()) ? 0.45 : 1,
                  }}
                >
                  {codeBusy
                    ? "…"
                    : discount
                      ? lang === "pl" ? "Usuń" : "Remove"
                      : lang === "pl" ? "Zastosuj" : "Apply"}
                </button>
              </div>
              {codeErr && (
                <p role="alert" style={{ fontFamily: F.body, fontSize: "0.72rem", color: "#B3261E", marginTop: 6 }}>
                  {codeErr}
                </p>
              )}
              {discount && (
                <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.indigo, marginTop: 6 }}>
                  {lang === "pl" ? "Kod aktywny" : "Code applied"}: {discount.code}
                  {discount.freeShipping ? (lang === "pl" ? " · darmowa dostawa" : " · free shipping") : ""}
                </p>
              )}
            </div>

            <div className="pt-3">
              <Row label={t.subtotal} value={money(subtotal)} />
              {discountValue > 0 && (
                <Row
                  label={`${lang === "pl" ? "Rabat" : "Discount"} (${discount?.code})`}
                  value={`−${money(discountValue)}`}
                />
              )}
              <Row label={t.shipping} value={shipCost === 0 ? t.free : money(shipCost)} />
              <div className="flex justify-between items-center pt-3" style={{ borderTop: `1px solid ${C.rule}` }}>
                <span style={{ fontFamily: F.body, fontSize: "0.9rem", color: C.indigo }}>{t.total}</span>
                <Price v={grandTotal} size="1.05rem" />
              </div>
              <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, marginTop: 8 }}>{t.vat_note}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ShopCheckout;
