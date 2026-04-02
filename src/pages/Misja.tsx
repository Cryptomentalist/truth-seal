import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import ESGSection from "@/components/ESGSection";
import NeurodiversitySection from "@/components/NeurodiversitySection";
import EcosystemSection from "@/components/EcosystemSection";
import EcosystemStructureSection from "@/components/EcosystemStructureSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Misja = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />
      <section className="pt-32 pb-12 text-center container max-w-3xl">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nasza <span className="text-gradient-primary">misja</span>
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          ESG, neuroróżnorodność i wizja ekosystemu — wartości, które napędzają InventorProof.
        </motion.p>
      </section>
      <div id="esg">
        <ESGSection />
      </div>
      <NeurodiversitySection />
      <EcosystemSection />
      <EcosystemStructureSection />
      <Footer />
    </div>
  );
};

export default Misja;
