import { motion } from "framer-motion";
import { Stamp, FileCheck, Scale, Users, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    icon: Stamp,
    title: "Podstawowa",
    headline: "Jak data pewna u notariusza",
    price: "0 zł",
    priceNote: "bezpłatnie",
    description:
      "Usługa MindMark™ rejestruje niepodważalny dowód istnienia Twojego dokumentu z dokładną datą na blockchainie — bez pośredników, bez opłat notarialnych.",
    features: [
      "Cyfrowy odcisk palca (SHA-256) na blockchainie",
      "Certyfikat z datą pewną",
      "Nieograniczona trwałość zapisu",
    ],
    accent: false,
    popular: false,
    link: null,
  },
  {
    icon: FileCheck,
    title: "Premium",
    headline: "Otrzymujesz PRE-PATENT",
    price: "497 zł",
    priceNote: "za dokument",
    description:
      "Pełna ochrona pre-patentowa: Twój wynalazek zostaje zabezpieczony formalnym dowodem pierwszeństwa, zanim trafisz do urzędu patentowego.",
    features: [
      "Wszystko z pakietu Podstawowa",
      "Formalny dowód pierwszeństwa",
      "Certyfikat PRE-PATENT",
      "Wsparcie przy zgłoszeniu patentowym",
    ],
    accent: true,
    popular: true,
    link: { label: "Czym jest PRE-PATENT? →", href: "#pre-patent" },
  },
  {
    icon: Scale,
    title: "Premium Max",
    headline: "Orzeczenie PRE-COURT",
    price: "1 497 zł",
    priceNote: "za dokument",
    description:
      "Najwyższy poziom ochrony: profesjonalne orzeczenie dowodowe gotowe do wykorzystania w postępowaniu sądowym lub arbitrażowym.",
    features: [
      "Wszystko z pakietu Premium",
      "Orzeczenie dowodowe PRE-COURT",
      "Gotowe do postępowania sądowego",
      "Dedykowane wsparcie prawne",
    ],
    accent: true,
    popular: false,
    link: { label: "Czym jest PRE-COURT? →", href: "#pre-court" },
  },
  {
    icon: Users,
    title: "MindMark HR",
    headline: "Ochrona pomysłów w zespole",
    price: "Wycena indywidualna",
    priceNote: "dla firm",
    description:
      "Oprogramowanie do zabezpieczania nawet drobnych pomysłów wewnątrz organizacji. Idealne dla agencji reklamowych, PR i kreatywnych zespołów — nikt nie przypisze sobie cudzego wkładu.",
    features: [
      "Hashowanie SHA-256 z podpisem cyfrowym autora",
      "Algorytm motywacyjny — docenia każdy wkład",
      "Raporty wkładu intelektualnego w projekt",
      "Od drobnych idei po decyzje strategiczne",
      "Bez blockchain — lekkie, wewnętrzne rozwiązanie",
    ],
    accent: false,
    popular: false,
    link: null,
  },
];

const HowItWorksSection = () => (
  <section id="cennik" className="section-padding relative overflow-hidden">
    <div className="container max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Jak to <span className="text-gradient-primary">działa?</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Trzy poziomy ochrony — od cyfrowej daty pewnej po pełne orzeczenie dowodowe.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, i) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`glass-surface rounded-xl p-8 flex flex-col relative ${
                tier.accent ? "border-primary/40" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Najpopularniejszy
                </div>
              )}

              {tier.accent && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}

              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {tier.title}
              </span>
              <h3 className="text-xl font-bold mb-1">{tier.headline}</h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground ml-2">{tier.priceNote}</span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="#kontakt">
                <Button
                  variant={tier.popular ? "hero" : "heroOutline"}
                  className="w-full text-sm"
                >
                  {tier.price === "0 zł" ? "Zacznij za darmo" : "Skontaktuj się"}
                </Button>
              </a>

              {tier.link && (
                <a
                  href={tier.link.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  {tier.link.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
