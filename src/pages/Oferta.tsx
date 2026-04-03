import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProblemSection from "@/components/ProblemSection";
import BlockchainSection from "@/components/BlockchainSection";
import DemoSection from "@/components/DemoSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import TeamSection from "@/components/TeamSection";
import InnovationsSection from "@/components/InnovationsSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import EcosystemPhilosophySection from "@/components/EcosystemPhilosophySection";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Oferta — InventorProof"
        description="Kryptograficzny dowód istnienia wynalazku na etapie pre-patentowym. Blockchain chroni Twoje IP zanim ktokolwiek je zobaczy."
        path="/oferta"
      />
      <TopBanner />
      <Navbar />
      <HeroSection />
      <div id="problem">
        <ProblemSection />
      </div>
      <HowItWorksSection />
      <div id="demo">
        <DemoSection />
      </div>
      <div id="technologia">
        <BlockchainSection />
      </div>
      <EcosystemPhilosophySection />
      <div id="innowacje">
        <InnovationsSection />
      </div>
      <DisclaimerSection />
      <div id="zespol">
        <TeamSection />
      </div>
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
