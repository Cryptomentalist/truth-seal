import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Check, ExternalLink, Loader2, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SubscriptionPayment from "@/components/shop/SubscriptionPayment";
import PaymentTestModeBanner from "@/components/shop/PaymentTestModeBanner";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment, hasPaymentsToken } from "@/lib/stripe";
import { FunctionsHttpError } from "@supabase/supabase-js";

type PlanId = "klub_monthly" | "klub_yearly";

const plans: { id: PlanId; name: string; price: string; period: string; note?: string }[] = [
  { id: "klub_monthly", name: "Miesięcznie", price: "29 zł", period: "/ miesiąc" },
  { id: "klub_yearly", name: "Rocznie", price: "290 zł", period: "/ rok", note: "2 miesiące gratis" },
];

const benefits = [
  "Pełna biblioteka e-booków i przewodników (w tym „Claude, Practically”)",
  "Nowe materiały i aktualizacje w trakcie trwania dostępu",
  "Materiały warsztatowe i szablony do pracy z AI",
  "Wsparcie działań pro społecznych Konstelacji",
];

const Klub = () => {
  const { session, subscription, isActive, loading, refresh } = useSubscription();
  const [plan, setPlan] = useState<PlanId | null>(null);
  const [portalBusy, setPortalBusy] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get("subscribed") === "1") {
      toast.success("Dziękujemy! Aktywujemy Twój dostęp — może to potrwać chwilę.");
      params.delete("subscribed");
      setParams(params, { replace: true });
      const t = setTimeout(() => void refresh(), 2500);
      return () => clearTimeout(t);
    }
  }, [params, setParams, refresh]);

  const openPortal = async () => {
    setPortalBusy(true);
    const { data, error } = await supabase.functions.invoke("create-portal-session", {
      body: { returnUrl: `${window.location.origin}/klub`, environment: getStripeEnvironment() },
    });
    setPortalBusy(false);
    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("create-portal-session failed:", details);
      toast.error("Nie udało się otworzyć panelu subskrypcji.");
      return;
    }
    if (data?.url) window.open(data.url as string, "_blank", "noopener,noreferrer");
  };

  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("pl-PL")
    : null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Klub Konstelacji — dostęp do materiałów"
        description="Subskrypcja Klubu Konstelacji: pełny dostęp do e-booków, przewodników i materiałów warsztatowych. Anulujesz kiedy chcesz — dostęp trwa do końca opłaconego okresu."
        path="/klub"
      />
      <PaymentTestModeBanner />
      <TopBanner />
      <Navbar />

      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Klub Konstelacji
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold break-words">
              Stały dostęp do materiałów
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Jedna subskrypcja, cała biblioteka wiedzy. Anulujesz kiedy chcesz — dostęp
              działa do końca opłaconego okresu, bez odcinania z dnia na dzień.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" /> Co dostajesz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Twój dostęp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Sprawdzamy status…
                  </p>
                ) : !session ? (
                  <>
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                      Zaloguj się lub załóż konto, żeby wykupić dostęp i wracać do materiałów
                      z każdego urządzenia.
                    </p>
                    <Button asChild className="w-full whitespace-normal">
                      <Link to="/admin">Zaloguj się / załóż konto</Link>
                    </Button>
                  </>
                ) : isActive ? (
                  <>
                    <p className="text-sm">
                      Dostęp aktywny{periodEnd ? ` do ${periodEnd}` : ""}.
                      {subscription?.cancel_at_period_end || subscription?.status === "canceled"
                        ? " Subskrypcja nie odnowi się automatycznie."
                        : ""}
                    </p>
                    <Button asChild className="w-full whitespace-normal">
                      <Link to="/sklep">Przejdź do materiałów</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full whitespace-normal"
                      onClick={openPortal}
                      disabled={portalBusy}
                    >
                      {portalBusy ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Zarządzaj subskrypcją <ExternalLink className="w-4 h-4 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nie masz jeszcze aktywnego dostępu. Wybierz plan poniżej.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {session && !isActive && !loading && (
            <div className="mt-10">
              {!hasPaymentsToken ? (
                <p className="text-sm text-muted-foreground text-center">
                  Płatności nie są jeszcze skonfigurowane dla tej wersji strony.
                </p>
              ) : plan ? (
                <div className="space-y-4">
                  <Button variant="ghost" onClick={() => setPlan(null)}>
                    ← Zmień plan
                  </Button>
                  <SubscriptionPayment
                    priceId={plan}
                    returnUrl={`${window.location.origin}/klub?subscribed=1`}
                  />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {plans.map((p) => (
                    <Card key={p.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="flex items-baseline gap-2 text-lg">
                          {p.name}
                          {p.note && <Badge variant="secondary">{p.note}</Badge>}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between gap-4">
                        <p className="text-3xl font-bold">
                          {p.price}
                          <span className="text-base font-normal text-muted-foreground">
                            {" "}
                            {p.period}
                          </span>
                        </p>
                        <Button className="w-full whitespace-normal" onClick={() => setPlan(p.id)}>
                          Wybieram
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="mt-10 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            Subskrypcję możesz anulować w każdej chwili — dostęp pozostaje aktywny do końca
            opłaconego okresu, a kolejna płatność nie zostanie pobrana. Materiały cyfrowe
            udostępniamy natychmiast, dlatego zgodnie z regulaminem prawo odstąpienia od umowy
            wygasa z chwilą rozpoczęcia pobierania.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Klub;
