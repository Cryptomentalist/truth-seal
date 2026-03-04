import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import constellationLogo from "@/assets/constellation-logo.jpg";

const projects = [
  {
    step: 1,
    name: "Rejestruj.biz",
    domain: "https://rejestruj.biz",
    desc: "Rejestracja działalności gospodarczej i spółek — szybki start Twojego biznesu w ekosystemie.",
  },
  {
    step: 2,
    name: "Projekt 2",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 3,
    name: "Projekt 3",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 4,
    name: "Projekt 4",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 5,
    name: "Projekt 5",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 6,
    name: "Projekt 6",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 7,
    name: "Projekt 7",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 8,
    name: "Projekt 8",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 9,
    name: "Projekt 9",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 10,
    name: "Projekt 10",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 11,
    name: "Projekt 11",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 12,
    name: "Projekt 12",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 13,
    name: "Projekt 13",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 14,
    name: "Projekt 14",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 15,
    name: "Projekt 15",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 16,
    name: "Projekt 16",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 17,
    name: "Projekt 17",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
  {
    step: 18,
    name: "Projekt 18",
    domain: "#",
    desc: "Wkrótce — kolejny element ekosystemu.",
  },
];

const NewIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Logo + Header */}
      <header className="pt-12 pb-8 flex flex-col items-center gap-6">
        <motion.img
          src={constellationLogo}
          alt="Constellation.love logo"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Constellation<span className="text-accent">.love</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-xl mx-auto">
            Ekosystem 18 komplementarnych projektów — roadmapa od rejestracji po pełną autonomię.
          </p>
        </motion.div>
      </header>

      {/* Roadmap connector line */}
      <div className="container max-w-7xl px-4 pb-20">
        {/* Horizontal scrollable roadmap */}
        <div className="relative">
          {/* Progress line */}
          <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-0.5 bg-border z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {projects.map((p, i) => (
              <motion.a
                key={p.step}
                href={p.domain}
                target={p.domain !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative flex flex-col rounded-xl border border-border p-4 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 ${
                  p.domain === "#"
                    ? "opacity-50 cursor-default"
                    : "cursor-pointer"
                } bg-card`}
              >
                {/* Step badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full bg-accent/15 text-accent text-sm font-bold flex items-center justify-center font-mono">
                    {p.step}
                  </span>
                  {p.domain !== "#" && (
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors ml-auto" />
                  )}
                </div>

                {/* Name */}
                <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">
                  {p.name}
                </h3>

                {/* Domain */}
                {p.domain !== "#" && (
                  <span className="text-[11px] font-mono text-accent/70 mb-2 truncate">
                    {p.domain.replace("https://", "")}
                  </span>
                )}

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                  {p.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIndex;
