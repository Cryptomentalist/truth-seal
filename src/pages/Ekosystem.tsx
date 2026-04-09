import { motion } from "framer-motion";
import { ArrowLeft, Volume2, ShieldCheck, Rocket, ArrowRightLeft, Network, Users, Heart, HandCoins, MessageCircleHeart, Globe, Sparkles, HeartHandshake, Bot, Building2, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";

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
  { icon: HeartHandshake, name: "intrapreneurs.app", descPl: "Serce ekosystemu — platforma łącząca intrapreneurów z projektami. Każdy projekt może wybrać specjalistę z aplikacji i zyskać wsparcie kompetencyjne bez zbędnej biurokracji.", descEn: "The heart of the ecosystem — a platform connecting intrapreneurs with projects. Each project can choose a specialist and gain competency support without unnecessary bureaucracy.", link: "https://intrapreneurs.app", highlight: true },
  { icon: Bot, name: "AIagent.gratis", descPl: "Środowisko i baza komplementarności dla Agentów AI — otwarta przestrzeń, w której autonomiczne agenty znajdują się nawzajem, współpracują i uzupełniają kompetencje. Marketplace przyszłości, gotowy na eksplozję agentów AI.", descEn: "Environment and complementarity base for AI Agents — an open space where autonomous agents find each other, collaborate and complement skills. The marketplace of the future, ready for the AI agent explosion.", link: "https://aiagent.gratis", highlight: true },
  { icon: ShieldCheck, name: "InventorProof", descPl: "Ochrona własności intelektualnej z cyfrowym dowodem autorstwa — bez patentów, bez prawników, w kilka minut.", descEn: "IP protection with digital proof of authorship — no patents, no lawyers, in minutes." },
  { icon: Rocket, name: "AI Start-up Studio", descPl: "Inkubacja i akceleracja projektów opartych o sztuczną inteligencję. Wspieramy od pomysłu do rynku.", descEn: "Incubation and acceleration of AI-based projects. We support from idea to market." },
  { icon: ArrowRightLeft, name: "BarterChain", descPl: "Wymiana wartości i usług między projektami ekosystemu — bez pośredników i kosztów transakcyjnych.", descEn: "Value and service exchange between ecosystem projects — without intermediaries and transaction costs." },
  { icon: MessageCircleHeart, name: "GenBridge", descPl: "Komunikacja międzypokoleniowa — budujemy mosty między generacjami, łącząc doświadczenie z innowacją.", descEn: "Intergenerational communication — we build bridges between generations, connecting experience with innovation.", link: "#" },
  { icon: Network, name: "Kolejne projekty", nameEn: "More projects", descPl: "Każdy nowy projekt uzupełnia pozostałe, tworząc samowystarczalny organizm gospodarczy odporny na kryzysy.", descEn: "Every new project complements the others, creating a self-sufficient economic organism resistant to crises." },
];

const Ekosystem = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  // Glossary terms based on language
  const glossary = {
    ecosystem: isEn ? "A group of interconnected projects and services that together create greater value than each individually — like organs in an organism." : "Grupa wzajemnie powiązanych projektów i usług, które wspólnie tworzą większą wartość niż każdy z osobna — jak organy w organizmie.",
    barter: isEn ? "Direct exchange of goods and services between parties, without using money as an intermediary. Eliminates transaction costs and dependence on financial institutions." : "Wymiana dóbr i usług bezpośrednio między stronami, bez użycia pieniędzy jako pośrednika. Eliminuje koszty transakcyjne i zależność od instytucji finansowych.",
    startup: isEn ? "A person starting a new company (start-up), who takes on the risk of creating an innovative product or service." : "Osoba zakładająca nową firmę (start-up), która bierze na siebie ryzyko stworzenia innowacyjnego produktu lub usługi.",
    investor: isEn ? "A person or institution that invests money in projects hoping for profit. In our ecosystem, the investor gains verified, transparent projects with proven intellectual value." : "Osoba lub instytucja, która lokuje pieniądze w projekty z nadzieją na zysk. W naszym ekosystemie inwestor zyskuje zweryfikowane, przejrzyste projekty z udowodnioną wartością intelektualną.",
    winwin: isEn ? "A situation where both parties benefit. Nobody loses — founders, investors and the entire ecosystem gain." : "Sytuacja, w której obie strony transakcji odnoszą korzyść. Nikt nie traci — zyskują założyciele, inwestorzy i cały ekosystem.",
    broker: isEn ? "A person or company that connects innovators with investors, facilitates transactions and negotiations, taking care of both sides' interests." : "Osoba lub firma, która łączy innowatorów z inwestorami, ułatwia transakcje i negocjacje, dbając o interesy obu stron.",
    incubation: isEn ? "The process of supporting a new project from idea to finished product — includes mentoring, resources, strategy and IP protection." : "Proces wspierania nowego projektu od pomysłu do gotowego produktu — obejmuje mentoring, zasoby, strategię i ochronę własności intelektualnej.",
    innovative: isEn ? "Unconventional ways of building and running a business that break established patterns — e.g. barter instead of cash, ecosystem instead of competition." : "Niestandardowe sposoby budowania i prowadzenia firmy, które łamią utarte schematy — np. barter zamiast gotówki, ekosystem zamiast konkurencji.",
    complementary: isEn ? "Mutually complementing — each project delivers something the others need, creating a closed value circuit." : "Uzupełniające się wzajemnie — każdy projekt dostarcza coś, czego potrzebują pozostałe, tworząc zamknięty obieg wartości.",
    transactionCosts: isEn ? "Fees and commissions incurred in every trade — e.g. bank fees, transfer charges, intermediary margins." : "Opłaty i prowizje ponoszone przy każdej wymianie handlowej — np. prowizje bankowe, opłaty za przelewy, marże pośredników.",
    maslow: isEn ? "Psychologist Abraham Maslow's theory stating that a person must satisfy basic needs (food, safety) before higher ones (growth, self-actualization). Our ecosystem satisfies all 'levels' of business needs." : "Teoria psychologa Abrahama Maslowa mówiąca, że człowiek musi zaspokoić podstawowe potrzeby (jedzenie, bezpieczeństwo) zanim zajmie się wyższymi (rozwój, samorealizacja). Nasz ekosystem zaspokaja wszystkie 'poziomy' potrzeb biznesowych.",
  };

  const heartLabel = isEn ? "❤ heart of ecosystem" : "❤ serce ekosystemu";
  const linkSoonLabel = isEn ? "(link coming soon)" : "(link wkrótce)";
  const implementationLabel = isEn ? "Implementation" : "Implementacja";
  const patronageLabel = isEn ? "Patronage" : "Patronat";
  const mritName = isEn ? "Ministry of Development and Technology" : "Ministerstwo Rozwoju i Technologii";

  const domainPlaceholders = [
    { domain: "przykład1.pl", hint: isEn ? "Link and price coming soon" : "Link i cena wkrótce" },
    { domain: "przykład2.com", hint: isEn ? "Link and price coming soon" : "Link i cena wkrótce" },
    { domain: "przykład3.eu", hint: isEn ? "Link and price coming soon" : "Link i cena wkrótce" },
    { domain: "przykład4.pl", hint: isEn ? "Link and price coming soon" : "Link i cena wkrótce" },
    { domain: "przykład5.com", hint: isEn ? "Link and price coming soon" : "Link i cena wkrótce" },
  ];

  const foundationPlaceholders = [
    { name: "Fundacja 1" },
    { name: "Fundacja 2" },
    { name: "Fundacja 3" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={t("ecosystem.tag")} description={t("ecosystem.subtitle")} path="/ekosystem" />
      <header className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/50">
        <div className="container flex items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t("ecosystem.back")}</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <span className="font-bold text-sm sm:text-base">
            {t("ecosystem.title")} <span className="text-accent">{t("ecosystem.titleHighlight")}</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-sm font-mono text-accent uppercase tracking-widest">{t("ecosystem.tag")}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              {t("ecosystem.title")}{" "}<span className="text-gradient-primary">{t("ecosystem.titleHighlight")}</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
              {isEn ? (
                <>A self-sufficient <GlossaryTerm explanation={glossary.ecosystem}>ecosystem</GlossaryTerm> of complementary ventures. Each project complements the others — to the extent that direct <GlossaryTerm explanation={glossary.barter}>barter exchange</GlossaryTerm> of value, services and resources between them is possible.</>
              ) : (
                <>Samowystarczalny{" "}<GlossaryTerm explanation={glossary.ecosystem}>ekosystem</GlossaryTerm>{" "}komplementarnych przedsięwzięć. Każdy projekt uzupełnia pozostałe — do tego stopnia, że możliwa jest bezpośrednia{" "}<GlossaryTerm explanation={glossary.barter}>wymiana barterowa</GlossaryTerm>{" "}wartości, usług i zasobów między nimi.</>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-surface rounded-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">{t("ecosystem.supportBoth")}</h2>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              {isEn ? (
                <>We support <GlossaryTerm explanation={glossary.startup}>startup founders</GlossaryTerm> and their potential <GlossaryTerm explanation={glossary.investor}>investors</GlossaryTerm> — minimizing the risk of project failure.</>
              ) : (
                <>Wspieramy{" "}<GlossaryTerm explanation={glossary.startup}>założycieli start-upów</GlossaryTerm>{" "}i potencjalnych ich{" "}<GlossaryTerm explanation={glossary.investor}>inwestorów</GlossaryTerm>{" "}— minimalizując ryzyko niepowodzenia projektów.</>
              )}
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              {isEn ? (
                <>This <GlossaryTerm explanation={glossary.winwin}>win-win</GlossaryTerm> for both sides is also our success — as intermediary and <GlossaryTerm explanation={glossary.broker}>innovation broker</GlossaryTerm>.</>
              ) : (
                <>Ten{" "}<GlossaryTerm explanation={glossary.winwin}>win-win</GlossaryTerm>{" "}dla obu stron jest także naszym sukcesem — pośrednika i{" "}<GlossaryTerm explanation={glossary.broker}>brokera innowacji</GlossaryTerm>.</>
              )}
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              {isEn ? (
                <>We are practitioners of <GlossaryTerm explanation={glossary.incubation}>incubation</GlossaryTerm> and <GlossaryTerm explanation={glossary.innovative}>innovative business models</GlossaryTerm>. We take care of <span className="text-accent font-semibold">VALUE</span> and ensure benefits — from the individual to the overarching goal.</>
              ) : (
                <>Jesteśmy praktykami od{" "}<GlossaryTerm explanation={glossary.incubation}>inkubacji</GlossaryTerm>{" "}i{" "}<GlossaryTerm explanation={glossary.innovative}>innowacyjnych modeli biznesowych</GlossaryTerm>. Opiekujemy się <span className="text-accent font-semibold">WARTOŚCIĄ</span> i dbamy o korzyści — od jednostki do celu nadrzędnego.</>
              )}
            </p>

            <a href="#" className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm sm:text-base">
              <Volume2 className="w-5 h-5" />
              <div className="text-left">
                <span className="block">{t("ecosystem.audioLabel")}</span>
                <span className="block text-xs text-muted-foreground font-normal">{t("ecosystem.audioSub")}</span>
              </div>
            </a>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mt-6">
              {t("ecosystem.genBridgeDesc")}
            </p>
          </motion.div>

          {/* Zrzutka + 1.5% */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="glass-surface rounded-xl p-6 sm:p-8 mt-6 text-center">
            <HandCoins className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("ecosystem.supportMission")}</h3>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-2 max-w-2xl mx-auto">
              {t("ecosystem.taxSupport")}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
              {t("ecosystem.directSupport")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm sm:text-base">
                <Heart className="w-4 h-4" />
                {t("ecosystem.supportButton")}
              </a>
              <span className="text-xs text-muted-foreground">{t("ecosystem.linkSoon")}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xl sm:text-2xl font-bold mb-8">
            {t("ecosystem.projectsTitle")}
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-surface rounded-xl p-6 flex gap-4 items-start ${p.highlight ? 'border-2 border-rose-400/30 sm:col-span-2' : ''}`}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${p.highlight ? 'bg-rose-400/10' : 'bg-accent/10'}`}>
                  <p.icon className={`w-5 h-5 ${p.highlight ? 'text-rose-400' : 'text-accent'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    {p.link && p.link !== '#' ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className={`hover:underline ${p.highlight ? 'text-rose-400' : 'hover:text-accent'} transition-colors`}>
                        {p.name}
                      </a>
                    ) : (isEn && (p as any).nameEn ? (p as any).nameEn : p.name)}
                    {p.highlight && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-400/10 text-rose-400">{heartLabel}</span>}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{isEn ? p.descEn : p.descPl}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">{t("ecosystem.partnersTitle")}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="glass-surface rounded-xl p-6 flex gap-4 items-start border-2 border-primary/20">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    <a href="https://comarch.pl" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary transition-colors">Comarch</a>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary">{implementationLabel}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("ecosystem.comarchDesc")}</p>
                </div>
              </div>
              <div className="glass-surface rounded-xl p-6 flex gap-4 items-start border-2 border-accent/20">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    {mritName}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">{patronageLabel}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("ecosystem.mritDesc")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Barter Highlight */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-surface rounded-xl p-6 sm:p-8 text-center">
            <ArrowRightLeft className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-bold mb-3">{t("ecosystem.barterTitle")}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed max-w-2xl mx-auto">
              {isEn ? (
                <>Projects are <GlossaryTerm explanation={glossary.complementary}>complementary</GlossaryTerm> enough that value exchange happens directly — without unnecessary intermediaries and <GlossaryTerm explanation={glossary.transactionCosts}>transaction costs</GlossaryTerm>.</>
              ) : (
                <>Projekty są{" "}<GlossaryTerm explanation={glossary.complementary}>komplementarne</GlossaryTerm>{" "}na tyle, że wymiana wartości odbywa się bezpośrednio — bez zbędnych pośredników i{" "}<GlossaryTerm explanation={glossary.transactionCosts}>kosztów transakcyjnych</GlossaryTerm>.</>
              )}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {isEn ? (
                <>It's a self-sufficient economic organism resistant to crises — like <GlossaryTerm explanation={glossary.maslow}>Maslow's pyramid</GlossaryTerm>: we satisfy all needs for functioning.</>
              ) : (
                <>To samowystarczalny organizm gospodarczy odporny na kryzysy — jak w{" "}<GlossaryTerm explanation={glossary.maslow}>piramidzie Maslowa</GlossaryTerm>: zaspokajamy wszystkie potrzeby do funkcjonowania.</>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publikacje */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">{t("ecosystem.publications")}</h2>
            <div className="glass-surface rounded-xl p-6 sm:p-8 mb-5">
              <h3 className="font-bold text-base sm:text-lg mb-3">{t("ecosystem.qualityFilter")}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">{t("ecosystem.qualityFilterDesc")}</p>
              <ul className="space-y-3">
                {foundationPlaceholders.map((f, i) => (
                  <li key={i}>
                    <a href="#" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline underline-offset-4 text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {f.name}
                      <span className="text-xs text-muted-foreground font-normal">{linkSoonLabel}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4 italic">{t("ecosystem.linksComingSoon")}</p>
            </div>
            <div className="glass-surface rounded-xl p-6 sm:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">{t("ecosystem.moreArticles")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domeny na sprzedaż */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-accent" />
              <h2 className="text-xl sm:text-2xl font-bold">{t("ecosystem.premiumDomains")}</h2>
            </div>
            <div className="glass-surface rounded-xl p-6 sm:p-8 mb-5">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">{t("ecosystem.domainsDesc")}</p>
              <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground">{t("ecosystem.nftNote")}</p>
              </div>
              <div className="grid gap-3">
                {domainPlaceholders.map((d, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-accent/60" />
                      <span className="font-mono text-sm font-semibold">{d.domain}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{d.hint}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-5 italic text-center">{t("ecosystem.domainsListNote")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referencje */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">{t("ecosystem.references")}</h2>
            <div className="glass-surface rounded-xl p-6 sm:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">{t("ecosystem.referencesPlaceholder")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Webinary */}
      <section className="py-12 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">{t("ecosystem.webinars")}</h2>
            <div className="glass-surface rounded-xl p-6 sm:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">{t("ecosystem.webinarsPlaceholder")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 pb-20 px-4 md:px-8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-secondary-foreground italic max-w-3xl mx-auto leading-relaxed">
              {t("ecosystem.missionQuote")}
            </blockquote>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              {t("ecosystem.missionDesc")}
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border/30 text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t("ecosystem.backToHome")}
        </Link>
      </footer>
    </div>
  );
};

export default Ekosystem;