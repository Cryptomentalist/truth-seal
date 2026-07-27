// Generowanie faktury PDF (pdf-lib + osadzona czcionka Unicode dla polskich znaków)
import { PDFDocument, rgb, StandardFonts } from "npm:pdf-lib@1.17.1";
import fontkit from "npm:@pdf-lib/fontkit@1.1.1";

const FONT_REGULAR =
  "https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans.ttf";
const FONT_BOLD =
  "https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans-Bold.ttf";

export interface InvoiceItem {
  name?: string;
  variant?: string;
  qty?: number;
  price?: number;
}

export interface InvoiceData {
  number: string;
  issuedAt: Date;
  orderNo: string;
  lang: string;
  buyer: {
    name: string;
    company?: string | null;
    taxId?: string | null;
    street?: string | null;
    zip?: string | null;
    city?: string | null;
    email: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
}

const SELLER = [
  "Konstelacja Sp. z o.o.",
  "ul. Morska 30B/5, 84-240 Reda",
  "Fundacja Konstelacja.org — KRS 0000270261",
  "kontakt@konstelacja.org",
];

const ASCII: Record<string, string> = {
  ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
  Ą: "A", Ć: "C", Ę: "E", Ł: "L", Ń: "N", Ó: "O", Ś: "S", Ź: "Z", Ż: "Z",
};
const toAscii = (s: string) => s.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => ASCII[c] ?? c);

const money = (v: number, c: string) => `${v.toFixed(2)} ${c}`;

async function loadFont(url: string): Promise<Uint8Array | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch {
    return null;
  }
}

export async function buildInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const en = (data.lang || "pl").toLowerCase().startsWith("en");
  const t = (pl: string, enTxt: string) => (en ? enTxt : pl);

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const [regularBytes, boldBytes] = await Promise.all([
    loadFont(FONT_REGULAR),
    loadFont(FONT_BOLD),
  ]);
  const unicode = !!(regularBytes && boldBytes);
  const font = unicode
    ? await pdf.embedFont(regularBytes!, { subset: true })
    : await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = unicode
    ? await pdf.embedFont(boldBytes!, { subset: true })
    : await pdf.embedFont(StandardFonts.HelveticaBold);
  const safe = (s: string) => (unicode ? s : toAscii(s));

  const page = pdf.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const M = 48;
  const ink = rgb(0.06, 0.09, 0.16);
  const muted = rgb(0.4, 0.45, 0.52);
  const line = rgb(0.85, 0.88, 0.92);
  let y = height - M;

  const draw = (
    text: string,
    x: number,
    yy: number,
    size = 10,
    bold = false,
    color = ink,
  ) => page.drawText(safe(text), { x, y: yy, size, font: bold ? fontBold : font, color });

  const right = (text: string, xRight: number, yy: number, size = 10, bold = false, color = ink) => {
    const f = bold ? fontBold : font;
    const w = f.widthOfTextAtSize(safe(text), size);
    page.drawText(safe(text), { x: xRight - w, y: yy, size, font: f, color });
  };

  // Nagłówek
  draw("Konstelacja.org", M, y, 16, true);
  right(t("FAKTURA", "INVOICE"), width - M, y, 16, true);
  y -= 20;
  draw(t("Sklep charytatywny", "Charity shop"), M, y, 9, false, muted);
  right(data.number, width - M, y, 11, true);
  y -= 14;
  right(
    `${t("Data wystawienia", "Issue date")}: ${data.issuedAt.toISOString().slice(0, 10)}`,
    width - M,
    y,
    9,
    false,
    muted,
  );
  y -= 12;
  right(`${t("Zamówienie", "Order")}: ${data.orderNo}`, width - M, y, 9, false, muted);

  y -= 28;
  page.drawLine({ start: { x: M, y }, end: { x: width - M, y }, color: line, thickness: 1 });
  y -= 22;

  // Sprzedawca / Nabywca
  const colRight = width / 2 + 10;
  const startY = y;
  draw(t("Sprzedawca", "Seller"), M, y, 9, true, muted);
  draw(t("Nabywca", "Buyer"), colRight, y, 9, true, muted);
  y -= 15;
  let ySeller = y;
  for (const l of SELLER) {
    draw(l, M, ySeller, 10);
    ySeller -= 13;
  }
  let yBuyer = y;
  const buyerLines = [
    data.buyer.company || data.buyer.name,
    data.buyer.company ? data.buyer.name : "",
    data.buyer.taxId ? `NIP: ${data.buyer.taxId}` : "",
    data.buyer.street || "",
    [data.buyer.zip, data.buyer.city].filter(Boolean).join(" "),
    data.buyer.email,
  ].filter(Boolean) as string[];
  for (const l of buyerLines) {
    draw(l, colRight, yBuyer, 10);
    yBuyer -= 13;
  }
  y = Math.min(ySeller, yBuyer) - 18;
  if (y > startY - 60) y = startY - 60;

  // Tabela pozycji
  page.drawRectangle({
    x: M,
    y: y - 4,
    width: width - 2 * M,
    height: 20,
    color: rgb(0.96, 0.97, 0.98),
  });
  draw(t("Pozycja", "Item"), M + 8, y + 2, 9, true, muted);
  right(t("Ilość", "Qty"), width - M - 200, y + 2, 9, true, muted);
  right(t("Cena", "Price"), width - M - 110, y + 2, 9, true, muted);
  right(t("Wartość", "Amount"), width - M - 8, y + 2, 9, true, muted);
  y -= 24;

  for (const it of data.items) {
    const qty = it.qty ?? 1;
    const price = it.price ?? 0;
    const label = [it.name ?? "—", it.variant].filter(Boolean).join(" · ");
    draw(label.slice(0, 52), M + 8, y, 10);
    right(String(qty), width - M - 200, y, 10);
    right(money(price, data.currency), width - M - 110, y, 10);
    right(money(price * qty, data.currency), width - M - 8, y, 10);
    y -= 16;
    if (y < 160) break;
  }

  y -= 8;
  page.drawLine({ start: { x: M, y }, end: { x: width - M, y }, color: line, thickness: 1 });
  y -= 20;

  right(t("Wartość produktów", "Subtotal"), width - M - 110, y, 10, false, muted);
  right(money(data.subtotal, data.currency), width - M - 8, y, 10);
  y -= 16;
  right(t("Dostawa", "Shipping"), width - M - 110, y, 10, false, muted);
  right(money(data.shipping, data.currency), width - M - 8, y, 10);
  y -= 20;
  right(t("Razem do zapłaty", "Total due"), width - M - 110, y, 12, true);
  right(money(data.total, data.currency), width - M - 8, y, 12, true);

  // Stopka
  const footY = 70;
  page.drawLine({
    start: { x: M, y: footY + 34 },
    end: { x: width - M, y: footY + 34 },
    color: line,
    thickness: 1,
  });
  draw(
    t(
      "Dokument wygenerowany elektronicznie — ważny bez podpisu.",
      "Electronically generated document — valid without a signature.",
    ),
    M,
    footY + 16,
    8,
    false,
    muted,
  );
  draw(
    t(
      "Zysk ze sprzedaży wspiera cele statutowe Fundacji Konstelacja.org.",
      "Profits from sales support the statutory goals of the Konstelacja.org Foundation.",
    ),
    M,
    footY + 4,
    8,
    false,
    muted,
  );

  return await pdf.save();
}
