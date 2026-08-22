import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
  Package,
  Receipt,
  Truck,
} from "lucide-react";
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
  email: string | null;
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

const OPEN_STATUSES = ["pending", "pending_pod_error", "paid", "processing", "fulfilled"];

/** Kroki realizacji zamówienia — od płatności do doręczenia. */
const steps = (o: OrderRow) => {
  const paid = Boolean(o.paid_at) || !["pending", "pending_pod_error", "payment_failed", "expired", "canceled"].includes(o.status);
  const production = Boolean(o.printful_confirmed_at) || ["processing", "fulfilled", "shipped", "delivered", "completed"].includes(o.status);
  const shipped = Boolean(o.tracking_number) || ["shipped", "delivered", "completed"].includes(o.status);
  const delivered = ["delivered", "completed"].includes(o.status);
  return [
    { label: "Zamówienie złożone", done: true },
    { label: "Płatność potwierdzona", done: paid },
    { label: "Realizacja / produkcja", done: production },
    { label: "Wysyłka", done: shipped },
    { label: "Dostarczone", done: delivered },
  ];
};

const money = (v: number, c: string) =>
  `${Number(v).toFixed(2).replace(".", ",")} ${c === "PLN" ? "zł" : c}`;

const Platnosci = () => {
  const { session, subscription, isActive } = useSubscription();
  const [params] = useSearchParams();
  const justPaid = params.get("paid") === "1";
  const paidOrderNo = params.get("order");

  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    const [{ data: ord }, { data: inv }] = await Promise.all([
      supabase
        .from("shop_orders")
        .select(
          "id, order_no, status, total, currency, created_at, paid_at, printful_confirmed_at, tracking_url, tracking_number, email",
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
  }, [session]);

  useEffect(() => {
    void load();
  }, [load]);

  // Dopóki jakieś zamówienie jest w toku, odświeżamy status co 15 s.
  const hasOpen = useMemo(() => orders.some((o) => OPEN_STATUSES.includes(o.status)), [orders]);
  useEffect(() => {
    if (!session || !hasOpen) return;
    const id = window.setInterval(() => void load(), 15000);
    return () => window.clearInterval(id);
  }, [session, hasOpen, load]);

  const confirmed = paidOrderNo
    ? orders.find((o) => o.order_no === paidOrderNo)
    : orders[0];

  const invoiceFor = (orderId: string) => invoices.find((i) => i.order_id === orderId);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Płatności i status zamówienia — Konstelacja"
        description="Potwierdzenie płatności, historia transakcji, faktury i status realizacji zamówień w sklepie Konstelacji."
        path="/platnosci"
        noindex
      />
      <TopBanner />
      <Navbar />

      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 max-w-4xl space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold break-words">Płatności i zamówienia</h1>
            <p className="text-sm text-muted-foreground mt-2 break-words">
              Potwierdzenia płatności, historia transakcji, faktury oraz status realizacji każdego
              zamówienia w jednym miejscu.
            </p>
          </div>

          {justPaid && (
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> Płatność przyjęta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="break-words">
                  Dziękujemy! {paidOrderNo ? `Zamówienie ${paidOrderNo} zostało opłacone.` : "Twoja płatność została przyjęta."}{" "}
                  Potwierdzenie wysłaliśmy e-mailem, a fakturę znajdziesz na tej stronie zaraz po
                  wystawieniu.
                </p>
                {confirmed && (
                  <p className="text-muted-foreground break-words">
                    Bieżący status: {statusLabel[confirmed.status] ?? confirmed.status}.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {!session ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Zaloguj się, aby zobaczyć historię</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground break-words">
                  Historia transakcji i status realizacji są powiązane z Twoim adresem e-mail. Zaloguj
                  się (lub załóż konto na ten sam adres, którego użyłaś/-eś przy zakupie) — wcześniejsze
                  zamówienia dopiszemy automatycznie.
                </p>
                <Button asChild className="whitespace-normal">
                  <Link to="/konto">Przejdź do logowania</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5" /> Status realizacji
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading && orders.length === 0 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Brak zamówień na tym koncie.{" "}
                      <Link to="/sklep" className="underline">
                        Zajrzyj do sklepu
                      </Link>
                      .
                    </p>
                  ) : (
                    <ul className="space-y-6">
                      {orders.slice(0, 5).map((o) => (
                        <li key={o.id} className="border-b last:border-0 pb-6 last:pb-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-medium break-words">{o.order_no}</span>
                            <Badge variant="secondary">{statusLabel[o.status] ?? o.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(o.created_at).toLocaleString("pl-PL")} · {money(o.total, o.currency)}
                          </p>

                          <ol className="mt-4 space-y-2">
                            {steps(o).map((s) => (
                              <li key={s.label} className="flex items-center gap-2 text-sm">
                                <span
                                  className={`inline-flex w-4 h-4 rounded-full border shrink-0 ${
                                    s.done ? "bg-primary border-primary" : "border-border"
                                  }`}
                                  aria-hidden
                                />
                                <span className={s.done ? "" : "text-muted-foreground"}>{s.label}</span>
                              </li>
                            ))}
                          </ol>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {o.tracking_url && (
                              <Button asChild size="sm" variant="outline" className="whitespace-normal">
                                <a href={o.tracking_url} target="_blank" rel="noopener noreferrer">
                                  <Truck className="w-4 h-4 mr-1.5" /> Śledź przesyłkę{" "}
                                  {o.tracking_number}
                                </a>
                              </Button>
                            )}
                            {invoiceFor(o.id) && (
                              <Button asChild size="sm" variant="outline" className="whitespace-normal">
                                <Link to={`/faktura/${invoiceFor(o.id)!.access_token}`}>
                                  <FileText className="w-4 h-4 mr-1.5" /> Faktura{" "}
                                  {invoiceFor(o.id)!.number}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="w-5 h-5" /> Historia transakcji
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading && orders.length === 0 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Brak transakcji.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-xs text-muted-foreground">
                            <th className="py-2 pr-3 font-medium">Data</th>
                            <th className="py-2 pr-3 font-medium">Numer</th>
                            <th className="py-2 pr-3 font-medium">Kwota</th>
                            <th className="py-2 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((o) => (
                            <tr key={o.id} className="border-t">
                              <td className="py-2 pr-3 whitespace-nowrap">
                                {new Date(o.created_at).toLocaleDateString("pl-PL")}
                              </td>
                              <td className="py-2 pr-3 break-words">{o.order_no}</td>
                              <td className="py-2 pr-3 whitespace-nowrap">
                                {money(o.total, o.currency)}
                              </td>
                              <td className="py-2">
                                <Badge variant="secondary">{statusLabel[o.status] ?? o.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {isActive && subscription?.current_period_end && (
                    <p className="text-xs text-muted-foreground mt-4 break-words">
                      Klub Konstelacji: subskrypcja aktywna, następne rozliczenie{" "}
                      {new Date(subscription.current_period_end).toLocaleDateString("pl-PL")} (
                      {subscription.price_id === "klub_yearly" ? "290 zł / rok" : "29 zł / miesiąc"}).
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Receipt className="w-5 h-5" /> Faktury
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {invoices.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Brak faktur. Dokument wystawiamy automatycznie po zaksięgowaniu płatności.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {invoices.map((i) => (
                        <li key={i.id} className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm break-words">
                            {i.number} · {new Date(i.issued_at).toLocaleDateString("pl-PL")} ·{" "}
                            {money(i.total, i.currency)}
                          </span>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/faktura/${i.access_token}`}>Otwórz</Link>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Platnosci;
