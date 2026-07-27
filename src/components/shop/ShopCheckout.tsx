import { useState } from "react";
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
  onDone: (data: CheckoutSubmit) => Promise<void> | void;
}

const ShopCheckout = ({ lang, t, cart, subtotal, shipping, total, hasDigital, allNoShip, onBack, onDone }: Props) => {
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

  const show = (k: keyof FieldErrors) => (touched ? errors[k] : undefined);

  const ready = cRules && cPrivacy && (!hasDigital || cDigital);

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
            <Field id="co-email" label={t.email} type="email" value={f.email} onChange={set("email")} required />
            <Field id="co-name" label={t.name} value={f.name} onChange={set("name")} required />
          </div>

          {!allNoShip && (
            <>
              <H mt={34}>{t.co_addr}</H>
              <div className="grid gap-4">
                <Field id="co-street" label={t.street} value={f.street} onChange={set("street")} required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="co-zip" label={t.zip} value={f.zip} onChange={set("zip")} required />
                  <Field id="co-city" label={t.city} value={f.city} onChange={set("city")} required />
                </div>
                <Field id="co-phone" label={t.phone} value={f.phone} onChange={set("phone")} />
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
                <Field id="co-cname" label={t.inv_name} value={f.cname} onChange={set("cname")} />
                <Field id="co-nip" label={t.inv_nip} value={f.nip} onChange={set("nip")} />
              </div>
            )}
            <Check id="co-rules" checked={cRules} onChange={setCRules}>
              {t.consent_rules} <span style={{ color: C.amber }}>*</span>
            </Check>
            {hasDigital && (
              <Check id="co-digital" checked={cDigital} onChange={setCDigital}>
                {t.consent_digital} <span style={{ color: C.amber }}>*</span>
              </Check>
            )}
            <Check id="co-news" checked={cNews} onChange={setCNews}>
              {t.consent_news}
            </Check>
          </div>

          <div className="mt-8">
            <Btn full disabled={!ready || busy} onClick={submit}>
              {busy ? (lang === "pl" ? "Przetwarzanie…" : "Processing…") : `${t.pay} · ${money(total)}`}
            </Btn>
            {err && (
              <p style={{ fontFamily: F.mono, fontSize: "0.72rem", color: "#B3261E", marginTop: 10 }}>{err}</p>
            )}
          </div>

        </div>

        <aside>
          <div style={{ border: `1px solid ${C.rule}`, borderRadius: 10, padding: 18, background: C.surface }}>
            {cart.map((l) => {
              const p = PRODUCTS.find((x) => x.id === l.pid)!;
              const v = p.variants.find((x) => x.id === l.vid)!;
              return (
                <div key={l.key} className="flex gap-3 items-center py-3" style={{ borderBottom: `1px solid ${C.rule}` }}>
                  <div style={{ width: 52, flexShrink: 0 }}>
                    <Motif p={p} small />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: F.body, fontSize: "0.82rem", color: C.indigo }}>{p[lang].name}</p>
                    <p style={{ fontFamily: F.mono, fontSize: "0.68rem", color: C.ink2 }}>
                      {v[lang]} · ×{l.qty}
                    </p>
                  </div>
                  <Price v={p.price * l.qty} size="0.82rem" />
                </div>
              );
            })}
            <div className="pt-3">
              <Row label={t.subtotal} value={money(subtotal)} />
              <Row label={t.shipping} value={shipping === 0 ? t.free : money(shipping)} />
              <div className="flex justify-between items-center pt-3" style={{ borderTop: `1px solid ${C.rule}` }}>
                <span style={{ fontFamily: F.body, fontSize: "0.9rem", color: C.indigo }}>{t.total}</span>
                <Price v={total} size="1.05rem" />
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
