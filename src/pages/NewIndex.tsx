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
      <header className="pt-28 pb-4" />

      {/* ESG & S-Impact Definition */}
      <section className="container max-w-4xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-5 sm:p-8 md:p-12 overflow-hidden"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Fundament ekosystemu
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Czym jest <span className="text-primary">ESG</span>?
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-6 text-base">
            <strong>ESG</strong> to trzy filary zrównoważonego rozwoju: <strong>E</strong>nvironmental (środowisko), <strong>S</strong>ocial (społeczeństwo), <strong>G</strong>overnance (ład korporacyjny). To nie compliance i nie raport — to sposób myślenia o biznesie, który generuje wartość dla wszystkich interesariuszy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-border/50 bg-card/50 p-5 text-center">
              <span className="text-3xl mb-3 block">🌍</span>
              <h3 className="text-sm font-bold mb-1">E — Environment</h3>
              <p className="text-xs text-muted-foreground">Klimat, zasoby, energia odnawialna, ślad węglowy</p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-5 text-center ring-2 ring-primary/20">
              <span className="text-3xl mb-3 block">🤝</span>
              <h3 className="text-sm font-bold mb-1 text-primary">S — Social Impact</h3>
              <p className="text-xs text-muted-foreground">Ludzie, różnorodność, edukacja, wspólnota, sprawiedliwość</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-5 text-center">
              <span className="text-3xl mb-3 block">⚖️</span>
              <h3 className="text-sm font-bold mb-1">G — Governance</h3>
              <p className="text-xs text-muted-foreground">Transparentność, etyka, ład korporacyjny, odpowiedzialność</p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="text-lg font-bold mb-3">
              Dlaczego stawiamy na <span className="text-primary">S-Impact</span>?
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm mb-4">
              W naszym ekosystemie „S" to nie dodatek — to serce całego systemu. S-Impact oznacza mierzalny, udokumentowany wpływ społeczny. Wykorzystujemy tokenizację i rozproszony zapis cyfrowy jako matematyczny dowód realnych działań społecznych — eliminując social-washing i budując zaufanie oparte na faktach.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✦</span>
                <span>Wspieramy neuroróżnorodność, kobiety w biznesie i innowatorów wykluczonych przez system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✦</span>
                <span>Budujemy mosty międzypokoleniowe — dziecko i babcia uczą się razem</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✦</span>
                <span>Każde działanie społeczne jest tokenizowane — niezmiennie zapisane i weryfikowalne</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✦</span>
                <span>Promujemy markę Polski na arenie międzynarodowej poprzez etyczny biznes</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Definicja Sukcesu w ESG */}
      <section className="container max-w-4xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-background to-primary/5 p-5 sm:p-8 md:p-12 overflow-hidden"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            ESG & Etyka w biznesie
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            Czym jest sukces?
          </h2>
          <blockquote className="border-l-4 border-primary/40 pl-6 mb-6">
            <p className="text-muted-foreground leading-relaxed italic text-base md:text-lg mb-4">
              „Sukcesu nie powinno się mierzyć zajmowaną pozycją ani samym osiągnięciem celu — ale ilością kłód rzucanych pod nogi, które trzeba było pokonać, żeby tam dotrzeć."
            </p>
            <footer className="text-sm text-foreground/80 not-italic">
              <strong className="text-primary">— Ada Margo Marglewska</strong>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Praktyk zrównoważonego biznesu, pedagog, przedsiębiorca · Intrapreneur & Interim Manager · Tworczyni ekosystemu opartego na myśleniu systemowym, Efekcie Wydmy i Gospodarce Fraktalnej · Coach z 20-letnim doświadczeniem · Pisarka, publicystka i innowatorka
              </p>
            </footer>
          </blockquote>
          <p className="text-muted-foreground leading-relaxed mb-6">
            W świecie, gdzie „sukces" definiuje się tytułami, majątkiem i rankingami, zapominamy o tym, co naprawdę buduje wartość: odporność, wytrwałość i zdolność do podnoszenia się po porażkach. Prawdziwy lider ESG to nie ten, kto miał łatwą drogę — to ten, kto mimo przeszkód nie zatracił etyki, nie porzucił wartości i nie przestał pomagać innym.
          </p>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-6">
            <h3 className="text-lg font-bold mb-3 text-primary">
              Po równo nie oznacza sprawiedliwie.
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Inwestowanie w osoby neuroróżnorodne i niepełnosprawne to nie tylko etyka — to strategia wzrostu gospodarczego. Wystarczy stworzyć środowisko, w którym mogą się rozwijać ludzie, którym jest ciężej. Nie chodzi o dawanie wszystkim tego samego — chodzi o dawanie każdemu tego, czego potrzebuje, by wnieść maksymalną wartość. To właśnie jest sprawiedliwość, która napędza innowacje i buduje realną przewagę konkurencyjną.
            </p>
          </div>

          <div className="rounded-xl border border-amber-400/20 bg-amber-500/5 p-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 flex items-start gap-2">
              <span className="text-2xl shrink-0">🇳🇴</span>
              <span>Napisz, dlaczego tak uważasz — i wygraj weekend w Norwegii!</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm mb-4">
              Podziel się swoją definicją sukcesu w kontekście ESG i etyki. Najlepsza odpowiedź wygrywa ekskluzywny weekend w hotelu-coworkingu między Oslo a Bergen (Kongsvegen). Przestrzeń do pracy, natury i inspiracji.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://www.linkedin.com/in/ada-margo-marglewska-31699a251/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-normal text-center text-xs sm:text-sm"
              >
                <ArrowRight className="w-4 h-4 shrink-0" />
                Wyślij swoją odpowiedź
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Projekt: WomenOnBoards.app */}
      <section className="container max-w-4xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-pink-400/20 bg-gradient-to-br from-pink-500/5 via-background to-primary/5 p-5 sm:p-8 md:p-10 text-center overflow-hidden"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-3">
            Projekt ekosystemu
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            <a
              href="https://womenonboards.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              WomenOnBoards.app
            </a>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Czujesz się kobietą. Chcesz zdobyć dobrą pracę. Dołącz na Women on Boards — szkolenia dla członkiń rad nadzorczych, mentoring i społeczność kobiet, które zmieniają biznes.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a
              href="https://womenonboards.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-normal text-xs sm:text-sm"
            >
              <ArrowRight className="w-4 h-4 shrink-0" />
              Dołącz do Women on Boards
            </a>
          </Button>
          <p className="mt-4 text-[11px] text-muted-foreground/70 italic">
            * Projekt wpisuje się w doktrynę ESG z focusem na S-Impact
          </p>
        </motion.div>
      </section>

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
          className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/5 via-background to-sky-500/5 p-4 sm:p-6 md:p-12 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left – content */}
            <div className="flex-1 min-w-0">
              <span className="inline-flex max-w-full items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-wider text-emerald-400 mb-3 sm:mb-4">
                <GraduationCap className="w-4 h-4 shrink-0" />
                Oferta dla Dyrektorów Szkół
              </span>
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-4 leading-[1.15] break-words">
                Wspólnie rozwijajmy przedsiębiorczość w polskich szkołach
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Dyrektorze — z przyjemnością udostępnię Ci gotowy program warsztatów z przedsiębiorczości, 
                dostosuję go do potrzeb Twojej szkoły i przygotuję wymierne wskaźniki rezultatu. 
                Razem pokażemy, że edukacja i biznes mogą iść w parze.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Dyrektorze, Librus to nie problem</strong> na drodze do rozwijania przedsiębiorczości wśród dzieci. Mamy poparcie MRiT. Warsztaty przedsiębiorczości można prowadzić na zaproszenie i wspólnie z nauczycielem zatrudnionym na umowę o pracę.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Zadzwoń i umów warsztaty.</strong> Każdy przedmiot w szkole można poprowadzić tak, aby dziecko zrozumiało, jak tę wiedzę zmonetyzować. Alternatywą jest zorganizowanie dodatkowych godzin.
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
                    className="inline-flex items-center gap-2 text-xs sm:text-sm whitespace-normal text-center"
                  >
                    <ArrowRight className="w-4 h-4 shrink-0" />
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
            <div className="hidden md:block w-64 flex-shrink-0">
              <img
                src={esgPhilosophyPhoto}
                alt="Filozofia ESG — zrównoważony rozwój i innowacje"
                className="w-full h-80 object-cover object-top rounded-xl"
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
