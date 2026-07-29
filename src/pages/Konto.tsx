import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Download,
  ExternalLink,
  FileText,
  Loader2,
  LogOut,
  Package,
  Sparkles,
} from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { getStripeEnvironment, hasPaymentsToken } from "@/lib/stripe";

interface OrderRow {
  id: string;
  order_no: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
  tracking_url: string | null;
  tracking_number: string | null;
}

interface InvoiceRow {
  id: string;
  number: string;
  issued_at: string;
  total: number;
  currency: string;
  access_token: string;
}

interface LibraryItem {
  pid: string;
  name: string;
  url: string | null;
  source: string | null;
}

const statusLabel: Record<string, string> = {
  pending: "Oczekuje na płatność",
  pending_pod_error: "Oczekuje na płatność",
  paid: "Opłacone",
  processing: "W realizacji",
  fulfilled: "Zrealizowane",
  shipped: "Wysłane",
  delivered: "Dostarczone",
  completed: "Zakończone",
  expired: "Wygasło",
  canceled: "Anulowane",
};

const Konto = () => {
  const { session, subscription, isActive, loading: subLoading } = useSubscription();
  const [params, setParams] = useSearchParams();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [portalBusy, setPortalBusy] = useState(false);

  useEffect(() => {
    if (params.get("verified") === "1") {
      toast.success("Adres e-mail potwierdzony. Możesz się zalogować.");
      params.delete("verified");
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

  const loadData = useCallback(async () => {
    setDataLoading(true);
    const [{ data: ord }, { data: inv }] = await Promise.all([
      supabase
        .from("shop_orders")
        .select("id, order_no, status, total, currency, created_at, tracking_url, tracking_number")
        .order("created_at", { ascending: false }),
      supabase
        .from("invoices")
        .select("id, number, issued_at, total, currency, access_token")
        .order("issued_at", { ascending: false }),
    ]);
    setOrders((ord as OrderRow[] | null) ?? []);
    setInvoices((inv as InvoiceRow[] | null) ?? []);

    if (hasPaymentsToken) {
      const { data, error } = await supabase.functions.invoke("digital-library", {
        body: { environment: getStripeEnvironment() },
      });
      if (error) console.error("digital-library failed:", error.message);
      setLibrary(((data?.items as LibraryItem[] | undefined) ?? []).filter((i) => i.source));
    }
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (session) void loadData();
    else {
      setOrders([]);
      setInvoices([]);
      setLibrary([]);
    }
  }, [session, loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/konto?verified=1`,
          data: { full_name: fullName },
        },
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Konto założone. Sprawdź skrzynkę i potwierdź adres e-mail.");
      setMode("login");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/konto` },
    });
    if (error) toast.error(error.message);
  };

  const resetPassword = async () => {
    if (!email) {
      toast.error("Podaj adres e-mail, na który wyślemy link.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-hasla`,
    });
    if (error) toast.error(error.message);
    else toast.success("Wysłaliśmy link do ustawienia nowego hasła.");
  };

  const openPortal = async () => {
    setPortalBusy(true);
    const { data, error } = await supabase.functions.invoke("create-portal-session", {
      body: { returnUrl: `${window.location.origin}/konto`, environment: getStripeEnvironment() },
    });
    setPortalBusy(false);
    if (error) {
      toast.error("Nie udało się otworzyć panelu subskrypcji.");
      return;
    }
    if (data?.url) window.open(data.url as string, "_blank", "noopener,noreferrer");
  };

  const money = (v: number, c: string) =>
    `${Number(v).toFixed(2).replace(".", ",")} ${c === "PLN" ? "zł" : c}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Moje konto — Konstelacja"
        description="Twoje konto w sklepie Konstelacji: historia zamówień, faktury, pobrania materiałów cyfrowych i subskrypcja Klubu."
        path="/konto"
        noindex
      />
      <TopBanner />
      <Navbar />

      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold break-words">Moje konto</h1>

          {!session ? (
            <Card className="mt-8 max-w-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  {mode === "login" ? "Zaloguj się" : "Załóż konto"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full whitespace-normal" onClick={signInWithGoogle}>
                  Kontynuuj z Google
                </Button>
                <div className="text-center text-xs text-muted-foreground">albo e-mailem</div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Imię i nazwisko</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Hasło</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                  </div>
                  <Button type="submit" className="w-full whitespace-normal" disabled={busy}>
                    {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "login" ? "Zaloguj się" : "Załóż konto"}
                  </Button>
                </form>
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <button
                    type="button"
                    className="underline text-muted-foreground"
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  >
                    {mode === "login" ? "Nie mam jeszcze konta" : "Mam już konto"}
                  </button>
                  <button type="button" className="underline text-muted-foreground" onClick={resetPassword}>
                    Nie pamiętam hasła
                  </button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground break-words">
                  Zalogowano jako {session.user.email}
                </p>
                <Button variant="ghost" onClick={() => supabase.auth.signOut()}>
                  <LogOut className="w-4 h-4 mr-1.5" /> Wyloguj
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="w-5 h-5" /> Klub Konstelacji
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isActive ? (
                    <>
                      <p className="text-sm">
                        Dostęp aktywny
                        {subscription?.current_period_end
                          ? ` do ${new Date(subscription.current_period_end).toLocaleDateString("pl-PL")}`
                          : ""}
                        .
                        {subscription?.cancel_at_period_end || subscription?.status === "canceled"
                          ? " Subskrypcja nie odnowi się automatycznie."
                          : ""}
                      </p>
                      {subscription?.status === "past_due" && (
                        <p className="text-sm text-destructive">
                          Ostatnia płatność się nie powiodła — zaktualizuj metodę płatności w panelu
                          subskrypcji, żeby nie stracić dostępu.
                        </p>
                      )}
                      <Button variant="outline" onClick={openPortal} disabled={portalBusy} className="whitespace-normal">
                        {portalBusy ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            Zarządzaj subskrypcją i zmień plan <ExternalLink className="w-4 h-4 ml-1.5" />
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">Nie masz aktywnego dostępu.</p>
                      <Button asChild className="whitespace-normal">
                        <Link to="/klub">Dołącz do Klubu</Link>
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Download className="w-5 h-5" /> Moje pobrania
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dataLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : library.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Brak materiałów cyfrowych. Kup e-booka w sklepie lub dołącz do Klubu, żeby
                      odblokować całą bibliotekę.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {library.map((it) => (
                        <li key={it.pid} className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm break-words">
                            {it.name}{" "}
                            <Badge variant="secondary">
                              {it.source === "klub" ? "Klub" : "Zakup"}
                            </Badge>
                          </span>
                          {it.url && (
                            <Button asChild size="sm" variant="outline">
                              <a href={it.url} target="_blank" rel="noopener noreferrer">
                                Pobierz
                              </a>
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5" /> Moje zamówienia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dataLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Brak zamówień na tym koncie.</p>
                  ) : (
                    <ul className="space-y-3">
                      {orders.map((o) => (
                        <li key={o.id} className="border-b last:border-0 pb-3 last:pb-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-medium break-words">{o.order_no}</span>
                            <Badge variant="secondary">{statusLabel[o.status] ?? o.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(o.created_at).toLocaleDateString("pl-PL")} ·{" "}
                            {money(o.total, o.currency)}
                          </p>
                          {o.tracking_url && (
                            <a
                              href={o.tracking_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs underline break-words"
                            >
                              Śledź przesyłkę {o.tracking_number}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5" /> Faktury
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dataLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : invoices.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Brak faktur.</p>
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
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Konto;
