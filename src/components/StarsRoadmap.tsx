import { motion } from "framer-motion";
import { Star } from "lucide-react";

const steps = [
  { step: 1, title: "Pomysł i inspiracja", desc: "Warsztat generowania innowacyjnych pomysłów, ocena potencjału rynkowego.", esg: false },
  { step: 2, title: "Weryfikacja problemu", desc: "Analiza rzeczywistych potrzeb rynku, testowanie hipotez problemowych.", esg: false },
  { step: 3, title: "Definicja wartości i etyki", desc: "Określenie unikalnej propozycji wartości (UVP) wynalazku, uwzględnienie zasad ESG i etyki jako przewagi konkurencyjnej.", esg: true },
  { step: 4, title: "Ochrona własności intelektualnej", desc: "Konsultacje patentowe, zgłoszenia, prawa autorskie, znaki towarowe.", esg: false },
  { step: 5, title: "Badania i prototypowanie", desc: "Wsparcie w tworzeniu pierwszych prototypów i testów funkcjonalnych.", esg: false },
  { step: 6, title: "Wstępna analiza kosztów i finansów", desc: "Kalkulacja budżetu startowego, plan minimalnych wydatków.", esg: false },
  { step: 7, title: "Strategia pozyskiwania funduszy", desc: "Dotacje, granty, finansowanie publiczne i prywatne; tworzenie roadmapy pozyskania kapitału.", esg: false },
  { step: 8, title: "Strategia rynkowa", desc: "Określenie grupy docelowej, segmentacja klientów, analiza konkurencji.", esg: false },
  { step: 9, title: "Testowanie rynku", desc: "MVP (Minimum Viable Product), wczesne testy z klientami, zbieranie feedbacku.", esg: false },
  { step: 10, title: "Optymalizacja produktu", desc: "Iteracje prototypu, poprawa funkcjonalności, user experience.", esg: false },
  { step: 11, title: "Biznesplan z ESG", desc: "Spójny plan rozwoju uwzględniający etyczne i zrównoważone praktyki, scenariusze finansowe, strategia skalowania.", esg: true },
  { step: 12, title: "Strategia finansowania i grantowa", desc: "Szczegółowy plan pozyskiwania grantów, dotacji, crowdfundingu oraz inwestorów aniołów.", esg: false },
  { step: 13, title: "Branding i komunikacja", desc: "Tworzenie marki, storytelling, pierwsze kampanie marketingowe z akcentem na transparentność i ESG.", esg: true },
  { step: 14, title: "Wdrożenie technologii", desc: "Integracja narzędzi cyfrowych, automatyzacja procesów, platformy sprzedażowe z myślą o zrównoważonym rozwoju.", esg: true },
  { step: 15, title: "Sprzedaż i rozwój klientów", desc: "Wdrożenie modelu ACECRA (Awareness → Advocacy), budowanie relacji w zgodzie z wartościami etycznymi.", esg: true },
  { step: 16, title: "Rozwój zespołu", desc: "Rekrutacja talentów, mentoring, delegowanie, kultura startupowa oparta na ESG i etyce.", esg: true },
  { step: 17, title: "Skalowanie operacyjne i odpowiedzialne", desc: "Optymalizacja produkcji, logistyki, supply chain, minimalizacja wpływu na środowisko.", esg: true },
  { step: 18, title: "Monitoring, analiza i iteracja", desc: "KPI, feedback od klientów, dalsze iteracje produktu, strategii i praktyk ESG; stałe podnoszenie wartości etycznej i przewagi konkurencyjnej.", esg: true },
];

const StarsRoadmap = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden print:overflow-visible">
      {/* Background stars effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            Stars Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-4">
            Inventor's Startup Roadmap
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            18 etapów z ESG, etyką i grantami — każda gwiazda to kluczowy punkt Twojej drogi od pomysłu do skalowania.
          </p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-accent" /> Etap rozwoju
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-green-400" /> ESG & Etyka
            </span>
          </div>
        </motion.div>

        {/* Star path */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0 hidden sm:block" />

          <div className="space-y-4">
            {steps.map((s, i) => {
              const isEsg = s.esg;
              const starColor = isEsg ? "text-green-400" : "text-accent";
              const glowColor = isEsg ? "bg-green-400/15" : "bg-accent/15";

              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Star node */}
                  <div className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full ${glowColor} flex items-center justify-center z-10`}>
                    <Star className={`w-5 h-5 sm:w-6 sm:h-6 ${starColor} transition-transform group-hover:scale-125`} fill="currentColor" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card border border-border text-[10px] font-bold font-mono flex items-center justify-center">
                      {s.step}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 rounded-xl border border-border bg-card p-4 sm:p-5 group-hover:border-accent/40 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm sm:text-base">{s.title}</h3>
                      {isEsg && (
                        <span className="text-[9px] font-mono uppercase tracking-wider bg-green-400/10 text-green-400 px-1.5 py-0.5 rounded-full">
                          ESG
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Final star burst */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-10"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20">
              <Star className="w-5 h-5 text-accent" fill="currentColor" />
              <span className="text-sm font-semibold text-accent">Twoja gwiazda świeci najjaśniej!</span>
              <Star className="w-5 h-5 text-accent" fill="currentColor" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StarsRoadmap;
