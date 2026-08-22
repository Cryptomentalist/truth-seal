import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { PRODUCTS } from "@/data/shopProducts";
import { toast } from "sonner";
import { RefreshCw, Save, Mail } from "lucide-react";

const CATS = ["apparel", "drinkware", "print", "book", "digital", "support"] as const;

const CAT_LABEL: Record<string, string> = {
  apparel: "Odzież",
  drinkware: "Kubki",
  print: "Plakaty",
  book: "Książki",
  digital: "Produkty cyfrowe",
  support: "Wsparcie",
};

interface Row {
  product_id: string;
  price: string;
  visible: boolean;
  sold_out: boolean;
}

const AdminShop = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();

  const [rows, setRows] = useState<Row[]>([]);
  const [cats, setCats] = useState<Record<string, boolean>>({});
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setFetching(true);
    const [p, c] = await Promise.all([
      supabase.from("shop_product_settings").select("product_id, price, visible, sold_out"),
      supabase.from("shop_category_settings").select("cat, visible"),
    ]);
    setFetching(false);
    if (p.error || c.error) {
      toast.error(p.error?.message ?? c.error?.message ?? "Błąd wczytywania");
      return;
    }
    setRows(
      PRODUCTS.map((prod) => {
        const s = p.data?.find((x) => x.product_id === prod.id);
        return {
          product_id: prod.id,
          price: String(s?.price != null ? Number(s.price) : prod.price),
          visible: s ? s.visible : true,
          sold_out: s ? s.sold_out : false,
        };
      }),
    );
    const map: Record<string, boolean> = {};
    CATS.forEach((k) => {
      map[k] = c.data?.find((x) => x.cat === k)?.visible ?? true;
    });
    setCats(map);
  };

  useEffect(() => {
    if (!loading && !session) navigate("/admin", { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (isAdmin) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const setRow = (id: string, patch: Partial<Row>) =>
    setRows((cur) => cur.map((r) => (r.product_id === id ? { ...r, ...patch } : r)));

  const save = async () => {
    for (const r of rows) {
      const v = Number(r.price.replace(",", "."));
      if (!Number.isFinite(v) || v <= 0) {
        toast.error(`Nieprawidłowa cena dla ${r.product_id}`);
        return;
      }
    }
    setSaving(true);
    const [p, c] = await Promise.all([
      supabase.from("shop_product_settings").upsert(
        rows.map((r) => ({
          product_id: r.product_id,
          price: Number(r.price.replace(",", ".")),
          visible: r.visible,
          sold_out: r.sold_out,
        })),
        { onConflict: "product_id" },
      ),
      supabase.from("shop_category_settings").upsert(
        CATS.map((k) => ({ cat: k, visible: cats[k] ?? true })),
        { onConflict: "cat" },
      ),
    ]);
    setSaving(false);
    if (p.error || c.error) {
      toast.error(p.error?.message ?? c.error?.message ?? "Nie udało się zapisać");
      return;
    }
    toast.success("Zapisano ustawienia sklepu");
    load();
  };

  if (loading) {
    return <main className="min-h-screen grid place-items-center">Ładowanie…</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center px-4 text-center">
        <SEOHead title="Brak dostępu" description="Panel administratora." path="/admin/sklep" noindex />
        <div>
          <h1 className="text-xl font-semibold mb-2">Brak uprawnień administratora</h1>
          <p className="text-sm text-muted-foreground">To konto nie ma roli administratora.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <SEOHead
        title="Zarządzanie sklepem"
        description="Panel administracyjny — ceny, widoczność produktów i kategorii."
        path="/admin/sklep"
        noindex
      />
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Zarządzanie sklepem</h1>
            <p className="text-sm text-muted-foreground">
              Ceny, widoczność produktów i kategorii. Zmiany działają od razu, również przy wycenie zamówień.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={fetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
              Odśwież
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/emaile")}>
              <Mail className="mr-2 h-4 w-4" />
              Logi e-mail
            </Button>
            <Button size="sm" onClick={save} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Zapisywanie…" : "Zapisz"}
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Produkty i ceny</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produkt</TableHead>
                  <TableHead>Kategoria</TableHead>
                  <TableHead className="w-36">Cena (zł)</TableHead>
                  <TableHead className="w-28">Widoczny</TableHead>
                  <TableHead className="w-28">Wyprzedany</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const prod = PRODUCTS.find((p) => p.id === r.product_id)!;
                  return (
                    <TableRow key={r.product_id}>
                      <TableCell className="font-medium">{prod.pl.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {CAT_LABEL[prod.cat] ?? prod.cat}
                      </TableCell>
                      <TableCell>
                        <Input
                          inputMode="decimal"
                          value={r.price}
                          onChange={(e) => setRow(r.product_id, { price: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={r.visible}
                          onCheckedChange={(v) => setRow(r.product_id, { visible: v })}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={r.sold_out}
                          onCheckedChange={(v) => setRow(r.product_id, { sold_out: v })}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Widoczność kategorii</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {CATS.map((k) => (
              <label key={k} className="flex items-center justify-between rounded-md border p-3">
                <span className="text-sm">{CAT_LABEL[k]}</span>
                <Switch
                  checked={cats[k] ?? true}
                  onCheckedChange={(v) => setCats((cur) => ({ ...cur, [k]: v }))}
                />
              </label>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminShop;
