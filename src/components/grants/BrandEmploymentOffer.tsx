import { motion } from "framer-motion";
import { UserCheck, Shield, CheckCircle2, ArrowRight, Briefcase, Star } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Shield, title: "Silna marka", desc: "Działasz pod rozpoznawalną marką ekosystemu AI Venture Integrator — bez ryzyka budowania własnej od zera." },
  { icon: Star, title: "Gotowe narzędzia", desc: "Dostęp do wszystkich narzędzi ekosystemu: MindMark HR, BarterChain, B+R Lab i wsparcie operacyjne." },
  { icon: CheckCircle2, title: "Filtr kompetencji", desc: "Weryfikujemy Twoje umiejętności i dopasowujemy Cię do projektów, w których możesz dać z siebie najlepsze." },
  { icon: Briefcase, title: "Bez własnej firmy", desc: "Nie musisz zakładać działalności gospodarczej — pracujesz na zasadach współpracy z ekosystemem." },
];

const BrandEmploymentOffer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-20"
    >
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
        <span className="w-1.5 h-7 rounded-full bg-primary inline-block" />
        Pracuj pod naszą marką
      </h2>
      <p className="text-sm text-muted-foreground mb-8 ml-5">
        Nie chcesz otwierać własnej działalności? Przejdź przez nasz filtr kompetencji i działaj w ramach ekosystemu.
      </p>

      <div className="glass-surface rounded-2xl p-6 sm:p-8 border border-primary/15">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Oferta dla specjalistów</h3>
            <p className="text-xs text-muted-foreground">Bez JDG — z pełnym wsparciem ekosystemu</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Jeśli posiadasz kompetencje, ale nie chcesz zakładać własnej firmy — możesz pracować pod marką 
          <span className="text-accent font-semibold"> AI Venture Integrator</span>. Wystarczy, że przejdziesz 
          przez nasz filtr kompetencji i dopasujemy Cię do projektów ekosystemu. Otrzymujesz wsparcie 
          operacyjne, prawne i dostęp do całej infrastruktury — bez ryzyka i biurokracji.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
              className="flex gap-3 items-start p-3 rounded-lg bg-primary/5 border border-primary/10"
            >
              <b.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold block">{b.title}</span>
                <span className="text-[10px] text-muted-foreground leading-relaxed">{b.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/#kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors text-sm"
          >
            Aplikuj — filtr kompetencji
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://intrapreneurs.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            lub dołącz przez intrapreneurs.app →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandEmploymentOffer;
