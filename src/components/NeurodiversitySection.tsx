import { motion } from "framer-motion";
import { Brain, Sparkles, Equal, Scale, Puzzle, Zap } from "lucide-react";

const points = [
  {
    icon: Brain,
    title: "Neuroróżnorodność = przewaga",
    desc: "ADHD, autyzm, dysleksja — to nie ograniczenia, lecz unikalne tryby myślenia, które napędzają przełomowe innowacje tam, gdzie standardowe podejścia zawodzą.",
  },
  {
    icon: Puzzle,
    title: "Inne widzenie, inne rozwiązania",
    desc: "Neuroróżnorodni myśliciele dostrzegają wzorce i połączenia niewidoczne dla neurotypowego świata — dlatego deep-tech potrzebuje ich najbardziej.",
  },
  {
    icon: Zap,
    title: "Hiperfokus jako supermoc",
    desc: "Zdolność do ekstremalnego skupienia na problemie przez godziny i dni to dar, który w konwencjonalnych strukturach bywa tłumiony zamiast rozwijany.",
  },
];

const NeurodiversitySection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            Inkluzywność
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-4 mb-6">
            Innowacje od{" "}
            <span className="text-gradient-primary">neuroróżnorodnych</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Największe przełomy technologiczne nie powstają w komfortowych ramach — rodzą się
            w umysłach, które widzą świat inaczej.
          </p>
        </motion.div>

        {/* Fairness statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-surface rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto mb-12 text-center border border-accent/15"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Equal className="w-8 h-8" />
              <span className="text-sm font-mono">po równo</span>
            </div>
            <span className="text-2xl font-bold text-accent">≠</span>
            <div className="flex items-center gap-2 text-accent">
              <Scale className="w-8 h-8" />
              <span className="text-sm font-mono font-bold">sprawiedliwie</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Sprawiedliwość to nie dawanie każdemu tego samego — to dawanie każdemu tego, czego
            potrzebuje, by w pełni wykorzystać swój potencjał. W naszym ekosystemie dopasowujemy
            wsparcie do umysłu, nie umysł do systemu.
          </p>
        </motion.div>

        {/* Points */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-surface rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-base mb-2">{point.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-surface rounded-xl p-6 text-center border-l-4 border-l-accent max-w-2xl mx-auto"
        >
          <Sparkles className="w-5 h-5 text-accent mx-auto mb-3" />
          <p className="italic text-sm sm:text-base text-muted-foreground leading-relaxed">
            „Nie naprawiamy ludzi — naprawiamy system, który ich nie rozumie.
            Ekosystem AI Venture jest zaprojektowany tak, by różnorodność umysłów
            była źródłem siły, nie wykluczenia."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default NeurodiversitySection;
