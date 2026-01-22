import React, { useRef } from 'react';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuHeroSection } from '@/components/conseil/woleu/WoleuHeroSection';
import { WoleuVisionSection } from '@/components/conseil/woleu/WoleuVisionSection';
import { WoleuPriorityAxes } from '@/components/conseil/woleu/WoleuPriorityAxes';
import { WoleuTransparentSection } from '@/components/conseil/woleu/WoleuTransparentSection';
import { WoleuProjectsCarousel } from '@/components/conseil/woleu/WoleuProjectsCarousel';
import { WoleuCitizenEngagement } from '@/components/conseil/woleu/WoleuCitizenEngagement';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';

export const WoleuHomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const axesRef = useRef<HTMLDivElement>(null);
  const transparentRef = useRef<HTMLDivElement>(null);
  const cerclesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = React.useState('hero');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      hero: heroRef,
      vision: visionRef,
      axes: axesRef,
      transparent: transparentRef,
      cercles: cerclesRef,
      contact: contactRef
    };

    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReadProgram = () => {
    scrollToSection('axes');
  };

  const handleViewProjects = () => {
    scrollToSection('transparent');
  };

  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader onNavigate={scrollToSection} activeSection={activeSection} />
      
      <div ref={heroRef} id="hero">
        <WoleuHeroSection 
          onReadProgram={handleReadProgram}
          onViewProjects={handleViewProjects}
        />
      </div>
      
      <div ref={visionRef} id="vision">
        <WoleuVisionSection />
      </div>
      
      <div ref={axesRef} id="axes">
        <WoleuPriorityAxes />
      </div>
      
      <div ref={transparentRef} id="transparent">
        <WoleuTransparentSection />
      </div>
      
      <WoleuProjectsCarousel />
      
      <div ref={cerclesRef} id="cercles">
        <WoleuCitizenEngagement />
      </div>
      
      <div ref={contactRef} id="contact">
        <WoleuFooter />
      </div>
    </div>
  );
};
