import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BlockchainSection from "@/components/BlockchainSection";
import TeamSection from "@/components/TeamSection";
import ESGSection from "@/components/ESGSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="technologia">
        <BlockchainSection />
      </div>
      <div id="zespol">
        <TeamSection />
      </div>
      <div id="esg">
        <ESGSection />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
