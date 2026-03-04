import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRightLeft,
  Calculator,
  ShieldCheck,
  Leaf,
  Bot,
  Building2,
  Landmark,
  Layers,
  ChevronRight,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  TrendingUp,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ── Module data ─────────────────────────────────── */

const modules = [
  {
    icon: ArrowRightLeft,
    tag: "Rozrachunki / Handel",
    title: "BarterChain",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    ringColor: "ring-emerald-400/30",
    desc: "Kompensaty bezgotówkowe między podmiotami ekosystemu — nowy typ transakcji w ERP XL.",
    features: [
      'Typ transakcji "barter" z automatycznym bilansowaniem wartości',
      "Dokumenty WZ/PZ generowane automatycznie",
      "Rozliczenie VAT zgodne z polskim prawem podatkowym",
      "Wielostronne kompensaty między N podmiotami",
      "Dashboard salda barterowego per kontrahent",
    ],
    value: "Eliminacja kosztów transakcyjnych i zależności od instytucji finansowych wewnątrz ekosystemu.",
    priority: 1,
    phase: "Faza 1",
  },
  {
    icon: Calculator,
    tag: "Finanse & Księgowość",
    title: "Kalkulator ulg B+R / IP Box",
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20",
    ringColor: "ring-sky-400/30",
    desc: "Automatyczne tagowanie kosztów kwalifikowanych i symulacja oszczędności podatkowych.",
    features: [
      "Auto-tagowanie kosztów kwalifikowanych B+R na dokumentach FK",
      "Generowanie załączników do deklaracji CIT",
      "Symulacja oszczędności IP Box w czasie rzeczywistym",
      "Integracja z modułem Projekty — koszty per projekt B+R",
      "Raport roczny ulgi B+R gotowy do audytu",
    ],
    value: "Realne oszczędności podatkowe dla firm innowacyjnych — nawet 25–30% kosztów B+R z powrotem.",
    priority: 1,
    phase: "Faza 1",
  },
  {
    icon: ShieldCheck,
    tag: "Projekty / R&D",
    title: "MindMark™ / InventionProof",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    ringColor: "ring-amber-400/30",
    desc: "Rejestr własności intelektualnej z cyfrowym dowodem pierwszeństwa — zintegrowany z projektami B+R.",
    features: [
      "Cyfrowy dowód pierwszeństwa (timestamp blockchain) per projekt",
      "Powiązanie z kamieniami milowymi i kosztami kwalifikowanymi",
      "Rejestr tajemnic przedsiębiorstwa i NDA",
      "Eksport dokumentacji IP do wniosków patentowych",
      "Historia zmian i wersjonowanie dokumentacji technicznej",
    ],
    value: "Ochrona IP od pierwszego dnia — bez czekania na patent. Niepodważalny dowód autorstwa.",
    priority: 2,
    phase: "Faza 2",
  },
  {
    icon: Leaf,
    tag: "Raportowanie / BI",
    title: "ESG Compliance",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
    ringColor: "ring-green-400/30",
    desc: "Raportowanie niefinansowe CSRD — automatyczne zbieranie danych z procesów ERP.",
    features: [
      "Automatyczny ślad węglowy z danych magazynowych i logistycznych",
      "Raport niefinansowy zgodny z CSRD / ESRS",
      "Wskaźniki S-Impact i governance",
      "Weryfikacja anty-greenwashingowa",
      "Dashboard ESG z benchmarkiem branżowym",
    ],
    value: "Obowiązkowe od 2026 — gotowy moduł zamiast kosztownego wdrożenia od zera.",
    priority: 2,
    phase: "Faza 2",
  },
  {
    icon: Bot,
    tag: "Warstwa AI",
    title: "AIagent.gratis — AI Orchestrator",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
    ringColor: "ring-violet-400/30",
    desc: "Agenci AI jako orkiestratorzy procesów ERP — automatyzacja, predykcja, inteligentny routing.",
    features: [
      "Automatyzacja zamówień na bazie predykcji popytu",
      "Inteligentny routing dokumentów i workflow approval",
      "Predykcja stanów magazynowych i alertowanie",
      "Asystent AI dla użytkowników ERP (natural language queries)",
      "Marketplace agentów — rozszerzalność przez społeczność",
    ],
    value: "Przyszłościowy moduł wyróżniający ERP XL na tle konkurencji — SAP i Oracle jeszcze tego nie mają.",
    priority: 3,
    phase: "Faza 3",
  },
];

const roadmapPhases = [
  {
    phase: "Faza 1",
    title: "Quick Wins",
    duration: "Q2–Q3 2026",
    icon: Zap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    modules: ["BarterChain", "Kalkulator B+R / IP Box"],
    reason: "Najszybszy time-to-market, najłatwiejsza integracja z istniejącymi modułami ERP XL.",
  },
  {
    phase: "Faza 2",
    title: "Compliance & IP",
    duration: "Q4 2026 – Q1 2027",
    icon: Target,
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    modules: ["MindMark™ / InventionProof", "ESG Compliance"],
    reason: "Presja regulacyjna CSRD 2026 + rosnące zapotrzebowanie na ochronę IP w sektorze innowacji.",
  },
  {
    phase: "Faza 3",
    title: "AI-First ERP",
    duration: "Q2–Q4 2027",
    icon: TrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
    modules: ["AIagent.gratis — AI Orchestrator"],
    reason: "Pozycjonowanie ERP XL jako pierwszego polskiego ERP z wbudowaną warstwą agentów AI.",
  },
];

/* ── Page Component ──────────────────────────────── */

const PlatformaERP = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/50">
        <div className="container flex items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Powrót</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <span className="font-bold text-sm sm:text-base">
            Platforma <span className="text-primary">ERP AI</span>
          </span>
          <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            DOKUMENT POUFNY
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 md:px-8">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-mono text-primary">COMARCH ERP XL</span>
              </div>
              <span className="text-muted-foreground">×</span>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" />
                <span className="text-sm font-mono text-accent">AI VENTURE INTEGRATOR</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Moduły ekosystemowe{" "}
              <span className="text-gradient-primary">dla ERP XL</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              Propozycja implementacji 5 modułów z ekosystemu AI Venture Integrator
              w architekturze Comarch ERP XL — od barteru i optymalizacji podatkowej
              po warstwę agentów AI.
            </p>

            {/* Partners bar */}
            <div className="flex flex-wrap gap-4">
              <div className="glass-surface rounded-lg px-4 py-3 flex items-center gap-3 border border-primary/20">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-xs text-muted-foreground block">Implementacja</span>
                  <span className="text-sm font-bold">Comarch</span>
                </div>
              </div>
              <div className="glass-surface rounded-lg px-4 py-3 flex items-center gap-3 border border-accent/20">
                <Landmark className="w-5 h-5 text-accent" />
                <div>
                  <span className="text-xs text-muted-foreground block">Patronat</span>
                  <span className="text-sm font-bold">MRiT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold mb-8"
          >
            5 modułów do implementacji
          </motion.h2>

          <div className="space-y-6">
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-surface rounded-2xl p-6 sm:p-8 border-l-4 ${mod.bg}`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mod.bg}`}>
                    <mod.icon className={`w-5 h-5 ${mod.color}`} />
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono ${mod.color}`}>{mod.tag}</span>
                    <h3 className="font-bold text-lg">{mod.title}</h3>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${mod.bg} ${mod.color}`}>
                      {mod.phase}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Priorytet {mod.priority}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                  {mod.desc}
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-2 mb-5">
                  {mod.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${mod.color}`} />
                      <span className="text-xs sm:text-sm text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Value */}
                <div className={`rounded-lg p-3 ${mod.bg}`}>
                  <span className="text-xs font-mono text-muted-foreground block mb-1">WARTOŚĆ BIZNESOWA</span>
                  <p className="text-sm font-medium">{mod.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Diagram */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-8">Architektura integracji</h2>
            <div className="glass-surface rounded-2xl p-6 sm:p-8">
              {/* Visual diagram */}
              <div className="relative">
                {/* ERP XL Core */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border-2 border-primary/30">
                    <Building2 className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <span className="text-xs text-muted-foreground block">Rdzeń systemu</span>
                      <span className="font-bold text-lg">Comarch ERP XL</span>
                    </div>
                  </div>
                </div>

                {/* Connection lines visual */}
                <div className="flex justify-center mb-4">
                  <div className="w-px h-8 bg-border" />
                </div>

                {/* Integration layer */}
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-mono text-accent">
                    <Layers className="w-4 h-4" />
                    API / Plugin Layer
                  </span>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="w-px h-8 bg-border" />
                </div>

                {/* Modules grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {modules.map((mod, i) => (
                    <div key={i} className={`rounded-xl p-3 text-center border ${mod.bg}`}>
                      <mod.icon className={`w-5 h-5 mx-auto mb-2 ${mod.color}`} />
                      <span className="text-xs font-bold block">{mod.title.split(' — ')[0]}</span>
                      <span className={`text-[9px] font-mono ${mod.color}`}>{mod.tag}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom: Ecosystem */}
                <div className="flex justify-center mt-4">
                  <div className="w-px h-8 bg-border" />
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-accent/10 border-2 border-accent/30">
                    <Layers className="w-6 h-6 text-accent" />
                    <div className="text-left">
                      <span className="text-xs text-muted-foreground block">Ekosystem</span>
                      <span className="font-bold text-lg">AI Venture Integrator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-8">Roadmapa wdrożenia</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

              <div className="space-y-6">
                {roadmapPhases.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className="flex gap-4 sm:gap-6 items-start"
                  >
                    {/* Node */}
                    <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${phase.bg}`}>
                      <phase.icon className={`w-5 h-5 ${phase.color}`} />
                    </div>

                    {/* Content */}
                    <div className={`glass-surface rounded-xl p-5 sm:p-6 flex-1 border-l-4 ${phase.bg}`}>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`text-xs font-mono font-bold ${phase.color}`}>{phase.phase}</span>
                        <span className="text-muted-foreground text-xs">—</span>
                        <span className="font-bold text-base">{phase.title}</span>
                        <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {phase.duration}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {phase.modules.map((m, mi) => (
                          <span key={mi} className={`text-xs font-mono px-2.5 py-1 rounded-full ${phase.bg} ${phase.color}`}>
                            {m}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {phase.reason}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic recommendation */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-surface rounded-2xl p-6 sm:p-8 border-2 border-primary/20"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Rekomendacja strategiczna</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Start:</strong> BarterChain + Kalkulator B+R/IP Box — najszybszy time-to-market
                i najłatwiejsza integracja z istniejącymi modułami ERP XL.
              </p>
              <p>
                <strong className="text-foreground">Następnie:</strong> ESG Compliance — ze względu na presję regulacyjną
                CSRD 2026 i rosnące zapotrzebowanie rynkowe.
              </p>
              <p>
                <strong className="text-foreground">Wizja:</strong> AIagent.gratis jako warstwa AI pozycjonująca ERP XL
                jako pierwszy polski system ERP z wbudowanymi agentami AI — przewaga nad SAP i Oracle.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap gap-4">
              <div className="glass-surface rounded-lg px-4 py-3 flex items-center gap-3 border border-primary/20">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-xs text-muted-foreground block">Implementacja modułów</span>
                  <span className="text-sm font-bold">Comarch</span>
                </div>
              </div>
              <div className="glass-surface rounded-lg px-4 py-3 flex items-center gap-3 border border-accent/20">
                <Landmark className="w-5 h-5 text-accent" />
                <div>
                  <span className="text-xs text-muted-foreground block">Patronat — wzrost gospodarczy</span>
                  <span className="text-sm font-bold">Ministerstwo Rozwoju i Technologii</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/30">
        <div className="container max-w-5xl text-center">
          <p className="text-xs text-muted-foreground">
            Dokument poufny — wyłącznie do wglądu dla Comarch S.A. · AI Venture Anticrisis Integrator © 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PlatformaERP;
