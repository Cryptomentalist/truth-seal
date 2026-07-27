import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

type State = "loading" | "valid" | "invalid" | "already" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
    fetch(url, { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } })
      .then((r) => r.json())
      .then((d) => {
        if (d?.valid) setState("valid");
        else if (d?.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("error"));
  }, [token]);

  const confirm = async () => {
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setBusy(false);
    if (error) setState("error");
    else if (data?.success) setState("done");
    else setState("already");
  };

  const messages: Record<State, string> = {
    loading: "Sprawdzamy link…",
    valid: "Czy na pewno chcesz zrezygnować z otrzymywania wiadomości e-mail?",
    invalid: "Ten link jest nieprawidłowy lub wygasł.",
    already: "Ten adres został już wypisany.",
    done: "Zostałeś wypisany. Nie będziemy więcej wysyłać wiadomości.",
    error: "Coś poszło nie tak. Spróbuj ponownie później.",
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <SEOHead title="Rezygnacja z e-maili | Konstelacja.org" description="Zarządzaj swoimi preferencjami e-mail w Konstelacja.org." />
      <div className="max-w-md w-full text-center border border-border rounded-2xl p-8 bg-card">
        <h1 className="text-2xl font-semibold mb-4 break-words">Rezygnacja z e-maili</h1>
        <p className="text-muted-foreground mb-6">{messages[state]}</p>
        {state === "valid" && (
          <Button onClick={confirm} disabled={busy} className="whitespace-normal">
            {busy ? "Przetwarzanie…" : "Potwierdzam rezygnację"}
          </Button>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
