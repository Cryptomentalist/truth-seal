import { motion } from "framer-motion";
import { ArrowLeft, Volume2, ShieldCheck, Rocket, ArrowRightLeft, Network, Users, Heart, HandCoins, MessageCircleHeart, Globe, Sparkles, HeartHandshake, Bot, Building2, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const GlossaryTerm = ({ term, explanation, children }: { term?: string; explanation: string; children: React.ReactNode }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="underline decoration-accent/50 decoration-dotted underline-offset-4 cursor-help text-accent font-semibold hover:decoration-accent transition-colors">
        {children}
      </span>
    </TooltipTrigger>
    <TooltipContent side="top" className="max-w-xs text-sm leading-relaxed bg-card border-border/80 p-4">
      {term && <strong className="block mb-1 text-primary">{term}</strong>}
      {explanation}
    </TooltipContent>
  </Tooltip>
);

const projects = [
  {
    icon: HeartHandshake,
    name: "intrapreneurs.app",
    desc: "Serce ekosystemu — platforma łącząca intrapreneurów z projektami. Każdy projekt może wybrać specjalistę z aplikacji i zyskać wsparcie kompetencyjne bez zbędnej biurokracji.",
    link: "https://intrapreneurs.app",
    highlight: true,
  },
  {
    icon: Bot,
    name: "AIagent.gratis",
    desc: "Środowisko i baza komplementarności dla Agentów AI — otwarta przestrzeń, w której autonomiczne agenty znajdują się nawzajem, współpracują i uzupełniają kompetencje. Marketplace przyszłości, gotowy na eksplozję agentów AI.",
    link: "https://aiagent.gratis",
    highlight: true,
  },
  {
    icon: ShieldCheck,
    name: "InventorProof",
    desc: "Ochrona własności intelektualnej z cyfrowym dowodem autorstwa — bez patentów, bez prawników, w kilka minut.",
  },
  {
    icon: Rocket,
    name: "AI Start-up Studio",
    desc: "Inkubacja i akceleracja projektów opartych o sztuczną inteligencję. Wspieramy od pomysłu do rynku.",
  },
  {
    icon: ArrowRightLeft,
    name: "BarterChain",
    desc: "Wymiana wartości i usług między projektami ekosystemu — bez pośredników i kosztów transakcyjnych.",
  },
  {
    icon: MessageCircleHeart,
    name: "GenBridge",
    desc: "Komunikacja międzypokoleniowa — budujemy mosty między generacjami, łącząc doświadczenie z innowacją.",
    link: "#",
  },
  {
    icon: Network,
    name: "Kolejne projekty",
    desc: "Każdy nowy projekt uzupełnia pozostałe, tworząc samowystarczalny organizm gospodarczy odporny na kryzysy.",
  },
];

const Ekosystem = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/50">
        <div className="container flex items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Powrót</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <span className="font-bold text-sm sm:text-base">
            AI Venture Anticrisis <span className="text-accent">Integrator</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-accent uppercase tracking-widest">
              Ekosystem
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              AI Venture Anticrisis{" "}
              <span className="text-gradient-primary">Integrator</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
              Samowystarczalny{" "}
              <GlossaryTerm explanation="Grupa wzajemnie powiązanych projektów i usług, które wspólnie tworzą większą wartość niż każdy z osobna — jak organy w organizmie.">
                ekosystem
              </GlossaryTerm>{" "}
              komplementarnych przedsięwzięć. Każdy projekt uzupełnia pozostałe — do tego stopnia, że możliwa jest bezpośrednia{" "}
              <GlossaryTerm explanation="Wymiana dóbr i usług bezpośrednio między stronami, bez użycia pieniędzy jako pośrednika. Eliminuje koszty transakcyjne i zależność od instytucji finansowych.">
                wymiana barterowa
              </GlossaryTerm>{" "}
              wartości, usług i zasobów między nimi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-surface rounded-xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Wspieramy obie strony</h2>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              Wspieramy{" "}
              <GlossaryTerm explanation="Osoba zakładająca nową firmę (start-up), która bierze na siebie ryzyko stworzenia innowacyjnego produktu lub usługi.">
                założycieli start-upów
              </GlossaryTerm>{" "}
              i potencjalnych ich{" "}
              <GlossaryTerm explanation="Osoba lub instytucja, która lokuje pieniądze w projekty z nadzieją na zysk. W naszym ekosystemie inwestor zyskuje zweryfikowane, przejrzyste projekty z udowodnioną wartością intelektualną.">
                inwestorów
              </GlossaryTerm>{" "}
              — minimalizując ryzyko niepowodzenia projektów.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              Ten{" "}
              <GlossaryTerm explanation="Sytuacja, w której obie strony transakcji odnoszą korzyść. Nikt nie traci — zyskują założyciele, inwestorzy i cały ekosystem.">
                win-win
              </GlossaryTerm>{" "}
              dla obu stron jest także naszym sukcesem — pośrednika i{" "}
              <GlossaryTerm explanation="Osoba lub firma, która łączy innowatorów z inwestorami, ułatwia transakcje i negocjacje, dbając o interesy obu stron.">
                brokera innowacji
              </GlossaryTerm>.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              Jesteśmy praktykami od{" "}
              <GlossaryTerm explanation="Proces wspierania nowego projektu od pomysłu do gotowego produktu — obejmuje mentoring, zasoby, strategię i ochronę własności intelektualnej.">
                inkubacji
              </GlossaryTerm>{" "}
              i{" "}
              <GlossaryTerm explanation="Niestandardowe sposoby budowania i prowadzenia firmy, które łamią utarte schematy — np. barter zamiast gotówki, ekosystem zamiast konkurencji.">
                innowacyjnych modeli biznesowych
              </GlossaryTerm>.
              Opiekujemy się <span className="text-accent font-semibold">WARTOŚCIĄ</span> i dbamy o korzyści — od jednostki do celu nadrzędnego.
            </p>

            {/* Audio link */}
            <a
              href="#"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm sm:text-base"
            >
              <Volume2 className="w-5 h-5" />
              <div className="text-left">
                <span className="block">Wypowiedź ekspertki Ady Margo Marglewskiej</span>
                <span className="block text-xs text-muted-foreground font-normal">MRiT — zjazd ekspertów, spotkanie praktyków z osobami decyzyjnymi</span>
              </div>
            </a>

            {/* GenBridge */}
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mt-6">
              Buduje z nami komunikację międzypokoleniową{" "}
              <a href="#" className="text-accent font-semibold underline decoration-accent/50 underline-offset-4 hover:decoration-accent transition-colors">
                GenBridge
              </a>{" "}
              — łączymy doświadczenie starszych pokoleń z energią i innowacyjnością młodych.
            </p>
          </motion.div>

          {/* Zrzutka + 1.5% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-surface rounded-xl p-6 sm:p-8 mt-6 text-center"
          >
            <HandCoins className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Wesprzyj naszą misję</h3>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-2 max-w-2xl mx-auto">
              Możesz przekazać <span className="text-accent font-semibold">1,5% swojego podatku</span> na rozwój ekosystemu innowacji. Każda złotówka wspiera polskich innowatorów i buduje markę <span className="text-accent font-semibold">Made in Poland</span>.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
              Możesz nas także wesprzeć bezpośrednio przez zrzutkę — każdy wkład ma znaczenie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm sm:text-base"
              >
                <Heart className="w-4 h-4" />
                Wesprzyj na zrzutka.pl
              </a>
              <span className="text-xs text-muted-foreground">Link zostanie dodany wkrótce</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold mb-8"
          >
            Projekty w ekosystemie
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-surface rounded-xl p-6 flex gap-4 items-start ${(p as any).highlight ? 'border-2 border-rose-400/30 sm:col-span-2' : ''}`}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${(p as any).highlight ? 'bg-rose-400/10' : 'bg-accent/10'}`}>
                  <p.icon className={`w-5 h-5 ${(p as any).highlight ? 'text-rose-400' : 'text-accent'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    {(p as any).link && (p as any).link !== '#' ? (
                      <a href={(p as any).link} target="_blank" rel="noopener noreferrer" className={`hover:underline ${(p as any).highlight ? 'text-rose-400' : 'hover:text-accent'} transition-colors`}>
                        {p.name}
                      </a>
                    ) : p.name}
                    {(p as any).highlight && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-400/10 text-rose-400">❤ serce ekosystemu</span>}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Partnerzy strategiczni</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Comarch */}
              <div className="glass-surface rounded-xl p-6 flex gap-4 items-start border-2 border-primary/20">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    <a href="https://comarch.pl" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary transition-colors">
                      Comarch
                    </a>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary">Implementacja</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nasze moduły ekosystemowe są implementowane we współpracy z firmą Comarch — liderem rozwiązań IT i systemów ERP. Comarch zapewnia infrastrukturę technologiczną i wdrożeniową dla narzędzi ekosystemu.
                  </p>
                </div>
              </div>

              {/* MRiT */}
              <div className="glass-surface rounded-xl p-6 flex gap-4 items-start border-2 border-accent/20">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    Ministerstwo Rozwoju i Technologii
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">Patronat</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nasze projekty dla wzrostu gospodarczego wspiera patronat Ministerstwa Rozwoju i Technologii — potwierdzenie, że ekosystem AI Venture Integrator wpisuje się w strategię rozwoju innowacyjności i konkurencyjności polskiej gospodarki.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Barter Highlight */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-surface rounded-xl p-6 sm:p-8 text-center"
          >
            <ArrowRightLeft className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              Wymiana barterowa wewnątrz ekosystemu
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed max-w-2xl mx-auto">
              Projekty są{" "}
              <GlossaryTerm explanation="Uzupełniające się wzajemnie — każdy projekt dostarcza coś, czego potrzebują pozostałe, tworząc zamknięty obieg wartości.">
                komplementarne
              </GlossaryTerm>{" "}
              na tyle, że wymiana wartości odbywa się bezpośrednio — bez zbędnych pośredników i{" "}
              <GlossaryTerm explanation="Opłaty i prowizje ponoszone przy każdej wymianie handlowej — np. prowizje bankowe, opłaty za przelewy, marże pośredników.">
                kosztów transakcyjnych
              </GlossaryTerm>.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To samowystarczalny organizm gospodarczy odporny na kryzysy — jak w{" "}
              <GlossaryTerm explanation="Teoria psychologa Abrahama Maslowa mówiąca, że człowiek musi zaspokoić podstawowe potrzeby (jedzenie, bezpieczeństwo) zanim zajmie się wyższymi (rozwój, samorealizacja). Nasz ekosystem zaspokaja wszystkie 'poziomy' potrzeb biznesowych.">
                piramidzie Maslowa
              </GlossaryTerm>
              : zaspokajamy wszystkie potrzeby do funkcjonowania.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publikacje */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Publikacje</h2>

            {/* Artykuł: Fundacje współpracujące */}
            <div className="glass-surface rounded-xl p-6 sm:p-8 mb-5">
              <h3 className="font-bold text-base sm:text-lg mb-3">
                Fundacje, które przeszły przez nasz filtr jakości
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                Współpracujemy wyłącznie z organizacjami, które spełniają nasze rygorystyczne kryteria jakości i transparentności. Poniższe fundacje zostały zweryfikowane i działają na rzecz dobrostanu społecznego — wspólnie budujemy lepszy ekosystem wsparcia.
              </p>
              <ul className="space-y-3">
                {[
                  { name: "Fundacja 1", placeholder: true },
                  { name: "Fundacja 2", placeholder: true },
                  { name: "Fundacja 3", placeholder: true },
                ].map((f, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-accent font-semibold hover:underline underline-offset-4 text-sm sm:text-base"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {f.name}
                      <span className="text-xs text-muted-foreground font-normal">(link wkrótce)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Linki do poszczególnych fundacji zostaną uzupełnione.
              </p>
            </div>

            <div className="glass-surface rounded-xl p-6 sm:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">
                Więcej artykułów, wywiadów i materiałów prasowych — wkrótce.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domeny na sprzedaż */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-accent" />
              <h2 className="text-xl sm:text-2xl font-bold">Domeny premium na sprzedaż</h2>
            </div>
            <div className="glass-surface rounded-xl p-6 sm:p-8 mb-5">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                Kupując domenę z naszej listy, wspierasz{" "}
                <span className="text-accent font-semibold">Fundację Konstelacja.org</span> i zyskujesz
                coś więcej niż adres — zyskujesz <span className="text-accent font-semibold">pomoc w rozwinięciu biznesu</span> opartego
                o tę domenę. Masz domenę? Pomożemy Ci stworzyć pomysł i go zrealizować.
              </p>
              <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Każda domena posiada wartość kolekcjonerską jako <span className="text-accent font-semibold">NFT</span> — cyfrowy certyfikat własności zapisany w blockchain.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  { domain: "przykład1.pl", hint: "Link i cena wkrótce" },
                  { domain: "przykład2.com", hint: "Link i cena wkrótce" },
                  { domain: "przykład3.eu", hint: "Link i cena wkrótce" },
                  { domain: "przykład4.pl", hint: "Link i cena wkrótce" },
                  { domain: "przykład5.com", hint: "Link i cena wkrótce" },
                ].map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-accent/60" />
                      <span className="font-mono text-sm font-semibold">{d.domain}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{d.hint}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-5 italic text-center">
                Pełna lista domen i ceny zostaną uzupełnione. Zakup = wsparcie fundacji + pomoc w budowie biznesu.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referencje */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Referencje</h2>
            <div className="glass-surface rounded-xl p-6 sm:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">
                Sekcja w przygotowaniu — wkrótce pojawią się opinie partnerów, klientów i ekspertów.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Webinary */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Webinary</h2>
            <div className="glass-surface rounded-xl p-6 sm:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">
                Sekcja w przygotowaniu — wkrótce pojawią się nagrania i zapisy na nadchodzące webinary.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 pb-20 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-secondary-foreground italic max-w-3xl mx-auto leading-relaxed">
              „Tworzymy wartość, jakość dla wzrostu gospodarczego. Zmieniamy definicję sukcesu. Tworzymy wymierne wskaźniki rezultatu."
            </blockquote>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              Promujemy markę <span className="text-accent font-semibold">Made in Poland · Polish Quality</span> — na arenie międzynarodowej.
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Footer link back */}
      <footer className="py-8 px-4 border-t border-border/30 text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Powrót do strony głównej InventorProof
        </Link>
      </footer>
    </div>
  );
};

export default Ekosystem;
