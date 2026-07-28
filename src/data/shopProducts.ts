export type ShopCat = "apparel" | "drinkware" | "print" | "book" | "digital" | "support";

export interface ShopVariant {
  id: string;
  pl: string;
  en: string;
  stock: number;
}

export interface ShopCopy {
  name: string;
  desc: string;
  impact: string;
  spec: [string, string][];
}

export interface ShopProduct {
  id: string;
  cat: ShopCat;
  price: number;
  tint: string;
  slogan: string;
  digital?: boolean;
  noship?: boolean;
  pl: ShopCopy;
  en: ShopCopy;
  variants: ShopVariant[];
}

export const PRODUCTS: ShopProduct[] = [
  {
    id: "mug-cww",
    cat: "drinkware",
    price: 79,
    tint: "#2A3352",
    slogan: "COPY WHAT WORKS",
    pl: {
      name: "Kubek — Copy what works",
      desc: "Zasada, na której stoi cała architektura Fractal88: jeśli model działa, kopiuj go i skaluj. Kubek z nadrukiem odpornym na zmywarkę.",
      impact: "Finansuje godzinę pracy nad testami wdrożeń AI.",
      spec: [["Pojemność", "330 ml"], ["Wysokość", "9,5 cm"], ["Średnica", "8 cm"], ["Materiał", "Ceramika"]],
    },
    en: {
      name: "Mug — Copy what works",
      desc: "The principle the whole Fractal88 architecture rests on: when a model works, copy it and scale it. Dishwasher-safe print.",
      impact: "Funds one hour of work on AI deployment testing.",
      spec: [["Capacity", "330 ml"], ["Height", "9.5 cm"], ["Diameter", "8 cm"], ["Material", "Ceramic"]],
    },
    variants: [
      { id: "v1", pl: "Granat", en: "Navy", stock: 40 },
      { id: "v2", pl: "Piaskowy", en: "Sand", stock: 6 },
    ],
  },
  {
    id: "tee-comp",
    cat: "apparel",
    price: 149,
    tint: "#151A2E",
    slogan: "COMPLEMENTARITY\nOVER COMPETITION",
    pl: {
      name: "T-shirt — Complementarity over competition",
      desc: "Wewnątrz ekosystemu zasoby są komplementarne. Konkurencja zostaje między ekosystemami. Bawełna organiczna, 180 g/m².",
      impact: "Finansuje dzień pracy badacza w programie doktoratów wdrożeniowych.",
      spec: [["Materiał", "100% bawełna organiczna"], ["Gramatura", "180 g/m²"], ["Krój", "Unisex, regular"], ["Pranie", "30°C, na lewej stronie"]],
    },
    en: {
      name: "T-shirt — Complementarity over competition",
      desc: "Inside the ecosystem, resources complement each other. Competition happens between ecosystems. Organic cotton, 180 gsm.",
      impact: "Funds one researcher day in the implementation doctorate programme.",
      spec: [["Material", "100% organic cotton"], ["Weight", "180 gsm"], ["Fit", "Unisex, regular"], ["Wash", "30°C, inside out"]],
    },
    variants: [
      { id: "s", pl: "S", en: "S", stock: 12 },
      { id: "m", pl: "M", en: "M", stock: 20 },
      { id: "l", pl: "L", en: "L", stock: 18 },
      { id: "xl", pl: "XL", en: "XL", stock: 4 },
    ],
  },
  {
    id: "poster-pyr",
    cat: "print",
    price: 119,
    tint: "#3A2F1E",
    slogan: "AI ECOSYSTEM\nPYRAMID",
    pl: {
      name: "Plakat — Piramida ekosystemu AI",
      desc: "Pięć warstw odporności: potrzeby, kompetencje, ekosystemy biznesowe, badania, warstwa cywilizacyjna. Druk pigmentowy na papierze 250 g.",
      impact: "Finansuje przygotowanie jednego pakietu dowodowego z wdrożenia.",
      spec: [["Format", "50 × 70 cm"], ["Papier", "Matowy, 250 g/m²"], ["Druk", "Pigmentowy, archiwalny"], ["Wysyłka", "W tubie"]],
    },
    en: {
      name: "Poster — AI Ecosystem Pyramid",
      desc: "Five layers of resilience: needs, skills, business ecosystems, research, civilisation layer. Pigment print on 250 gsm stock.",
      impact: "Funds the preparation of one deployment evidence pack.",
      spec: [["Size", "50 × 70 cm"], ["Paper", "Matte, 250 gsm"], ["Print", "Pigment, archival"], ["Shipping", "In a tube"]],
    },
    variants: [{ id: "v1", pl: "50 × 70 cm", en: "50 × 70 cm", stock: 25 }],
  },
  {
    id: "book-zw",
    cat: "book",
    price: 69,
    tint: "#4A3A2A",
    slogan: "ZIARNO\nI WIATR",
    pl: {
      name: "Ziarno i wiatr",
      desc: "Efekt Wydmy: jak pojedyncze ziarna układają się w struktury, które przetrwają wiatr. Rzecz o odporności organizacji i o tym, dlaczego kopiowanie tego, co działa, jest strategią, a nie brakiem ambicji.",
      impact: "Finansuje dwie godziny pracy nad badaniami do kolejnego rozdziału.",
      spec: [["Oprawa", "Miękka ze skrzydełkami"], ["Stron", "[[ ]]"], ["Format", "145 × 205 mm"], ["ISBN", "[[ ]]"]],
    },
    en: {
      name: "The Grain and the Wind",
      desc: "The Dune Effect: how single grains arrange into structures that outlast the wind. On organisational resilience, and why copying what works is a strategy rather than a lack of ambition.",
      impact: "Funds two hours of research toward the next chapter.",
      spec: [["Binding", "Paperback with flaps"], ["Pages", "[[ ]]"], ["Format", "145 × 205 mm"], ["ISBN", "[[ ]]"]],
    },
    variants: [{ id: "v1", pl: "Wydanie polskie", en: "Polish edition", stock: 60 }],
  },
  {
    id: "geo-guide",
    cat: "digital",
    price: 149,
    tint: "#1E3A34",
    slogan: "GEO\nPRZEWODNIK",
    digital: true,
    pl: {
      name: "GEO — przewodnik po widoczności w AI",
      desc: "Jak pisać tak, żeby modele językowe cytowały Twoją firmę. Praktyczny przewodnik PDF z checklistami i przykładami. Dostęp natychmiast po opłaceniu.",
      impact: "Finansuje utrzymanie otwartej biblioteki dowodów przez tydzień.",
      spec: [["Format", "PDF"], ["Stron", "[[ ]]"], ["Aktualizacje", "Dożywotnie"], ["Język", "Polski"]],
    },
    en: {
      name: "GEO — a guide to AI visibility",
      desc: "How to write so language models cite your company. A practical PDF with checklists and worked examples. Access immediately after payment.",
      impact: "Funds one week of hosting for the open evidence library.",
      spec: [["Format", "PDF"], ["Pages", "[[ ]]"], ["Updates", "Lifetime"], ["Language", "Polish"]],
    },
    variants: [{ id: "v1", pl: "Plik PDF", en: "PDF file", stock: 999 }],
  },
  {
    id: "ebook-claude",
    cat: "digital",
    price: 89,
    tint: "#B45A42",
    slogan: "CLAUDE,\nPRACTICALLY",
    digital: true,
    pl: {
      name: "Claude, Practically — e-book (PDF)",
      desc: "Praktyczny przewodnik po pracy z Claude we własnym tempie: od pierwszych promptów po powtarzalne procesy w firmie. Plik jest zaszyfrowanym zasobem prywatnym — link do pobrania odblokowuje się w panelu klienta dopiero po zaksięgowaniu płatności.",
      impact: "Finansuje dzień pracy nad materiałami edukacyjnymi o AI.",
      spec: [["Format", "PDF (A4)"], ["Język", "Angielski"], ["Dostęp", "Panel klienta po opłaceniu"], ["Aktualizacje", "Dożywotnie"]],
    },
    en: {
      name: "Claude, Practically — ebook (PDF)",
      desc: "A practical guide to working with Claude at your own pace: from first prompts to repeatable processes at work. The file is kept in private, encrypted storage — the download link unlocks in your customer panel only once payment clears.",
      impact: "Funds one day of work on AI education materials.",
      spec: [["Format", "PDF (A4)"], ["Language", "English"], ["Access", "Customer panel after payment"], ["Updates", "Lifetime"]],
    },
    variants: [{ id: "v1", pl: "Plik PDF (EN)", en: "PDF file (EN)", stock: 999 }],
  },
  {
    id: "support",
    cat: "support",
    price: 100,
    tint: "#2E2440",
    slogan: "WSPARCIE\nBEZPOŚREDNIE",
    noship: true,
    pl: {
      name: "Wsparcie bezpośrednie",
      desc: "Dla osób, które chcą wesprzeć pracę, a nie potrzebują kolejnego kubka. Bez wysyłki, bez przedmiotu — całość idzie na badania.",
      impact: "Finansuje bezpośrednio bieżące prace badawcze.",
      spec: [["Wysyłka", "Brak"], ["Potwierdzenie", "E-mail"], ["Faktura", "Na życzenie"]],
    },
    en: {
      name: "Direct support",
      desc: "For people who want to back the work without another mug. No shipping, no object — all of it goes to research.",
      impact: "Funds current research work directly.",
      spec: [["Shipping", "None"], ["Confirmation", "Email"], ["Invoice", "On request"]],
    },
    variants: [{ id: "v1", pl: "100 zł", en: "100 zł", stock: 999 }],
  },
];

export const CATS = ["all", "apparel", "drinkware", "print", "book", "digital", "support"] as const;

export const C = {
  paper: "#FCFCFA",
  surface: "#FFFFFF",
  indigo: "#151A2E",
  ink2: "#4A5170",
  rule: "#E3E1DA",
  amber: "#D4A017",
};

export const F = {
  display: "'Fraunces', Georgia, 'Times New Roman', serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
};
