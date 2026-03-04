import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Network, ArrowRightLeft, Rocket, ShieldCheck, Users, ExternalLink, Bot } from "lucide-react";

const projects = [
  {
    icon: ShieldCheck,
    name: "InventionProof",
    desc: "Ochrona własności intelektualnej z cyfrowym dowodem autorstwa",
    link: "https://inventionproof.org",
  },
  {
    icon: Rocket,
    name: "AI Start-up Studio",
    desc: "Inkubacja i akceleracja projektów opartych o sztuczną inteligencję",
  },
  {
    icon: ArrowRightLeft,
    name: "BarterChain",
    desc: "Wymiana wartości i usług między projektami ekosystemu — bez pośredników",
  },
  {
    icon: Users,
    name: "MindMark HR",
    tag: "Biz Tool",
    desc: "Oprogramowanie do ochrony pomysłów w zespołach — od drobnych idei po strategiczne decyzje. Raporty wkładu intelektualnego i algorytm motywacyjny.",
  },
  {
    icon: Network,
    name: "Więcej projektów…",
    desc: "Każdy projekt uzupełnia pozostałe, tworząc samowystarczalny organizm gospodarczy",
  },
];

const EcosystemSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            Ekosystem
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-4 mb-6">
            AI Venture Anticrisis{" "}
            <span className="text-gradient-primary">Integrator</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Komplementarne przedsięwzięcia połączone w jeden ekosystem. Każdy projekt uzupełnia pozostałe — do tego stopnia, że możliwa jest bezpośrednia wymiana barterowa wartości, usług i zasobów między nimi.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {projects.map((p, i) => (
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
                <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors inline-flex items-center gap-1.5">
                      {p.name} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : p.name}
                  {(p as any).tag && (
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {(p as any).tag}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barter highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-surface rounded-xl p-6 sm:p-8 text-center max-w-2xl mx-auto"
        >
          <ArrowRightLeft className="w-8 h-8 text-accent mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-bold mb-3">
            Wymiana barterowa wewnątrz ekosystemu
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
            Projekty są komplementarne na tyle, że wymiana wartości odbywa się bezpośrednio — bez zbędnych pośredników i kosztów transakcyjnych. To samowystarczalny organizm gospodarczy odporny na kryzysy.
          </p>
          <Link
            to="/ekosystem"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm sm:text-base"
          >
            <ExternalLink className="w-4 h-4" />
            Zobacz listę projektów i start-upów
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemSection;
