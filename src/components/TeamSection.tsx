import { motion } from "framer-motion";
import { Lightbulb, Search } from "lucide-react";

const team = [
  {
    icon: Lightbulb,
    name: "Ada Margo Marglewska",
    role: "Autorka koncepcji & CEO",
    description:
      "Innowatorka deep-tech, intraprzedsiębiorca, wynalazczyni kompozytu kwantowego BIPV, założycielka Konstelacja.org. Jej doświadczenia ujawniły lukę w polskim systemie ochrony IP, która stała się impulsem do stworzenia InventionProof.org.",
    color: "primary" as const,
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
            Innowatorka <span className="text-primary">+</span> Detektyw
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Unikatowe połączenie, które realnie eliminuje największą słabość polskiego systemu innowacji.
          </p>
        </motion.div>

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
