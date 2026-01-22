import React from 'react';
import { motion } from 'framer-motion';
import { Building2, HeartPulse, GraduationCap, Scale, Sprout, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const priorityAxes = [
  {
    icon: Building2,
    title: "Infrastructures",
    description: "Routes, ponts et désenclavement des zones rurales pour connecter toutes les communautés du Woleu.",
    color: "bg-orange-500",
    lightBg: "bg-orange-50 dark:bg-orange-950/20"
  },
  {
    icon: HeartPulse,
    title: "Santé",
    description: "Accès aux soins de qualité et médicaments essentiels pour tous les habitants du département.",
    color: "bg-red-500",
    lightBg: "bg-red-50 dark:bg-red-950/20"
  },
  {
    icon: GraduationCap,
    title: "Éducation & Jeunesse",
    description: "Écoles rénovées, équipées et bourses d'excellence pour préparer l'avenir de nos enfants.",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    icon: Scale,
    title: "Gouvernance",
    description: "Transparence totale, lutte anticorruption et participation citoyenne à toutes les décisions.",
    color: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    icon: Sprout,
    title: "Économie Locale",
    description: "Agriculture durable, coopératives et emplois verts pour un développement économique inclusif.",
    color: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-950/20"
  }
];

export const WoleuPriorityAxes: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Programme 2025
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Les 5 Axes Prioritaires
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cinq piliers fondamentaux pour transformer le Woleu et améliorer 
            la vie quotidienne de tous ses habitants
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityAxes.map((axis, index) => (
            <motion.div
              key={axis.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={index === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className={`h-full ${axis.lightBg} border-0 hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl ${axis.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <axis.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {axis.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {axis.description}
                  </CardDescription>
                  <Button variant="ghost" className="mt-4 p-0 h-auto text-green-700 dark:text-green-400 group/btn">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
