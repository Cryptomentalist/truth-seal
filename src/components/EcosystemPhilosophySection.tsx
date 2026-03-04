import { motion } from "framer-motion";
import { Shield, Heart, Leaf, Handshake, Triangle, ArrowDown } from "lucide-react";

const principles = [
  {
    icon: Handshake,
    title: "Gentleman Agreement Club",
    desc: "Wzajemne zaufanie i etyka jako fundament współpracy — nie umowy, lecz wartości łączą partnerów ekosystemu.",
  },
  {
    icon: Shield,
    title: "Zamknięty ekosystem",
    desc: "Samowystarczalny twór zbudowany na jakości, gdzie każdy element uzupełnia pozostałe — eliminując zależność od zewnętrznych, niestabilnych czynników.",
  },
  {
    icon: Leaf,
    title: "ESG & Tolerancja",
    desc: "Realna odpowiedzialność społeczna i środowiskowa. Różnorodność i inkluzywność nie jako hasła, lecz praktyka wbudowana w strukturę.",
  },
  {
    icon: Heart,
    title: "Komplementarność",
    desc: "Projekty dopełniają się nawzajem tak precyzyjnie, że wymiana barterowa zastępuje tradycyjne transakcje — tworząc organizm odporny na kryzysy.",
  },
];

const maslowLevels = [
  {
    level: "Samowystarczalność",
    classic: "Samorealizacja",
    desc: "Ekosystem osiąga pełną niezależność — nie potrzebuje zewnętrznego wsparcia",
    width: "w-[45%]",
  },
  {
    level: "Rozwój & Innowacja",
    classic: "Szacunek",
    desc: "Możliwy dopiero gdy jest poczucie bezpieczeństwa i stabilizacji",
    width: "w-[58%]",
  },
  {
    level: "Zaufanie = Stabilizacja",
    classic: "Przynależność",
    desc: "Gentleman Agreement Club — zaufanie generuje stabilność, a stabilność umożliwia rozwój",
    width: "w-[71%]",
    highlight: true,
  },
  {
    level: "Jakość & Minimalizm",
    classic: "Bezpieczeństwo",
    desc: "Mniej, ale lepiej. Jakość przewyższa ilość — minimalizm jako świadomy wybór, nie ograniczenie",
    width: "w-[84%]",
    highlight: true,
  },
  {
    level: "Zasoby komplementarne",
    classic: "Potrzeby fizjologiczne",
    desc: "Wzajemnie uzupełniające się projekty — fundament całego ekosystemu",
    width: "w-full",
  },
];

const EcosystemPhilosophySection = () => {
  return (
    <section id="filozofia" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="container max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            Filozofia
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-4 mb-6">
            Czym jest{" "}
            <span className="text-gradient-primary">komplementarny ekosystem</span>?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Zamknięty, samowystarczalny organizm gospodarczy — zbudowany na jakości,
            wzajemnym zaufaniu i etyce. Nie na ilości i bylejakości.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-surface rounded-xl p-6 flex gap-4 items-start"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Maslow Pyramid - reorganized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              Piramida Maslowa{" "}
              <span className="text-accent">przeorganizowana dla biznesu</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Klasyczna piramida Maslowa opisuje jednostkę. My ją przeorganizowaliśmy: 
              <strong className="text-foreground"> minimalizm i jakość</strong> zastępują ilość, 
              a <strong className="text-foreground">zaufanie i stabilizacja</strong> są warunkiem 
              rozwoju — nie odwrotnie.
            </p>
          </div>

          <div className="glass-surface rounded-2xl p-5 sm:p-8 max-w-3xl mx-auto">
            {/* Arrow indicator */}
            <div className="flex items-center justify-center gap-2 mb-6 text-xs text-muted-foreground">
              <Triangle className="w-3 h-3 text-accent rotate-180" />
              <span className="font-mono uppercase tracking-wider">Cel: samowystarczalność</span>
              <Triangle className="w-3 h-3 text-accent rotate-180" />
            </div>

            <div className="flex flex-col items-center gap-2">
              {maslowLevels.map((level, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`${level.width} transition-all`}
                >
                  <div
                    className={`rounded-lg px-4 py-3 text-center border ${
                      level.highlight
                        ? "bg-accent/10 border-accent/30"
                        : "bg-muted/30 border-border/50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className={`text-xs sm:text-sm font-bold ${level.highlight ? "text-accent" : "text-foreground"}`}>
                        {level.level}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug">
                      {level.desc}
                    </p>
                    <span className="text-[9px] font-mono text-muted-foreground/50 mt-1 block">
                      Maslow: {level.classic}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key insight */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 pt-5 border-t border-border/30 text-center"
            >
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                <span className="text-accent font-semibold">Kluczowa zmiana:</span>{" "}
                Rozwój nie jest możliwy bez poczucia bezpieczeństwa. Dlatego{" "}
                <strong className="text-foreground">zaufanie i stabilizacja</strong>{" "}
                poprzedzają innowację — odwrotnie niż w klasycznym modelu, gdzie 
                samorealizacja jest szczytem aspiracji jednostki.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemPhilosophySection;
