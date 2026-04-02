import { motion } from "framer-motion";
import { Info, CheckCircle2, XCircle } from "lucide-react";

const isItems = [
  "Niepodważalny cyfrowy dowód istnienia dokumentu z dokładną datą",
  "Narzędzie do zabezpieczenia pierwszeństwa przed złożeniem patentu",
  "Dowód uzupełniający w postępowaniach sądowych i arbitrażowych",
  "Ochrona dostępna natychmiast, bez czekania na decyzję urzędu",
];

const isNotItems = [
  "Nie zastępuje patentu ani żadnej formalnej rejestracji IP",
  "Nie gwarantuje ochrony patentowej bez dalszych kroków prawnych",
  "Nie stanowi porady prawnej — zalecamy konsultację z rzecznikiem patentowym",
  "Nie jest oficjalnym dokumentem urzędowym",
];

const DisclaimerSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            Ważne informacje
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-6">
            Czym <span className="text-gradient-primary">jest</span>, a czym{" "}
            <span className="text-muted-foreground">nie jest</span> InventorProof?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparentność buduje zaufanie. Oto jasne wyjaśnienie granic naszej usługi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* IS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-surface rounded-xl p-7 border-primary/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold">InventorProof JEST</h3>
            </div>
            <ul className="space-y-4">
              {isItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* IS NOT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-surface rounded-xl p-7 border-destructive/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-bold">InventorProof NIE JEST</h3>
            </div>
            <ul className="space-y-4">
              {isNotItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Legal note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 glass-surface rounded-xl p-6 flex items-start gap-4"
        >
          <Info className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-secondary-foreground">Nota prawna:</span>{" "}
            InventorProof.com oferuje usługę MindMark™ — ochronę własności intelektualnej 
            opartą na infrastrukturze blockchain (rozproszonego zapisu cyfrowego). Dowód ten 
            może stanowić element materiału dowodowego, ale nie zastępuje formalnej 
            ochrony patentowej. W celu pełnej ochrony IP rekomendujemy współpracę z 
            rzecznikiem patentowym.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DisclaimerSection;
