import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";
import { SHOP_PRODUCTS, SHOP_CATEGORIES, type ShopCategory } from "@/data/shopProducts";
import { useShopCart } from "@/hooks/useShopCart";

const formatPrice = (v: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", minimumFractionDigits: 0 }).format(v);

const Sklep = () => {
  const { t, i18n } = useTranslation();
  const isPl = !i18n.language?.startsWith("en");
  const [filter, setFilter] = useState<ShopCategory | "all">("all");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");
  const { items, add, setQty, remove, total, count } = useShopCart();

  const products = useMemo(() => {
    let list = SHOP_PRODUCTS.filter((p) => filter === "all" || p.category === filter);
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isPl ? "Sklep Charytatywny Konstelacja" : "Konstelacja Supporter Shop",
    itemListElement: SHOP_PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: isPl ? p.namePl : p.nameEn,
        description: isPl ? p.descPl : p.descEn,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "PLN",
          availability:
            p.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t("sklep.seoTitle")}
        description={t("sklep.seoDesc")}
        path="/sklep"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TopBanner />
      <Navbar />

      <main className="pt-32 sm:pt-36 pb-20 px-4">
        <div className="container max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> {t("sklep.back")}
          </Link>

          {/* Hero — misja w dwóch zdaniach */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              {t("sklep.kicker")}
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 break-words">
              {t("sklep.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              {t("sklep.lead")}
            </p>
          </motion.header>

          {/* Filtry + sortowanie + koszyk */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-y border-border/50 py-4">
            {SHOP_CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors whitespace-normal ${
                  filter === c.key
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {isPl ? c.pl : c.en}
              </button>
            ))}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="ml-auto text-xs bg-transparent border border-border/60 rounded-full px-3 py-1.5"
              aria-label={t("sklep.sort")}
            >
              <option value="default">{t("sklep.sortNewest")}</option>
              <option value="asc">{t("sklep.sortAsc")}</option>
              <option value="desc">{t("sklep.sortDesc")}</option>
            </select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="hero" size="sm" className="whitespace-normal">
                  <ShoppingBag className="w-4 h-4 mr-1.5" />
                  {t("sklep.cart")} ({count})
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{t("sklep.cart")}</SheetTitle>
                </SheetHeader>
                {items.length === 0 ? (
                  <div className="py-10 text-sm text-muted-foreground">
                    <p className="mb-4">{t("sklep.cartEmpty")}</p>
                    <p className="font-mono text-xs text-accent">{t("sklep.cartEmptyHint")}</p>
                  </div>
                ) : (
                  <div className="py-6 space-y-5">
                    {items.map((line) => {
                      const p = SHOP_PRODUCTS.find((x) => x.slug === line.slug)!;
                      return (
                        <div key={line.id} className="flex gap-3 border-b border-border/40 pb-4">
                          <div className="text-2xl">{p.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium break-words">
                              {isPl ? p.namePl : p.nameEn}
                              {line.variant ? ` · ${line.variant}` : ""}
                            </p>
                            <p className="font-mono text-[11px] text-accent mt-1 break-words">
                              {isPl ? p.impactPl : p.impactEn}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => setQty(line.id, line.qty - 1)}
                                aria-label={t("sklep.decrease")}
                                className="p-1 border border-border/60 rounded"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs w-6 text-center">{line.qty}</span>
                              <button
                                onClick={() => setQty(line.id, line.qty + 1)}
                                aria-label={t("sklep.increase")}
                                className="p-1 border border-border/60 rounded"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => remove(line.id)}
                                aria-label={t("sklep.remove")}
                                className="p-1 ml-2 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <span className="ml-auto font-mono text-sm">
                                {formatPrice(p.price * line.qty)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">{t("sklep.total")}</span>
                      <span className="font-mono text-lg font-bold">{formatPrice(total)}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{t("sklep.vatNote")}</p>
                    <Button variant="hero" className="w-full whitespace-normal" disabled>
                      {t("sklep.checkoutSoon")}
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>

          {/* Katalog — max 2 kolumny */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass-surface rounded-lg p-6 flex flex-col"
              >
                <div className="text-5xl mb-4" aria-hidden="true">
                  {p.emoji}
                </div>
                <h2 className="text-lg font-bold mb-2 break-words">{isPl ? p.namePl : p.nameEn}</h2>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {isPl ? p.descPl : p.descEn}
                </p>
                <p className="font-mono text-xs text-accent mb-4 break-words">
                  {isPl ? p.impactPl : p.impactEn}
                </p>

                <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                  {(isPl ? p.specPl : p.specEn).map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>

                {p.variants && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.variants.map((v) => (
                      <span
                        key={v}
                        className="text-[11px] font-mono px-2 py-1 border border-border/60 rounded"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                )}

                {p.fulfilment === "pod" && (
                  <p className="text-[11px] text-muted-foreground mb-3 flex gap-1.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
                    {t("sklep.podNote")}
                  </p>
                )}
                {p.fulfilment === "digital" && (
                  <p className="text-[11px] text-muted-foreground mb-3 flex gap-1.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
                    {t("sklep.digitalNote")}
                  </p>
                )}
                {typeof p.stock === "number" && p.stock <= 15 && p.stock > 0 && (
                  <p className="text-[11px] font-mono text-accent mb-3">
                    {t("sklep.lowStock", { n: p.stock })}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border/40">
                  <span className="font-mono text-xl font-bold">{formatPrice(p.price)}</span>
                  <Button
                    variant="hero"
                    size="sm"
                    className="whitespace-normal"
                    disabled={p.stock === 0}
                    onClick={() => add(p.slug, p.variants?.[0])}
                  >
                    {p.stock === 0 ? t("sklep.outOfStock") : t("sklep.addToCart")}
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Warstwa compliance */}
          <section className="mt-16 glass-surface rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{t("sklep.legalTitle")}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t("sklep.legalLead")}</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["legalRules", "legalPrivacy", "legalShipping", "legalReturns", "legalOmnibus", "legalGpsr"].map(
                (k) => (
                  <li key={k} className="flex gap-2">
                    <span className="text-accent">·</span>
                    <span>{t(`sklep.${k}`)}</span>
                  </li>
                ),
              )}
            </ul>
            <div className="mt-6 pt-4 border-t border-border/40 font-mono text-xs text-muted-foreground space-y-1">
              <p>Konstelacja Sp. z o.o. · ul. Morska 34/17, 84-240 Reda, Polska</p>
              <p>KRS [[ ]] · NIP [[ ]] · REGON [[ ]] · e-mail [[ ]] · tel [[ ]]</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sklep;
