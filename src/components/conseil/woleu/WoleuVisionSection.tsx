import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2, AlertTriangle, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import leaderPortrait from '@/assets/woleu/leader-portrait.jpg';
import visionLeadership from '@/assets/woleu/vision-leadership.jpg';

const challenges = [
  { text: "Infrastructures routières en mauvais état", icon: "🛤️" },
  { text: "Accès limité aux soins de santé", icon: "🏥" },
  { text: "Écoles vétustes et sous-équipées", icon: "🏫" },
  { text: "Gestion opaque des ressources publiques", icon: "📊" }
];

const promises = [
  { text: "Transparence totale sur les finances", icon: "✨" },
  { text: "Participation citoyenne renforcée", icon: "🤝" },
  { text: "Développement durable et inclusif", icon: "🌱" },
  { text: "Services publics de qualité", icon: "⭐" }
];

export const WoleuVisionSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Notre Vision
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
            Le Constat & <span className="text-emerald-600 dark:text-emerald-400">La Vision</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprendre les défis pour mieux construire l'avenir du Woleu
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Quote & Photo side - Enhanced with image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden group">
              {/* Background Image */}
              <img 
                src={leaderPortrait} 
                alt="Marc Ona Essangui s'adressant à la communauté" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/60 to-green-900/30" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-700/40 to-transparent" />
              
              {/* Content positioned at bottom */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Quote icon */}
                <Quote className="absolute top-8 right-8 h-16 w-16 text-white/20" />
                
                {/* Quote text */}
                <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-8 text-white relative z-10">
                  "Le Woleu mérite mieux. L'ère de l'opacité est terminée."
                </blockquote>
                
                {/* Author card */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    MO
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">Marc Ona Essangui</div>
                    <div className="text-white/70 text-sm">Candidat à la présidence du Conseil</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* Challenges & Promises side - Enhanced cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Challenges Card */}
            <Card className="border-destructive/20 bg-destructive/5 dark:bg-destructive/10 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Les défis actuels
                </h3>
                <div className="grid gap-3">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-background/50 rounded-xl hover:bg-background/80 transition-colors"
                    >
                      <span className="text-2xl">{challenge.icon}</span>
                      <span className="text-muted-foreground">{challenge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Arrow separator */}
            <div className="flex items-center justify-center py-2">
              <motion.div 
                className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shadow-lg"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
            </div>

            {/* Promises Card */}
            <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Notre engagement
                </h3>
                <div className="grid gap-3">
                  {promises.map((promise, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-background/50 rounded-xl hover:bg-background/80 transition-colors group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{promise.icon}</span>
                      <span className="font-medium">{promise.text}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
