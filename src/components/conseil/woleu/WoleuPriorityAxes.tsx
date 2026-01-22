import React from 'react';
import { motion } from 'framer-motion';
import { Building2, HeartPulse, GraduationCap, Scale, Sprout, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import images
import chantierInfrastructure from '@/assets/woleu/chantier-infrastructure.jpg';
import chantierSante from '@/assets/woleu/chantier-sante.jpg';
import chantierEducation from '@/assets/woleu/chantier-education.jpg';
import chantierGouvernance from '@/assets/woleu/chantier-gouvernance.jpg';
import chantierEconomie from '@/assets/woleu/chantier-economie.jpg';

const priorityAxes = [
  {
    icon: Building2,
    title: "Infrastructures",
    description: "Routes, ponts et désenclavement des zones rurales pour connecter toutes les communautés du Woleu.",
    image: chantierInfrastructure,
    stats: "250 km de routes",
    color: "from-orange-600 to-orange-700"
  },
  {
    icon: HeartPulse,
    title: "Santé",
    description: "Accès aux soins de qualité et médicaments essentiels pour tous les habitants du département.",
    image: chantierSante,
    stats: "12 centres de santé",
    color: "from-red-600 to-red-700"
  },
  {
    icon: GraduationCap,
    title: "Éducation & Jeunesse",
    description: "Écoles rénovées, équipées et bourses d'excellence pour préparer l'avenir de nos enfants.",
    image: chantierEducation,
    stats: "45 écoles rénovées",
    color: "from-blue-600 to-blue-700"
  },
  {
    icon: Scale,
    title: "Gouvernance",
    description: "Transparence totale, lutte anticorruption et participation citoyenne à toutes les décisions.",
    image: chantierGouvernance,
    stats: "100% transparent",
    color: "from-purple-600 to-purple-700"
  },
  {
    icon: Sprout,
    title: "Économie Locale",
    description: "Agriculture durable, coopératives et emplois verts pour un développement économique inclusif.",
    image: chantierEconomie,
    stats: "500 emplois créés",
    color: "from-green-600 to-green-700"
  }
];

export const WoleuPriorityAxes: React.FC = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Programme 2025
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
            Les <span className="text-emerald-600 dark:text-emerald-400">5 Axes</span> Prioritaires
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cinq piliers fondamentaux pour transformer le Woleu et améliorer 
            la vie quotidienne de tous ses habitants
          </p>
        </motion.div>

        {/* Featured first card - large */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Card className="overflow-hidden border-0 shadow-2xl group cursor-pointer">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                <img
                  src={priorityAxes[0].image}
                  alt={priorityAxes[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-t md:from-black/40 md:to-transparent" />
                <Badge className={`absolute top-4 left-4 bg-gradient-to-r ${priorityAxes[0].color} text-white border-0`}>
                  Axe Prioritaire #1
                </Badge>
              </div>
              <CardContent className="p-8 flex flex-col justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${priorityAxes[0].color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-serif mb-3">
                  {priorityAxes[0].title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {priorityAxes[0].description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full">
                    <span className="text-orange-700 dark:text-orange-400 font-semibold">{priorityAxes[0].stats}</span>
                  </div>
                  <Button variant="ghost" className="text-orange-600 hover:text-orange-700 group/btn">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Grid of remaining 4 cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {priorityAxes.slice(1).map((axis, index) => (
            <motion.div
              key={axis.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={axis.image}
                    alt={axis.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Icon overlay */}
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${axis.color} flex items-center justify-center shadow-lg`}>
                    <axis.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Title on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                      Axe #{index + 2}
                    </Badge>
                    <h3 className="text-xl font-bold text-white font-serif">
                      {axis.title}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {axis.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${axis.color} text-white`}>
                      {axis.stats}
                    </span>
                    <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group/btn p-0">
                      En savoir plus
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
