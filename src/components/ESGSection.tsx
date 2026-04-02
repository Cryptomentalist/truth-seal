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

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-secondary-foreground italic max-w-3xl mx-auto leading-relaxed">
            „Tworzymy wartość, jakość dla wzrostu gospodarczego. Zmieniamy definicję sukcesu i patriotyzm zapobiegawczy. Tworzymy wymierne wskaźniki rezultatu."
          </blockquote>
          <p className="text-base sm:text-lg text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Jesteśmy siłą przeciw systemowi niesprawiedliwości. Jesteśmy jak <span className="text-accent font-semibold">AI Spiderman</span>, który tworzy sieć tego, co wartościowe — i podnosi dobrostan.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Promujemy markę Polski na arenie międzynarodowej: <span className="text-accent font-semibold">Made in Poland</span> — <span className="text-accent font-semibold">Polish Quality</span>. Bo Polska zasługuje na to, by być rozpoznawana z innowacji, jakości i odwagi.
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
        </motion.div>

        {/* AI Venture Integrator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 glass-surface rounded-xl p-6 sm:p-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-sm font-mono text-accent uppercase tracking-widest mb-3">
            Część ekosystemu
          </p>
          <h3 className="text-xl sm:text-2xl font-bold mb-3">AI Venture Integrator</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            To ekosystem, który działa jak państwo w państwie — ale w tym białym, a nie czarnym znaczeniu. Tworzymy komplementarne przedsięwzięcia, aby ekosystem był samowystarczalny i odporny na kryzysy.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            To jak w piramidzie Maslowa: zaspokajamy wszystkie potrzeby do życia. InventorProof jest elementem komplementarnym w tym ekosystemie — chroni innowacje, które napędzają cały system.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
            Razem budujemy markę <span className="text-accent font-semibold">Made in Poland · Polish Quality</span> — na arenie międzynarodowej.
          </p>
          <a
            href="https://www.linkedin.com/in/ada-margo-marglewska/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm sm:text-base"
          >
            🔗 Dowiedz się, jak działa AI Venture Integrator
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ESGSection;
