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

/* ── Data ────────────────────────────────────────────── */

const grants = [
  { icon: Landmark, title: "Dotacje UE & fundusze strukturalne", desc: "PARP, NCBiR, RPO, FENG, programy ramowe Horizon — kompleksowe pozyskiwanie od audytu pomysłu po rozliczenie projektu." },
  { icon: Banknote, title: "Granty polsko-norweskie", desc: "Fundusze EOG i norweskie mechanizmy finansowe. Obsługa start-upów z Norwegii i projektów transgranicznych." },
  { icon: FileCheck, title: "Dotacje na innowacje & B+R", desc: "Finansowanie prac badawczo-rozwojowych, prototypowania i wdrożeń technologicznych dla MŚP i start-upów." },
  { icon: Briefcase, title: "Rejestracja firm & KRS", desc: "Wsparcie formalne od rejestracji podmiotu, przez KRS, po przygotowanie dokumentacji aplikacyjnej." },
];

const taxReliefs = [
  { icon: BadgePercent, title: "Ulga B+R", desc: "Odliczenie do 200% kosztów kwalifikowanych działalności badawczo-rozwojowej od podstawy opodatkowania." },
  { icon: ShieldCheck, title: "IP Box", desc: "Preferencyjna stawka 5% CIT/PIT od dochodów z kwalifikowanych praw własności intelektualnej." },
  { icon: TrendingUp, title: "Ulga na prototyp", desc: "Odliczenie kosztów produkcji próbnej i wprowadzenia nowego produktu na rynek — do 30% kosztów." },
  { icon: Award, title: "Ulga na innowacyjnych pracowników", desc: "Pomniejszenie zaliczek na PIT pracowników zaangażowanych w działalność B+R." },
];

const caseStudies = [
  { name: "Start-up DeepTech AI", sector: "Sztuczna inteligencja", stage: "MVP → Skalowanie", grants: "FENG + NCBiR", amount: "2,4 mln PLN", result: "Wdrożenie systemu AI w 3 krajach UE, 12 patentów, wejście VC w rundzie A." },
  { name: "GreenBuild Technologies", sector: "CleanTech / Budownictwo", stage: "Koncepcja → B+R", grants: "PARP + Fundusze norweskie", amount: "1,8 mln PLN", result: "Prototyp ekologicznego materiału budowlanego, certyfikacja CE, 2 zgłoszenia patentowe." },
  { name: "MedSense Diagnostics", sector: "MedTech", stage: "B+R → Komercjalizacja", grants: "Horizon Europe + RPO", amount: "3,1 mln PLN", result: "Urządzenie diagnostyczne klasy IIa, 8 szpitali pilotażowych, ulga IP Box — 5% CIT." },
];

const achievements = [
  { value: "20+", label: "lat doświadczenia" },
  { value: "100+", label: "startupów na rynku" },
  { value: "mln+", label: "PLN pozyskanych dotacji" },
  { value: "360°", label: "kompleksowa obsługa" },
];

/* ── Page Component ──────────────────────────────────── */

const GrantsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-surface border-b border-border/50 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Landmark className="w-6 h-6 text-accent" />
            <span>Dotacje & <span className="text-accent">Ulgi</span></span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Strona główna
          </Link>
        </div>
      </div>

      <div className="container max-w-5xl py-16 sm:py-24 px-4">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-sm font-mono text-accent uppercase tracking-widest">Strategia rozwoju</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Od koncepcji po <span className="text-gradient-primary">skalowanie biznesu</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Kompleksowa ścieżka rozwoju innowacyjnej firmy — od pomysłu, przez dotacje i ochronę IP, po mierzalne wskaźniki rezultatu. Na każdym etapie pozyskujemy alternatywnie inwestorów.
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

        {/* ── ROADMAP ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-20">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-accent inline-block" />
            Ścieżka rozwoju startupu
          </h2>
          <p className="text-sm text-muted-foreground mb-2 ml-5">
            Sprawdzony proces od zera do skalowalnego biznesu — z dotacjami, ochroną IP i inwestorami na każdym etapie.
          </p>
          <p className="text-xs text-accent mb-10 ml-5">
            ▸ Kliknij w dowolny etap, aby zobaczyć szczegóły i szacunkowy czas realizacji.
          </p>

          <RoadmapTimeline />
        </motion.div>

        {/* ── CASE STUDIES ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-20">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary inline-block" />
            Case studies
          </h2>
          <p className="text-sm text-muted-foreground mb-8 ml-5">
            Reprezentatywne przykłady firm, którym pozyskaliśmy finansowanie i przeprowadziliśmy przez ścieżkę rozwoju.
          </p>

          <div className="grid gap-5">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className="glass-surface rounded-xl p-6 border-l-2 border-l-primary/40">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-bold text-base">{cs.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">{cs.sector}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary">{cs.stage}</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Programy:</span>
                    <p className="font-medium mt-0.5">{cs.grants}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pozyskana kwota:</span>
                    <p className="font-bold text-accent mt-0.5">{cs.amount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rezultat:</span>
                    <p className="font-medium mt-0.5">{cs.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── GRANTS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-accent inline-block" />
            Pozyskiwanie dotacji & grantów
          </h2>
          <p className="text-sm text-muted-foreground mb-8 ml-5">
            Od audytu pomysłu, przez napisanie wniosku, po rozliczenie projektu — obsługujemy cały proces.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {grants.map((g, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} className="glass-surface rounded-xl p-6 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <g.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{g.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TAX RELIEFS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mb-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary inline-block" />
            Ulgi podatkowe dla innowatorów
          </h2>
          <p className="text-sm text-muted-foreground mb-8 ml-5">
            Pomagamy firmom legalnie obniżyć podatki dzięki ulgom dedykowanym innowacyjnym przedsiębiorstwom.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {taxReliefs.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }} className="glass-surface rounded-xl p-6 flex gap-4 items-start border-l-2 border-l-primary/30">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <t.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{t.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TAX CALCULATOR ── */}
        <TaxCalculator />

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="glass-surface rounded-2xl p-8 sm:p-10 text-center border border-accent/15">
          <Landmark className="w-10 h-10 text-accent mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold mb-3">Sprawdź, na jakie dofinansowanie możesz liczyć</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            Bezpłatna wstępna analiza kwalifikowalności Twojego projektu do dotacji i ulg podatkowych. Skontaktuj się z nami.
          </p>
          <Link to="/#kontakt" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors">
            Umów konsultację
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GrantsPage;
