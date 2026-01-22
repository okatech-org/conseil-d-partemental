import React, { useRef } from 'react';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuHeroSection } from '@/components/conseil/woleu/WoleuHeroSection';
import { WoleuVisionSection } from '@/components/conseil/woleu/WoleuVisionSection';
import { WoleuPriorityAxes } from '@/components/conseil/woleu/WoleuPriorityAxes';
import { WoleuTransparentSection } from '@/components/conseil/woleu/WoleuTransparentSection';
import { WoleuProjectsCarousel } from '@/components/conseil/woleu/WoleuProjectsCarousel';
import { WoleuCitizenEngagement } from '@/components/conseil/woleu/WoleuCitizenEngagement';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { DemoAccessProfiles } from '@/components/demo/DemoAccessProfiles';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

export const WoleuHomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const axesRef = useRef<HTMLDivElement>(null);
  const transparentRef = useRef<HTMLDivElement>(null);
  const cerclesRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
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
      demo: demoRef,
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

      {/* Section Démo - Accès aux différents profils */}
      <div ref={demoRef} id="demo">
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <PlayCircle className="h-4 w-4" />
                Mode Démonstration
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Accédez au Portail
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explorez les différents profils d'accès disponibles pour découvrir 
                les fonctionnalités du Conseil Départemental du Woleu.
              </p>
            </motion.div>
            
            <DemoAccessProfiles departmentId="woleu" showModules={true} />
          </div>
        </section>
      </div>
      
      <div ref={contactRef} id="contact">
        <WoleuFooter />
      </div>
    </div>
  );
};