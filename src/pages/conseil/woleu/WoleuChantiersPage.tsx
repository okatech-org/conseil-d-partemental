import React from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, HeartPulse, GraduationCap, Scale, Sprout, 
  ArrowRight, CheckCircle2, Clock, Target, MapPin,
  Droplets, Sun, Car, Wifi, Users
} from 'lucide-react';

const chantiers = [
  {
    id: 'infrastructure',
    icon: Building2,
    title: "Infrastructures",
    subtitle: "Routes, ponts et désenclavement",
    color: "bg-orange-500",
    lightBg: "bg-orange-50 dark:bg-orange-950/20",
    description: "Le désenclavement du Woleu est notre priorité absolue. Sans routes praticables, aucun développement économique ni accès aux services n'est possible.",
    objectives: [
      "Bitumer les axes prioritaires Oyem-Bitam et Oyem-Mitzic",
      "Construire 5 ponts sur les cours d'eau majeurs",
      "Réhabiliter 200 km de pistes rurales",
      "Installer un éclairage public dans tous les chefs-lieux"
    ],
    projects: [
      { name: "Route Oyem-Bitam", progress: 45, budget: "2.5 Mds FCFA", status: "En cours" },
      { name: "Pont sur l'Okano", progress: 20, budget: "450 M FCFA", status: "Démarré" },
      { name: "Pistes canton Kyé", progress: 0, budget: "180 M FCFA", status: "Planifié" }
    ],
    impact: "150 000 habitants bénéficiaires",
    budget: "4.2 Mds FCFA"
  },
  {
    id: 'sante',
    icon: HeartPulse,
    title: "Santé",
    subtitle: "Accès aux soins pour tous",
    color: "bg-red-500",
    lightBg: "bg-red-50 dark:bg-red-950/20",
    description: "L'accès aux soins de santé est un droit fondamental. Notre objectif est de garantir que chaque habitant du Woleu puisse se soigner dignement.",
    objectives: [
      "Rénover et équiper les 8 centres de santé du département",
      "Organiser des caravanes médicales mensuelles dans les villages",
      "Garantir la disponibilité des médicaments essentiels",
      "Former et recruter du personnel médical local"
    ],
    projects: [
      { name: "Centre de santé Mitzic", progress: 78, budget: "280 M FCFA", status: "En cours" },
      { name: "Caravanes médicales", progress: 60, budget: "120 M FCFA", status: "En cours" },
      { name: "Pharmacie départementale", progress: 15, budget: "200 M FCFA", status: "Démarré" }
    ],
    impact: "10 000 consultations/an",
    budget: "1.8 Mds FCFA"
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: "Éducation & Jeunesse",
    subtitle: "Préparer l'avenir de nos enfants",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/20",
    description: "L'éducation est le meilleur investissement pour l'avenir. Nous voulons offrir à chaque enfant du Woleu les moyens de réussir.",
    objectives: [
      "Rénover toutes les écoles primaires du département",
      "Équiper les établissements en matériel pédagogique moderne",
      "Créer un programme de bourses d'excellence",
      "Développer la formation professionnelle"
    ],
    projects: [
      { name: "Rénovation écoles Oyem", progress: 92, budget: "320 M FCFA", status: "Finition" },
      { name: "Distribution kits scolaires", progress: 100, budget: "85 M FCFA", status: "Terminé" },
      { name: "Centre de formation pro", progress: 10, budget: "450 M FCFA", status: "Planifié" }
    ],
    impact: "12 000 élèves concernés",
    budget: "1.5 Mds FCFA"
  },
  {
    id: 'gouvernance',
    icon: Scale,
    title: "Gouvernance",
    subtitle: "Transparence et participation",
    color: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/20",
    description: "La confiance des citoyens passe par une gestion irréprochable des affaires publiques et leur implication dans les décisions.",
    objectives: [
      "Publier en temps réel toutes les dépenses du département",
      "Mettre en place les Cercles Citoyens dans chaque canton",
      "Organiser des consultations publiques régulières",
      "Créer une cellule anticorruption indépendante"
    ],
    projects: [
      { name: "Plateforme Woleu Transparent", progress: 85, budget: "45 M FCFA", status: "En cours" },
      { name: "Cercles Citoyens", progress: 50, budget: "30 M FCFA", status: "En cours" },
      { name: "Cellule anticorruption", progress: 25, budget: "60 M FCFA", status: "Démarré" }
    ],
    impact: "100% de transparence budgétaire",
    budget: "250 M FCFA"
  },
  {
    id: 'economie',
    icon: Sprout,
    title: "Économie Locale",
    subtitle: "Agriculture et emplois verts",
    color: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-950/20",
    description: "Le développement économique doit être endogène et durable. Nous misons sur l'agriculture et les énergies renouvelables.",
    objectives: [
      "Créer la coopérative 'Produisons Woleu'",
      "Installer des micro-barrages hydrauliques",
      "Électrifier 25 villages avec le solaire",
      "Développer l'écotourisme communautaire"
    ],
    projects: [
      { name: "Électrification solaire", progress: 35, budget: "380 M FCFA", status: "En cours" },
      { name: "Coopérative agricole", progress: 40, budget: "150 M FCFA", status: "En cours" },
      { name: "Fermette avicole", progress: 15, budget: "200 M FCFA", status: "Démarré" }
    ],
    impact: "500 emplois créés",
    budget: "1.2 Mds FCFA"
  }
];

export const WoleuChantiersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader />
      
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-green-800 via-green-700 to-green-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="chantiers-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chantiers-grid)" className="text-white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Building2 className="w-3 h-3 mr-1" />
              Programme 2025-2030
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
              Les <span className="text-amber-400">5 Chantiers</span> prioritaires
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Cinq domaines d'action pour transformer le Woleu et améliorer 
              concrètement la vie de ses habitants
            </p>

            {/* Overview stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">9 Mds</div>
                <div className="text-white/70 text-sm">FCFA Budget total</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">15</div>
                <div className="text-white/70 text-sm">Projets majeurs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">150 000</div>
                <div className="text-white/70 text-sm">Bénéficiaires</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
      </section>

      {/* Chantiers Navigation */}
      <section className="py-8 border-b bg-card sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {chantiers.map((chantier) => {
              const Icon = chantier.icon;
              return (
                <a
                  key={chantier.id}
                  href={`#${chantier.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all border hover:shadow-md ${chantier.lightBg}`}
                >
                  <Icon className="w-4 h-4" />
                  {chantier.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Chantiers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {chantiers.map((chantier, chantierIndex) => {
              const Icon = chantier.icon;
              return (
                <motion.div
                  key={chantier.id}
                  id={chantier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-32"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Info Column */}
                    <div className="lg:col-span-1">
                      <div className={`w-16 h-16 rounded-2xl ${chantier.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="mb-2" variant="outline">Chantier {chantierIndex + 1}</Badge>
                      <h2 className="text-3xl font-bold font-serif mb-2">{chantier.title}</h2>
                      <p className="text-lg text-muted-foreground mb-4">{chantier.subtitle}</p>
                      <p className="text-muted-foreground mb-6">{chantier.description}</p>
                      
                      <div className="flex gap-4 mb-6">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="font-bold text-lg">{chantier.budget}</div>
                          <div className="text-xs text-muted-foreground">Budget</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="font-bold text-lg">{chantier.impact}</div>
                          <div className="text-xs text-muted-foreground">Impact</div>
                        </div>
                      </div>

                      <h3 className="font-semibold mb-3">Objectifs</h3>
                      <ul className="space-y-2">
                        {chantier.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects Column */}
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Projets en cours
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {chantier.projects.map((project, i) => (
                          <Card key={i} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{project.name}</CardTitle>
                                <Badge 
                                  variant={
                                    project.status === 'Terminé' ? 'default' : 
                                    project.status === 'En cours' ? 'secondary' : 
                                    'outline'
                                  }
                                  className="text-xs"
                                >
                                  {project.status}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-muted-foreground">Avancement</span>
                                    <span className="font-medium">{project.progress}%</span>
                                  </div>
                                  <Progress value={project.progress} className="h-2" />
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Budget</span>
                                  <span className="font-medium">{project.budget}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {/* Add more projects card */}
                        <Card className="border-dashed hover:border-solid hover:shadow-md transition-all cursor-pointer flex items-center justify-center min-h-[150px]">
                          <div className="text-center text-muted-foreground">
                            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Plus de projets à venir</p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {chantierIndex < chantiers.length - 1 && (
                    <div className="border-b mt-16" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
              Suivez l'avancement des chantiers
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Avec Woleu Transparent, vous pouvez suivre en temps réel 
              l'avancement de chaque projet et l'utilisation des fonds
            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold">
              Accéder à Woleu Transparent
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
