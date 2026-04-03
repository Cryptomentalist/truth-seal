import { motion } from "framer-motion";
import { Layers, Search, Link2, Rocket, TrendingUp, Quote, Gem, Users, Globe, Sparkles } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const pyramidLevels = [
  {
    level: 5,
    label: "MULTIPLIED VALUE",
    color: "from-yellow-500/20 to-yellow-600/10 border-yellow-400/40",
    badge: "bg-yellow-500/20 text-yellow-300",
    icon: TrendingUp,
    items: ["Scale", "New markets", "Exponential growth"],
  },
  {
    level: 4,
    label: "CONNECTED ASSETS",
    color: "from-blue-500/20 to-blue-600/10 border-blue-400/40",
    badge: "bg-blue-500/20 text-blue-300",
    icon: Link2,
    items: ["Collaboration", "Integration", "Ecosystem"],
  },
  {
    level: 3,
    label: "DORMANT ASSETS",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/40",
    badge: "bg-emerald-500/20 text-emerald-300",
    icon: Gem,
    items: ["Inactive projects", "Unused resources", "Fragmented ideas"],
  },
  {
    level: 2,
    label: "HIDDEN ASSETS",
    color: "from-violet-500/20 to-violet-600/10 border-violet-400/40",
    badge: "bg-violet-500/20 text-violet-300",
    icon: Users,
    items: ["Human potential", "Relationships", "Knowledge", "Data"],
  },
  {
    level: 1,
    label: "VISIBLE ASSETS",
    color: "from-rose-500/20 to-rose-600/10 border-rose-400/40",
    badge: "bg-rose-500/20 text-rose-300",
    icon: Layers,
    items: ["Capital", "Products", "Infrastructure"],
  },
];

const operationalSteps = [
  {
    step: 1,
    title: "Selection",
    icon: Search,
    desc: "Wybieramy projekty nie tylko pod kątem potencjału, ale przede wszystkim: wartości, mentalności i sposobu myślenia.",
  },
  {
    step: 2,
    title: "Structuring",
    icon: Layers,
    desc: "Nadajemy kierunek, model i logikę — budujemy strukturę, która ma sens.",
  },
  {
    step: 3,
    title: "Connection",
    icon: Link2,
    desc: "Łączymy projekty, ludzi i zasoby w spójne, wzajemnie wzmacniające się konfiguracje.",
  },
  {
    step: 4,
    title: "Activation",
    icon: Rocket,
    desc: "Jeśli trzeba — wchodzimy jako intrapreneur, interim lub strateg. Działamy od wewnątrz.",
  },
  {
    step: 5,
    title: "Multiplication",
    icon: TrendingUp,
    desc: "Efekt: skala, nowe rynki, wartość. Nie rozwijamy wszystkiego sami — tworzymy system, który rozwija innych.",
  },
];

const PolishAssets = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="PolishAssets" description="Polska platforma waloryzacji aktywów — piramida wartości, tokenizacja i promocja polskich innowacji na arenie międzynarodowej." path="/polishassets" />
      <TopBanner />
      <Navbar />

      {/* Hero */}
      <header className="pt-28 pb-16 container max-w-4xl px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            polishassets.com
          </span>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6">
            Ada Margo Assets
            <span className="block text-accent">Framework™</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            System identyfikacji, aktywacji i mnożenia wartości ukrytych aktywów — dla inwestorów, innowatorów i ekosystemów.
          </p>
        </motion.div>
      </header>

      {/* Pyramid Diagram */}
      <section className="container max-w-3xl px-4 pb-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-accent text-center mb-10"
        >
          Assets Pyramid — 5 Levels
        </motion.h2>

        <div className="flex flex-col gap-3">
          {pyramidLevels.map((level, i) => {
            const Icon = level.icon;
            // Pyramid narrowing effect
            const widthClass = [
              "max-w-[340px]", // level 5 - top (narrowest)
              "max-w-[440px]",
              "max-w-[540px]",
              "max-w-[640px]",
              "max-w-full", // level 1 - base (widest)
            ][i];

            return (
              <motion.div
                key={level.level}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`mx-auto w-full ${widthClass} rounded-xl border p-5 bg-gradient-to-br ${level.color}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${level.badge}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${level.badge}`}>
                        Level {level.level}
                      </span>
                      <h3 className="text-sm font-bold">{level.label}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {level.items.map((item) => (
                        <span key={item} className="text-xs text-muted-foreground bg-card/50 px-2.5 py-1 rounded-full border border-border/50">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Framework quote */}
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={6}
          className="mt-12 text-center border-t border-b border-accent/20 py-8"
        >
          <Quote className="w-6 h-6 text-accent mx-auto mb-3 opacity-50" />
          <p className="text-lg sm:text-xl font-semibold italic leading-relaxed max-w-xl mx-auto">
            Most people manage assets.
            <br />
            I design systems that activate and multiply them.
          </p>
          <cite className="block mt-3 text-sm text-accent not-italic font-medium">
            — Ada Margo Marglewska
          </cite>
        </motion.blockquote>
      </section>

      {/* Operational Model */}
      <section className="container max-w-4xl px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            Model operacyjny
          </span>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight mb-4">
            PolishAssets
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            PolishAssets is not a platform. It is a system that identifies assets, evaluates their potential, and connects them into value-generating structures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {operationalSteps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border border-accent/20 bg-gradient-to-b from-accent/5 to-transparent p-5 text-center relative"
              >
                {i < operationalSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2.5 text-accent/40 text-lg">→</div>
                )}
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent/70">{s.step}.</span>
                <h3 className="text-sm font-bold mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={6}
          className="text-center mt-8 text-sm text-muted-foreground font-medium border border-accent/20 rounded-lg p-4 bg-accent/5"
        >
          <Sparkles className="w-4 h-4 inline-block text-accent mr-1.5" />
          Nie rozwijamy wszystkiego sami — tworzymy <strong className="text-foreground">system, który rozwija innych</strong>.
        </motion.p>
      </section>

      {/* Konstelacja — Nadrzędny System */}
      <section className="container max-w-4xl px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <Globe className="w-8 h-8 text-primary mx-auto mb-4" />
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Nadrzędny system
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Konstelacja
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              PolishAssets is coordinated by the <strong className="text-foreground">Constellation ecosystem</strong> (konstelacja.org / constellation.love), which acts as a central system integrating projects, companies, and value-driven initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-border/50 bg-card/50 p-5 text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Definicja</h4>
              <p className="text-sm text-muted-foreground">
                To NIE jest fundacja „zbierająca środki". To jest <strong className="text-foreground">centrum koordynacji systemu</strong>.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-5 text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Co robi</h4>
              <p className="text-sm text-muted-foreground">
                Łączy start-upy, firmy, inicjatywy i ludzi. Tworzy <strong className="text-foreground">środowisko wzajemnego wzmacniania</strong>.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-5 text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Selekcja</h4>
              <p className="text-sm text-muted-foreground">
                Firmy wybierane pod kątem <strong className="text-foreground">wartości i mentalności</strong>, nie tylko komplementarności zasobów.
              </p>
            </div>
          </div>

          <blockquote className="text-center border-t border-primary/20 pt-6">
            <p className="text-base sm:text-lg italic leading-relaxed max-w-lg mx-auto text-muted-foreground">
              In a fragmented world, being "everything" means being nothing.
              <br />
              But within a system, <strong className="text-foreground">complexity becomes strength</strong>.
            </p>
            <p className="mt-4 text-sm text-foreground/80 max-w-lg mx-auto">
              W myśleniu systemowym kompleksowość nie oznacza chaosu — oznacza jakość wynikającą z właściwego połączenia elementów.
            </p>
          </blockquote>
        </motion.div>
      </section>

      {/* Filozofia — Fundament */}
      <section className="container max-w-3xl px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
            Filozofia — Fundament
          </span>

          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-accent/20 font-serif leading-none">"</div>
            <p className="text-lg sm:text-xl leading-relaxed italic text-foreground/90 max-w-2xl mx-auto pt-6">
              Wyrzeźbione przez czas i okoliczności, każde ziarnko piasku jest unikalne.
              Ale tylko w połączeniu z innymi ziarnkami tworzy piasek — a z piasku może powstać wydma na pustyni,
              struktura, która potrafi zmieniać krajobraz.
              <br /><br />
              W różnorodności tkwi nasza siła, a jedność daje nam moc do tworzenia lepszego świata.
            </p>
            <cite className="block mt-6 text-sm text-accent not-italic font-semibold">
              — Ada Margo Marglewska
            </cite>
          </blockquote>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="rounded-lg border border-border/50 bg-card/50 p-3 text-center">
              <span className="text-xl mb-1 block">🏜️</span>
              <p className="text-[11px] text-muted-foreground">Pojedynczy projekt = ziarnko</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-card/50 p-3 text-center">
              <span className="text-xl mb-1 block">⏳</span>
              <p className="text-[11px] text-muted-foreground">Ekosystem = piasek</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-card/50 p-3 text-center">
              <span className="text-xl mb-1 block">🌍</span>
              <p className="text-[11px] text-muted-foreground">System = wydma zmieniająca krajobraz</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final Statement */}
      <section className="container max-w-3xl px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 p-8 md:p-12 text-center"
        >
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-black mb-4">
            To nie jest projekt. To nie jest startup.
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-accent mb-6">
            To jest nowa kategoria myślenia.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">✔ Assets Framework</span>
            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">✔ Model operacyjny</span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">✔ System Konstelacja</span>
            <span className="px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-400/20">✔ Filozofia jako fundament</span>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default PolishAssets;
