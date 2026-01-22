import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, ShoppingBag, Egg, Car, Wifi, Stethoscope, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const flagshipProjects = [
  {
    icon: Droplets,
    title: "Micro-barrages hydrauliques",
    category: "Eau potable",
    description: "Installation de micro-barrages pour fournir de l'eau potable propre à tous les villages du département.",
    impact: "15 000 bénéficiaires",
    status: "Priorité 1",
    color: "bg-blue-500"
  },
  {
    icon: Sun,
    title: "Électrification solaire",
    category: "Énergie",
    description: "Déploiement de panneaux solaires pour électrifier les villages non connectés au réseau.",
    impact: "25 villages",
    status: "Priorité 1",
    color: "bg-amber-500"
  },
  {
    icon: ShoppingBag,
    title: "Coopérative 'Produisons Woleu'",
    category: "Économie locale",
    description: "Création de coopératives agricoles pour valoriser les produits locaux et soutenir les agriculteurs.",
    impact: "500 agriculteurs",
    status: "Priorité 2",
    color: "bg-green-500"
  },
  {
    icon: Egg,
    title: "Fermette avicole départementale",
    category: "Élevage",
    description: "Mise en place d'une fermette avicole moderne pour réduire la dépendance aux importations.",
    impact: "200 emplois",
    status: "Priorité 2",
    color: "bg-orange-500"
  },
  {
    icon: Car,
    title: "Réhabilitation routière",
    category: "Infrastructures",
    description: "Réhabilitation et bitumage des axes prioritaires pour désenclaver les zones rurales.",
    impact: "150 km de routes",
    status: "Priorité 1",
    color: "bg-gray-600"
  },
  {
    icon: Wifi,
    title: "Connexion numérique",
    category: "Technologies",
    description: "Déploiement d'infrastructures numériques pour connecter écoles et administrations.",
    impact: "30 établissements",
    status: "Priorité 3",
    color: "bg-purple-500"
  },
  {
    icon: Stethoscope,
    title: "Caravanes médicales",
    category: "Santé",
    description: "Organisation de caravanes médicales régulières dans les zones rurales éloignées.",
    impact: "10 000 consultations/an",
    status: "Priorité 1",
    color: "bg-red-500"
  }
];

export const WoleuProjectsCarousel: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            Projets concrets
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Les 7 Projets Phares
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des projets concrets et réalisables pour améliorer le quotidien 
            des habitants du Woleu dès 2025
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {flagshipProjects.map((project, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group border-0 bg-card">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <project.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="w-fit text-xs mb-2">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-lg leading-tight">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-3">
                        {project.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {project.impact}
                        </span>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative left-0 translate-y-0" />
            <CarouselNext className="relative right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
