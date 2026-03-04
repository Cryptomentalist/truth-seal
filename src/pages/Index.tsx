import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProblemSection from "@/components/ProblemSection";
import BlockchainSection from "@/components/BlockchainSection";
import DemoSection from "@/components/DemoSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
