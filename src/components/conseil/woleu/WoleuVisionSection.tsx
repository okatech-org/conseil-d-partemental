import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2 } from 'lucide-react';

const challenges = [
  "Infrastructures routières en mauvais état",
  "Accès limité aux soins de santé",
  "Écoles vétustes et sous-équipées",
  "Gestion opaque des ressources publiques"
];

const promises = [
  "Transparence totale sur les finances",
  "Participation citoyenne renforcée",
  "Développement durable et inclusif",
  "Services publics de qualité"
];

export const WoleuVisionSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Le Constat & La Vision
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprendre les défis pour mieux construire l'avenir du Woleu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Quote & Photo side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 h-20 w-20 text-white/10" />
              
              {/* Quote text */}
              <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-8 relative z-10">
                "Le Woleu mérite mieux. L'ère de l'opacité est terminée."
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-lg font-bold">
                  MO
                </div>
                <div>
                  <div className="font-semibold">Marc Ona Essangui</div>
                  <div className="text-white/70 text-sm">Candidat à la présidence du Conseil</div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Challenges & Promises side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Challenges */}
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-destructive" />
                Les défis actuels
              </h3>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                    {challenge}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Arrow separator */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Promises */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-green-600" />
                Notre engagement
              </h3>
              <ul className="space-y-3">
                {promises.map((promise, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{promise}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
