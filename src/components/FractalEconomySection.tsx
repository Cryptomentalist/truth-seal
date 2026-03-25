import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const FractalEconomySection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />

      <div className="container max-w-5xl px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Eksperyment społeczno-gospodarczy · Doktryna Ady Margo Marglewskiej · 2026
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Gospodarka<br />
            <span className="text-primary">Fraktalna</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-accent font-medium mb-6">
            oparty na Efekcie Wydmy
          </motion.p>
          <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Autonomiczny ekosystem wartości, który udowadnia wymierny efekt optymalizacji: optymalne nakłady (dany nakład optymalnie dobrany) by uzyskać maksymalny zysk. Da się budować środowisko balansu pomiędzy potrzebami — koszty a przychodami państwa — podatki bez generowania długu. Da się utrzymywać jakość, pomagać słabszym i rozwijać bez niedosytu lub nadmiaru. Nadmiar i niedosyt dają ten sam efekt jak niedożywienie i przejedzenie — chorobę. Nasz model biznesowy budujemy do powielenia przez cały świat — tworzymy dobrostan umysłu, bo za tym idzie właściwe działanie na rzecz wspólnego dobra. A za punkt największej kontroli wyznaczamy stabilność i poczucie bezpieczeństwa.
          </motion.p>
        </motion.div>

        {/* Teza fundamentalna */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 p-8 md:p-12 text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-6 font-semibold">Teza fundamentalna</p>
          <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed max-w-3xl mx-auto mb-4">
            „Wyrzeźbione przez czas i okoliczności, każde ziarnko piasku jest unikalne. Tylko w połączeniu z innymi tworzy piasek — a z piasku powstaje wydma, struktura zdolna zmieniać krajobraz."
          </p>
          <footer className="text-sm text-foreground/70 not-italic">
            <strong className="text-accent">— Ada Margo Marglewska</strong>
            <span className="block text-xs text-muted-foreground mt-1">Praktyk zrównoważonego biznesu · Intrapreneur & Interim Manager · Tworczyni Gospodarki Fraktalnej</span>
          </footer>
        </motion.blockquote>

        {/* 01 — Filozofia · Efekt Wydmy */}
        <div className="mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.p variants={fadeUp} custom={0} className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-2">01 — Filozofia · Efekt Wydmy</motion.p>
            <motion.h3 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-bold">
              Trzy poziomy<br />mechanizmu
            </motion.h3>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Ziarnko",
                subtitle: "THE INDIVIDUAL",
                text: "Każda jednostka — np. talent, innowator, neuroróżnorodny umysł, kobieta w biznesie — niesie wartość, której system nie potrafi zduplikować. Zaczynamy od jej uznania.",
                gradient: "from-accent/10 to-accent/5",
                border: "border-accent/20",
              },
              {
                num: "02",
                title: "Piasek",
                subtitle: "THE NETWORK",
                text: "Komplementarne jednostki, dobrane według wartości i mentalności, tworzą sieć i zasoby. Wewnątrz ekosystemu nie ma konkurencji — jest kontrola jakości.",
                gradient: "from-primary/10 to-primary/5",
                border: "border-primary/20",
              },
              {
                num: "03",
                title: "Wydma",
                subtitle: "THE STRUCTURE",
                text: "Połączona sieć staje się strukturą zdolną do trwałej zmiany krajobrazu. Model fraktalny: każdy projekt wzmacnia całość, a całość wzmacnia każdy projekt.",
                gradient: "from-emerald-500/10 to-emerald-500/5",
                border: "border-emerald-500/20",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`rounded-2xl border ${item.border} bg-gradient-to-br ${item.gradient} p-6 md:p-8`}
              >
                <span className="text-5xl font-bold text-foreground/10 block mb-2">{item.num}</span>
                <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 02 — Architektura · Sześć filarów */}
        <div className="mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.p variants={fadeUp} custom={0} className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-2">02 — Architektura · Sześć filarów</motion.p>
            <motion.h3 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-bold">
              Nie startupy.<br />Infrastruktura,<br />która je buduje.
            </motion.h3>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                num: "01",
                title: "Fundacja Konstelacja",
                sub: "Centrum koordynacji · ludzie i projekty",
                text: "Konstelacja.org / Constellation.love — hub całego ekosystemu. Mentoring, ochrona innowatorów, programy dla kobiet w biznesie, wsparcie neuroróżnorodnych.",
              },
              {
                num: "02",
                title: "Inkubator + B+R",
                sub: "Infrastruktura innowacji · centrum badawczo-rozwojowe",
                text: "Własne projekty jako infrastruktura — Bjorg.tech (BIPV / SQL Smart Quantum Laminate), Semiconductor.no AS, Rejestruj.biz.",
              },
              {
                num: "03",
                title: "60 ha · Frombork",
                sub: "Fizyczna baza operacyjna · Polska Wschodnia",
                text: "60 hektarów ziemi w okolicach Fromborka. Przekształcenie przestrzeni w centrum innowacji, B+R i wspólnoty ekosystemu.",
              },
              {
                num: "04",
                title: "Cyfrowy Bliźniak · RIS",
                sub: "Warstwa AI · symulacja i predykcja",
                text: "Cyfrowe odzwierciedlenie ekosystemu — środowisko symulacyjne z kupnem cyfrowego miejsca i testowaniem scenariuszy rozwoju.",
              },
              {
                num: "05",
                title: "EPIC VC",
                sub: "Innowacyjny model inwestycyjny",
                text: "Selekcja, system i komplementarność — nie tylko kapitał. Wejście udziałowe lub ryczałt / success fee. Model inwestycyjny oparty na wartościach.",
              },
              {
                num: "06",
                title: "WomenOnBoard · Ochrona IP",
                sub: "Kapitał społeczny · ład korporacyjny",
                text: "WomenOnBoard.app — narzędzie i sieć kobiet w zarządach. Ochrona innowatorów jako systemowa usługa. Kapitał społeczny jako wartość ekonomiczna.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-colors"
              >
                <span className="text-xs font-mono text-primary/50">{item.num}</span>
                <h4 className="text-lg font-bold mt-1 mb-1">{item.title}</h4>
                <p className="text-xs text-accent/70 mb-3">{item.sub}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 03 — Eksperyment · Państwo w Państwie */}
        <div className="mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.p variants={fadeUp} custom={0} className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-2">03 — Eksperyment · Państwo w Państwie</motion.p>
            <motion.h3 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-bold">
              Udowadniamy,<br />że się da.
            </motion.h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-8 space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              Autonomiczny ekosystem wartości stanowi alternatywną architekturę gospodarczą, osadzoną w realiach rynkowych, lecz zarządzaną według własnych zasad efektywności, jakości i odpowiedzialności. Jego przewaga wynika z selektywnej integracji podmiotów, komplementarności zasobów oraz zdolności do zamykania obiegu wartości wewnątrz systemu. W praktyce oznacza to wyższą produktywność kapitału, większą odporność na kryzysy oraz możliwość finansowania funkcji społecznych bez marnotrawienia środków publicznych.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To nie jest alternatywa dla gospodarki rynkowej, lecz jej bardziej efektywna warstwa operacyjna — ograniczająca chaos, marnotrawstwo i przypadkowość poprzez świadomą selekcję jakości, kapitału relacyjnego i zasobów.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 mb-12">
            {[
              "Model fraktalny jest skalowalny — od jednostki przez projekt po gospodarkę narodową.",
              "Selekcja oparta na wartościach buduje trwalszą wartość niż selekcja wyłącznie kapitałowa.",
              "Open source dla świata — gdy eksperyment się powiedzie, model zostaje udostępniony. Jak Linux. Jak Wikipedia.",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 items-start rounded-xl border border-border/30 bg-card/40 p-4"
              >
                <span className="text-primary mt-0.5">✦</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Fractal model visual */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4 text-center py-8"
          >
            {[
              { icon: "◈", label: "Talent", sub: "jednostka" },
              { icon: "◇", label: "Projekt", sub: "moduł" },
              { icon: "◉", label: "Ekosystem", sub: "struktura" },
              { icon: "◎", label: "Gospodarka", sub: "krajobraz" },
              { icon: "∞", label: "Open Source", sub: "powiel · buduj" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl text-primary mb-1">{item.icon}</span>
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-[10px] text-muted-foreground">{item.sub}</span>
                </div>
                {i < 4 && <span className="text-muted-foreground/30 text-lg">→</span>}
              </div>
            ))}
          </motion.div>
        </div>

        {/* 04 — Wizja · Polska i świat */}
        <div className="mb-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.p variants={fadeUp} custom={0} className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-2">04 — Wizja · Polska i świat</motion.p>
            <motion.h3 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-bold">
              Polska odrodzi się dzięki<br /><span className="text-primary">Gospodarce Fraktalnej.</span>
            </motion.h3>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">
              To nie jest projekt dla projektów. Nadrzędnym celem jest udowodnienie, że poprzez optymalne zarządzanie zasobami Polska może stać się wzorcem — innowacyjnym, etycznym, powtarzalnym.
            </motion.p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Innowacyjność",
                text: "Technologie BIPV, AI, kwantowe kompozyty — jako polska marka na arenie globalnej.",
              },
              {
                title: "Struktura do powielenia",
                text: "Fraktalna gospodarka jako model exportowy — open source dla regionów i krajów.",
              },
              {
                title: "Jakość i etyka",
                text: "ESG nie jako compliance, lecz jako kultura. Gentleman Agreement jako standard współpracy.",
              },
              {
              title: "Myślenie systemowe",
                text: "Fokus na wartości i jakość prowadzi do optymalizacji zarządzania zasobami organizacji — i wzrostu poczucia stabilizacji i bezpieczeństwa.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6"
              >
                <h4 className="text-base font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FractalEconomySection;
