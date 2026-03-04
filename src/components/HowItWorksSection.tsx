import { motion } from "framer-motion";
import { Stamp, FileCheck, Scale, ArrowRight } from "lucide-react";

const tiers = [
  {
    icon: Stamp,
    title: "Podstawowa",
    headline: "Jak data pewna u notariusza",
    description:
      "Rozproszony zapis cyfrowy tworzy niepodważalny dowód istnienia Twojego dokumentu z dokładną datą — bez pośredników, bez opłat notarialnych.",
    accent: false,
    link: null,
  },
  {
    icon: FileCheck,
    title: "Premium",
    headline: "Otrzymujesz PRE-PATENT",
    description:
      "Pełna ochrona pre-patentowa: Twój wynalazek zostaje zabezpieczony formalnym dowodem pierwszeństwa, zanim trafisz do urzędu patentowego.",
    accent: true,
    link: { label: "Dowiedz się czym jest PRE-PATENT →", href: "#pre-patent" },
  },
  {
    icon: Scale,
    title: "Premium Max",
    headline: "Otrzymujesz orzeczenie PRE-COURT",
    description:
      "Najwyższy poziom ochrony: profesjonalne orzeczenie dowodowe gotowe do wykorzystania w postępowaniu sądowym lub arbitrażowym.",
    accent: true,
    link: { label: "Dowiedz się czym jest PRE-COURT →", href: "#pre-court" },
  },
];

const HowItWorksSection = () => (
  <section className="section-padding relative overflow-hidden">
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

      <div className="grid md:grid-cols-3 gap-6">
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
              {tier.accent && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}

              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {tier.title}
              </span>
              <h3 className="text-xl font-bold mb-3">{tier.headline}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {tier.description}
              </p>

              {tier.link && (
                <a
                  href={tier.link.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
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
