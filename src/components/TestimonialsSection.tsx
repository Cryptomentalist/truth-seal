import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Dzięki InventorProof zabezpieczyłem swój wynalazek w 10 minut — zanim jeszcze złożyłem wniosek patentowy. To dało mi spokój ducha na negocjacjach z inwestorem.",
    author: "Marek K.",
    role: "Wynalazca, sektor cleantech",
    stars: 5,
  },
  {
    quote:
      "PRE-PATENT okazał się kluczowy w sporze o pierwszeństwo. Dzięki niezmiennemu zapisowi blockchain mogliśmy udowodnić datę powstania koncepcji.",
    author: "Dr Joanna W.",
    role: "CTO, startup medtech",
    stars: 5,
  },
  {
    quote:
      "Jako rzecznik patentowy polecam InventorProof każdemu klientowi na etapie pre-patentowym. To profesjonalne narzędzie, którego brakowało na rynku.",
    author: "Tomasz L.",
    role: "Rzecznik patentowy",
    stars: 5,
  },
];

const TestimonialsSection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="container max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Co mówią <span className="text-gradient-primary">nasi klienci?</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Zaufali nam wynalazcy, startupy i profesjonaliści z branży IP.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="glass-surface rounded-xl p-8 flex flex-col relative"
          >
            <Quote className="w-8 h-8 text-primary/30 mb-4" />

            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
              „{t.quote}"
            </p>

            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: t.stars }).map((_, si) => (
                <Star key={si} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>

            <div>
              <p className="font-semibold text-sm">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
