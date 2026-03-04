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
} from "lucide-react";

export const roadmapSteps = [
  { icon: Lightbulb, title: "Koncepcja", desc: "Walidacja pomysłu, identyfikacja potrzeby rynkowej i wstępna analiza wykonalności.", details: "Warsztat design thinking, analiza trendów rynkowych, identyfikacja grupy docelowej, wstępna mapa wartości.", duration: "1–2 tyg." },
  { icon: Search, title: "UVP — Unique Valuable Product", desc: "Wypracowanie unikalnej propozycji wartości i przewagi konkurencyjnej produktu.", details: "Value Proposition Canvas, analiza konkurencji, pozycjonowanie produktu, testowanie hipotez z potencjalnymi klientami.", duration: "2–3 tyg." },
  { icon: BarChart3, title: "Analiza SWOT & Business Tools", desc: "Weryfikacja modelu biznesowego narzędziami strategicznymi: SWOT, Lean Canvas, Value Proposition Canvas.", details: "Pełna analiza SWOT, Lean Canvas, Business Model Canvas, identyfikacja ryzyk i plan mitygacji.", duration: "1–2 tyg." },
  { icon: Banknote, title: "Pozyskanie finansowania na start", desc: "Granty pre-seed, dotacje na założenie firmy, finansowanie pomostowe.", details: "Identyfikacja dostępnych źródeł: dotacje PUP, PARP na start, pre-seed VC, crowdfunding, finansowanie pomostowe.", duration: "4–8 tyg." },
  { icon: Briefcase, title: "Rejestracja podmiotu", desc: "Założenie spółki, wpis do KRS, przygotowanie dokumentacji korporacyjnej.", details: "Wybór formy prawnej, umowa spółki, rejestracja w KRS/CEIDG, NIP, REGON, konto firmowe.", duration: "1–3 tyg." },
  { icon: FileCheck, title: "Dotacja na prace B+R", desc: "Aplikowanie o fundusze na prace badawczo-rozwojowe (NCBiR, FENG, Horizon).", details: "Audyt kwalifikowalności, napisanie wniosku, budżetowanie, harmonogram kamieni milowych, złożenie i monitoring.", duration: "8–16 tyg." },
  { icon: Shield, title: "Ochrona pre-patentowa", desc: "Zabezpieczenie IP przed ujawnieniem — zgłoszenie tymczasowe, NDA, dokumentacja wynalazku.", details: "Zgłoszenie tymczasowe do UPRP, przygotowanie opisu wynalazku, NDA z partnerami, rejestr tajemnic przedsiębiorstwa.", duration: "2–4 tyg." },
  { icon: Rocket, title: "Stworzenie MVP", desc: "Budowa minimalnego produktu zdolnego do walidacji rynkowej i pozyskania feedbacku.", details: "Prototypowanie, iteracje z użytkownikami, testy użyteczności, zbieranie danych do dalszego rozwoju.", duration: "8–16 tyg." },
  { icon: ClipboardCheck, title: "Due Diligence", desc: "Weryfikacja technologiczna i finansowa projektu przed rundą inwestycyjną.", details: "Audyt techniczny kodu/produktu, analiza finansowa, ocena skalowalności, legal review, raport dla inwestorów.", duration: "3–6 tyg." },
  { icon: ShieldCheck, title: "Ochrona patentowa", desc: "Pełne zgłoszenie patentowe — krajowe i międzynarodowe (PCT, EPO).", details: "Redakcja zastrzeżeń patentowych, zgłoszenie do UPRP, procedura PCT dla ochrony międzynarodowej, strategia IP.", duration: "4–12 tyg." },
  { icon: Landmark, title: "Dotacja na wdrożenie", desc: "Finansowanie komercjalizacji i wdrożenia technologii na rynek.", details: "Programy wdrożeniowe PARP, RPO, Kredyt Technologiczny, dotacje na pierwszą produkcję.", duration: "8–16 tyg." },
  { icon: BarChart3, title: "5P Business Tool & Implementation", desc: "Wdrożenie strategii marketingowej 5P: Product, Price, Place, Promotion, People.", details: "Strategia cenowa, kanały dystrybucji, plan promocji, budowa zespołu sprzedażowego, marketing automation.", duration: "4–8 tyg." },
  { icon: Award, title: "Certyfikat jakości & ekosystem", desc: "Certyfikacja, dopasowanie komplementarności, wycena wartości i pasowanie na członka ekosystemu AI Venture Integrator.", details: "Audyt jakości, certyfikacja branżowa, analiza komplementarności z innymi członkami, wycena metodą DCF/porównawczą.", duration: "4–6 tyg." },
  { icon: Search, title: "Dopracowanie modelu biznesowego", desc: "Iteracja modelu po badaniach rynku — pivotowanie, optymalizacja unit economics.", details: "Badania rynkowe, analiza kohort, optymalizacja CAC/LTV, walidacja modelu przychodowego, stress-testy.", duration: "3–6 tyg." },
  { icon: TrendingUp, title: "Business Development", desc: "Rozwój sprzedaży, partnerstwa strategiczne, ekspansja na nowe rynki.", details: "Pipeline sprzedażowy, partnerstwa B2B, ekspansja zagraniczna, programy pilotażowe z korporacjami.", duration: "ciągły" },
  { icon: Rocket, title: "Dotacja na skalowanie biznesu", desc: "Pozyskanie finansowania na skalowanie — fundusze wzrostowe, granty na internacjonalizację.", details: "FENG skalowanie, Go-to-Market grants, PO IR, fundusze na ekspansję zagraniczną.", duration: "8–16 tyg." },
  { icon: Users, title: "Pozyskanie inwestorów", desc: "Równolegle na każdym etapie: pitch-deck, roadshow, negocjacje z aniołami biznesu i VC.", details: "Pitch-deck, data room, term sheet, negocjacje, due diligence inwestorskie, zamknięcie rundy.", duration: "↻ ciągły" },
];

const RoadmapTimeline = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-4">
        {roadmapSteps.map((step, i) => {
          const isInvestor = i === roadmapSteps.length - 1;
          const isExpanded = expandedStep === i;

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
                  <div className="flex items-center gap-2">
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
