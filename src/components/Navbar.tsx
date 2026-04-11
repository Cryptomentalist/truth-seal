import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import constellationLogo from "@/assets/constellation-logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      navigate(path);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [navigate]);
  const links = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.projekty"), href: "/projekty" },
    { label: t("nav.polishAssets"), href: "/polishassets" },
    { label: t("nav.oferta"), href: "/oferta" },
    { label: t("nav.innowacje"), href: "/innowacje" },
    { label: t("nav.press"), href: "/pisza-o-nas" },
    { label: t("nav.mission"), href: "/misja" },
    { label: t("nav.grants"), href: "/dotacje" },
    { label: t("nav.erp"), href: "/platforma-erp-ai" },
    { label: t("nav.ciekawostki"), href: "/ciekawostki" },
    { label: t("nav.faq"), href: "/faq" },
    { label: t("nav.kontakt"), href: "/oferta#kontakt" },
  ];

  return (
    <nav className="fixed top-[40px] sm:top-[46px] left-0 right-0 z-50 glass-surface border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src={constellationLogo} alt="Constellation.love" className="w-8 h-8 rounded-full object-cover" />
          <span>
            Constellation<span className="text-primary">.love</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <a href="https://inventorproof.com" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="sm">
              {t("nav.secureCta")}
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-surface border-t border-border/30"
          >
            <div className="container py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2"
                >
                  {l.label}
                </Link>
              ))}
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <a href="https://inventorproof.com" target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="sm" className="mt-2">
                  {t("nav.secureCta")}
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
