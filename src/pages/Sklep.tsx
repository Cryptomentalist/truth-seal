import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { C, CATS, F, PRODUCTS, type ShopProduct } from "@/data/shopProducts";
import { T, type ShopLang } from "@/data/shopStrings";
import { useShopCart } from "@/hooks/useShopCart";
import { Btn, Impact, Motif, Price, Row, money } from "@/components/shop/ShopUI";
import ShopProductPage from "@/components/shop/ShopProductPage";
import ShopCheckout, { type CheckoutSubmit } from "@/components/shop/ShopCheckout";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";


type View = "home" | "checkout" | "done";

interface Order {
  number: string;
  items: { pid: string; vid: string; qty: number }[];
  total: number;
  email: string;
}

const Sklep = () => {
  const { i18n } = useTranslation();
  const lang: ShopLang = i18n.language?.startsWith("en") ? "en" : "pl";
  const t = T[lang];

  const [view, setView] = useState<View>("home");
  const [active, setActive] = useState<ShopProduct | null>(null);
  const [cat, setCat] = useState<(typeof CATS)[number]>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const { cart, add, setQty, clear, subtotal, shipping, total, count, allNoShip, hasDigital } = useShopCart();

  const list = useMemo(() => (cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat)), [cat]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "pl" ? "Sklep Konstelacja" : "Konstelacja Supporter Shop",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p[lang].name,
        description: p[lang].desc,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "PLN",
          availability: p.variants.some((v) => v.stock > 0)
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  const placeOrder = async (data: CheckoutSubmit) => {
    const { data: res, error } = await supabase.functions.invoke("create-order", {
      body: {
        email: data.email,
        name: data.name,
        street: data.street,
        zip: data.zip,
        city: data.city,
        phone: data.phone,
        cname: data.cname,
        nip: data.nip,
        shippingMethod: data.shippingMethod,
        paymentMethod: data.paymentMethod,
        consentNews: data.consentNews,
        consentRules: data.consentRules,
        consentPrivacy: data.consentPrivacy,
        consentDigital: data.consentDigital,
        lang,
        items: cart.map((l) => ({ pid: l.pid, vid: l.vid, qty: l.qty })),
      },
    });

    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("create-order failed:", details);
      const code = (() => {
        try {
          return JSON.parse(details ?? "{}")?.error as string | undefined;
        } catch {
          return undefined;
        }
      })();
      const known: Record<string, string> = {
        email_suppressed: t.err_email_suppressed,
        invalid_email: t.err_invalid_email,
        invalid_address: t.err_invalid_address,
        consent_required: t.err_consent,
        consent_digital_required: t.err_consent,
      };
      throw new Error(
        (typeof code === "string" && known[code]) ||
          (lang === "pl"
            ? "Nie udało się zapisać zamówienia. Spróbuj ponownie lub napisz do nas."
            : "We could not save your order. Please try again or email us."),
      );
    }


    setOrder({
      number: res.orderNo as string,
      items: cart.map((l) => ({ pid: l.pid, vid: l.vid, qty: l.qty })),
      total,
      email: data.email,
    });
    clear();
    setView("done");
    window.scrollTo(0, 0);
  };


  return (
    <div style={{ background: C.paper, minHeight: "100vh", color: C.indigo }}>
      <SEOHead
        title={lang === "pl" ? "Sklep — kupujesz rzecz, finansujesz pracę" : "Shop — buy an object, fund the work"}
        description={t.hero_2}
        path="/sklep"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500&display=swap');`}</style>

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${C.rule}`, background: C.paper, position: "sticky", top: 0, zIndex: 30 }}>
        <div className="mx-auto px-5 flex items-center justify-between" style={{ maxWidth: 1080, height: 62 }}>
          <button
            onClick={() => {
              setView("home");
              setActive(null);
            }}
            className="flex items-center gap-2.5"
          >
            <span style={{ width: 9, height: 9, borderRadius: 99, background: C.amber, display: "inline-block" }} />
            <span style={{ fontFamily: F.display, fontSize: "1.05rem", color: C.indigo }}>Konstelacja</span>
          </button>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              style={{ fontFamily: F.body, fontSize: "0.8rem", color: C.ink2, padding: "7px 10px" }}
            >
              konstelacja.org
            </Link>
            <button
              onClick={() => {
                const next = lang === "pl" ? "en" : "pl";
                i18n.changeLanguage(next);
                document.documentElement.lang = next;
              }}
              style={{ fontFamily: F.mono, fontSize: "0.7rem", color: C.ink2, padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.rule}` }}
            >
              {lang === "pl" ? "EN" : "PL"}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.indigo, padding: "7px 13px", borderRadius: 7, border: `1px solid ${C.rule}` }}
            >
              {t.nav_cart}
              {count > 0 && <span style={{ fontFamily: F.mono, color: C.amber }}> · {count}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* HOME + KATALOG */}
      {view === "home" && !active && (
        <>
          <section className="mx-auto px-5 py-14" style={{ maxWidth: 1080 }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(1.9rem, 6vw, 3rem)", lineHeight: 1.15, maxWidth: 720 }}>
              {t.hero_1}
            </h1>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.ink2, lineHeight: 1.7, maxWidth: 620, marginTop: 18 }}>
              {t.hero_2}
            </p>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.ink2, lineHeight: 1.7, maxWidth: 620, marginTop: 14 }}>
              {t.hero_3}
            </p>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.ink2, lineHeight: 1.7, maxWidth: 620, marginTop: 14 }}>
              {t.hero_4}
            </p>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.ink2, lineHeight: 1.7, maxWidth: 620, marginTop: 14 }}>
              {t.hero_5}
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <Btn onClick={() => document.getElementById("cat")?.scrollIntoView({ behavior: "smooth" })}>{t.hero_cta}</Btn>
              <div>
                <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2 }}>{t.funded}</p>
                <p style={{ fontFamily: F.mono, fontSize: "1.15rem", color: C.amber }}>[[ ]] zł</p>
              </div>
            </div>
          </section>

          <section id="cat" className="mx-auto px-5 pb-20" style={{ maxWidth: 1080 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.8rem",
                    padding: "7px 14px",
                    borderRadius: 99,
                    border: `1px solid ${cat === c ? C.indigo : C.rule}`,
                    background: cat === c ? C.indigo : "transparent",
                    color: cat === c ? C.paper : C.ink2,
                  }}
                >
                  {t[c]}
                </button>
              ))}
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              {list.map((p) => {
                const low = p.variants.some((v) => v.stock <= 6) && p.cat !== "digital" && p.cat !== "support";
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActive(p);
                      window.scrollTo(0, 0);
                    }}
                    className="text-left"
                    style={{ border: `1px solid ${C.rule}`, borderRadius: 12, padding: 14, background: C.surface }}
                  >
                    <Motif p={p} small />
                    <div className="pt-4">
                      <div className="flex justify-between gap-4 items-start">
                        <p style={{ fontFamily: F.display, fontSize: "1.02rem", color: C.indigo, lineHeight: 1.35 }}>{p[lang].name}</p>
                        <Price v={p.price} />
                      </div>
                      <div className="mt-2">
                        <Impact text={p[lang].impact} />
                      </div>
                      {low && (
                        <p style={{ fontFamily: F.mono, fontSize: "0.66rem", color: C.ink2, marginTop: 8 }}>{t.stock_low}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* PRODUKT */}
      {view === "home" && active && (
        <ShopProductPage
          p={active}
          lang={lang}
          t={t}
          onBack={() => setActive(null)}
          onAdd={(v, q) => {
            add(active.id, v, q);
            setCartOpen(true);
          }}
        />
      )}

      {/* CHECKOUT */}
      {view === "checkout" && (
        <ShopCheckout
          lang={lang}
          t={t}
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          hasDigital={hasDigital}
          allNoShip={allNoShip}
          onBack={() => setView("home")}
          onSetQty={setQty}
          onDone={placeOrder}
        />
      )}

      {/* POTWIERDZENIE */}
      {view === "done" && order && (
        <section className="mx-auto px-5 py-16" style={{ maxWidth: 640 }}>
          <p style={{ fontFamily: F.mono, fontSize: "0.72rem", color: C.amber }}>
            ✓ {t.ok_order.toUpperCase()} {order.number}
          </p>
          <h1 style={{ fontFamily: F.display, fontSize: "2rem", margin: "12px 0 10px" }}>{t.ok_title}</h1>
          <p style={{ fontFamily: F.body, fontSize: "0.95rem", color: C.ink2, lineHeight: 1.7 }}>{t.ok_sub}</p>

          <div style={{ border: `1px solid ${C.rule}`, borderRadius: 10, padding: 18, marginTop: 26, background: C.surface }}>
            <p style={{ fontFamily: F.body, fontSize: "0.8rem", color: C.ink2, marginBottom: 12 }}>{t.ok_funded}</p>
            {order.items.map((l) => {
              const p = PRODUCTS.find((x) => x.id === l.pid)!;
              return (
                <div key={`${l.pid}-${l.vid}`} className="py-2">
                  <Impact text={p[lang].impact} size="0.75rem" />
                </div>
              );
            })}
            <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${C.rule}` }}>
              <Row label={t.total} value={money(order.total)} />
            </div>
          </div>

          <div className="mt-8">
            <Btn
              kind="ghost"
              onClick={() => {
                setOrder(null);
                setView("home");
              }}
            >
              {t.ok_back}
            </Btn>
          </div>
        </section>
      )}

      {/* KOSZYK */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(21,26,46,0.35)" }} onClick={() => setCartOpen(false)}>
          <div
            className="h-full w-full sm:max-w-md flex flex-col"
            style={{ background: C.paper, borderLeft: `1px solid ${C.rule}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5" style={{ height: 62, borderBottom: `1px solid ${C.rule}` }}>
              <span style={{ fontFamily: F.display, fontSize: "1.05rem" }}>{t.cart_title}</span>
              <button onClick={() => setCartOpen(false)} aria-label="✕" style={{ fontFamily: F.mono, fontSize: "0.85rem", color: C.ink2, padding: 6 }}>
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="py-10">
                  <p style={{ fontFamily: F.body, fontSize: "0.95rem", color: C.indigo }}>{t.cart_empty}</p>
                  <p style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.ink2, marginTop: 8 }}>{t.cart_empty_cta}</p>
                </div>
              ) : (
                cart.map((l) => {
                  const p = PRODUCTS.find((x) => x.id === l.pid)!;
                  const v = p.variants.find((x) => x.id === l.vid)!;
                  return (
                    <div key={l.key} className="flex gap-3 py-4" style={{ borderBottom: `1px solid ${C.rule}` }}>
                      <div style={{ width: 64, flexShrink: 0 }}>
                        <Motif p={p} small />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.indigo }}>{p[lang].name}</p>
                        <p style={{ fontFamily: F.mono, fontSize: "0.68rem", color: C.ink2, marginTop: 2 }}>{v[lang]}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center" style={{ border: `1px solid ${C.rule}`, borderRadius: 7 }}>
                            <button onClick={() => setQty(l.key, l.qty - 1)} aria-label={t.remove} style={{ padding: "3px 9px", fontFamily: F.mono, color: C.ink2 }}>
                              −
                            </button>
                            <span style={{ fontFamily: F.mono, fontSize: "0.8rem", minWidth: 20, textAlign: "center" }}>{l.qty}</span>
                            <button onClick={() => setQty(l.key, l.qty + 1)} aria-label={t.qty} style={{ padding: "3px 9px", fontFamily: F.mono, color: C.ink2 }}>
                              +
                            </button>
                          </div>
                          <Price v={p.price * l.qty} size="0.85rem" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-5 py-4" style={{ borderTop: `1px solid ${C.rule}` }}>
                <Row label={t.subtotal} value={money(subtotal)} />
                <Row label={t.shipping} value={shipping === 0 ? t.free : money(shipping)} />
                <div className="flex justify-between items-center py-2">
                  <span style={{ fontFamily: F.body, fontSize: "0.9rem" }}>{t.total}</span>
                  <Price v={total} size="1.05rem" />
                </div>
                <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, marginBottom: 12 }}>{t.vat_note}</p>
                <Btn
                  full
                  onClick={() => {
                    setCartOpen(false);
                    setActive(null);
                    setView("checkout");
                    window.scrollTo(0, 0);
                  }}
                >
                  {t.checkout}
                </Btn>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stopka */}
      <footer style={{ borderTop: `1px solid ${C.rule}`, marginTop: 40 }}>
        <div className="mx-auto px-5 py-12 grid gap-10 sm:grid-cols-3" style={{ maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, marginBottom: 10 }}>{t.seller}</p>
            <p style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.indigo, lineHeight: 1.7 }}>
              Konstelacja Sp. z o.o.
              <br />
              ul. Morska 34/17
              <br />
              84-240 Reda, Polska
            </p>
            <p style={{ fontFamily: F.mono, fontSize: "0.68rem", color: C.ink2, marginTop: 10 }}>
              KRS [[ ]] · NIP [[ ]] · REGON [[ ]]
            </p>

            <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, marginTop: 20, marginBottom: 10 }}>{t.foundation}</p>
            <p style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.indigo, lineHeight: 1.7 }}>
              Fundacja Konstelacja.org
              <br />
              Ul. Morska 30B/5
              <br />
              84-240 Reda
            </p>
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, marginBottom: 10 }}>Info</p>
            {[t.legal, t.privacy, t.returns, t.delivery, t.contact].map((x) => (
              <p key={x} style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.indigo, lineHeight: 1.9 }}>
                {x} <span style={{ fontFamily: F.mono, fontSize: "0.66rem", color: C.ink2 }}>[[ ]]</span>
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: F.body, fontSize: "0.72rem", color: C.ink2, marginBottom: 10 }}>{t.integrate}</p>
            <p style={{ fontFamily: F.mono, fontSize: "0.7rem", color: C.ink2, lineHeight: 2 }}>
              Stripe Checkout — BLIK, P24, karty
              <br />
              Fakturownia / wFirma — faktury
              <br />
              Printful / Printify — druk i wysyłka
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sklep;
