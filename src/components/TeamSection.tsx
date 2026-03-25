import { motion } from "framer-motion";
import { Lightbulb, Search, Award, Rocket, Target, Linkedin, Users, Building2, Handshake, ExternalLink } from "lucide-react";

const team = [
  {
    name: "Ada Margo Marglewska",
    role: "CEO",
    description:
      "Intrapreneur, Interim Manager, Coach, Pedagog. Praktyk w biznesie — nauczyciel przedsiębiorczości. Wynalazca nowej funkcjonalności — zastosowania kropek kwantowych. Strateg Błękitnego Oceanu, koordynator ekosystemu AI Venture Integrator.",
    color: "primary" as const,
    image: "https://rejestruj.biz/assets/ada-margo-2014-Ct-45GxR.jpg",
    linkedin: "https://linkedin.com/in/ada-margo-marglewska-31699a251",
  },
  {
    name: "Wojciech Koszczyński",
    role: "CEO Operacyjny",
    description:
      "Detektyw przemysłowy, ekspert od nadużyć technologicznych i sabotażu B+R. Odpowiada za dowodowe, śledcze i bezpieczeństwa procesowe fundamenty projektu.",
    color: "accent" as const,
  },
  {
    name: "Nela Asteria Piasecka",
    role: "Obsługa pokolenia Z / Selekcjonerka jakości",
    description:
      "Wsparcie start-upów skierowanych do pokolenia Z, selekcja jakości projektów, problem solver support.",
    color: "primary" as const,
  },
  {
    name: "Aleksander Sikora",
    role: "Konsultant",
    description:
      "Ocena innowacji, wsparcie w rejestracji nowych firm, selekcjoner jakości.",
    color: "accent" as const,
  },
  {
    name: "Vivien Rydz",
    role: "Rejestratorka / Konsultantka",
    description:
      "Rejestracja podmiotów w KRS, konsultantka ds. rozwoju fundacji dobrostanu społecznego.",
    color: "primary" as const,
  },
  {
    name: "Gosia Mika",
    role: "Konsultantka",
    description:
      "Konsultantka i spowiedniczka — wsparcie mentalne i strategiczne dla członków ekosystemu.",
    color: "accent" as const,
  },
  {
    name: "Sebastian Trojanowski",
    role: "Konsultant work-life balance",
    description:
      "Architekt duszy i ciała — konsultant równowagi między życiem zawodowym a prywatnym.",
    color: "primary" as const,
  },
  {
    name: "Maksymilian Nałęcz",
    role: "Koordynator / Pitch-deck",
    description:
      "Obsługa klienta sponsorów i członków ekosystemu AI Venture, odpowiada za przygotowanie pitch-decków przed inwestorami, problem solver support.",
    color: "accent" as const,
  },
  {
    name: "Mateusz Skałoń",
    role: "Inżynier / Innowator / Przedsiębiorca",
    description:
      "Inżynier i innowator z doświadczeniem przedsiębiorczym — wsparcie technologiczne i biznesowe ekosystemu.",
    color: "primary" as const,
  },
  {
    name: "Marcin Suchy",
    role: "AI & Movie Maker",
    description:
      "Kreacja wizerunku — produkcja wideo i materiałów wizualnych z wykorzystaniem AI.",
    color: "primary" as const,
  },
  {
    name: "Szymon Kapturkiewicz",
    role: "Inżynier-programista",
    description:
      "Inżynier i programista wspierający technologiczne fundamenty ekosystemu.",
    color: "accent" as const,
    link: "https://kapturkiewicz.eu",
  },
  {
    name: "Pola Wicher",
    role: "Product Manager (Norwegia) / Marketing & Granty",
    description:
      "Marketing dla firm, obsługa start-upów z Norwegii i grantów polsko-norweskich. Tel. +47 47 73 98 64.",
    color: "primary" as const,
  },
  {
    name: "Maciej Malicki",
    role: "Product Manager (Londyn)",
    description:
      "Product Manager z Londynu — zarządzanie produktem i koordynacja rozwoju w ekosystemie. Tel. +44 7867 776421.",
    color: "accent" as const,
  },
  {
    name: "Mateusz Mścioszczyk",
    role: "Programista / Inwestor operacyjny / Doradca",
    description:
      "Programista front & backend, inwestor operacyjny (wykonawczy) i doradca strategiczny wspierający rozwój ekosystemu.",
    color: "accent" as const,
  },
  {
    name: "Natalia Mastalerz",
    role: "Sesje mentoringowo-energetyczne",
    description:
      "Łączy pracę z energią Źródła Miłości z głęboką świadomością ciała i emocji. Pomaga uwolnić blokady, napięcia i stare historie zapisane w ciele. Transformacja przekonań i emocji — uwalnianie lęków, przestarzałych wzorców i schematów reakcji. Sesje to połączenie energii, obecności i głębokiej pracy z wnętrzem: uwolnienie emocjonalnych blokad, ukojenie systemu nerwowego, większa jasność, intuicja i spokój. Tel. +48 508 850 631.",
    color: "primary" as const,
  },
];

const partners = [
  {
    name: "COMARCH",
    role: "Patron ekosystemu AI Venture Integrator",
    description: "Implementuje innowacje ekosystemu w formie modułów do swojego ERP XL.",
    icon: Building2,
  },
  {
    name: "MRiT — Ministerstwo Rozwoju i Technologii",
    role: "Patronat",
    description: "Patronat Ministerstwa Rozwoju i Technologii nad działalnością ekosystemu.",
    icon: Award,
  },
  {
    name: "Semiconductor.no AS",
    role: "Brokerzy Innowacji",
    description: "Przestrzeń co-workingowa w Norwegii dla interesariuszy ekosystemu.",
    icon: Handshake,
  },
];

const stats = [
  { value: "20+", label: "Lat doświadczenia", desc: "Pionierzy finansowania — jako jedni z pierwszych w Polsce skutecznie pozyskiwaliśmy dotacje unijne i fundusze strukturalne.", icon: Award },
  { value: "100+", label: "Startupów na rynku", desc: "Twórcy ekosystemu — budowaliśmy pierwsze instytucje szkoleniowe i inkubatory, wprowadzając na rynek setki firm.", icon: Rocket },
  { value: "🎯", label: "Intrapreneurzy", desc: "Doświadczeni praktycy, nie teoretycy. Interim Management gotowy na wsparcie zarządcze w sytuacjach kryzysowych.", icon: Target },
];

const TeamSection = () => {
  return (
    <section className="section-padding">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">Zespół</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Eksperci <span className="text-primary">"First Movers"</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Unikatowe połączenie, które realnie eliminuje największą słabość polskiego systemu innowacji.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-surface rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
              <h3 className="font-bold text-sm mb-2">{stat.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`glass-surface rounded-xl p-6 border-t-2 ${
                member.color === "primary" ? "border-t-primary" : "border-t-accent"
              }`}
            >
              {member.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-40 object-cover object-top"
                    loading="lazy"
                  />
                </div>
              )}
              {!member.image && (
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    member.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  }`}
                >
                  <Users
                    className={`w-6 h-6 ${
                      member.color === "primary" ? "text-primary" : "text-accent"
                    }`}
                  />
                </div>
              )}
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p
                className={`text-xs font-mono mb-3 ${
                  member.color === "primary" ? "text-primary" : "text-accent"
                }`}
              >
                {member.role}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {member.description}
              </p>
              <div className="flex gap-3 mt-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline underline-offset-4"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {member.link && (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline underline-offset-4"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Strona
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partners & Patrons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <h3 className="text-xl font-bold text-center mb-6">
            Partnerzy & <span className="text-accent">Patroni</span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-surface rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-bold text-sm mb-1">{partner.name}</h4>
                <p className="text-xs font-mono text-accent mb-2">{partner.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-surface rounded-xl p-6 mt-10 text-center italic text-muted-foreground text-sm sm:text-base leading-relaxed"
        >
          „Łączymy bezpieczeństwo prawne z nowoczesnym podejściem do finansowania i zarządzania. Dostarczamy gotowy produkt, który Państwo sprzedają jako własny."
        </motion.blockquote>
      </div>
    </section>
  );
};

export default TeamSection;
