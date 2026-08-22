import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Loader2, Package, Truck } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";

interface OrderRow {
  id: string;
  order_no: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
  paid_at: string | null;
  printful_confirmed_at: string | null;
  tracking_url: string | null;
  tracking_number: string | null;
  items: unknown;
}

interface InvoiceRow {
  id: string;
  number: string;
  issued_at: string;
  total: number;
  currency: string;
  access_token: string;
  order_id: string | null;
}

const statusLabel: Record<string, string> = {
  pending: "Oczekuje na płatność",
  pending_pod_error: "Oczekuje na płatność",
  payment_failed: "Płatność nieudana",
  paid: "Opłacone",
  processing: "W realizacji",
  fulfilled: "Zrealizowane",
  shipped: "Wysłane",
  delivered: "Dostarczone",
  completed: "Zakończone",
  expired: "Wygasło",
  canceled: "Anulowane",
  refunded: "Zwrócone",
  disputed: "Reklamacja płatnicza",
};

const steps = (o: OrderRow) => {
  const paid =
    Boolean(o.paid_at) ||
    !["pending", "pending_pod_error", "payment_failed", "expired", "canceled"].includes(o.status);
  const production =
    Boolean(o.printful_confirmed_at) ||
    ["processing", "fulfilled", "shipped", "delivered", "completed"].includes(o.status);
  const shipped =
    Boolean(o.tracking_number) || ["shipped", "delivered", "completed"].includes(o.status);
  const delivered = ["delivered", "completed"].includes(o.status);
  return [
    { label: "Złożone", done: true },
    { label: "Opłacone", done: paid },
    { label: "Realizacja", done: production },
    { label: "Wysyłka", done: shipped },
    { label: "Dostarczone", done: delivered },
  ];
};

const money = (v: number, c: string) =>
  `${Number(v).toFixed(2).replace(".", ",")} ${c === "PLN" ? "zł" : c}`;

interface ItemLine {
  name?: string;
  qty?: number;
  quantity?: number;
}

const itemLines = (items: unknown): ItemLine[] =>
  Array.isArray(items) ? (items as ItemLine[]) : [];

const KontoZamowienia = () => {
  const { session } = useSubscription();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: ord }, { data: inv }] = await Promise.all([
      supabase
        .from("shop_orders")
        .select(
          "id, order_no, status, total, currency, created_at, paid_at, printful_confirmed_at, tracking_url, tracking_number, items",
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("invoices")
        .select("id, number, issued_at, total, currency, access_token, order_id")
        .order("issued_at", { ascending: false }),
    ]);
    setOrders((ord as OrderRow[] | null) ?? []);
    setInvoices((inv as InvoiceRow[] | null) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (session) void load();
    else {
      setOrders([]);
      setInvoices([]);
    }
  }, [session, load]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Historia zamówień — Konstelacja"
        description="Historia Twoich zamówień w sklepie Konstelacji: statusy realizacji, śledzenie przesyłek i faktury PDF."
        path="/konto/zamowienia"
        noindex
      />
      <TopBanner />
      <Navbar />

      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 max-w-4xl">
          <Button asChild variant="ghost" size="sm" className="mb-4 whitespace-normal">
            <Link to="/konto">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Wróć do konta
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold break-words">Historia zamówień</h1>
          <p className="mt-2 text-sm text-muted-foreground break-words">
            Statusy realizacji, śledzenie przesyłek i faktury do pobrania.
          </p>

          {!session ? (
            <Card className="mt-8 max-w-md">
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Zaloguj się, aby zobaczyć historię swoich zamówień.
                </p>
                <Button asChild className="whitespace-normal">
                  <Link to="/konto">Przejdź do logowania</Link>
                </Button>
              </CardContent>
            </Card>
          ) : loading ? (
            <Loader2 className="w-5 h-5 animate-spin mt-8" />
          ) : orders.length === 0 ? (
            <Card className="mt-8 max-w-md">
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground">Brak zamówień na tym koncie.</p>
                <Button asChild className="whitespace-normal">
                  <Link to="/sklep">Przejdź do sklepu</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-8 space-y-5">
              {orders.map((o) => {
                const inv = invoices.find((i) => i.order_id === o.id);
                const lines = itemLines(o.items);
                return (
                  <Card key={o.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-base">
                        <span className="flex items-center gap-2 break-words">
                          <Package className="w-4 h-4" /> {o.order_no}
                        </span>
                        <Badge variant="secondary">{statusLabel[o.status] ?? o.status}</Badge>
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.created_at).toLocaleDateString("pl-PL")} ·{" "}
                        {money(o.total, o.currency)}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {lines.length > 0 && (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {lines.map((l, idx) => (
                            <li key={idx} className="break-words">
                              {l.name ?? "Produkt"} × {l.qty ?? l.quantity ?? 1}
                            </li>
                          ))}
                        </ul>
                      )}

                      <ol className="flex flex-wrap gap-x-4 gap-y-2">
                        {steps(o).map((s) => (
                          <li
                            key={s.label}
                            className={`flex items-center gap-1.5 text-xs ${
                              s.done ? "text-foreground" : "text-muted-foreground/60"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                s.done ? "bg-primary" : "bg-muted-foreground/30"
                              }`}
                            />
                            {s.label}
                          </li>
                        ))}
                      </ol>

                      <div className="flex flex-wrap gap-2">
                        {o.tracking_url && (
                          <Button asChild size="sm" variant="outline">
                            <a href={o.tracking_url} target="_blank" rel="noopener noreferrer">
                              <Truck className="w-4 h-4 mr-1.5" /> Śledź przesyłkę
                              {o.tracking_number ? ` ${o.tracking_number}` : ""}
                            </a>
                          </Button>
                        )}
                        {inv ? (
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/faktura/${inv.access_token}`}>
                              <FileText className="w-4 h-4 mr-1.5" /> Faktura {inv.number} (PDF)
                            </Link>
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground self-center">
                            Faktura pojawi się po zaksięgowaniu płatności.
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default KontoZamowienia;
