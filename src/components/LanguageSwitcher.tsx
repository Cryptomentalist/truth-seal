import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("pl") ? "pl" : "en";

  const toggle = () => {
    const next = currentLang === "pl" ? "en" : "pl";
    i18n.changeLanguage(next);
    document.documentElement.lang = next;
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-full border border-border/50 px-2.5 py-1"
      aria-label="Switch language"
    >
      <span className={currentLang === "pl" ? "text-foreground" : "opacity-50"}>PL</span>
      <span className="text-border">/</span>
      <span className={currentLang === "en" ? "text-foreground" : "opacity-50"}>EN</span>
    </button>
  );
};

export default LanguageSwitcher;
