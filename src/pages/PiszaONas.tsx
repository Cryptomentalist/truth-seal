import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const pressItems = [
  {
    source: "Squash Player Magazine",
    title: "Squash In A Capsule?",
    date: "2025",
    summary:
      "Polish CEO and entrepreneur Ada Margo Marglewska is developing Capsule Piezoelectric Courts – the world's first squash courts that generate energy from every movement of the players.",
    quote:
      "\"From the beginning, we knew we wanted to create something more than just another sports facility. We wanted sport and energy to coexist in one self-sufficient capsule.\"",
    image: "/images/squash-capsule-hero.jpg",
    url: "https://squashplayermag.com/blogs/news/squash-in-a-capsule",
  },
  {
    source: "MIT Sloan Management Review",
    title: "Case Study — Ada Margo Marglewska",
    date: "2024",
    summary:
      "Analiza ekosystemu innowacji i modelu biznesowego łączącego blockchain, tokenizację IP oraz zrównoważoną energię w ramach Constellation.",
    image: null,
    url: "/documents/mit-sloan-case-study.pdf",
  },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const PiszaONas = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="Piszą o nas" description="Publikacje prasowe i medialne o ekosystemie Constellation.love, Capsule Piezoelectric Courts i Ada Margo Marglewska." path="/pisza-o-nas" />
    <TopBanner />
    <Navbar />

    <section className="pt-32 pb-16 section-padding">
      <div className="container max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-mono text-accent uppercase tracking-widest"
        >
          Media & Prasa
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mt-4 mb-6"
        >
          Piszą o <span className="text-primary">nas</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Publikacje i artykuły prasowe o technologiach i projektach ekosystemu Constellation.
        </motion.p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container max-w-4xl space-y-10">
        {pressItems.map((item, i) => (
          <motion.article
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            variants={fade}
            className="glass-surface rounded-2xl overflow-hidden border border-border/30"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 md:h-72 object-cover"
              />
            )}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Newspaper className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-wider">
                  {item.source}
                </span>
                <span className="text-xs text-muted-foreground">· {item.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{item.title}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{item.summary}</p>

              {item.quote && (
                <blockquote className="border-l-4 border-primary/40 pl-4 py-2 mb-6 italic text-sm text-muted-foreground">
                  <Quote className="w-4 h-4 text-primary/50 inline mr-1 -mt-1" />
                  {item.quote}
                  <br />
                  <span className="not-italic text-xs text-primary/70 mt-1 block">— Ada Margo Marglewska</span>
                </blockquote>
              )}

              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Czytaj artykuł
                </Button>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default PiszaONas;
