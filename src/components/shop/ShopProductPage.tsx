import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { C, F, type ShopProduct } from "@/data/shopProducts";
import type { ShopLang, ShopStrings } from "@/data/shopStrings";
import { Btn, Impact, Motif, Price } from "@/components/shop/ShopUI";

interface Props {
  p: ShopProduct;
  lang: ShopLang;
  t: ShopStrings;
  onBack: () => void;
  onAdd: (variantId: string, qty: number) => void;
}

const ShopProductPage = ({ p, lang, t, onBack, onAdd }: Props) => {
  const [v, setV] = useState(p.variants[0].id);
  const [q, setQ] = useState(1);
  const [done, setDone] = useState(false);
  const variant = p.variants.find((x) => x.id === v)!;
  const copy = p[lang];
  const totalStock = p.variants.reduce((n, x) => n + x.stock, 0);
  const alwaysAvailable = !!p.digital || !!p.noship;
  const available = alwaysAvailable || totalStock > 0;
  const availLabel = !available ? t.out_of_stock : alwaysAvailable ? t.digital_avail : t.in_stock;

  // ilość nie może przekroczyć stanu wybranego wariantu
  useEffect(() => {
    setQ((cur) => Math.max(1, Math.min(cur, Math.max(1, variant.stock))));
  }, [variant.stock]);

  // dane strukturalne produktu dla wyszukiwarek
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: copy.name,
      description: copy.desc,
      sku: p.id,
      brand: { "@type": "Brand", name: "Constellation.love" },
      offers: {
        "@type": "Offer",
        price: p.price.toFixed(2),
        priceCurrency: "PLN",
        url: `https://konstelacja.org/sklep/produkt/${p.id}`,
        availability: available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    });
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, [p.id, copy.name, copy.desc, p.price, available]);

  return (
    <section className="mx-auto px-5 py-10" style={{ maxWidth: 1080 }}>
      <SEOHead
        title={copy.name}
        description={copy.desc.slice(0, 155)}
        path={`/sklep/produkt/${p.id}`}
        type="product"
      />
      <button onClick={onBack} style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.ink2, marginBottom: 24 }}>
        ← {t.back}
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <Motif p={p} />

        <div>
          <h1 style={{ fontFamily: F.display, fontSize: "1.7rem", color: C.indigo, lineHeight: 1.25, marginBottom: 12 }}>
            {copy.name}
          </h1>
          <Impact text={copy.impact} size="0.78rem" />
          <div className="mt-4 mb-3">
            <Price v={p.price} size="1.35rem" />
          </div>
          <p style={{ fontFamily: F.mono, fontSize: "0.72rem", letterSpacing: "0.05em", color: available ? C.indigo : C.ink2, marginBottom: 18 }}>
            <span style={{ color: C.ink2 }}>{t.availability}: </span>
            {availLabel}
          </p>
          <p style={{ fontFamily: F.body, fontSize: "0.95rem", color: C.ink2, lineHeight: 1.7 }}>{copy.desc}</p>

          <div className="mt-8">
            <p style={{ fontFamily: F.body, fontSize: "0.78rem", color: C.ink2, marginBottom: 10 }}>{t.variant}</p>
            <div className="flex flex-wrap gap-2">
              {p.variants.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setV(x.id)}
                  disabled={x.stock === 0}
                  aria-pressed={v === x.id}
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.82rem",
                    padding: "8px 15px",
                    borderRadius: 7,
                    border: `1px solid ${v === x.id ? C.indigo : C.rule}`,
                    background: v === x.id ? C.indigo : "transparent",
                    color: v === x.id ? C.paper : C.ink2,
                    opacity: x.stock === 0 ? 0.4 : 1,
                  }}
                >
                  {x[lang]}
                </button>
              ))}
            </div>
            {variant.stock === 0 && (
              <p style={{ fontFamily: F.body, fontSize: "0.78rem", color: C.ink2, marginTop: 10 }}>{t.sold_out_note}</p>
            )}
            {variant.stock > 0 && variant.stock <= 6 && !p.digital && !p.noship && (
              <p style={{ fontFamily: F.mono, fontSize: "0.7rem", color: C.amber, marginTop: 10 }}>
                {t.stock_low} — {variant.stock}
              </p>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center" style={{ border: `1px solid ${C.rule}`, borderRadius: 8 }}>
              <button onClick={() => setQ(Math.max(1, q - 1))} aria-label={t.qty} style={{ padding: "10px 14px", fontFamily: F.mono, color: C.ink2 }}>
                −
              </button>
              <span style={{ fontFamily: F.mono, fontSize: "0.9rem", color: C.indigo, minWidth: 24, textAlign: "center" }}>{q}</span>
              <button
                onClick={() => setQ(Math.min(variant.stock, q + 1))}
                disabled={q >= variant.stock}
                aria-label={t.qty}
                style={{ padding: "10px 14px", fontFamily: F.mono, color: C.ink2, opacity: q >= variant.stock ? 0.35 : 1, cursor: q >= variant.stock ? "not-allowed" : "pointer" }}
              >
                +
              </button>
            </div>
            <Btn
              onClick={() => {
                onAdd(v, Math.min(q, variant.stock));
                setDone(true);
                setTimeout(() => setDone(false), 1600);
              }}
              disabled={variant.stock === 0}
            >
              {done ? `✓ ${t.added}` : variant.stock === 0 ? t.out_of_stock : t.add}
            </Btn>
          </div>


          <p style={{ fontFamily: F.body, fontSize: "0.78rem", color: C.ink2, marginTop: 14 }}>
            {p.digital ? t.digital_est : t.delivery_est}
          </p>

          <div className="mt-9">
            <p style={{ fontFamily: F.display, fontSize: "1rem", color: C.indigo, marginBottom: 10 }}>{t.spec}</p>
            {copy.spec.map(([k, val]) => (
              <div key={k} className="flex justify-between py-2" style={{ borderTop: `1px solid ${C.rule}` }}>
                <span style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.ink2 }}>{k}</span>
                <span style={{ fontFamily: F.mono, fontSize: "0.82rem", color: C.indigo }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopProductPage;
