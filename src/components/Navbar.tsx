import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import constellationLogo from "@/assets/constellation-logo.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "/" },
  { label: "Oferta", href: "/oferta" },
  { label: "Innowacje", href: "/innowacje" },
  { label: "Piszą o nas", href: "/pisza-o-nas" },
  { label: "Misja & ESG", href: "/misja" },
  { label: "Dotacje & Ulgi", href: "/dotacje" },
  { label: "Platforma ERP AI", href: "/platforma-erp-ai" },
  { label: "FAQ", href: "/faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <Button variant="hero" size="sm">
            Zabezpiecz IP
          </Button>
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
              {links.map((l) =>
                l.href.startsWith("/") ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground py-2"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground py-2"
                  >
                    {l.label}
                  </a>
                )
              )}
              <Button variant="hero" size="sm" className="mt-2">
                Zabezpiecz IP
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
