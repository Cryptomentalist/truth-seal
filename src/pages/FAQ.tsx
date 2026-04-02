import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    title: "Ekosystem & Model biznesowy",
    questions: [
      {
        q: "Czym dokładnie jest AI Venture Anticrisis Integrator?",
        a: "To samowystarczalny ekosystem komplementarnych projektów technologicznych, działający na zasadzie piramidy Maslowa dla biznesu. Każdy projekt uzupełnia pozostałe, tworząc odporną na kryzysy sieć, w której wartość wymieniana jest bezpośrednio — bez zbędnych pośredników.",
      },
      {
        q: 'Co oznacza "dual use" \u2014 inwestor jest jednocze\u015bnie klientem?',
        a: 'W naszym modelu inwestor nie tylko finansuje projekt, ale korzysta z jego produkt\u00f3w i us\u0142ug. To eliminuje klasyczny problem "chicken & egg" w startupach i radykalnie zmniejsza ryzyko obu stron. Inwestor widzi warto\u015b\u0107 od pierwszego dnia.',
      },
      {
        q: "Jak działa wymiana barterowa wewnątrz ekosystemu?",
        a: "Projekty są komplementarne na tyle, że mogą wymieniać usługi, zasoby i wartość bezpośrednio — np. InventorProof chroni IP startupu z AI Studio, który z kolei dostarcza technologię do BarterChain. Obniża to koszty transakcyjne niemal do zera.",
      },
      {
        q: "Dlaczego ekosystem, a nie pojedynczy startup?",
        a: "Pojedynczy startup jest kruchy — zależy od jednego rynku, jednego produktu, jednego zespołu. Ekosystem komplementarnych projektów tworzy efekt synergii: porażka jednego elementu nie niszczy całości, a sukces jednego napędza pozostałe.",
      },
    ],
  },
  {
    title: "Inwestycje & Zwrot",
    questions: [
      {
        q: "Jaki jest model przychodowy ekosystemu?",
        a: "Ekosystem generuje przychody wielokanałowo: licencje technologiczne (InventorProof, MindMark™), usługi konsultingowe i audytowe (ESG, rejestracja firm), integracje ERP (COMARCH), oraz opłaty transakcyjne w BarterChain. Dywersyfikacja źródeł to klucz do odporności.",
      },
      {
        q: "Na jakim etapie rozwoju jest projekt?",
        a: "Ekosystem działa — posiada patronat MRiT (Ministerstwo Rozwoju i Technologii), partnerstwo z COMARCH, działającą platformę InventorProof.com oraz zespół z 20+ latami doświadczenia w pozyskiwaniu dotacji i budowaniu startupów.",
      },
      {
        q: "Czy ekosystem pozyskuje dotacje UE?",
        a: "Tak. Nasz zespół to pionierzy pozyskiwania funduszy unijnych i strukturalnych w Polsce — z ponad 20-letnim doświadczeniem. Dotacje stanowią jedno ze źródeł finansowania, ale model jest zaprojektowany tak, by nie być od nich zależnym.",
      },
      {
        q: "Jak minimalizujecie ryzyko inwestycyjne?",
        a: "Trzypoziomowo: (1) dual use — inwestor korzysta z produktów od dnia pierwszego, (2) komplementarność — dywersyfikacja wewnątrz ekosystemu, (3) InventorProof — ochrona IP na etapie pre-patentowym chroni przed kradzieżą technologii zanim dojdzie do komercjalizacji.",
      },
    ],
  },
  {
    title: "Technologia & IP",
    questions: [
      {
        q: "Czym jest MindMark™?",
        a: "MindMark™ to nasza usługa ochrony własności intelektualnej na etapie pre-patentowym. Wykorzystuje infrastrukturę blockchain (rozproszony zapis cyfrowy) z kryptografią 256-bit i znacznikiem czasowym, by stworzyć niepodważalny dowód autorstwa — zanim pomysł trafi do jakiejkolwiek instytucji.",
      },
      {
        q: "Czym różni się InventorProof od patentu?",
        a: 'Patent chroni po ujawnieniu \u2014 InventorProof chroni przed ujawnieniem. Wype\u0142niamy "luk\u0119 pre-patentow\u0105": okres, w kt\u00f3rym wynalazca musi dzieli\u0107 si\u0119 pomys\u0142em z instytucjami (laboratoria, inwestorzy, partnerzy), ale nie ma jeszcze \u017cadnej formalnej ochrony.',
      },
      {
        q: "Jaka jest rola COMARCH w ekosystemie?",
        a: "COMARCH jako patron implementuje innowacje ekosystemu w formie modułów do swojego systemu ERP XL. To gwarantuje skalowalność i dostęp do tysięcy przedsiębiorstw korzystających z rozwiązań COMARCH.",
      },
    ],
  },
  {
    title: "Zespół & Wiarygodność",
    questions: [
      {
        q: "Kim jest Ada Margo Marglewska?",
        a: "Innowatorka deep-tech, intraprzedsiębiorca, wynalazczyni kompozytu kwantowego BIPV, założycielka Konstelacja.org. Laureatka nagrody Mikroprzedsiębiorca Roku (Fundacja Kronenberg / Citi Bank Handlowy) i wyróżniona w magazynie Forbes. Autorka koncepcji piramidy Maslowa dla ekosystemu biznesowego.",
      },
      {
        q: "Dlaczego stawiacie na neuroróżnorodność?",
        a: 'Bo najwi\u0119ksze prze\u0142omy rodz\u0105 si\u0119 w umys\u0142ach, kt\u00f3re widz\u0105 \u015bwiat inaczej. Nasz ekosystem jest zaprojektowany tak, by dopasowa\u0107 wsparcie do umys\u0142u \u2014 nie umys\u0142 do systemu. "Po r\u00f3wno" nie oznacza "sprawiedliwie".',
      },
      {
        q: "Czy projekt działa pod patronatem instytucjonalnym?",
        a: "Tak — ekosystem posiada patronat MRiT (Ministerstwo Rozwoju i Technologii), partnerstwo z COMARCH, współpracę z Semiconductor.no AS oraz działa pod parasolem Fundacji Konstelacja.org (KRS, NIP, REGON — pełna transparentność).",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-surface border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Shield className="w-6 h-6 text-primary" />
            <span>
              Inventor<span className="text-primary">Proof</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Strona główna
          </Link>
        </div>
      </div>

      <div className="container max-w-3xl py-16 sm:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-surface rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-muted-foreground">FAQ dla inwestorów</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Najczęstsze <span className="text-gradient-primary">pytania</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Odpowiedzi na kluczowe pytania inwestorów i partnerów o ekosystem AI Venture Integrator.
          </p>
        </motion.div>

        {categories.map((cat, ci) => (
          <motion.div
            key={ci}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
            className="mb-10"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-accent inline-block" />
              {cat.title}
            </h2>
            <Accordion type="multiple" className="space-y-2">
              {cat.questions.map((faq, fi) => (
                <AccordionItem
                  key={fi}
                  value={`${ci}-${fi}`}
                  className="glass-surface rounded-xl border-none px-5"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-left hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-surface rounded-2xl p-8 text-center mt-14 border border-accent/15"
        >
          <h3 className="text-xl font-bold mb-2">Nie znalazłeś odpowiedzi?</h3>
          <p className="text-sm text-muted-foreground mb-5">
            Skontaktuj się z nami bezpośrednio — chętnie odpowiemy na każde pytanie.
          </p>
          <Link
            to="/#kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors text-sm"
          >
            Napisz do nas
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
