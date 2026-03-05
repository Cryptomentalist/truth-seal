import { motion } from "framer-motion";
import { ExternalLink, Heart } from "lucide-react";

import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import StarsRoadmap from "@/components/StarsRoadmap";

const projects = [
  { step: 1, name: "Rejestruj.biz", domain: "https://rejestruj.biz", desc: "Pomysł i inspiracja — warsztat generowania innowacyjnych pomysłów, ocena potencjału rynkowego." },
  { step: 2, name: "Projekt 2", domain: "#", desc: "Weryfikacja problemu — analiza rzeczywistych potrzeb rynku, testowanie hipotez problemowych." },
  { step: 3, name: "Projekt 3", domain: "#", desc: "Definicja wartości i etyki — określenie UVP wynalazku, uwzględnienie zasad ESG i etyki jako przewagi konkurencyjnej." },
  { step: 4, name: "Projekt 4", domain: "#", desc: "Ochrona własności intelektualnej — konsultacje patentowe, zgłoszenia, prawa autorskie, znaki towarowe." },
  { step: 5, name: "Projekt 5", domain: "#", desc: "Badania i prototypowanie — wsparcie w tworzeniu pierwszych prototypów i testów funkcjonalnych." },
  { step: 6, name: "Projekt 6", domain: "#", desc: "Wstępna analiza kosztów i finansów — kalkulacja budżetu startowego, plan minimalnych wydatków." },
  { step: 7, name: "Projekt 7", domain: "#", desc: "Strategia pozyskiwania funduszy — dotacje, granty, finansowanie publiczne i prywatne." },
  { step: 8, name: "Projekt 8", domain: "#", desc: "Strategia rynkowa — określenie grupy docelowej, segmentacja klientów, analiza konkurencji." },
  { step: 9, name: "Projekt 9", domain: "#", desc: "Testowanie rynku — MVP, wczesne testy z klientami, zbieranie feedbacku." },
  { step: 10, name: "Projekt 10", domain: "#", desc: "Optymalizacja produktu — iteracje prototypu, poprawa funkcjonalności, user experience." },
  { step: 11, name: "Projekt 11", domain: "#", desc: "Biznesplan z ESG — spójny plan rozwoju z etycznymi praktykami, scenariusze finansowe." },
  { step: 12, name: "Projekt 12", domain: "#", desc: "Strategia finansowania i grantowa — plan pozyskiwania grantów, dotacji, crowdfundingu." },
  { step: 13, name: "Projekt 13", domain: "#", desc: "Branding i komunikacja — storytelling, kampanie marketingowe z akcentem na transparentność i ESG." },
  { step: 14, name: "Projekt 14", domain: "#", desc: "Wdrożenie technologii — integracja narzędzi cyfrowych, automatyzacja, platformy sprzedażowe." },
  { step: 15, name: "Projekt 15", domain: "#", desc: "Sprzedaż i rozwój klientów — model ACECRA (Awareness → Advocacy), relacje w zgodzie z etyką." },
  { step: 16, name: "Projekt 16", domain: "#", desc: "Rozwój zespołu — rekrutacja talentów, mentoring, kultura startupowa oparta na ESG i etyce." },
  { step: 17, name: "Projekt 17", domain: "#", desc: "Skalowanie operacyjne i odpowiedzialne — optymalizacja produkcji, logistyki, minimalizacja wpływu na środowisko." },
  { step: 18, name: "Projekt 18", domain: "#", desc: "Monitoring, analiza i iteracja — KPI, feedback, dalsze iteracje produktu i praktyk ESG." },
];

const NewIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />
      {/* Logo + Header */}
      <header className="pt-28 pb-8 flex flex-col items-center gap-6">
        <motion.p
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Stars Roadmap: 18 Steps to Scale Your Invention. Dołącz do samowystarczalnego antykryzysowego ekosystemu z Gentleman Agreement Club i poczuj korzyści oraz wsparcie na każdym etapie rozwoju. Dla inwestorów, innowatorów i start-upów w każdym wieku. Zarabiaj z nami, doświadczaj, integruj się, ucz się i kochaj!
        </motion.p>
      </header>

      {/* Roadmap connector line */}
      <div className="container max-w-7xl px-4 pb-20">
        {/* Horizontal scrollable roadmap */}
        <div className="relative">
          {/* Progress line */}
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
                className={`group relative flex flex-col rounded-xl border border-border p-4 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 ${
                  p.domain === "#"
                    ? "opacity-50 cursor-default"
                    : "cursor-pointer"
                } bg-card`}
              >
                {/* Step badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full bg-accent/15 text-accent text-sm font-bold flex items-center justify-center font-mono">
                    {p.step}
                  </span>
                  {p.domain !== "#" && (
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors ml-auto" />
                  )}
                </div>

                {/* Name */}
                <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">
                  {p.name}
                </h3>

                {/* Domain */}
                {p.domain !== "#" && (
                  <span className="text-[11px] font-mono text-accent/70 mb-2 truncate">
                    {p.domain.replace("https://", "")}
                  </span>
                )}

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                  {p.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Fundacja Konstelacja.org */}
      <section className="container max-w-4xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-10 text-center"
        >
          <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <a
              href="https://konstelacja.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Konstelacja.org
            </a>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Misją naszej fundacji jest promowanie marki Polski na arenie międzynarodowej. Budujemy mosty międzypokoleniowe, pokazujemy potencjał w neuroróżnorodności. Tworzymy innowacyjne modele biznesowe dla podniesienia jakości i wzrostu gospodarczego. Kreujemy narzędzia dla szybszego wdrażania 17 SDGs i działamy z fokusem na S-impact w obszarach ESG.
          </p>
          <a
            href="https://konstelacja.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            Odwiedź konstelacja.org
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Stars Roadmap visual */}
      <StarsRoadmap />
    </div>
  );
};

export default NewIndex;
