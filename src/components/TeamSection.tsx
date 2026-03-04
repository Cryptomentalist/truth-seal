import { motion } from "framer-motion";
import { Lightbulb, Search, Award, Rocket, Target, Linkedin } from "lucide-react";

const team = [
  {
    icon: Lightbulb,
    name: "Ada Margo Marglewska",
    role: "Autorka koncepcji & CEO",
    description:
      "Innowatorka deep-tech, intraprzedsiębiorca, wynalazczyni kompozytu kwantowego BIPV, założycielka Konstelacja.org. Prezeska Fundacji Konstelacja.org, intrapreneur w Sant‑Tech Sp. z o.o., laureatka nagrody Mikroprzedsiębiorca Roku wręczonej przez Prezesa Fundacji Kronenberg przy Citi Bank Handlowy oraz wyróżniona w magazynie Forbes.",
    color: "primary" as const,
    image: "https://rejestruj.biz/assets/ada-margo-2014-Ct-45GxR.jpg",
    linkedin: "https://linkedin.com/in/ada-margo-marglewska-31699a251",
  },
  {
    icon: Search,
    name: "Wojciech Koszczyński",
    role: "CEO Operacyjny",
    description:
      "Detektyw przemysłowy, ekspert od nadużyć technologicznych i sabotażu B+R. Odpowiada za dowodowe, śledcze i bezpieczeństwa procesowe fundamenty projektu.",
    color: "accent" as const,
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
      <div className="container max-w-4xl">
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
        <div className="grid md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`glass-surface rounded-xl p-8 border-t-2 ${
                member.color === "primary" ? "border-t-primary" : "border-t-accent"
              }`}
            >
              {member.image && (
                <div className="mb-5 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover object-top"
                    loading="lazy"
                  />
                </div>
              )}
              {!member.image && (
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    member.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  }`}
                >
                  <member.icon
                    className={`w-7 h-7 ${
                      member.color === "primary" ? "text-primary" : "text-accent"
                    }`}
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p
                className={`text-sm font-mono mb-4 ${
                  member.color === "primary" ? "text-primary" : "text-accent"
                }`}
              >
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.description}
              </p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:underline underline-offset-4"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-surface rounded-xl p-6 mt-8 text-center italic text-muted-foreground text-sm sm:text-base leading-relaxed"
        >
          „Łączymy bezpieczeństwo prawne z nowoczesnym podejściem do finansowania i zarządzania. Dostarczamy gotowy produkt, który Państwo sprzedają jako własny."
        </motion.blockquote>
      </div>
    </section>
  );
};

export default TeamSection;
