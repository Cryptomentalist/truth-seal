import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Search,
  Banknote,
  Briefcase,
  FileCheck,
  Shield,
  Rocket,
  ShieldCheck,
  Landmark,
  BarChart3,
  Award,
  TrendingUp,
  Users,
  ChevronDown,
  ClipboardCheck,
  ExternalLink,
  Triangle,
  Filter,
  CheckCircle2,
  Gem,
  Handshake,
  UserCheck,
} from "lucide-react";

/* ── Maslow levels ──────────────────────────────── */

type MaslowLevel =
  | "zasoby"
  | "jakosc"
  | "zaufanie"
  | "rozwoj"
  | "samow";

const maslowMeta: Record<MaslowLevel, { label: string; color: string; bg: string }> = {
  zasoby:  { label: "Zasoby komplementarne",  color: "text-emerald-400",  bg: "bg-emerald-400/15 border-emerald-400/30" },
  jakosc:  { label: "Jakość & Minimalizm",    color: "text-sky-400",      bg: "bg-sky-400/15 border-sky-400/30" },
  zaufanie:{ label: "Zaufanie = Stabilizacja", color: "text-accent",       bg: "bg-accent/15 border-accent/30" },
  rozwoj:  { label: "Rozwój & Innowacja",      color: "text-amber-400",    bg: "bg-amber-400/15 border-amber-400/30" },
  samow:   { label: "Samowystarczalność",      color: "text-violet-400",   bg: "bg-violet-400/15 border-violet-400/30" },
};

/* ── Ecosystem link per step ────────────────────── */

interface EcoLink {
  name: string;
  url: string;
}

interface RoadmapStep {
  icon: any;
  title: string;
  desc: string;
  details: string;
  duration: string;
  maslow: MaslowLevel;
  eco?: EcoLink;
}

export const roadmapSteps: RoadmapStep[] = [
  {
    icon: Lightbulb, title: "Koncepcja", maslow: "zasoby",
    desc: "Walidacja pomysłu, identyfikacja potrzeby rynkowej i wstępna analiza wykonalności.",
    details: "Warsztat design thinking, analiza trendów rynkowych, identyfikacja grupy docelowej, wstępna mapa wartości.",
    duration: "1–2 tyg.",
    eco: { name: "AI Start-up Studio", url: "https://inventionproof.org" },
  },
  {
    icon: Search, title: "UVP — Unique Valuable Product", maslow: "jakosc",
    desc: "Wypracowanie unikalnej propozycji wartości i przewagi konkurencyjnej produktu.",
    details: "Value Proposition Canvas, analiza konkurencji, pozycjonowanie produktu, testowanie hipotez z potencjalnymi klientami.",
    duration: "2–3 tyg.",
  },
  {
    icon: BarChart3, title: "Analiza SWOT & Business Tools", maslow: "jakosc",
    desc: "Weryfikacja modelu biznesowego narzędziami strategicznymi: SWOT, Lean Canvas, Value Proposition Canvas.",
    details: "Pełna analiza SWOT, Lean Canvas, Business Model Canvas, identyfikacja ryzyk i plan mitygacji.",
    duration: "1–2 tyg.",
  },
  {
    icon: Banknote, title: "Pozyskanie finansowania na start", maslow: "zasoby",
    desc: "Granty pre-seed, dotacje na założenie firmy, finansowanie pomostowe.",
    details: "Identyfikacja dostępnych źródeł: dotacje PUP, PARP na start, pre-seed VC, crowdfunding, finansowanie pomostowe.",
    duration: "4–8 tyg.",
    eco: { name: "Dotacje UE & Granty", url: "/dotacje" },
  },
  {
    icon: Briefcase, title: "Rejestracja podmiotu", maslow: "zasoby",
    desc: "Założenie spółki, wpis do KRS, przygotowanie dokumentacji korporacyjnej.",
    details: "Wybór formy prawnej, umowa spółki, rejestracja w KRS/CEIDG, NIP, REGON, konto firmowe.",
    duration: "1–3 tyg.",
    eco: { name: "rejestruj.biz", url: "https://rejestruj.biz" },
  },
  {
    icon: FileCheck, title: "Dotacja na prace B+R", maslow: "zasoby",
    desc: "Aplikowanie o fundusze na prace badawczo-rozwojowe (NCBiR, FENG, Horizon).",
    details: "Audyt kwalifikowalności, napisanie wniosku, budżetowanie, harmonogram kamieni milowych, złożenie i monitoring.",
    duration: "8–16 tyg.",
    eco: { name: "Dotacje UE & Granty", url: "/dotacje" },
  },
  {
    icon: Shield, title: "Ochrona pre-patentowa — MindMark™", maslow: "zaufanie",
    desc: "Zabezpieczenie IP przed ujawnieniem — cyfrowy dowód istnienia wynalazku z technologią MindMark™.",
    details: "Zgłoszenie tymczasowe do UPRP, przygotowanie opisu wynalazku, NDA z partnerami, rejestr tajemnic przedsiębiorstwa. MindMark™ tworzy niepodważalny dowód pierwszeństwa.",
    duration: "2–4 tyg.",
    eco: { name: "InventionProof.org", url: "https://inventionproof.org" },
  },
  {
    icon: Rocket, title: "Stworzenie MVP", maslow: "rozwoj",
    desc: "Budowa minimalnego produktu zdolnego do walidacji rynkowej i pozyskania feedbacku.",
    details: "Prototypowanie, iteracje z użytkownikami, testy użyteczności, zbieranie danych do dalszego rozwoju.",
    duration: "8–16 tyg.",
    eco: { name: "AI Start-up Studio", url: "https://inventionproof.org" },
  },
  {
    icon: ClipboardCheck, title: "Due Diligence", maslow: "zaufanie",
    desc: "Weryfikacja technologiczna i finansowa projektu przed rundą inwestycyjną.",
    details: "Audyt techniczny kodu/produktu, analiza finansowa, ocena skalowalności, legal review, raport dla inwestorów.",
    duration: "3–6 tyg.",
  },
  {
    icon: ShieldCheck, title: "Ochrona patentowa", maslow: "zaufanie",
    desc: "Pełne zgłoszenie patentowe — krajowe i międzynarodowe (PCT, EPO).",
    details: "Redakcja zastrzeżeń patentowych, zgłoszenie do UPRP, procedura PCT dla ochrony międzynarodowej, strategia IP.",
    duration: "4–12 tyg.",
    eco: { name: "InventionProof.org", url: "https://inventionproof.org" },
  },
  {
    icon: Landmark, title: "Dotacja na wdrożenie", maslow: "rozwoj",
    desc: "Finansowanie komercjalizacji i wdrożenia technologii na rynek.",
    details: "Programy wdrożeniowe PARP, RPO, Kredyt Technologiczny, dotacje na pierwszą produkcję.",
    duration: "8–16 tyg.",
    eco: { name: "Dotacje UE & Granty", url: "/dotacje" },
  },
  {
    icon: BarChart3, title: "5P Business Tool & Implementation", maslow: "rozwoj",
    desc: "Wdrożenie strategii marketingowej 5P: Product, Price, Place, Promotion, People.",
    details: "Strategia cenowa, kanały dystrybucji, plan promocji, budowa zespołu sprzedażowego, marketing automation.",
    duration: "4–8 tyg.",
  },
  {
    icon: Leaf, title: "Audyt ESG & Compliance", maslow: "zaufanie",
    desc: "Audyt niefinansowy, strategia ESG, anty-greenwashing — realna odpowiedzialność społeczna i środowiskowa z certyfikacją.",
    details: "Raport niefinansowy, analiza śladu węglowego, strategia S-Impact, weryfikacja anty-greenwashingowa, compliance ESG dla inwestorów.",
    duration: "3–6 tyg.",
    eco: { name: "esg.legal", url: "https://esg.legal" },
  },
  {
    icon: Award, title: "Certyfikat jakości & ekosystem", maslow: "jakosc",
    desc: "Certyfikacja, dopasowanie komplementarności, wycena wartości i pasowanie na członka ekosystemu AI Venture Integrator.",
    details: "Audyt jakości, certyfikacja branżowa, analiza komplementarności z innymi członkami, wycena metodą DCF/porównawczą.",
    duration: "4–6 tyg.",
    eco: { name: "AI Venture Integrator", url: "/ekosystem" },
  },
  {
    icon: Search, title: "Dopracowanie modelu biznesowego", maslow: "rozwoj",
    desc: "Iteracja modelu po badaniach rynku — pivotowanie, optymalizacja unit economics.",
    details: "Badania rynkowe, analiza kohort, optymalizacja CAC/LTV, walidacja modelu przychodowego, stress-testy.",
    duration: "3–6 tyg.",
  },
  {
    icon: TrendingUp, title: "Business Development", maslow: "samow",
    desc: "Rozwój sprzedaży, partnerstwa strategiczne, ekspansja na nowe rynki.",
    details: "Pipeline sprzedażowy, partnerstwa B2B, ekspansja zagraniczna, programy pilotażowe z korporacjami.",
    duration: "ciągły",
    eco: { name: "BarterChain", url: "https://inventionproof.org" },
  },
  {
    icon: Rocket, title: "Dotacja na skalowanie biznesu", maslow: "samow",
    desc: "Pozyskanie finansowania na skalowanie — fundusze wzrostowe, granty na internacjonalizację.",
    details: "FENG skalowanie, Go-to-Market grants, PO IR, fundusze na ekspansję zagraniczną.",
    duration: "8–16 tyg.",
    eco: { name: "Dotacje UE & Granty", url: "/dotacje" },
  },
  {
    icon: Users, title: "Pozyskanie inwestorów", maslow: "samow",
    desc: "Równolegle na każdym etapie: pitch-deck, roadshow, negocjacje z aniołami biznesu i VC.",
    details: "Pitch-deck, data room, term sheet, negocjacje, due diligence inwestorskie, zamknięcie rundy.",
    duration: "↻ ciągły",
    eco: { name: "AI Venture Integrator", url: "/ekosystem" },
  },
];

/* ── Component ──────────────────────────────────── */

const RoadmapTimeline = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Quality & Complementarity Filter */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 glass-surface rounded-2xl p-5 sm:p-6 border-l-4 border-l-accent"
      >
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-sm sm:text-base">
            Filtr jakości i komplementarności
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
          Każdy podmiot wchodzący do ekosystemu przechodzi weryfikację. Każdy etap roadmapy to osobna oferta — razem tworzą zamknięty, samowystarczalny organizm.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-2.5 bg-accent/5 rounded-lg p-3 border border-accent/10">
            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold block">Komplementarność</span>
              <span className="text-[10px] text-muted-foreground">Czy projekt uzupełnia istniejące elementy ekosystemu?</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-accent/5 rounded-lg p-3 border border-accent/10">
            <Gem className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold block">Jakość & przydatność</span>
              <span className="text-[10px] text-muted-foreground">Minimalizm i jakość ponad ilość — filtr dobrostanu.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-primary/5 rounded-lg p-3 border border-primary/10">
            <UserCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold block">Wyjątek: Inwestor / Intrapreneur</span>
              <span className="text-[10px] text-muted-foreground">Nie musi wykazywać komplementarności — inwestuje w ekosystem.</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Maslow legend */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {Object.entries(maslowMeta).map(([key, meta]) => (
          <span
            key={key}
            className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border ${meta.bg}`}
          >
            <Triangle className={`w-2.5 h-2.5 ${meta.color}`} />
            <span className={meta.color}>{meta.label}</span>
          </span>
        ))}
      </div>

      {/* Vertical line */}
      <div className="absolute left-5 sm:left-6 top-12 bottom-0 w-px bg-border" />

      <div className="space-y-4">
        {roadmapSteps.map((step, i) => {
          const isInvestor = i === roadmapSteps.length - 1;
          const isExpanded = expandedStep === i;
          const maslow = maslowMeta[step.maslow];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.04 }}
              className="relative flex gap-4 sm:gap-5 items-start"
            >
              {/* Node */}
              <div
                className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isInvestor
                    ? "bg-primary/15 ring-2 ring-primary/30"
                    : "bg-accent/10"
                }`}
              >
                <step.icon
                  className={`w-5 h-5 ${isInvestor ? "text-primary" : "text-accent"}`}
                />
              </div>

              {/* Content */}
              <div
                className="glass-surface rounded-xl p-4 sm:p-5 flex-1 cursor-pointer hover:border-accent/20 transition-colors"
                onClick={() => setExpandedStep(isExpanded ? null : i)}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base">{step.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent hidden sm:inline">
                      {step.duration}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>

                {/* Maslow indicator + Ecosystem link */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {/* Maslow badge */}
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full border ${maslow.bg}`}
                  >
                    <Triangle className={`w-2.5 h-2.5 ${maslow.color}`} />
                    <span className={maslow.color}>{maslow.label}</span>
                  </span>

                  {/* Ecosystem project link */}
                  {step.eco && (
                    <a
                      href={step.eco.url}
                      target={step.eco.url.startsWith("http") ? "_blank" : undefined}
                      rel={step.eco.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      {step.eco.name}
                    </a>
                  )}
                </div>

                {isInvestor && (
                  <p className="text-xs text-primary font-medium mt-2">
                    ↻ Równolegle na każdym etapie ścieżki
                  </p>
                )}

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.details}
                        </p>
                        <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent sm:hidden">
                          ⏱ {step.duration}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
