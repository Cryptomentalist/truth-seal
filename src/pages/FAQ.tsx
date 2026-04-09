import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  const categories = [
    {
      titleKey: "faq.cat1",
      questions: [
        { qKey: "faq.cat1q1", aKey: "faq.cat1a1" },
        { qKey: "faq.cat1q2", aKey: "faq.cat1a2" },
        { qKey: "faq.cat1q3", aKey: "faq.cat1a3" },
        { qKey: "faq.cat1q4", aKey: "faq.cat1a4" },
      ],
    },
    {
      titleKey: "faq.cat2",
      questions: [
        { qKey: "faq.cat2q1", aKey: "faq.cat2a1" },
        { qKey: "faq.cat2q2", aKey: "faq.cat2a2" },
        { qKey: "faq.cat2q3", aKey: "faq.cat2a3" },
        { qKey: "faq.cat2q4", aKey: "faq.cat2a4" },
      ],
    },
    {
      titleKey: "faq.cat3",
      questions: [
        { qKey: "faq.cat3q1", aKey: "faq.cat3a1" },
        { qKey: "faq.cat3q2", aKey: "faq.cat3a2" },
        { qKey: "faq.cat3q3", aKey: "faq.cat3a3" },
      ],
    },
    {
      titleKey: "faq.cat4",
      questions: [
        { qKey: "faq.cat4q1", aKey: "faq.cat4a1" },
        { qKey: "faq.cat4q2", aKey: "faq.cat4a2" },
        { qKey: "faq.cat4q3", aKey: "faq.cat4a3" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="FAQ" description={t("faq.subtitle")} path="/faq" />
      <div className="glass-surface border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Shield className="w-6 h-6 text-primary" />
            <span>
              Inventor<span className="text-primary">Proof</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("faq.backHome")}
          </Link>
        </div>
      </div>

      <div className="container max-w-3xl py-16 sm:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-surface rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-muted-foreground">{t("faq.tag")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t("faq.title")} <span className="text-gradient-primary">{t("faq.titleHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        {categories.map((cat, ci) => (
          <motion.div
            key={ci}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
            className="mb-10"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-accent inline-block" />
              {t(cat.titleKey)}
            </h2>
            <Accordion type="multiple" className="space-y-2">
              {cat.questions.map((faq, fi) => (
                <AccordionItem
                  key={fi}
                  value={`${ci}-${fi}`}
                  className="glass-surface rounded-xl border-none px-5"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-left hover:no-underline py-4">
                    {t(faq.qKey)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {t(faq.aKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-surface rounded-2xl p-8 text-center mt-14 border border-accent/15"
        >
          <h3 className="text-xl font-bold mb-2">{t("faq.noAnswer")}</h3>
          <p className="text-sm text-muted-foreground mb-5">
            {t("faq.noAnswerDesc")}
          </p>
          <Link
            to="/#kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm"
          >
            {t("faq.contactUs")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;