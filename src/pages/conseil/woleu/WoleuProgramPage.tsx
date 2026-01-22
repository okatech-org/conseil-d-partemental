import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuVisionSection } from '@/components/conseil/woleu/WoleuVisionSection';
import { WoleuPriorityAxes } from '@/components/conseil/woleu/WoleuPriorityAxes';
import { WoleuTransparentSection } from '@/components/conseil/woleu/WoleuTransparentSection';
import { WoleuCitizenEngagement } from '@/components/conseil/woleu/WoleuCitizenEngagement';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { FileText, Eye, Building2, Users, Sprout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const programSections = [
  { id: 'vision', label: 'Notre Vision', icon: Eye },
  { id: 'chantiers', label: 'Les 5 Chantiers', icon: Building2 },
  { id: 'transparent', label: 'Woleu Transparent', icon: Sprout },
  { id: 'cercles', label: 'Cercles Citoyens', icon: Users }
];

export const WoleuProgramPage: React.FC = () => {
  const visionRef = useRef<HTMLDivElement>(null);
  const chantiersRef = useRef<HTMLDivElement>(null);
  const transparentRef = useRef<HTMLDivElement>(null);
  const cerclesRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = React.useState('vision');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      vision: visionRef,
      chantiers: chantiersRef,
      transparent: transparentRef,
      cercles: cerclesRef
    };

    const targetRef = refs[section];
    if (targetRef?.current) {
      const headerOffset = 120;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader onNavigate={() => {}} activeSection="programme" />
      
      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-green-800 via-green-700 to-green-600 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="program-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#program-grid)" className="text-white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-400/30">
              <FileText className="w-3 h-3 mr-1" />
              Élections 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
              Programme <span className="text-amber-400">2025-2030</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Notre feuille de route pour transformer le Woleu et bâtir un avenir meilleur 
              pour tous les habitants du département.
            </p>
          </motion.div>

          {/* Section navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {programSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-white text-green-800 shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-green-400/10 rounded-full blur-3xl" />
      </section>
      
      {/* Program sections */}
      <div ref={visionRef} id="vision">
        <WoleuVisionSection />
      </div>
      
      <div ref={chantiersRef} id="chantiers">
        <WoleuPriorityAxes />
      </div>
      
      <div ref={transparentRef} id="transparent">
        <WoleuTransparentSection />
      </div>
      
      <div ref={cerclesRef} id="cercles">
        <WoleuCitizenEngagement />
      </div>
      
      <WoleuFooter />
    </div>
  );
};
