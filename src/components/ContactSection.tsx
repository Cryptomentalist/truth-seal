import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Landmark, Heart, ExternalLink, MessageCircle, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    role: "Prezeska Fundacji Konstelacja.org",
    name: "Ada Margo Marglewska",
    description:
      "Intrapreneur w Sant‑Tech Sp. z o.o., laureatka nagrody Mikroprzedsiębiorca Roku wręczonej przez Prezesa Fundacji Kronenberg przy Citi Bank Handlowy oraz wyróżniona w magazynie Forbes.",
    linkedin: "https://linkedin.com/in/ada-margo-marglewska-31699a251",
    whatsapp: "https://wa.me/48665666065",
    phone: "+48 665 666 065",
  },
];

const contactLines = [
  { label: "Obsługa Klienta", phone: "665 666 065" },
  { label: "Marketing", phone: "665 391 664" },
  { label: "Dotacje", phone: "665 665 655" },
  { label: "Co‑working Norwegia", phone: "+47 405 81 278" },
  { label: "Kariera", email: "ada@ada-margo.com" },
];

const ContactSection = () => (
  <section id="kontakt" className="section-padding relative overflow-hidden">
    <div className="container max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gradient-primary">Kontakt</span> & Zespół
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Skontaktuj się z nami — odpowiadamy w ciągu 24 godzin.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        {/* Team / Ada */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-surface rounded-xl p-5 sm:p-8"
        >
          {teamMembers.map((m) => (
            <div key={m.name}>
              <h3 className="text-lg sm:text-xl font-bold mb-1">{m.name}</h3>
              <p className="text-xs sm:text-sm text-primary font-medium mb-3">{m.role}</p>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5">
                {m.description}
              </p>

              {/* LinkedIn CTA */}
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-4"
              >
                <Button variant="hero" size="default" className="w-full sm:w-auto gap-2">
                  <Linkedin className="w-5 h-5" />
                  Napisz do mnie na LinkedIn
                </Button>
              </a>

              <div className="flex flex-wrap gap-3">
                <a
                  href={m.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${m.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {m.phone}
                </a>
              </div>
            </div>
          ))}

          <hr className="border-border/40 my-6" />

          <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Phone className="w-4 h-4 text-primary" />
            Telefony kontaktowe
          </h4>
          <ul className="space-y-2.5">
            {contactLines.map((c) => (
              <li key={c.label} className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">{c.label}</span>
                {c.phone ? (
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="font-mono text-foreground hover:text-primary transition-colors"
                  >
                    {c.phone}
                  </a>
                ) : (
                  <a
                    href={`mailto:${c.email}`}
                    className="font-mono text-foreground hover:text-primary transition-colors text-xs"
                  >
                    {c.email}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Foundation data */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-surface rounded-xl p-5 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <Landmark className="w-5 h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-bold">Fundacja Konstelacja.org</h3>
          </div>

          <dl className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">Adres</dt>
                <dd className="text-foreground">Ul. Morska 30/B5, 84‑240 Reda</dd>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">KRS</dt>
                <dd className="font-mono text-foreground">0000974966</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">NIP</dt>
                <dd className="font-mono text-foreground">588 248 17 01</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">REGON</dt>
                <dd className="font-mono text-foreground">522216641</dd>
              </div>
            </div>

            <hr className="border-border/40 my-4" />

            <div>
              <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Nr konta bankowego</dt>
              <dd className="font-mono text-foreground text-xs sm:text-base tracking-wide break-all">
                58 1090 1098 0000 0001 5075 4767
              </dd>
            </div>
          </dl>

          <hr className="border-border/40 my-6" />

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Heart className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="font-semibold text-xs sm:text-sm">Przekaż 1,5% podatku</p>
              <p className="text-xs text-muted-foreground">
                Wspólnie zmieniamy przyszłość edukacji i gospodarki.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://konstelacja.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Konstelacja.org
            </a>
            <a
              href="https://constellation.love"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Constellation.love
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;
