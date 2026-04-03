import { motion } from "framer-motion";
import { Lightbulb, Compass, Waves, Zap, Brain, ArrowRight } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const facts = [
  {
    icon: Waves,
    title: "Efekt Wydmy",
    content:
      "Pojedynczy projekt to ziarnko piasku. Ekosystem to piasek. Zintegrowany system — Konstelacja + PolishAssets — to wydma, która potrafi zmieniać krajobraz. Złożoność staje się siłą, gdy elementy są komplementarne.",
    accent: "accent" as const,
  },
  {
    icon: Brain,
    title: "Gospodarka Fraktalna",
    content:
      'W rozdrobnionym świecie bycie \u201Ewszystkim\u201D oznacza bycie niczym. Ale w systemie \u2014 kompleksowość oznacza jakość wynikającą z właściwego połączenia elementów. Różnorodność daje moc do tworzenia lepszego świata.',
    accent: "primary" as const,
  },
  {
    icon: Zap,
    title: "Dual Use: Inwestor = Klient",
    content:
      "W naszym ekosystemie inwestor jest jednocześnie klientem. To minimalizuje ryzyko biznesowe i eliminuje konflikt interesów — bo sukces klienta jest automatycznie sukcesem inwestora.",
    accent: "accent" as const,
  },
  {
    icon: Lightbulb,
    title: "Po równo ≠ sprawiedliwie",
    content:
      "Sprawiedliwość to nie dawanie każdemu tego samego — to dawanie każdemu tego, czego potrzebuje. W ekosystemie dopasowujemy wsparcie do umysłu, nie umysł do systemu. Neuroróżnorodność to przewaga, nie ograniczenie.",
    accent: "primary" as const,
  },
];

const Ciekawostki = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBanner />
      <Navbar />

      <header className="pt-28 pb-12 text-center container max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            Myślenie systemowe
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Ciekawostki <span className="text-primary">&</span> Filozofia
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Jak myślimy, czym się inspirujemy i dlaczego budujemy inaczej niż wszyscy.
            Przekonujemy by myśleć systemowo i komplementarnie — podnosząc jakość i dostępność.
          </p>
        </motion.div>
      </header>

      {/* Main Blue Ocean quote */}
      <section className="container max-w-4xl px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-10 text-center"
        >
          <Compass className="w-10 h-10 text-primary mx-auto mb-4" />
          <blockquote className="text-lg sm:text-xl md:text-2xl font-bold leading-snug mb-4">
            „Myśl lateralnie. Nie wertykalnie.{" "}
            <span className="text-primary">Twórz Blue Ocean</span> zamiast kopiować ten czerwony."
          </blockquote>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Większość tworzy agentów AI. Czego brakuje? <strong className="text-foreground">Środowiska i infrastruktury</strong> dla tych agentów.
            Nie konkuruj w zatłoczonym oceanie — stwórz nowy, w którym zasady gry ustala innowator.
          </p>
        </motion.div>
      </section>

      {/* Facts grid */}
      <section className="container max-w-5xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card/50 p-6 sm:p-8 hover:border-primary/30 transition-colors"
            >
              <fact.icon className={`w-7 h-7 mb-3 ${fact.accent === "primary" ? "text-primary" : "text-accent"}`} />
              <h3 className="text-lg font-bold mb-2">{fact.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{fact.content}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="/projekty"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors text-sm"
          >
            Zobacz nasze projekty
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Ciekawostki;
