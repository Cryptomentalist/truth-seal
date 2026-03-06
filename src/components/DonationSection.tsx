import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const benefits = [
  {
    icon: "🇳🇴",
    title: "3 dni w Norwegii – gratis",
    desc: (
      <>
        Ekskluzywny pobyt w hotelu-coworkingu między Oslo a Bergen (Kongvegen).
        Przestrzeń do pracy, natury i inspiracji — dla Ciebie.
      </>
    ),
  },
  {
    icon: "🌟",
    title: "Analiza potencjału Twojego dziecka",
    desc: (
      <>
        Odkryjemy talenty, pasje i predyspozycje Twojego dziecka. Konkretny
        plan, jak pokierować jego rozwojem — w stronę biznesu i spełnienia.
      </>
    ),
  },
  {
    icon: "💼",
    title: "Realne wsparcie w biznesie",
    desc: (
      <>
        Pomagamy kobietom, studentom i osobom neuroróżnorodnym zakładać firmy,
        wchodzić we franczyzy i rozwijać się zawodowo — z prawdziwym mentorskim
        wsparciem.
      </>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const DonationSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-foreground animate-pulse"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.15 + Math.random() * 0.35,
            }}
          />
        ))}
      </div>

      <div className="container max-w-[760px] px-6 md:px-10 relative z-10">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <span className="text-3xl">✦</span>
          <span
            className="text-lg tracking-widest"
            style={{ fontFamily: "'Playfair Display', serif", color: "hsl(var(--accent))" }}
          >
            Fundacja Konstelacja.org
          </span>
        </motion.div>

        {/* Urgency badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="mb-8"
        >
          <span
            className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 text-background font-bold text-xs tracking-[0.15em] uppercase px-5 py-2.5"
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)" }}
          >
            ⏳ Tylko do 30 marca · Limitowane miejsca
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Twój 1,5% podatku
          <em className="not-italic block text-accent">zmienia życia.</em>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="text-base font-light text-muted-foreground leading-relaxed max-w-[540px] mb-12"
        >
          I w zamian — zyskujesz coś wyjątkowego dla siebie i swojego dziecka.
          Przekaż 1,5% podatku i odbierz benefity, które naprawdę mają wartość.
        </motion.p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-10" />

        {/* Benefits title */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
          className="text-xs tracking-[0.2em] uppercase text-accent mb-7"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Co zyskujesz
        </motion.p>

        {/* Benefits */}
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5 + i}
            className="grid grid-cols-[56px_1fr] gap-5 items-start mb-8"
          >
            <div className="w-14 h-14 border border-accent/30 rounded bg-accent/5 flex items-center justify-center text-[26px] flex-shrink-0">
              {b.icon}
            </div>
            <div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {b.title}
              </h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {b.desc}
              </p>
            </div>
          </motion.div>
        ))}

        {/* KRS Box */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={8}
          className="relative border border-accent/25 bg-gradient-to-br from-accent/[0.03] to-accent/[0.015] px-9 py-8 my-11"
        >
          <div className="absolute -top-px left-[30px] w-[60px] h-0.5 bg-accent" />
          <p className="text-[11px] tracking-[0.18em] uppercase text-accent mb-2">
            Numer KRS
          </p>
          <p
            className="text-3xl md:text-4xl font-black tracking-wide mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            0000270261
          </p>
          <p className="text-xs text-muted-foreground tracking-wide">
            Cel szczegółowy:{" "}
            <span className="text-foreground font-medium">
              KONSTELACJA ORG 24177
            </span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={9}
          className="text-center"
        >
          <p className="text-xs tracking-[0.12em] uppercase text-amber-600 font-semibold mb-5">
            🔥 Oferta ważna do 30 marca — liczba miejsc limitowana
          </p>
          <p
            className="text-2xl leading-snug mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Wypełnij PIT, wpisz numer KRS
            <br />i prześlij nam potwierdzenie.
          </p>
          <p className="text-sm text-muted-foreground font-light mb-8">
            Odezwiemy się z wszystkimi szczegółami. To naprawdę takie proste.
          </p>
          <a
            href="https://www.podatki.gov.pl/pit/twoj-e-pit/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-amber-700 via-amber-500 to-accent text-background font-bold text-sm tracking-[0.14em] uppercase px-11 py-4 shadow-[0_0_30px_hsl(var(--accent)/0.2)] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_hsl(var(--accent)/0.35)] transition-all"
          >
            Przekaż 1,5% teraz
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={10}
          className="mt-16 pt-7 border-t border-border/10 flex justify-between items-center"
        >
          <span
            className="text-sm text-accent"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Konstelacja.org × fsmm.pl
          </span>
          <span className="text-xs text-muted-foreground/30 tracking-wide">
            constellation.love
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationSection;
