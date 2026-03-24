import { motion } from "framer-motion";
import { ExternalLink, Heart, Calendar, Linkedin, GraduationCap, BarChart3, Award, ArrowRight } from "lucide-react";
import adaMargoPhoto from "@/assets/ada-margo.jpg";
import esgPhilosophyPhoto from "@/assets/esg-philosophy.jpg";
import { Button } from "@/components/ui/button";

import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import DonationSection from "@/components/DonationSection";
import FractalEconomySection from "@/components/FractalEconomySection";

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

      {/* Donation 1.5% */}
      <DonationSection />

      {/* Gospodarka Fraktalna & Efekt Wydmy */}
      <FractalEconomySection />

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
                src={esgPhilosophyPhoto}
                alt="Filozofia ESG — zrównoważony rozwój i innowacje"
                className="w-full h-64 md:h-80 object-cover object-top rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default NewIndex;
