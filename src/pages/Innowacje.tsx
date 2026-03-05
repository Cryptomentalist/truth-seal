import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Atom, Zap, Sun, Thermometer, Battery, Layers, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const Innowacje = () => (
  <div className="min-h-screen bg-background">
    <TopBanner />
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-16 section-padding">
      <div className="container max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-mono text-accent uppercase tracking-widest"
        >
          R&D · Deep-Tech
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mt-4 mb-6"
        >
          Innowacje <span className="text-primary">Constellation</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
        >
          Kompozyt kwantowy SQLaminate, korty piezoelektryczne i hybryda energetyczna — technologie, które łączą sport, architekturę i zrównoważoną energię.
        </motion.p>
      </div>
    </section>

    {/* Quantum Composite BIPV */}
    <section className="section-padding bg-muted/30">
      <div className="container max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <motion.div custom={0} variants={fade}>
            <span className="inline-flex items-center gap-2 text-xs font-mono text-primary mb-4 uppercase tracking-widest">
              <Atom className="w-4 h-4" /> Kompozyt Kwantowy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              SQLaminate — BIPV nowej generacji
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>SQLaminate</strong> to autorski kompozyt kwantowy opracowany w ramach ekosystemu Constellation. Łączy właściwości strukturalne laminatu z warstwą fotowoltaiczną opartą na kropkach kwantowych (Quantum Dots), tworząc materiał budowlany, który jednocześnie generuje energię ze światła rozproszonego.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              W technologii <strong>BIPV</strong> (Building-Integrated Photovoltaics) SQLaminate zastępuje tradycyjne panele słoneczne — stając się integralną częścią fasady, dachu lub powłoki budynku. Dzięki temu budynek nie „nosi" paneli, lecz <em>sam jest panelem</em>.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { icon: Sun, text: "Generuje energię ze światła rozproszonego (nie wymaga pełnego nasłonecznienia)" },
                { icon: Layers, text: "Ultra-lekki i elastyczny — idealny do złożonych form architektonicznych" },
                { icon: Zap, text: "Ochrona UV/IR z jednoczesną produkcją energii" },
                { icon: Battery, text: "Skalowalny — od jachtów po budynki biurowe i infrastrukturę kosmiczną" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={1} variants={fade} className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 border border-border/50 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <Atom className="w-20 h-20 text-primary/60 mx-auto mb-4" />
                <p className="text-lg font-bold mb-2">SQLaminate</p>
                <p className="text-xs text-muted-foreground">Quantum Dot Composite · BIPV Layer</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="glass-surface rounded-lg p-3">
                    <Sun className="w-5 h-5 text-primary mx-auto mb-1" />
                    Diffused Light Harvesting
                  </div>
                  <div className="glass-surface rounded-lg p-3">
                    <Layers className="w-5 h-5 text-primary mx-auto mb-1" />
                    Structural + PV
                  </div>
                  <div className="glass-surface rounded-lg p-3">
                    <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                    UV/IR Shield
                  </div>
                  <div className="glass-surface rounded-lg p-3">
                    <Thermometer className="w-5 h-5 text-primary mx-auto mb-1" />
                    Thermal Mgmt
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Capsule Piezo Courts */}
    <section className="section-padding">
      <div className="container max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span custom={0} variants={fade} className="text-sm font-mono text-accent uppercase tracking-widest">
            Capsule Piezo Courts · 3RenEnergy
          </motion.span>
          <motion.h2 custom={1} variants={fade} className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Korty do squasha jako hybryda energetyczna
          </motion.h2>
          <motion.p custom={2} variants={fade} className="text-muted-foreground max-w-2xl mx-auto">
            Pierwszy na świecie kort do squasha zamknięty w kapsule, generujący energię z każdego ruchu graczy — trzy odnawialne źródła energii w jednym obiekcie sportowym.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src="/images/squash-capsule-hero.jpg"
            alt="Capsule Piezo Court – widok z góry"
            className="rounded-2xl w-full object-cover aspect-video border border-border/30"
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            src="/images/squash-capsule-interior.jpg"
            alt="Capsule Piezo Court – przekrój"
            className="rounded-2xl w-full object-cover aspect-video border border-border/30"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Zap,
              title: "Powłoka piezoelektryczna",
              desc: "Podłoga kortu konwertuje energię kinetyczną kroków graczy i uderzeń piłki na prąd. Jednocześnie mapuje aktywność gracza do zaawansowanej analityki sportowej.",
            },
            {
              icon: Sun,
              title: "Kapsuła SQLaminate",
              desc: "Szklana powłoka z kompozytu kwantowego generuje energię ze światła rozproszonego, chroni przed UV/IR i stanowi ultra-lekki, wytrzymały materiał konstrukcyjny.",
            },
            {
              icon: Thermometer,
              title: "Termogenerator grafenowy (GTG)",
              desc: "Elastyczne ogniwo termoelektryczne na bazie grafenu produkuje energię z różnic temperatur. Zintegrowane z wentylacją, odzyskuje energię cieplną kortu.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fade}
              className="glass-surface rounded-xl p-6 border border-border/30"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 glass-surface rounded-xl p-6 border border-primary/20 text-center"
        >
          <Battery className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Cała energia generowana przez kort jest magazynowana w dedykowanym pomieszczeniu technicznym i może być dystrybuowana do sieci budynku lub miejskiej sieci energetycznej. Projekt wspierany grantem R&D 260 000 PLN z PARP — gotowy do wdrożenia.
          </p>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-muted/30">
      <div className="container max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Zainteresowany współpracą technologiczną?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-8"
        >
          Szukamy partnerów i inwestorów do współwłasności technologii, licencjonowania lub modelu tokenizacji.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="/documents/capsule-piezo-courts.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Pobierz dokumentację PDF
            </Button>
          </a>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Innowacje;
