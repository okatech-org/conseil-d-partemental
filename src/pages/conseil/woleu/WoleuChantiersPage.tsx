import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, HeartPulse, GraduationCap, Scale, Sprout, 
  ArrowRight, CheckCircle2, Clock, Target, TrendingUp,
  Eye, Coins, Users, ChevronRight, Zap
} from 'lucide-react';

// Import images for each chantier
import chantierInfrastructure from '@/assets/woleu/chantier-infrastructure.jpg';
import chantierRoutes from '@/assets/woleu/chantier-routes.jpg';
import chantierSante from '@/assets/woleu/chantier-sante.jpg';
import chantierEducation from '@/assets/woleu/chantier-education.jpg';
import chantierEconomie from '@/assets/woleu/chantier-economie.jpg';
import chantierGouvernance from '@/assets/woleu/chantier-gouvernance.jpg';
import chantiersHero from '@/assets/woleu/chantiers-hero.jpg';

const chantiers = [
  {
    id: 'infrastructure',
    icon: Building2,
    title: "Infrastructures",
    subtitle: "Routes, ponts et désenclavement",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500",
    lightBg: "bg-orange-50 dark:bg-orange-950/20",
    textColor: "text-orange-600",
    image: chantierRoutes,
    secondaryImage: chantierInfrastructure,
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
    impact: "150 000",
    impactLabel: "habitants bénéficiaires",
    budget: "4.2 Mds FCFA",
    completion: 35
  },
  {
    id: 'sante',
    icon: HeartPulse,
    title: "Santé",
    image: chantierSante,
    subtitle: "Accès aux soins pour tous",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500",
    lightBg: "bg-red-50 dark:bg-red-950/20",
    textColor: "text-red-600",
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
    impact: "10 000",
    impactLabel: "consultations/an",
    budget: "1.8 Mds FCFA",
    completion: 55
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: "Éducation & Jeunesse",
    subtitle: "Préparer l'avenir de nos enfants",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/20",
    textColor: "text-blue-600",
    image: chantierEducation,
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
    impact: "12 000",
    impactLabel: "élèves concernés",
    budget: "1.5 Mds FCFA",
    completion: 68
  },
  {
    id: 'gouvernance',
    icon: Scale,
    title: "Gouvernance",
    subtitle: "Transparence et participation",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/20",
    textColor: "text-purple-600",
    image: chantierGouvernance,
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
    impact: "100%",
    impactLabel: "transparence budgétaire",
    budget: "250 M FCFA",
    completion: 53
  },
  {
    id: 'economie',
    icon: Sprout,
    title: "Économie Locale",
    subtitle: "Agriculture et emplois verts",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-950/20",
    textColor: "text-green-600",
    image: chantierEconomie,
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
    impact: "500",
    impactLabel: "emplois créés",
    budget: "1.2 Mds FCFA",
    completion: 30
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terminé': return 'bg-green-500 text-white';
    case 'Finition': return 'bg-green-400 text-white';
    case 'En cours': return 'bg-blue-500 text-white';
    case 'Démarré': return 'bg-amber-500 text-white';
    default: return 'bg-gray-400 text-white';
  }
};

export const WoleuChantiersPage: React.FC = () => {
  const [activeChantier, setActiveChantier] = useState(chantiers[0].id);

  const currentChantier = chantiers.find(c => c.id === activeChantier) || chantiers[0];

  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader />
      
      {/* Hero Section with Image */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={chantiersHero} 
            alt="Les 5 Chantiers du Woleu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/90 to-green-900/80" />
        </div>

        {/* Animated elements */}
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Badge className="mb-6 px-5 py-2 bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Zap className="w-4 h-4 mr-2" />
              Programme 2025-2030
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6 leading-tight">
              Les <span className="text-amber-400">5 Chantiers</span> prioritaires
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              Cinq domaines d'action concrets pour transformer le Woleu et améliorer 
              durablement la vie de ses habitants
            </p>

            {/* Overview stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "9 Mds", label: "FCFA Budget total", icon: Coins },
                { value: "15", label: "Projets majeurs", icon: Target },
                { value: "150K", label: "Bénéficiaires", icon: Users },
                { value: "48%", label: "Avancement global", icon: TrendingUp }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
                >
                  <stat.icon className="w-6 h-6 text-amber-400 mb-3" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chantiers Cards Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Aperçu des chantiers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Cliquez sur un chantier pour voir les détails et l'avancement des projets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {chantiers.map((chantier, index) => {
              const Icon = chantier.icon;
              const isActive = activeChantier === chantier.id;
              
              return (
                <motion.div
                  key={chantier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer overflow-hidden transition-all duration-300 h-full ${
                      isActive 
                        ? 'ring-2 ring-green-500 shadow-xl scale-[1.02]' 
                        : 'hover:shadow-lg hover:scale-[1.01]'
                    }`}
                    onClick={() => setActiveChantier(chantier.id)}
                  >
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={chantier.image} 
                        alt={chantier.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${chantier.color} opacity-60`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Icon badge */}
                      <div className={`absolute top-3 right-3 w-10 h-10 rounded-xl ${chantier.bgColor} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Progress indicator */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between text-white text-xs mb-1">
                          <span>Avancement</span>
                          <span className="font-bold">{chantier.completion}%</span>
                        </div>
                        <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${chantier.completion}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-bold text-sm mb-1">{chantier.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{chantier.subtitle}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChantier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden shadow-xl">
                <div className="grid lg:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative h-64 lg:h-auto min-h-[400px]">
                    <img 
                      src={currentChantier.image} 
                      alt={currentChantier.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentChantier.color} opacity-30`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentChantier.bgColor} text-white text-sm font-medium mb-4`}>
                        <currentChantier.icon className="w-4 h-4" />
                        Chantier {chantiers.findIndex(c => c.id === currentChantier.id) + 1}
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white font-serif mb-2">
                        {currentChantier.title}
                      </h3>
                      <p className="text-white/80 text-lg">{currentChantier.subtitle}</p>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-10">
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                      {currentChantier.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className={`p-4 rounded-2xl ${currentChantier.lightBg}`}>
                        <Coins className={`w-5 h-5 ${currentChantier.textColor} mb-2`} />
                        <div className="font-bold text-lg">{currentChantier.budget}</div>
                        <div className="text-xs text-muted-foreground">Budget alloué</div>
                      </div>
                      <div className={`p-4 rounded-2xl ${currentChantier.lightBg}`}>
                        <Users className={`w-5 h-5 ${currentChantier.textColor} mb-2`} />
                        <div className="font-bold text-lg">{currentChantier.impact}</div>
                        <div className="text-xs text-muted-foreground">{currentChantier.impactLabel}</div>
                      </div>
                      <div className={`p-4 rounded-2xl ${currentChantier.lightBg}`}>
                        <TrendingUp className={`w-5 h-5 ${currentChantier.textColor} mb-2`} />
                        <div className="font-bold text-lg">{currentChantier.completion}%</div>
                        <div className="text-xs text-muted-foreground">Avancement</div>
                      </div>
                    </div>

                    {/* Objectives */}
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className={`w-5 h-5 ${currentChantier.textColor}`} />
                      Objectifs clés
                    </h4>
                    <ul className="space-y-2 mb-8">
                      {currentChantier.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full ${currentChantier.bgColor} mt-2 flex-shrink-0`} />
                          {obj}
                        </li>
                      ))}
                    </ul>

                    <Button className={`bg-gradient-to-r ${currentChantier.color} text-white`}>
                      Voir tous les détails
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${currentChantier.lightBg} ${currentChantier.textColor} text-sm font-medium mb-5`}>
              <Target className="w-4 h-4" />
              Projets {currentChantier.title}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Suivi des projets en cours
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentChantier.projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Progress bar at top */}
                  <div className="h-1.5 bg-muted">
                    <div 
                      className={`h-full bg-gradient-to-r ${currentChantier.color} transition-all duration-700`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge className={`${getStatusColor(project.status)} text-xs flex-shrink-0`}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Avancement</span>
                          <span className={`font-bold ${currentChantier.textColor}`}>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      {/* Budget */}
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Budget</span>
                        </div>
                        <span className="font-semibold">{project.budget}</span>
                      </div>

                      {/* Action */}
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-muted transition-colors">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir les détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Coming soon card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full border-dashed hover:border-solid hover:shadow-lg transition-all cursor-pointer flex items-center justify-center min-h-[250px] group">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900/20 transition-colors">
                    <Clock className="w-8 h-8 text-muted-foreground group-hover:text-green-600 transition-colors" />
                  </div>
                  <p className="font-medium mb-1">Plus de projets à venir</p>
                  <p className="text-sm text-muted-foreground">Phase de planification</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
        <motion.div 
          className="absolute top-10 right-20 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Eye className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
              Suivez l'avancement en temps réel
            </h2>
            <p className="text-white/80 text-xl mb-10 leading-relaxed">
              Avec Woleu Transparent, vous pouvez suivre chaque projet, 
              chaque dépense, en toute transparence
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold px-8 py-6 text-lg">
                Accéder à Woleu Transparent
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                Télécharger le rapport
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
