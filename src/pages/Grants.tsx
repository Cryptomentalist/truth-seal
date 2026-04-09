import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Landmark,
  BadgePercent,
  TrendingUp,
  FileCheck,
  ArrowRight,
  Award,
  Banknote,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import RoadmapTimeline from "@/components/grants/RoadmapTimeline";
import TaxCalculator from "@/components/grants/TaxCalculator";
import EcosystemMindMap from "@/components/grants/EcosystemMindMap";
import BrandEmploymentOffer from "@/components/grants/BrandEmploymentOffer";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";

const GrantsPage = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const grants = [
    { icon: Landmark, titlePl: "Dotacje UE & fundusze strukturalne", titleEn: "EU grants & structural funds", descPl: "PARP, NCBiR, RPO, FENG, programy ramowe Horizon — kompleksowe pozyskiwanie od audytu pomysłu po rozliczenie projektu.", descEn: "PARP, NCBiR, RPO, FENG, Horizon framework programs — comprehensive acquisition from idea audit to project settlement." },
    { icon: Banknote, titlePl: "Granty polsko-norweskie", titleEn: "Polish-Norwegian grants", descPl: "Fundusze EOG i norweskie mechanizmy finansowe. Obsługa start-upów z Norwegii i projektów transgranicznych.", descEn: "EEA funds and Norwegian financial mechanisms. Supporting startups from Norway and cross-border projects." },
    { icon: FileCheck, titlePl: "Dotacje na innowacje & B+R", titleEn: "Innovation & R&D grants", descPl: "Finansowanie prac badawczo-rozwojowych, prototypowania i wdrożeń technologicznych dla MŚP i start-upów.", descEn: "Funding for R&D work, prototyping and technology implementation for SMEs and startups." },
    { icon: Briefcase, titlePl: "Rejestracja firm & KRS", titleEn: "Company registration & KRS", descPl: "Wsparcie formalne od rejestracji podmiotu, przez KRS, po przygotowanie dokumentacji aplikacyjnej.", descEn: "Formal support from entity registration, through KRS, to application documentation preparation." },
  ];

  const taxReliefs = [
    { icon: BadgePercent, titlePl: "Ulga B+R", titleEn: "R&D tax relief", descPl: "Odliczenie do 200% kosztów kwalifikowanych działalności badawczo-rozwojowej od podstawy opodatkowania.", descEn: "Deduction of up to 200% of qualified R&D costs from the tax base." },
    { icon: ShieldCheck, titlePl: "IP Box", titleEn: "IP Box", descPl: "Preferencyjna stawka 5% CIT/PIT od dochodów z kwalifikowanych praw własności intelektualnej.", descEn: "Preferential 5% CIT/PIT rate on income from qualified intellectual property rights." },
    { icon: TrendingUp, titlePl: "Ulga na prototyp", titleEn: "Prototype relief", descPl: "Odliczenie kosztów produkcji próbnej i wprowadzenia nowego produktu na rynek — do 30% kosztów.", descEn: "Deduction of trial production costs and new product market introduction — up to 30% of costs." },
    { icon: Award, titlePl: "Ulga na innowacyjnych pracowników", titleEn: "Innovative employees relief", descPl: "Pomniejszenie zaliczek na PIT pracowników zaangażowanych w działalność B+R.", descEn: "Reduction of PIT advances for employees engaged in R&D activities." },
  ];

  const caseStudies = [
    { name: "Start-up DeepTech AI", sectorPl: "Sztuczna inteligencja", sectorEn: "Artificial Intelligence", stagePl: "MVP → Skalowanie", stageEn: "MVP → Scaling", grants: "FENG + NCBiR", amount: "2,4 mln PLN", resultPl: "Wdrożenie systemu AI w 3 krajach UE, 12 patentów, wejście VC w rundzie A.", resultEn: "AI system deployed in 3 EU countries, 12 patents, VC entry in Series A." },
    { name: "GreenBuild Technologies", sectorPl: "CleanTech / Budownictwo", sectorEn: "CleanTech / Construction", stagePl: "Koncepcja → B+R", stageEn: "Concept → R&D", grants: "PARP + Fundusze norweskie", amount: "1,8 mln PLN", resultPl: "Prototyp ekologicznego materiału budowlanego, certyfikacja CE, 2 zgłoszenia patentowe.", resultEn: "Prototype of ecological building material, CE certification, 2 patent applications." },
    { name: "MedSense Diagnostics", sectorPl: "MedTech", sectorEn: "MedTech", stagePl: "B+R → Komercjalizacja", stageEn: "R&D → Commercialization", grants: "Horizon Europe + RPO", amount: "3,1 mln PLN", resultPl: "Urządzenie diagnostyczne klasy IIa, 8 szpitali pilotażowych, ulga IP Box — 5% CIT.", resultEn: "Class IIa diagnostic device, 8 pilot hospitals, IP Box relief — 5% CIT." },
  ];

  const achievements = [
    { value: "20+", label: t("grants.yearsExp") },
    { value: "100+", label: t("grants.startupsOnMarket") },
    { value: "mln+", label: t("grants.grantsObtained") },
    { value: "360°", label: t("grants.fullService") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={t("nav.grants")} description={t("grants.subtitle")} path="/dotacje" />
      <div className="glass-surface border-b border-border/50 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Landmark className="w-6 h-6 text-accent" />
            <span>{t("nav.grants")}</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            {t("grants.backHome")}
          </Link>
        </div>
      </div>

      <div className="container max-w-5xl py-16 sm:py-24 px-4">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-sm font-mono text-accent uppercase tracking-widest">{t("grants.tag")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            {t("grants.title")} <span className="text-gradient-primary">{t("grants.titleHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("grants.subtitle")}
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {achievements.map((a, i) => (
            <div key={i} className="glass-surface rounded-xl p-5 text-center border border-accent/10">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{a.value}</div>
              <div className="text-xs text-muted-foreground">{a.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ROADMAP */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-20">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-accent inline-block" />
            {t("grants.roadmapTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mb-2 ml-5">{t("grants.roadmapDesc")}</p>
          <p className="text-xs text-accent mb-10 ml-5">{t("grants.roadmapHint")}</p>
          <RoadmapTimeline />
        </motion.div>

        {/* MIND MAP */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }} className="mb-20">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary inline-block" />
            {t("grants.mindmapTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 ml-5">{t("grants.mindmapDesc")}</p>
          <EcosystemMindMap />
        </motion.div>

        {/* BRAND EMPLOYMENT */}
        <BrandEmploymentOffer />

        {/* CASE STUDIES */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-20">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary inline-block" />
            {t("grants.caseStudiesTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 ml-5">{t("grants.caseStudiesDesc")}</p>
          <div className="grid gap-5">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className="glass-surface rounded-xl p-6 border-l-2 border-l-primary/40">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-bold text-base">{cs.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">{isEn ? cs.sectorEn : cs.sectorPl}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary">{isEn ? cs.stageEn : cs.stagePl}</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">{t("grants.programs")}</span>
                    <p className="font-medium mt-0.5">{cs.grants}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("grants.amountObtained")}</span>
                    <p className="font-bold text-accent mt-0.5">{cs.amount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("grants.result")}</span>
                    <p className="font-medium mt-0.5">{isEn ? cs.resultEn : cs.resultPl}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GRANTS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-accent inline-block" />
            {t("grants.grantsTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 ml-5">{t("grants.grantsDesc")}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {grants.map((g, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} className="glass-surface rounded-xl p-6 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <g.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{isEn ? g.titleEn : g.titlePl}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{isEn ? g.descEn : g.descPl}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TAX RELIEFS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mb-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary inline-block" />
            {t("grants.taxTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 ml-5">{t("grants.taxDesc")}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {taxReliefs.map((tr, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }} className="glass-surface rounded-xl p-6 flex gap-4 items-start border-l-2 border-l-primary/30">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <tr.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{isEn ? tr.titleEn : tr.titlePl}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{isEn ? tr.descEn : tr.descPl}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TAX CALCULATOR */}
        <TaxCalculator />

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="glass-surface rounded-2xl p-8 sm:p-10 text-center border border-accent/15">
          <Landmark className="w-10 h-10 text-accent mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("grants.ctaTitle")}</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">{t("grants.ctaDesc")}</p>
          <Link to="/#kontakt" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors">
            {t("grants.ctaButton")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GrantsPage;