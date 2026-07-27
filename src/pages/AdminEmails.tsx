import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "sonner";
import { RefreshCw, LogOut, Send, Webhook } from "lucide-react";

interface LogRow {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

interface OrderRow {
  id: string;
  order_no: string;
  email: string;
  status: string;
  tracking_number: string | null;
  tracking_url: string | null;
  printful_error: string | null;
  updated_at: string;
}

const PRESETS = [
  { key: "24h", label: "Ostatnie 24h", hours: 24 },
  { key: "7d", label: "7 dni", hours: 24 * 7 },
  { key: "30d", label: "30 dni", hours: 24 * 30 },
];

const PAGE_SIZE = 50;

const statusVariant = (status: string) => {
  if (status === "sent") return "bg-emerald-100 text-emerald-800";
  if (status === "dlq" || status === "failed" || status === "bounced") return "bg-red-100 text-red-800";
  if (status === "suppressed" || status === "complained") return "bg-amber-100 text-amber-900";
  return "bg-slate-100 text-slate-700";
};

const statusLabel: Record<string, string> = {
  sent: "Wysłany",
  pending: "W kolejce",
  dlq: "Błąd (nieudany)",
  failed: "Błąd",
  suppressed: "Zablokowany",
  bounced: "Odbity",
  complained: "Skarga",
};

const AdminEmails = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();

  const [rows, setRows] = useState<LogRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [fetching, setFetching] = useState(false);
  const [preset, setPreset] = useState("7d");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [template, setTemplate] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(0);

  // Testy konfiguracji nadawcy i webhooków
  const [testEmail, setTestEmail] = useState("");
  const [testTemplate, setTestTemplate] = useState("order-shipped");
  const [testLang, setTestLang] = useState("pl");
  const [testing, setTesting] = useState<null | "email" | "webhook">(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email && !testEmail) setTestEmail(session.user.email);
  }, [session, testEmail]);

  const runTest = async (action: "send_test_email" | "simulate_webhook") => {
    setTesting(action === "send_test_email" ? "email" : "webhook");
    setTestResult(null);
    const { data, error } = await supabase.functions.invoke("admin-email-test", {
      body: {
        action,
        recipientEmail: testEmail.trim(),
        templateName: testTemplate,
        lang: testLang,
      },
    });
    setTesting(null);
    if (error) {
      toast.error(`Test nie powiódł się: ${error.message}`);
      setTestResult(error.message);
      return;
    }
    setTestResult(JSON.stringify(data, null, 2));
    toast.success(
      action === "send_test_email"
        ? `Testowy e-mail wysłany na ${testEmail.trim()}`
        : "Symulacja webhooka Printful wykonana (tryb testowy)",
    );
    setTimeout(load, 1500);
  };

  useEffect(() => {
    if (!loading && !session) navigate("/admin", { replace: true });
  }, [loading, session, navigate]);

  const range = useMemo(() => {
    if (preset === "custom" && customFrom) {
      return {
        from: new Date(customFrom).toISOString(),
        to: customTo ? new Date(`${customTo}T23:59:59`).toISOString() : new Date().toISOString(),
      };
    }
    const hours = PRESETS.find((p) => p.key === preset)?.hours ?? 168;
    return {
      from: new Date(Date.now() - hours * 3600_000).toISOString(),
      to: new Date().toISOString(),
    };
  }, [preset, customFrom, customTo]);

  const load = async () => {
    if (!isAdmin) return;
    setFetching(true);
    const [logRes, orderRes] = await Promise.all([
      supabase
        .from("email_send_log")
        .select("id, message_id, template_name, recipient_email, status, error_message, created_at")
        .gte("created_at", range.from)
        .lte("created_at", range.to)
        .order("created_at", { ascending: false })
        .limit(2000),
      supabase
        .from("shop_orders")
        .select("id, order_no, email, status, tracking_number, tracking_url, printful_error, updated_at")
        .order("updated_at", { ascending: false })
        .limit(50),
    ]);
    setFetching(false);
    if (logRes.error) {
      toast.error(logRes.error.message);
      return;
    }
    setRows((logRes.data ?? []) as LogRow[]);
    setOrders((orderRes.data ?? []) as OrderRow[]);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, range.from, range.to]);

  // Deduplicate: keep the latest row per message_id
  const deduped = useMemo(() => {
    const seen = new Map<string, LogRow>();
    for (const r of rows) {
      const key = r.message_id ?? r.id;
      if (!seen.has(key)) seen.set(key, r);
    }
    return Array.from(seen.values()).sort(
      (a, b) => +new Date(b.created_at) - +new Date(a.created_at),
    );
  }, [rows]);

  const templates = useMemo(
    () => Array.from(new Set(deduped.map((r) => r.template_name))).sort(),
    [deduped],
  );

  const filtered = useMemo(
    () =>
      deduped.filter(
        (r) =>
          (template === "all" || r.template_name === template) &&
          (status === "all" || r.status === status),
      ),
    [deduped, template, status],
  );

  const stats = useMemo(() => {
    const count = (s: string[]) => filtered.filter((r) => s.includes(r.status)).length;
    return {
      total: filtered.length,
      sent: count(["sent"]),
      failed: count(["dlq", "failed", "bounced"]),
      suppressed: count(["suppressed", "complained"]),
    };
  }, [filtered]);

  const pageRows = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => setPage(0), [template, status, preset]);

  if (loading) {
    return <main className="min-h-screen grid place-items-center text-muted-foreground">Ładowanie…</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center px-4 text-center">
        <SEOHead title="Brak dostępu" description="Panel administratora." path="/admin/emaile" noindex />
        <div className="space-y-4">
          <p className="text-muted-foreground">
            To konto nie ma uprawnień administratora.
          </p>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            Wyloguj się
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <SEOHead
        title="Logi wysyłek e-mail"
        description="Panel administracyjny — historia wysyłek e-mail dla zamówień."
        path="/admin/emaile"
        noindex
      />
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Logi wysyłek e-mail</h1>
            <p className="text-sm text-muted-foreground">
              Kiedy wysłano, status dostarczenia i treść błędu w razie niepowodzenia.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={fetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
              Odśwież
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/admin", { replace: true });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Wyloguj
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tryb testowy — nadawca, treść i webhooki</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <Label htmlFor="test-email">Adres testowy</Label>
                <Input
                  id="test-email"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="ty@twojadomena.pl"
                />
              </div>
              <div className="space-y-1">
                <Label>Szablon</Label>
                <Select value={testTemplate} onValueChange={setTestTemplate}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order-shipped">Zamówienie wysłane</SelectItem>
                    <SelectItem value="order-tracking">Numer śledzenia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Język</Label>
                <Select value={testLang} onValueChange={setTestLang}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pl">Polski</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => runTest("send_test_email")}
                disabled={testing !== null || !testEmail.trim()}
              >
                <Send className="mr-2 h-4 w-4" />
                {testing === "email" ? "Wysyłanie…" : "Wyślij testowy e-mail"}
              </Button>
              <Button
                variant="outline"
                onClick={() => runTest("simulate_webhook")}
                disabled={testing !== null || !testEmail.trim()}
              >
                <Webhook className="mr-2 h-4 w-4" />
                {testing === "webhook" ? "Symulacja…" : "Symuluj webhook Printful"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Testy używają przykładowego zamówienia i nie zmieniają danych w bazie.
              Symulacja webhooka sprawdza całą ścieżkę Printful → status → e-mail
              (tryb testowy: bez zapisu zamówienia).
            </p>
            {testResult && (
              <pre className="max-h-56 overflow-auto rounded-md bg-muted p-3 text-xs">
                {testResult}
              </pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-wrap items-end gap-4 pt-6">
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <Button
                  key={p.key}
                  size="sm"
                  variant={preset === p.key ? "default" : "outline"}
                  onClick={() => setPreset(p.key)}
                >
                  {p.label}
                </Button>
              ))}
              <Button
                size="sm"
                variant={preset === "custom" ? "default" : "outline"}
                onClick={() => setPreset("custom")}
              >
                Zakres własny
              </Button>
            </div>
            {preset === "custom" && (
              <div className="flex flex-wrap items-end gap-3">
                <div className="space-y-1">
                  <Label htmlFor="from" className="text-xs">Od</Label>
                  <Input id="from" type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="to" className="text-xs">Do</Label>
                  <Input id="to" type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <Label className="text-xs">Typ e-maila</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  {templates.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="sent">Wysłane</SelectItem>
                  <SelectItem value="pending">W kolejce</SelectItem>
                  <SelectItem value="dlq">Nieudane</SelectItem>
                  <SelectItem value="suppressed">Zablokowane</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Wiadomości", value: stats.total },
            { label: "Wysłane", value: stats.sent },
            { label: "Nieudane", value: stats.failed },
            { label: "Zablokowane", value: stats.suppressed },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Historia wysyłek</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Szablon</TableHead>
                  <TableHead>Odbiorca</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Błąd</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((r) => (
                  <TableRow key={r.message_id ?? r.id}>
                    <TableCell className="font-medium">{r.template_name}</TableCell>
                    <TableCell>{r.recipient_email}</TableCell>
                    <TableCell>
                      <Badge className={`${statusVariant(r.status)} border-0`}>
                        {statusLabel[r.status] ?? r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(r.created_at).toLocaleString("pl-PL")}
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate text-sm text-red-600" title={r.error_message ?? ""}>
                      {r.error_message ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
                {!pageRows.length && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      Brak wysyłek w wybranym zakresie.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {pages > 1 && (
              <div className="flex items-center justify-between pt-4 text-sm">
                <span className="text-muted-foreground">Strona {page + 1} z {pages}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                    Poprzednia
                  </Button>
                  <Button size="sm" variant="outline" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>
                    Następna
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Ostatnie zamówienia i śledzenie</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zamówienie</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Śledzenie</TableHead>
                  <TableHead>Aktualizacja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.order_no}</TableCell>
                    <TableCell>{o.email}</TableCell>
                    <TableCell>
                      <Badge className={`${statusVariant(o.status === "shipped" ? "sent" : o.status)} border-0`}>
                        {o.status}
                      </Badge>
                      {o.printful_error && (
                        <span className="ml-2 text-xs text-red-600">{o.printful_error}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {o.tracking_url ? (
                        <a href={o.tracking_url} target="_blank" rel="noreferrer" className="underline">
                          {o.tracking_number ?? "link"}
                        </a>
                      ) : (
                        o.tracking_number ?? "—"
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(o.updated_at).toLocaleString("pl-PL")}
                    </TableCell>
                  </TableRow>
                ))}
                {!orders.length && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      Brak zamówień.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminEmails;
