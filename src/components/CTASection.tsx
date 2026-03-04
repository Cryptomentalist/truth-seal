import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container max-w-3xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 glow-primary">
            <Shield className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
            Czy chronimy pomysł wtedy, kiedy{" "}
            <span className="text-gradient-primary">naprawdę</span> jest to potrzebne?
          </h2>

          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Teraz wreszcie — jest to możliwe.
            InventionProof.org to brakujący bezpiecznik polskiego systemu innowacji.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              <Shield className="w-5 h-5 mr-2" />
              Zacznij chronić swoje IP
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
              Skontaktuj się z nami
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
