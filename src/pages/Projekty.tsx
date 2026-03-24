import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsRoadmap from "@/components/StarsRoadmap";

const projectColors = [
  "from-rose-500/20 to-rose-600/10 border-rose-400/30",
  "from-amber-500/20 to-amber-600/10 border-amber-400/30",
  "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30",
  "from-violet-500/20 to-violet-600/10 border-violet-400/30",
  "from-blue-500/20 to-blue-600/10 border-blue-400/30",
  "from-cyan-500/20 to-cyan-600/10 border-cyan-400/30",
  "from-pink-500/20 to-pink-600/10 border-pink-400/30",
  "from-orange-500/20 to-orange-600/10 border-orange-400/30",
  "from-teal-500/20 to-teal-600/10 border-teal-400/30",
  "from-indigo-500/20 to-indigo-600/10 border-indigo-400/30",
  "from-lime-500/20 to-lime-600/10 border-lime-400/30",
  "from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-400/30",
  "from-yellow-500/20 to-yellow-600/10 border-yellow-400/30",
  "from-sky-500/20 to-sky-600/10 border-sky-400/30",
  "from-red-500/20 to-red-600/10 border-red-400/30",
  "from-green-500/20 to-green-600/10 border-green-400/30",
  "from-purple-500/20 to-purple-600/10 border-purple-400/30",
  "from-stone-500/20 to-stone-600/10 border-stone-400/30",
];

const badgeColors = [
  "bg-rose-500/20 text-rose-300",
  "bg-amber-500/20 text-amber-300",
  "bg-emerald-500/20 text-emerald-300",
  "bg-violet-500/20 text-violet-300",
  "bg-blue-500/20 text-blue-300",
  "bg-cyan-500/20 text-cyan-300",
  "bg-pink-500/20 text-pink-300",
  "bg-orange-500/20 text-orange-300",
  "bg-teal-500/20 text-teal-300",
  "bg-indigo-500/20 text-indigo-300",
  "bg-lime-500/20 text-lime-300",
  "bg-fuchsia-500/20 text-fuchsia-300",
  "bg-yellow-500/20 text-yellow-300",
  "bg-sky-500/20 text-sky-300",
  "bg-red-500/20 text-red-300",
  "bg-green-500/20 text-green-300",
  "bg-purple-500/20 text-purple-300",
  "bg-stone-500/20 text-stone-300",
];

const projects = [
  { step: 1, name: "Rejestruj.biz", domain: "https://rejestruj.biz", desc: "Bezpieczna rejestracja firmy lub franczyzy wspierana przez MRiT." },
  { step: 2, name: "Warsztaty Biznesowe", domain: "#", desc: "Warsztaty z wdrażania narzędzi biznesowych i case studies przedsiębiorczości." },
  { step: 3, name: "ESG.legal", domain: "https://esg.legal", desc: "Audyty i certyfikacja ESG, doradztwo w zakresie zrównoważonego rozwoju." },
  { step: 4, name: "GOD.legal", domain: "https://god.legal", desc: "Artificial Superintelligence — Global Omniverse Developers." },
  { step: 5, name: "HIT.legal", domain: "https://hit.legal", desc: "Holding Innowacji Technologicznych — ochrona i komercjalizacja technologii." },
  { step: 6, name: "Pre-Patent", domain: "#", desc: "Ochrona własności intelektualnej — certyfikaty PRE-PATENT i PRE-COURT." },
  { step: 7, name: "WomenOnBoards.app", domain: "https://womenonboards.app", desc: "Szkolenia dla kobiet przygotowujące do egzaminu na członkinie rad nadzorczych." },
  { step: 8, name: "Fractaleco.com", domain: "https://fractaleco.com", desc: "Optymalizacja modelu biznesowego i fraktalna analiza ekosystemu." },
  { step: 9, name: "Intrapreneurs.app", domain: "https://intrapreneurs.app", desc: "Platforma liderów-intrapreneurów — serce ekosystemu rekrutacyjnego." },
  { step: 10, name: "AIagent.gratis", domain: "https://aiagent.gratis", desc: "Środowisko i marketplace autonomicznych agentów AI." },
  { step: 11, name: "CampusAI.ai", domain: "https://campusai.ai", desc: "Edukacja i szkolenia AI — akademia kompetencji przyszłości." },
  { step: 12, name: "GrantToken", domain: "#", desc: "Strategia grantowa i tokenizacja — finansowanie innowacji." },
  { step: 13, name: "BarterChain", domain: "#", desc: "Blockchain wymiana wartości — barter nowej generacji." },
  { step: 14, name: "MindMark HR", domain: "#", desc: "Narzędzie HR do ochrony pomysłów i raportowania wkładu intelektualnego." },
  { step: 15, name: "Constellation.love", domain: "https://constellation.love", desc: "Hub koordynujący ekosystem — sprzedaż i model ACECRA." },
  { step: 16, name: "Gentleman Agreement Club", domain: "#", desc: "Rozwój zespołu, mentoring i kultura oparta na zaufaniu." },
  { step: 17, name: "FUTU.BE", domain: "#", desc: "Modele Biznesowe — hybrydowy ekosystem Smart Business Village z tokenizacją, CBR i Metawersum." },
  { step: 18, name: "Monitoring & Iteracja", domain: "#", desc: "KPI, feedback i ciągła optymalizacja ekosystemu." },
];

const Projekty = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 text-center container max-w-3xl">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stars Roadmap: <span className="text-gradient-primary">18 kroków</span>
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Stars Roadmap: 18 Steps to Scale Your Invention. Dołącz do samowystarczalnego antykryzysowego ekosystemu z Gentleman Agreement Club i poczuj korzyści oraz wsparcie na każdym etapie rozwoju. Dla inwestorów, innowatorów i start-upów w każdym wieku. Zarabiaj z nami, doświadczaj, integruj się, ucz się i kochaj!
        </motion.p>
      </section>

      {/* Projects grid */}
      <div className="container max-w-7xl px-4 pb-20">
        <div className="relative">
          <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-0.5 bg-border z-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {projects.map((p, i) => (
              <motion.a
                key={p.step}
                href={p.domain}
                target={p.domain !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative flex flex-col rounded-xl border p-4 transition-all hover:shadow-lg bg-gradient-to-br ${projectColors[i]} ${
                  p.domain === "#"
                    ? "opacity-60 cursor-default"
                    : "cursor-pointer hover:scale-[1.03]"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center font-mono ${badgeColors[i]}`}>
                    {p.step}
                  </span>
                  {p.domain !== "#" && (
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors ml-auto" />
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                {p.domain !== "#" && (
                  <span className="text-[11px] font-mono text-accent/70 mb-2 truncate">
                    {p.domain.replace("https://", "")}
                  </span>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                  {p.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Stars Roadmap visual */}
      <StarsRoadmap />

      <Footer />
    </div>
  );
};

export default Projekty;
