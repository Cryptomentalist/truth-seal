export type ShopCategory = "apparel" | "drinkware" | "print" | "book" | "digital" | "support";

export interface ShopProduct {
  slug: string;
  category: ShopCategory;
  namePl: string;
  nameEn: string;
  descPl: string;
  descEn: string;
  impactPl: string;
  impactEn: string;
  /** cena brutto w PLN — jedna, jedyna, wszędzie ta sama */
  price: number;
  variants?: string[];
  specPl: string[];
  specEn: string[];
  /** POD = produkcja na zamówienie, own = magazyn własny, digital = plik */
  fulfilment: "pod" | "own" | "digital" | "none";
  stock?: number;
  emoji: string;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "koszulka-patriotyzm-zapobiegawczy",
    category: "apparel",
    namePl: "Koszulka „Patriotyzm zapobiegawczy”",
    nameEn: '"Preventive Patriotism" T-shirt',
    descPl:
      "Bawełna organiczna 180 g/m². Nadruk wykonywany na zamówienie u dostawcy print-on-demand.",
    descEn:
      "Organic cotton 180 gsm. Printed to order by our print-on-demand supplier.",
    impactPl: "Ten zakup finansuje jedną godzinę pracy nad ochroną polskich wynalazków.",
    impactEn: "This purchase funds one hour of work protecting Polish inventions.",
    price: 129,
    variants: ["S", "M", "L", "XL", "XXL"],
    specPl: ["100% bawełna organiczna", "180 g/m²", "Tabela rozmiarów w cm", "Produkcja na zamówienie"],
    specEn: ["100% organic cotton", "180 gsm", "Size chart in cm", "Made to order"],
    fulfilment: "pod",
    emoji: "👕",
  },
  {
    slug: "bluza-konstelacja",
    category: "apparel",
    namePl: "Bluza Konstelacja",
    nameEn: "Konstelacja Hoodie",
    descPl: "Bluza z kapturem, gruba dzianina 300 g/m², haftowane logo.",
    descEn: "Hooded sweatshirt, heavy 300 gsm knit, embroidered logo.",
    impactPl: "Ten zakup finansuje trzy godziny mentoringu dla młodego wynalazcy.",
    impactEn: "This purchase funds three hours of mentoring for a young inventor.",
    price: 269,
    variants: ["S", "M", "L", "XL"],
    specPl: ["Mieszanka bawełna/poliester", "300 g/m²", "Produkcja na zamówienie"],
    specEn: ["Cotton/polyester blend", "300 gsm", "Made to order"],
    fulfilment: "pod",
    emoji: "🧥",
  },
  {
    slug: "kubek-mindmark",
    category: "drinkware",
    namePl: "Kubek MindMark™",
    nameEn: "MindMark™ Mug",
    descPl: "Ceramiczny kubek 330 ml, nadruk odporny na zmywarkę.",
    descEn: "Ceramic mug, 330 ml, dishwasher-safe print.",
    impactPl: "Ten zakup finansuje jeden znacznik czasu MindMark dla wynalazcy bez budżetu.",
    impactEn: "This purchase funds one MindMark timestamp for an inventor without a budget.",
    price: 69,
    specPl: ["Pojemność 330 ml", "Wysokość 95 mm, średnica 82 mm", "Ceramika"],
    specEn: ["Capacity 330 ml", "Height 95 mm, diameter 82 mm", "Ceramic"],
    fulfilment: "pod",
    emoji: "☕",
  },
  {
    slug: "plakat-18-krokow",
    category: "print",
    namePl: "Plakat „18 kroków do skalowania wynalazku”",
    nameEn: '"18 Steps to Scale Your Invention" Poster',
    descPl: "Mapa drogowa wynalazcy na papierze matowym 200 g/m².",
    descEn: "The inventor's roadmap on 200 gsm matte paper.",
    impactPl: "Ten zakup finansuje wydruk pięciu plakatów dla szkoły technicznej.",
    impactEn: "This purchase funds five posters printed for a technical school.",
    price: 89,
    variants: ["A2 (42×59,4 cm)", "A1 (59,4×84,1 cm)"],
    specPl: ["Papier matowy 200 g/m²", "Druk pigmentowy", "Wysyłka w tubie"],
    specEn: ["200 gsm matte paper", "Pigment print", "Shipped in a tube"],
    fulfilment: "pod",
    emoji: "🗺️",
  },
  {
    slug: "ksiazka-gospodarka-fraktalna",
    category: "book",
    namePl: "Książka: Gospodarka Fraktalna",
    nameEn: "Book: Fractal Economy",
    descPl: "Doktryna gospodarki fraktalnej — trzy poziomy mechanizmu, sześć filarów.",
    descEn: "The fractal economy doctrine — a three-level mechanism, six pillars.",
    impactPl: "Ten zakup finansuje jeden egzemplarz przekazany bibliotece publicznej.",
    impactEn: "This purchase funds one copy donated to a public library.",
    price: 79,
    specPl: ["Format 145×205 mm", "Oprawa miękka", "Waga 380 g"],
    specEn: ["Format 145×205 mm", "Paperback", "Weight 380 g"],
    fulfilment: "own",
    stock: 12,
    emoji: "📘",
  },
  {
    slug: "przewodnik-pre-patent",
    category: "digital",
    namePl: "Przewodnik PDF: Ochrona pre-patentowa",
    nameEn: "PDF Guide: Pre-patent Protection",
    descPl: "Kompletny przewodnik po zabezpieczeniu pomysłu zanim trafi do urzędu patentowego.",
    descEn: "A complete guide to securing your idea before it reaches the patent office.",
    impactPl: "Ten zakup finansuje jedną godzinę konsultacji pro bono dla wynalazcy.",
    impactEn: "This purchase funds one hour of pro bono consultation for an inventor.",
    price: 49,
    specPl: ["PDF, 48 stron", "Pobranie natychmiastowe", "Bez wysyłki"],
    specEn: ["PDF, 48 pages", "Instant download", "No shipping"],
    fulfilment: "digital",
    emoji: "📄",
  },
  {
    slug: "wsparcie-bezposrednie",
    category: "support",
    namePl: "Wsparcie bezpośrednie",
    nameEn: "Direct Support",
    descPl: "Bez przedmiotu. Dla osób, które chcą wesprzeć pracę, a nie dostać kubek.",
    descEn: "No object. For people who want the work, not the mug.",
    impactPl: "Ta wpłata finansuje bezpośrednio pracę zespołu nad ochroną polskiej myśli technicznej.",
    impactEn: "This contribution funds the team's work protecting Polish technical thought directly.",
    price: 100,
    specPl: ["Brak wysyłki", "Możliwa faktura na firmę"],
    specEn: ["No shipping", "Company invoice available"],
    fulfilment: "none",
    emoji: "⭐",
  },
];

export const SHOP_CATEGORIES: { key: ShopCategory | "all"; pl: string; en: string }[] = [
  { key: "all", pl: "Wszystko", en: "All" },
  { key: "apparel", pl: "Odzież", en: "Apparel" },
  { key: "drinkware", pl: "Kubki", en: "Drinkware" },
  { key: "print", pl: "Plakaty", en: "Prints" },
  { key: "book", pl: "Książki", en: "Books" },
  { key: "digital", pl: "Cyfrowe", en: "Digital" },
  { key: "support", pl: "Wsparcie", en: "Support" },
];
