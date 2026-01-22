import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, FileText, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const projectProgress = [
  { name: "Bitumage Canton Kyé", progress: 45, budget: "450M FCFA" },
  { name: "Centre de santé Oyem", progress: 78, budget: "280M FCFA" },
  { name: "Rénovation École Mitzic", progress: 92, budget: "120M FCFA" },
  { name: "Électrification solaire villages", progress: 35, budget: "380M FCFA" }
];

const budgetItems = [
  { label: "Budget Total 2025", value: "2.8 Mds FCFA", icon: FileText },
  { label: "Dépenses engagées", value: "1.2 Mds FCFA", icon: TrendingUp },
  { label: "Projets en cours", value: "12", icon: Eye },
  { label: "Cercles citoyens actifs", value: "8", icon: Users }
];

export const WoleuTransparentSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-green-50/50 to-amber-50/30 dark:from-green-950/20 dark:via-background dark:to-amber-950/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              Fonctionnalité Clé
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              Woleu <span className="text-green-600">Transparent</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              La transparence est au cœur de notre engagement. Suivez en temps réel 
              l'utilisation des fonds publics et l'avancement des projets dans votre département.
            </p>

            <div className="bg-white dark:bg-card rounded-2xl border shadow-lg p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Suivi en temps réel
              </h3>
              <p className="text-muted-foreground text-sm">
                "Suivez chaque franc dépensé et l'avancement des travaux en temps réel. 
                Aucune dépense cachée, aucun projet oublié."
              </p>
            </div>

            <Button className="bg-green-600 hover:bg-green-700 group">
              Accéder au tableau de bord
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right side - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-card rounded-3xl border shadow-2xl overflow-hidden">
              {/* Header bar */}
              <div className="bg-green-700 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Tableau de Bord Woleu Transparent</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {budgetItems.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-muted/50 rounded-xl p-4"
                    >
                      <item.icon className="w-5 h-5 text-green-600 mb-2" />
                      <div className="text-lg font-bold">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Projects progress */}
                <div>
                  <h4 className="font-semibold mb-4 text-sm">État d'avancement des projets</h4>
                  <div className="space-y-4">
                    {projectProgress.map((project, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium truncate mr-4">{project.name}</span>
                          <span className="text-muted-foreground text-xs whitespace-nowrap">
                            {project.budget} • {project.progress}%
                          </span>
                        </div>
                        <Progress 
                          value={project.progress} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
