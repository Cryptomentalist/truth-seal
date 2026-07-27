// Serwerowa kopia katalogu — ceny liczymy zawsze tutaj, nigdy z przeglądarki.
// `pf` = sync_variant_id z Printful (Store > Products > wariant). Brak `pf` => pozycja nie idzie do Printful.

export interface ServerVariant {
  id: string;
  label: string;
  pf?: number;
}

export interface ServerProduct {
  id: string;
  name: string;
  price: number;
  digital?: boolean;
  noship?: boolean;
  variants: ServerVariant[];
}

export const SERVER_CATALOG: ServerProduct[] = [
  {
    id: "mug-cww",
    name: "Kubek — Copy what works",
    price: 79,
    variants: [
      { id: "v1", label: "Granat" },
      { id: "v2", label: "Piaskowy" },
    ],
  },
  {
    id: "tee-comp",
    name: "T-shirt — Complementarity over competition",
    price: 149,
    variants: [
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
      { id: "xl", label: "XL" },
    ],
  },
  {
    id: "poster-pyr",
    name: "Plakat — Piramida ekosystemu AI",
    price: 119,
    variants: [{ id: "v1", label: "50 × 70 cm" }],
  },
  {
    id: "book-zw",
    name: "Ziarno i wiatr",
    price: 69,
    variants: [{ id: "v1", label: "Wydanie polskie" }],
  },
  {
    id: "geo-guide",
    name: "GEO — przewodnik po widoczności w AI",
    price: 149,
    digital: true,
    variants: [{ id: "v1", label: "Plik PDF" }],
  },
  {
    id: "support",
    name: "Wsparcie bezpośrednie",
    price: 100,
    noship: true,
    variants: [{ id: "v1", label: "100 zł" }],
  },
];

export const findProduct = (pid: string) => SERVER_CATALOG.find((p) => p.id === pid);
export const findVariant = (p: ServerProduct, vid: string) => p.variants.find((v) => v.id === vid);
