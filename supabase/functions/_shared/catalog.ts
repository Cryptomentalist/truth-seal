// Serwerowa kopia katalogu — ceny liczymy zawsze tutaj, nigdy z przeglądarki.
// `pf` = sync_variant_id z Printful (Store > Products > wariant). Brak `pf` => pozycja nie idzie do Printful.

export interface ServerVariant {
  id: string;
  label: string;
  pf?: number;
  /** Stan magazynowy — zamówienie ponad tę wartość jest odrzucane. */
  stock: number;
}

export interface ServerProduct {
  id: string;
  name: string;
  price: number;
  digital?: boolean;
  noship?: boolean;
  /** Ścieżka pliku w prywatnym buckecie `digital-products` — wydawana wyłącznie po opłaceniu. */
  file?: string;
  variants: ServerVariant[];
}

/** Statusy zamówienia, przy których plik cyfrowy może zostać udostępniony. */
export const PAID_STATUSES = ["paid", "processing", "fulfilled", "shipped", "delivered", "completed"];
export const isPaid = (status?: string | null) => PAID_STATUSES.includes((status || "").toLowerCase());

export const SERVER_CATALOG: ServerProduct[] = [
  {
    id: "mug-cww",
    name: "Kubek — Copy what works",
    price: 79,
    variants: [
      { id: "v1", label: "Granat", stock: 40 },
      { id: "v2", label: "Piaskowy", stock: 6 },
    ],
  },
  {
    id: "tee-comp",
    name: "T-shirt — Complementarity over competition",
    price: 149,
    variants: [
      { id: "s", label: "S", stock: 12 },
      { id: "m", label: "M", stock: 20 },
      { id: "l", label: "L", stock: 18 },
      { id: "xl", label: "XL", stock: 4 },
    ],
  },
  {
    id: "poster-pyr",
    name: "Plakat — Piramida ekosystemu AI",
    price: 119,
    variants: [{ id: "v1", label: "50 × 70 cm", stock: 25 }],
  },
  {
    id: "book-zw",
    name: "Ziarno i wiatr",
    price: 69,
    variants: [{ id: "v1", label: "Wydanie polskie", stock: 60 }],
  },
  {
    id: "geo-guide",
    name: "GEO — przewodnik po widoczności w AI",
    price: 149,
    digital: true,
    variants: [{ id: "v1", label: "Plik PDF", stock: 999 }],
  },
  {
    id: "ebook-claude",
    name: "Claude, Practically — At Your Pace (e-book PDF)",
    price: 89,
    digital: true,
    file: "ebook-claude/claude-practically-at-your-pace.pdf",
    variants: [{ id: "v1", label: "Plik PDF (EN)", stock: 999 }],
  },
  {
    id: "puzzle-site",
    name: "Puzzle 369 — Twoja unikalna strona-wizytówka",
    price: 1200,
    noship: true,
    variants: [{ id: "v1", label: "1 z 369 puzzli", stock: 369 }],
  },
  {
    id: "support",
    name: "Wsparcie bezpośrednie",
    price: 100,
    noship: true,
    variants: [{ id: "v1", label: "100 zł", stock: 999 }],
  },
];

export const findProduct = (pid: string) => SERVER_CATALOG.find((p) => p.id === pid);
export const findVariant = (p: ServerProduct, vid: string) => p.variants.find((v) => v.id === vid);
