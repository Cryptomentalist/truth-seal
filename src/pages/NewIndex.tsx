import { motion } from "framer-motion";
import { ExternalLink, Heart, Calendar, Linkedin, GraduationCap, BarChart3, Award, ArrowRight } from "lucide-react";
import adaMargoPhoto from "@/assets/ada-margo.jpg";
import { Button } from "@/components/ui/button";

import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import StarsRoadmap from "@/components/StarsRoadmap";
import DonationSection from "@/components/DonationSection";

const projectColors = [
  "from-rose-500/20 to-rose-600/10 border-rose-400/30",
  "from-amber-500/20 to-amber-600/10 border-amber-400/30",
  "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30",
  "from-violet-500/20 to-violet-600/10 border-violet-400/30",
  "from-blue-500/20 to-blue-600/10 border-blue-400/30",
  "from-cyan-500/20 to-cyan-600/10 border-cyan-400/30",
  "from-pink-500/20 to-pink-600/10 border-pink-400/30",
  "from-orange-500/20 to-orange-600/10 border-orange-400/30",
  "from-teal-500/20 to-teal-600/10 border-teal-400/30",
  "from-indigo-500/20 to-indigo-600/10 border-indigo-400/30",
  "from-lime-500/20 to-lime-600/10 border-lime-400/30",
  "from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-400/30",
  "from-yellow-500/20 to-yellow-600/10 border-yellow-400/30",
  "from-sky-500/20 to-sky-600/10 border-sky-400/30",
  "from-red-500/20 to-red-600/10 border-red-400/30",
  "from-green-500/20 to-green-600/10 border-green-400/30",
  "from-purple-500/20 to-purple-600/10 border-purple-400/30",
  "from-stone-500/20 to-stone-600/10 border-stone-400/30",
];

const badgeColors = [
  "bg-rose-500/20 text-rose-300",
  "bg-amber-500/20 text-amber-300",
  "bg-emerald-500/20 text-emerald-300",
  "bg-violet-500/20 text-violet-300",
  "bg-blue-500/20 text-blue-300",
  "bg-cyan-500/20 text-cyan-300",
  "bg-pink-500/20 text-pink-300",
  "bg-orange-500/20 text-orange-300",
  "bg-teal-500/20 text-teal-300",
  "bg-indigo-500/20 text-indigo-300",
  "bg-lime-500/20 text-lime-300",
  "bg-fuchsia-500/20 text-fuchsia-300",
  "bg-yellow-500/20 text-yellow-300",
  "bg-sky-500/20 text-sky-300",
  "bg-red-500/20 text-red-300",
  "bg-green-500/20 text-green-300",
  "bg-purple-500/20 text-purple-300",
  "bg-stone-500/20 text-stone-300",
];

const projects = [
  { step: 1, name: "Rejestruj.biz", domain: "https://rejestruj.biz", desc: "Bezpieczna rejestracja firmy lub franczyzy wspierana przez MRiT." },
  { step: 2, name: "Warsztaty Biznesowe", domain: "#", desc: "Warsztaty z wdrażania narzędzi biznesowych i case studies przedsiębiorczości." },
  { step: 3, name: "ESG.legal", domain: "https://esg.legal", desc: "Audyty i certyfikacja ESG, doradztwo w zakresie zrównoważonego rozwoju." },
  { step: 4, name: "GOD.legal", domain: "https://god.legal", desc: "Artificial Superintelligence — Global Omniverse Developers." },
  { step: 5, name: "HIT.legal", domain: "https://hit.legal", desc: "Holding Innowacji Technologicznych — ochrona i komercjalizacja technologii." },
  { step: 6, name: "Pre-Patent", domain: "#", desc: "Ochrona własności intelektualnej — certyfikaty PRE-PATENT i PRE-COURT." },
  { step: 7, name: "RadaKobiet.eu", domain: "https://radakobiet.eu", desc: "Szkolenia dla kobiet przygotowujące do egzaminu na członkinie rad nadzorczych." },
  { step: 8, name: "Fractaleco.com", domain: "https://fractaleco.com", desc: "Optymalizacja modelu biznesowego i fraktalna analiza ekosystemu." },
  { step: 9, name: "Intrapreneurs.app", domain: "https://intrapreneurs.app", desc: "Platforma liderów-intrapreneurów — serce ekosystemu rekrutacyjnego." },
  { step: 10, name: "AIagent.gratis", domain: "https://aiagent.gratis", desc: "Środowisko i marketplace autonomicznych agentów AI." },
  { step: 11, name: "CampusAI.ai", domain: "https://campusai.ai", desc: "Edukacja i szkolenia AI — akademia kompetencji przyszłości." },
  { step: 12, name: "GrantToken", domain: "#", desc: "Strategia grantowa i tokenizacja — finansowanie innowacji." },
  { step: 13, name: "BarterChain", domain: "#", desc: "Blockchain wymiana wartości — barter nowej generacji." },
  { step: 14, name: "MindMark HR", domain: "#", desc: "Narzędzie HR do ochrony pomysłów i raportowania wkładu intelektualnego." },
  { step: 15, name: "Constellation.love", domain: "https://constellation.love", desc: "Hub koordynujący ekosystem — sprzedaż i model ACECRA." },
  { step: 16, name: "Gentleman Agreement Club", domain: "#", desc: "Rozwój zespołu, mentoring i kultura oparta na zaufaniu." },
  { step: 17, name: "FUTU.BE", domain: "#", desc: "Modele Biznesowe — hybrydowy ekosystem Smart Business Village z tokenizacją, CBR i Metawersum." },
  { step: 18, name: "Monitoring & Iteracja", domain: "#", desc: "KPI, feedback i ciągła optymalizacja ekosystemu." },
];

const NewIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />
      {/* Logo + Header */}
      <header className="pt-28 pb-8 flex flex-col items-center gap-6">
        <motion.p
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Stars Roadmap: 18 Steps to Scale Your Invention. Dołącz do samowystarczalnego antykryzysowego ekosystemu z Gentleman Agreement Club i poczuj korzyści oraz wsparcie na każdym etapie rozwoju. Dla inwestorów, innowatorów i start-upów w każdym wieku. Zarabiaj z nami, doświadczaj, integruj się, ucz się i kochaj!
        </motion.p>
      </header>

      {/* Roadmap connector line */}
      <div className="container max-w-7xl px-4 pb-20">
        {/* Horizontal scrollable roadmap */}
        <div className="relative">
          {/* Progress line */}
          <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-0.5 bg-border z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {projects.map((p, i) => (
              <motion.a
                key={p.step}
                href={p.domain}
                target={p.domain !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative flex flex-col rounded-xl border p-4 transition-all hover:shadow-lg bg-gradient-to-br ${projectColors[i]} ${
                  p.domain === "#"
                    ? "opacity-60 cursor-default"
                    : "cursor-pointer hover:scale-[1.03]"
                }`}
              >
                {/* Step badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center font-mono ${badgeColors[i]}`}>
                    {p.step}
                  </span>
                  {p.domain !== "#" && (
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors ml-auto" />
                  )}
                </div>

                {/* Name */}
                <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">
                  {p.name}
                </h3>

                {/* Domain */}
                {p.domain !== "#" && (
                  <span className="text-[11px] font-mono text-accent/70 mb-2 truncate">
                    {p.domain.replace("https://", "")}
                  </span>
                )}

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                  {p.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Fundacja Konstelacja.org */}
      <section className="container max-w-4xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-10 text-center"
        >
          <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <a
              href="https://konstelacja.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Konstelacja.org
            </a>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Misją naszej fundacji jest promowanie marki Polski na arenie międzynarodowej. Budujemy mosty międzypokoleniowe, pokazujemy potencjał w neuroróżnorodności. Tworzymy innowacyjne modele biznesowe dla podniesienia jakości i wzrostu gospodarczego. Kreujemy narzędzia dla szybszego wdrażania 17 SDGs i działamy z fokusem na S-impact w obszarach ESG.
          </p>
          <a
            href="https://konstelacja.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            Odwiedź konstelacja.org
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* CTA – Warsztaty z Adą Margo */}
      <section className="container max-w-5xl px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-background to-primary/5 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-0">
            {/* Photo */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <img
                src={adaMargoPhoto}
                alt="Ada Margo Marglewska — prowadząca warsztaty z przedsiębiorczości"
                className="w-full h-72 md:h-full object-cover object-top"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:p-10 text-center md:text-left">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                Warsztaty & Szkolenia
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Poprowadzę warsztaty z przedsiębiorczości dla Twojego zespołu
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Jestem Ada Margo Marglewska — buduję ekosystem innowacji od ponad dekady. Prowadzę warsztaty z wdrażania narzędzi biznesowych, case studies przedsiębiorczości i strategii antykryzysowych. Dla dyrektorów, menedżerów i zespołów, które chcą rosnąć.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://www.linkedin.com/in/ada-margo-marglewska-31699a251/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Umów warsztaty
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://www.linkedin.com/in/ada-margo-marglewska-31699a251/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Oferta dla Dyrektorów Szkół */}
      <section className="container max-w-5xl px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/5 via-background to-sky-500/5 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left – content */}
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
                <GraduationCap className="w-4 h-4" />
                Oferta dla Dyrektorów Szkół
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Wspólnie budujmy przedsiębiorczość w polskich szkołach
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Dyrektorze — z przyjemnością udostępnię Ci gotowy program warsztatów z przedsiębiorczości, 
                dostosuję go do potrzeb Twojej szkoły i przygotuję wymierne wskaźniki rezultatu. 
                Razem pokażemy, że edukacja i biznes mogą iść w parze.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
                  <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold mb-1">Gotowy program</h4>
                  <p className="text-xs text-muted-foreground">Sprawdzony program warsztatowy do wdrożenia w Twojej szkole</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
                  <BarChart3 className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold mb-1">Wskaźniki rezultatu</h4>
                  <p className="text-xs text-muted-foreground">Przygotowane KPI i mierzalne efekty dla raportu i ewaluacji</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
                  <Award className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold mb-1">Promocja liderów</h4>
                  <p className="text-xs text-muted-foreground">Wypromujemy dyrektorów, którzy budują przedsiębiorczość w Polsce</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://www.linkedin.com/in/ada-margo-marglewska-31699a251/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Napisz do mnie — udostępnię program
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://www.linkedin.com/in/ada-margo-marglewska-31699a251/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            {/* Right – photo */}
            <div className="w-full md:w-64 flex-shrink-0">
              <img
                src={adaMargoPhoto}
                alt="Ada Margo Marglewska"
                className="w-full h-64 md:h-80 object-cover object-top rounded-xl"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stars Roadmap visual */}
      <StarsRoadmap />
    </div>
  );
};

export default NewIndex;
