import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import QuickLinksSection from "@/components/landing/QuickLinksSection";
import WoleuPioneerSection from "@/components/landing/WoleuPioneerSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ProductShowcase from "@/components/landing/ProductShowcase";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <QuickLinksSection />
        <WoleuPioneerSection />
        <FeaturesSection />
        <ProductShowcase />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
