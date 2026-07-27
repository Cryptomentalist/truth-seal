import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, FileText, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

interface InvoiceItem {
  name?: string;
  variant?: string;
  qty?: number;
  price?: number;
}

interface InvoiceResponse {
  invoice: {
    number: string;
    issuedAt: string;
    total: number;
    currency: string;
    downloadUrl: string | null;
  };
  order: {
    orderNo: string;
    name: string;
    email: string | null;
    items: InvoiceItem[];
    subtotal: number;
    shipping: number;
    total: number;
    currency: string;
    status: string;
    lang: string;
    trackingNumber: string | null;
    trackingUrl: string | null;
  } | null;
}

const money = (v: number, c = "PLN") => `${Number(v || 0).toFixed(2)} ${c}`;

const Faktura = () => {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<InvoiceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data: res, error: err } = await supabase.functions.invoke("get-invoice", {
        body: { token },
      });
      if (!active) return;
      if (err || (res as { error?: string })?.error) {
        setError((res as { error?: string })?.error || "not_found");
      } else {
        setData(res as InvoiceResponse);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [token]);

  const en = (data?.order?.lang || "pl").toLowerCase().startsWith("en");
  const t = (pl: string, enTxt: string) => (en ? enTxt : pl);

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <SEOHead
        path={`/faktura/${token ?? ""}`}
        title={t("Faktura — Konstelacja.org", "Invoice — Konstelacja.org")}
        description={t(
          "Panel klienta — podgląd i pobranie faktury do zamówienia w sklepie charytatywnym Konstelacja.org.",
          "Customer panel — view and download the invoice for your Konstelacja.org charity shop order.",
        )}
        noindex
      />

      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-2 font-heading text-2xl font-bold break-words text-foreground">
          {t("Panel klienta — faktura", "Customer panel — invoice")}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {t(
            "Dokument jest dostępny wyłącznie pod tym prywatnym linkiem.",
            "This document is available only via this private link.",
          )}
        </p>

        {loading && (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("Wczytywanie faktury…", "Loading invoice…")}
          </div>
        )}

        {!loading && error && (
          <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold text-foreground">
                {t("Nie znaleziono faktury", "Invoice not found")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Link jest nieprawidłowy lub wygasł. Napisz do nas: kontakt@konstelacja.org",
                  "The link is invalid or expired. Contact us: kontakt@konstelacja.org",
                )}
              </p>
            </div>
          </div>
        )}

        {!loading && data && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t("Numer dokumentu", "Invoice number")}
                  </p>
                  <p className="font-heading text-xl font-bold text-foreground break-words">
                    {data.invoice.number}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("Data wystawienia", "Issue date")}:{" "}
                    {new Date(data.invoice.issuedAt).toLocaleDateString(en ? "en-GB" : "pl-PL")}
                  </p>
                  {data.order && (
                    <p className="text-sm text-muted-foreground">
                      {t("Zamówienie", "Order")}: {data.order.orderNo}
                    </p>
                  )}
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>

              <Button
                asChild={!!data.invoice.downloadUrl}
                disabled={!data.invoice.downloadUrl}
                className="mt-6 w-full whitespace-normal sm:w-auto"
              >
                {data.invoice.downloadUrl ? (
                  <a href={data.invoice.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {t("Pobierz fakturę (PDF)", "Download invoice (PDF)")}
                  </a>
                ) : (
                  <span>{t("PDF w przygotowaniu", "PDF is being prepared")}</span>
                )}
              </Button>
            </div>

            {data.order && (
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
                  {t("Podsumowanie zamówienia", "Order summary")}
                </p>
                <ul className="space-y-2">
                  {(data.order.items || []).map((item, i) => (
                    <li key={i} className="flex justify-between gap-4 text-sm">
                      <span className="text-foreground break-words">
                        {[item.name, item.variant].filter(Boolean).join(" · ")} × {item.qty ?? 1}
                      </span>
                      <span className="whitespace-nowrap text-muted-foreground">
                        {money((item.price ?? 0) * (item.qty ?? 1), data.order!.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("Wartość produktów", "Subtotal")}</span>
                    <span>{money(data.order.subtotal, data.order.currency)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("Dostawa", "Shipping")}</span>
                    <span>{money(data.order.shipping, data.order.currency)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>{t("Razem", "Total")}</span>
                    <span>{money(data.order.total, data.order.currency)}</span>
                  </div>
                </div>
                {data.order.trackingNumber && (
                  <p className="mt-4 text-sm text-muted-foreground break-words">
                    {t("Numer śledzenia", "Tracking number")}: {data.order.trackingNumber}{" "}
                    {data.order.trackingUrl && (
                      <a
                        className="text-primary underline"
                        href={data.order.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("śledź przesyłkę", "track parcel")}
                      </a>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faktura;
