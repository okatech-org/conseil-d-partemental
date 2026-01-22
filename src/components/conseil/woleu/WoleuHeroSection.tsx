import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroForestAerial from '@/assets/woleu/hero-forest-aerial.jpg';

interface WoleuHeroSectionProps {
  onReadProgram: () => void;
  onViewProjects: () => void;
}

export const WoleuHeroSection: React.FC<WoleuHeroSectionProps> = ({
  onReadProgram,
  onViewProjects
}) => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroForestAerial} 
          alt="Forêt tropicale du Woleu-Ntem" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-green-700/80" />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" className="text-white" />
          </svg>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-200 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Union Démocratique des Bâtisseurs • Élections 2025
            </div>

            {/* Main title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight">
              Bâtissons le Woleu,<br />
              <span className="text-amber-400">Bâtissons l'espoir.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              Un engagement pour la <strong className="text-white">dignité</strong>, l'<strong className="text-white">équité</strong> et le 
              <strong className="text-white"> développement durable</strong> de notre département.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-white text-green-800 hover:bg-white/90 group font-semibold px-8"
                onClick={onReadProgram}
              >
                Lire le Programme 2025
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:border-white/70 px-8 backdrop-blur-sm"
                onClick={onViewProjects}
              >
                Voir les projets
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Candidate info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 pr-6"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl">
              MO
            </div>
            <div>
              <div className="text-white font-semibold text-lg">Marc Ona Essangui</div>
              <div className="text-white/70 text-sm">Tête de liste • Union Démocratique des Bâtisseurs</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-wider">Découvrir</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
