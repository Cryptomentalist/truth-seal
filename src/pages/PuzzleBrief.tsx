import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";
import { C, F } from "@/data/shopProducts";

const INTERESTS_PL = [
  "Technologia i AI",
  "Biznes i startupy",
  "Nauka i badania",
  "Sztuka i design",
  "Muzyka",
  "Literatura",
  "Sport i ruch",
  "Podróże",
  "Ekologia i ESG",
  "Edukacja",
  "Zdrowie i psychologia",
  "Rzemiosło i DIY",
  "Gotowanie",
  "Społeczność i wolontariat",
  "Finanse i inwestycje",
  "Gry i e-sport",
];

const STYLES = ["Minimalizm", "Elegancko / premium", "Kolorowo i odważnie", "Retro", "Techniczny / mono"];

const briefSchema = z.object({
  full_name: z.string().trim().min(2, "Podaj imię i nazwisko").max(120),
  email: z.string().trim().email("Nieprawidłowy adres e-mail").max(255),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  order_no: z.string().trim().max(60).optional().or(z.literal("")),
  headline: z.string().trim().min(3, "Napisz krótkie hasło o sobie").max(140),
  about: z.string().trim().min(20, "Napisz przynajmniej kilka zdań").max(1200),
  interests: z.array(z.string()).min(1, "Zaznacz przynajmniej jedno zainteresowanie").max(16),
  looking_for: z.string().trim().max(600).optional().or(z.literal("")),
  skills: z.string().trim().max(600).optional().or(z.literal("")),
  links: z.string().trim().max(600).optional().or(z.literal("")),
  style_pref: z.string().trim().max(60).optional().or(z.literal("")),
  color_pref: z.string().trim().max(60).optional().or(z.literal("")),
  consent_publish: z.boolean(),
});

const label: React.CSSProperties = {
  display: "block",
  fontFamily: F.mono,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: C.ink2,
  marginBottom: 6,
};

const field: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: `1px solid ${C.rule}`,
  borderRadius: 10,
  background: C.surface,
  color: C.indigo,
  fontFamily: F.body,
  fontSize: 15,
};

const PuzzleBrief = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    city: "",
    order_no: "",
    headline: "",
    about: "",
    looking_for: "",
    skills: "",
    links: "",
    style_pref: "",
    color_pref: "",
    consent_publish: false,
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      const mail = data.session?.user.email;
      if (mail) setForm((f) => (f.email ? f : { ...f, email: mail }));
    });
  }, []);

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Puzzle 369 — brief wizytówki",
      description: "Ankieta do stworzenia unikalnej wizytówki internetowej w projekcie Puzzle 369.",
      url: "https://konstelacja.org/puzzle-brief",
    }),
    [],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = briefSchema.safeParse({ ...form, interests });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      toast.error("Uzupełnij zaznaczone pola.");
      return;
    }
    setErrors({});
    setBusy(true);
    const d = parsed.data;
    const { error } = await supabase.from("puzzle_briefs").insert({
      user_id: userId,
      email: d.email.toLowerCase(),
      full_name: d.full_name,
      city: d.city || null,
      order_no: d.order_no || null,
      headline: d.headline,
      about: d.about,
      interests: d.interests,
      looking_for: d.looking_for || null,
      skills: d.skills || null,
      links: d.links || null,
      style_pref: d.style_pref || null,
      color_pref: d.color_pref || null,
      consent_publish: d.consent_publish,
      lang: "pl",
    });
    setBusy(false);
    if (error) {
      toast.error("Nie udało się wysłać ankiety. Spróbuj ponownie za chwilę.");
      return;
    }
    setDone(true);
    toast.success("Dziękujemy! Brief został zapisany.");
  };

  return (
    <div style={{ background: C.paper, minHeight: "100vh", fontFamily: F.body, color: C.indigo }}>
      <SEOHead
        title="Puzzle 369 — brief wizytówki"
        description="Wypełnij ankietę, aby powstała Twoja unikalna wizytówka internetowa w limitowanym projekcie Puzzle 369. Wyniki dopasowań: Sylwester 2026."
        path="/puzzle-brief"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 20px 80px" }}>
        <Link to="/sklep/produkt/puzzle-site" style={{ fontFamily: F.mono, fontSize: 12, color: C.ink2 }}>
          ← Wróć do produktu
        </Link>

        <h1 style={{ fontFamily: F.display, fontSize: "clamp(30px, 6vw, 46px)", lineHeight: 1.1, margin: "18px 0 12px", wordBreak: "break-word" }}>
          Puzzle 369 — brief Twojej wizytówki
        </h1>
        <p style={{ color: C.ink2, fontSize: 16, lineHeight: 1.6, maxWidth: 640 }}>
          369 osób, 369 kawałków jednej układanki. Na podstawie tej ankiety powstanie Twoja prosta strona-wizytówka,
          a w Sylwestra 2026 pokażemy, do kogo z pozostałych osób pasujesz. Wypełnienie zajmuje ok. 5 minut.
        </p>

        {done ? (
          <div
            style={{
              marginTop: 32,
              padding: 24,
              border: `1px solid ${C.rule}`,
              borderRadius: 14,
              background: C.surface,
            }}
          >
            <h2 style={{ fontFamily: F.display, fontSize: 24, marginBottom: 8 }}>Dziękujemy!</h2>
            <p style={{ color: C.ink2, lineHeight: 1.6 }}>
              Twój brief trafił do nas. Odezwiemy się na podany adres e-mail, gdy wizytówka będzie gotowa do akceptacji.
            </p>
            <Link
              to="/sklep"
              style={{
                display: "inline-block",
                marginTop: 18,
                padding: "12px 20px",
                borderRadius: 999,
                background: C.indigo,
                color: C.paper,
                fontFamily: F.mono,
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Wróć do sklepu
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} style={{ marginTop: 32, display: "grid", gap: 20 }}>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <div>
                <label style={label} htmlFor="full_name">Imię i nazwisko *</label>
                <input id="full_name" style={field} value={form.full_name} maxLength={120} onChange={(e) => set("full_name", e.target.value)} />
                {errors.full_name && <p style={{ color: "#B4483A", fontSize: 12, marginTop: 6 }}>{errors.full_name}</p>}
              </div>
              <div>
                <label style={label} htmlFor="email">E-mail *</label>
                <input id="email" type="email" style={field} value={form.email} maxLength={255} onChange={(e) => set("email", e.target.value)} />
                {errors.email && <p style={{ color: "#B4483A", fontSize: 12, marginTop: 6 }}>{errors.email}</p>}
              </div>
              <div>
                <label style={label} htmlFor="city">Miasto / region</label>
                <input id="city" style={field} value={form.city} maxLength={120} onChange={(e) => set("city", e.target.value)} />
              </div>
              <div>
                <label style={label} htmlFor="order_no">Numer zamówienia (jeśli masz)</label>
                <input id="order_no" style={field} placeholder="KON-2026-XXXXXX" value={form.order_no} maxLength={60} onChange={(e) => set("order_no", e.target.value)} />
              </div>
            </div>

            <div>
              <label style={label} htmlFor="headline">Hasło przewodnie (jedno zdanie o Tobie) *</label>
              <input id="headline" style={field} placeholder="np. Buduję mosty między technologią a ludźmi" value={form.headline} maxLength={140} onChange={(e) => set("headline", e.target.value)} />
              {errors.headline && <p style={{ color: "#B4483A", fontSize: 12, marginTop: 6 }}>{errors.headline}</p>}
            </div>

            <div>
              <label style={label} htmlFor="about">Kim jesteś i czym się zajmujesz? *</label>
              <textarea id="about" rows={5} style={{ ...field, resize: "vertical" }} value={form.about} maxLength={1200} onChange={(e) => set("about", e.target.value)} />
              {errors.about && <p style={{ color: "#B4483A", fontSize: 12, marginTop: 6 }}>{errors.about}</p>}
            </div>

            <div>
              <span style={label}>Zainteresowania * (zaznacz dowolną liczbę — na tej podstawie liczymy dopasowania)</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {INTERESTS_PL.map((i) => {
                  const on = interests.includes(i);
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => toggleInterest(i)}
                      aria-pressed={on}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        border: `1px solid ${on ? C.indigo : C.rule}`,
                        background: on ? C.indigo : C.surface,
                        color: on ? C.paper : C.ink2,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
              {errors.interests && <p style={{ color: "#B4483A", fontSize: 12, marginTop: 6 }}>{errors.interests}</p>}
            </div>

            <div>
              <label style={label} htmlFor="looking_for">Kogo szukasz w tej układance? (współpraca, mentor, wspólnik, znajomi)</label>
              <textarea id="looking_for" rows={3} style={{ ...field, resize: "vertical" }} value={form.looking_for} maxLength={600} onChange={(e) => set("looking_for", e.target.value)} />
            </div>

            <div>
              <label style={label} htmlFor="skills">Czym możesz się podzielić? (umiejętności, doświadczenie)</label>
              <textarea id="skills" rows={3} style={{ ...field, resize: "vertical" }} value={form.skills} maxLength={600} onChange={(e) => set("skills", e.target.value)} />
            </div>

            <div>
              <label style={label} htmlFor="links">Linki (LinkedIn, portfolio, social) — po jednym w linii</label>
              <textarea id="links" rows={3} style={{ ...field, resize: "vertical" }} value={form.links} maxLength={600} onChange={(e) => set("links", e.target.value)} />
            </div>

            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <div>
                <label style={label} htmlFor="style_pref">Styl wizytówki</label>
                <select id="style_pref" style={field} value={form.style_pref} onChange={(e) => set("style_pref", e.target.value)}>
                  <option value="">— wybierz —</option>
                  {STYLES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={label} htmlFor="color_pref">Ulubiony kolor / paleta</label>
                <input id="color_pref" style={field} placeholder="np. granat i złoto" value={form.color_pref} maxLength={60} onChange={(e) => set("color_pref", e.target.value)} />
              </div>
            </div>

            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: C.ink2, lineHeight: 1.5 }}>
              <input type="checkbox" checked={form.consent_publish} onChange={(e) => set("consent_publish", e.target.checked)} style={{ marginTop: 3 }} />
              <span>
                Zgadzam się na publikację mojej wizytówki w projekcie Puzzle 369 i na udział w ogłoszeniu dopasowań w Sylwestra 2026.
                Bez zgody przygotujemy wizytówkę wyłącznie do Twojego prywatnego użytku.
              </span>
            </label>

            <button
              type="submit"
              disabled={busy}
              style={{
                justifySelf: "start",
                padding: "14px 28px",
                borderRadius: 999,
                background: C.indigo,
                color: C.paper,
                fontFamily: F.mono,
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "none",
                cursor: busy ? "wait" : "pointer",
                opacity: busy ? 0.6 : 1,
              }}
            >
              {busy ? "Wysyłanie…" : "Wyślij brief"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PuzzleBrief;
