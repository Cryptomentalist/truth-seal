import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Hasła nie są identyczne.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Hasło zmienione.");
    navigate("/konto");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nowe hasło — Konstelacja"
        description="Ustaw nowe hasło do swojego konta w sklepie Konstelacji."
        path="/reset-hasla"
        noindex
      />
      <TopBanner />
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg break-words">Ustaw nowe hasło</CardTitle>
            </CardHeader>
            <CardContent>
              {!ready ? (
                <p className="text-sm text-muted-foreground">
                  Otwórz tę stronę z linku, który wysłaliśmy e-mailem, żeby ustawić nowe hasło.
                </p>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="pw">Nowe hasło</Label>
                    <Input
                      id="pw"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pw2">Powtórz hasło</Label>
                    <Input
                      id="pw2"
                      type="password"
                      required
                      minLength={8}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <Button type="submit" className="w-full whitespace-normal" disabled={busy}>
                    {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Zapisz hasło"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
