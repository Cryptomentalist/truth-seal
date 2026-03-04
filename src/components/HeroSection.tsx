import { motion } from "framer-motion";
import { Shield, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-primary animate-pulse-glow"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-accent/60 animate-pulse-glow"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse-glow"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 container max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-surface rounded-full px-4 py-2 mb-8">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">
              MindMark™ · Pre-patent · Deep-tech
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Chroń innowację,{" "}
          <span className="text-gradient-primary">zanim ktokolwiek</span>{" "}
          ją zobaczy
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Niepodważalny cyfrowy dowód istnienia wynalazku na etapie pre-patentowym.
          Tarcza, która działa przed kradzieżą — nie po fakcie.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Button variant="hero" size="lg" className="text-base px-8 py-6">
            <Shield className="w-5 h-5 mr-2" />
            Zabezpiecz swój wynalazek
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
            Dowiedz się więcej
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {[
            { value: "256-bit", label: "Zabezpieczenie" },
            { value: "∞", label: "Trwałość zapisu" },
            { value: "0", label: "Możliwość manipulacji" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-mono text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
