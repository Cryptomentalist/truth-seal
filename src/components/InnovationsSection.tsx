import { motion } from "framer-motion";
import { FileText, Download, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "Capsule Piezo Courts — 3RenEnergy",
    subtitle: "Technologia piezoelektryczna & energia odnawialna",
    file: "/documents/capsule-piezo-courts.pdf",
  },
  {
    title: "MIT Sloan Magazine — Case Study",
    subtitle: "Artykuł autorstwa Ada Margo Marglewska",
    file: "/documents/mit-sloan-case-study.pdf",
  },
];

const InnovationsSection = () => (
  <section id="innowacje" className="section-padding">
    <div className="container max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-sm font-mono text-accent uppercase tracking-widest">
          Publikacje
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4">
          <Sparkles className="inline w-8 h-8 text-primary mr-2 -mt-1" />
          Innowacje
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
          Wybrane artykuły i publikacje naukowe naszego zespołu.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {articles.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-surface rounded-xl p-6 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-1">{article.title}</h3>
            <p className="text-xs text-muted-foreground mb-5 flex-1">
              {article.subtitle}
            </p>
            <a href={article.file} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                <Download className="w-4 h-4" />
                Pobierz PDF
              </Button>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="text-center"
      >
        <a
          href="https://linkedin.com/in/ada-margo-marglewska-31699a251"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="hero" size="lg" className="gap-2">
            <Linkedin className="w-5 h-5" />
            Więcej artykułów na LinkedIn
          </Button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default InnovationsSection;
