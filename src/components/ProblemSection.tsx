import { motion } from "framer-motion";
import { AlertTriangle, Eye, Users, TrendingDown, Scale, Building } from "lucide-react";

const threats = [
  { icon: Eye, text: "Przejęcia koncepcji przez silniejszych graczy" },
  { icon: Users, text: "Wyciszanie i marginalizacja wynalazców" },
  { icon: TrendingDown, text: "Ciche wypływanie technologii w rękach innych podmiotów" },
  { icon: Scale, text: "Zmagania jednostki z całym systemem — asymetria siły" },
  { icon: Building, text: "Nadużycia w procedurach grantowych i oceniających" },
  { icon: AlertTriangle, text: "Brak narzędzi obrony na etapie pre-patentowym" },
];

const ProblemSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">Problem</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Polska traci innowacje, zanim zdążą stać się{" "}
            <span className="text-gradient-primary">przełomami</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Polskie technologie giną na etapie, gdy twórca musi ujawnić pomysł doradcom,
            instytucjom grantowym i ekspertom — bez żadnej realnej ochrony.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {threats.map((threat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-surface rounded-lg p-5 flex items-start gap-4 group hover:border-destructive/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <threat.icon className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-sm text-secondary-foreground leading-relaxed">{threat.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Case studies callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass-surface rounded-xl p-8 border-l-4 border-l-accent"
        >
          <p className="text-muted-foreground leading-relaxed">
            Przypadek <span className="text-foreground font-semibold">Saule Technologies</span> pokazał,
            jak łatwo można zatrzymać rozwój polskiej technologii światowego kalibru.
            Przypadek <span className="text-foreground font-semibold">kompozytu kwantowego BIPV</span> ujawnił,
            że nadużycia mogą zaczynać się w procedurach, które miały wspierać innowatorów.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
