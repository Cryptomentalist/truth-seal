import { motion } from "framer-motion";
import { Coins, BarChart3, Equal, Flag } from "lucide-react";

const pillars = [
  {
    icon: BarChart3,
    title: "S-Impact",
    subtitle: "Mierzalna odpowiedzialność społeczna",
    points: [
      "Każdy wpływ społeczny można udowodnić",
      "Każde działanie ESG ma cyfrowy, matematyczny ślad",
      "Znika greenwashing i social-washing",
    ],
  },
  {
    icon: Equal,
    title: "Równość w innowacjach",
    subtitle: "Identyczny poziom ochrony dla każdego",
    points: [
      "Nieważne, czy to jednostka, czy korporacja",
      "Liczy się pomysł i dowód, nie pozycja społeczna",
      "Praktyczna implementacja S w ESG",
    ],
  },
  {
    icon: Flag,
    title: 'Marka "Polska"',
    subtitle: "Transformacja wizerunku na arenie globalnej",
    points: [
      "Bezpieczny ekosystem dla innowatorów",
      "Atrakcyjny i przejrzysty dla inwestorów",
      "Odporny na korupcję i manipulacje",
    ],
  },
];

const ESGSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            MindMark™ + Tokenizacja
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-4 mb-6">
            Nowa waluta{" "}
            <span className="text-gradient-primary">zaufania</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tokenizacja aktywuje transformację społeczną i systemową.
            Tokeny stają się dowodem działania, nie deklaracją w raporcie.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-surface rounded-xl p-7"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-1">{p.title}</h3>
              <p className="text-xs font-mono text-accent mb-5">{p.subtitle}</p>
              <ul className="space-y-3">
                {p.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl font-medium text-secondary-foreground italic max-w-3xl mx-auto">
            „Kraj, który nie tylko tworzy technologię, ale potrafi ją chronić,
            rozliczać, mierzyć i udowadniać jej wpływ."
          </blockquote>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
        </motion.div>
      </div>
    </section>
  );
};

export default ESGSection;
