import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProblemSection from "@/components/ProblemSection";
import BlockchainSection from "@/components/BlockchainSection";
import DemoSection from "@/components/DemoSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import TeamSection from "@/components/TeamSection";
import ESGSection from "@/components/ESGSection";
import EcosystemSection from "@/components/EcosystemSection";
import EcosystemStructureSection from "@/components/EcosystemStructureSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="technologia">
        <BlockchainSection />
      </div>
      <div id="demo">
        <DemoSection />
      </div>
      <DisclaimerSection />
      <div id="zespol">
        <TeamSection />
      </div>
      <div id="esg">
        <ESGSection />
      </div>
      <EcosystemSection />
      <EcosystemStructureSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
