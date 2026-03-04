import { motion } from "framer-motion";
import { Shield, Fingerprint, Globe, Lock, FileCheck, Layers } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Cyfrowy odcisk palca",
    desc: "Unikalna sygnatura Twojej dokumentacji R&D — niepodrabialna i niepowtarzalna.",
  },
  {
    icon: Lock,
    title: "Nieodwracalność",
    desc: "Raz zapisany dowód nie może zostać cofnięty, zmieniony ani usunięty przez nikogo.",
  },
  {
    icon: Fingerprint,
    title: "DNA Twojego pomysłu",
    desc: "Unikalne, niepodrabialne, zawsze przypisane do konkretnego twórcy.",
  },
  {
    icon: Globe,
    title: "Globalny świadek",
    desc: "Rozproszona sieć tysięcy niezależnych serwerów, której nie da się przekupić ani zmanipulować.",
  },
  {
    icon: Shield,
    title: "Niezależność",
    desc: "Nie zależy od opinii instytucji, nie podlega konfliktom interesów.",
  },
  {
    icon: Layers,
    title: "Zgodność z WIPO & EUIPO",
    desc: "Wpisuje się w światowe standardy cyfrowej ochrony własności intelektualnej.",
  },
];

const metaphors = [
  "Cyfrowy sejsmograf prawdy, którego nie da się uciszyć",
  "Matematyczna czarna skrzynka wynalazków",
  "Sąd najwyższy innowacji bez apelacji",
  "Pancerna kapsuła czasu dla pomysłów",
];

const BlockchainSection = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">Technologia MindMark™</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Rozproszony zapis cyfrowy zmienia{" "}
            <span className="text-gradient-primary">zasady gry</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Po raz pierwszy innowator nie musi ufać jedynie systemowi. Może zabezpieczyć się sam 
            — dzięki technologii, która tworzy dowód nie do podrobienia i nie do wymazania.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-surface rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Metaphors */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {metaphors.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-3 glass-surface rounded-lg px-5 py-4"
            >
              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <p className="text-sm font-medium text-secondary-foreground italic">"{m}"</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlockchainSection;
