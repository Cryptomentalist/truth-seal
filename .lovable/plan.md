

## Plan

### 1. Dodanie paska "Chroń swoje IP" na samej górze strony (nad Navbarem)

Utworzę nowy komponent `TopBanner.tsx` — wąski, wyróżniający się pasek na samej górze strony z tekstem "Chroń swoje IP" i ikonką tarczy. Będzie miał gradient tła (primary) i stały `z-50+`.

### 2. Nowa sekcja "Jak to działa?" pod HeroSection

Utworzę komponent `HowItWorksSection.tsx` z trzema kartami/kolumnami:

- **Podstawowa wersja**: "Jak data pewna u notariusza" — krótkie wyjaśnienie, że blockchain tworzy niepodważalny dowód istnienia dokumentu z datą.
- **Wersja Premium**: "Otrzymujesz PRE-PATENT" — opis + link "Dowiedz się czym jest pre-patent" (na razie jako `#pre-patent` anchor lub placeholder URL).
- **Wersja Premium Max**: "Otrzymujesz orzeczenie PRE-COURT" — opis + link "Dowiedz się czym jest PRE-COURT" (analogicznie placeholder link).

Sekcja będzie miała spójny styl z resztą strony (glass-surface karty, animacje framer-motion przy scrollu).

### 3. Integracja w Index.tsx

- `TopBanner` — renderowany przed `Navbar` w `Index.tsx`
- `HowItWorksSection` — renderowany między `HeroSection` a `ProblemSection`
- Navbar dostanie dodatkowy `top` offset żeby nie nachodził na banner

### Pliki do zmiany:
- **Nowy**: `src/components/TopBanner.tsx`
- **Nowy**: `src/components/HowItWorksSection.tsx`
- **Edycja**: `src/pages/Index.tsx` — dodanie obu komponentów
- **Edycja**: `src/components/Navbar.tsx` — offset `top` dla bannera

