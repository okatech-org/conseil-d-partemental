import React from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { WoleuPhotoGallery } from '@/components/conseil/woleu/WoleuPhotoGallery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, Quote, CheckCircle2, Target, Heart, Users, 
  Lightbulb, Shield, ArrowRight, Star, Compass, Calendar, Camera
} from 'lucide-react';
import visionLeadershipImg from '@/assets/woleu/vision-leadership.jpg';
import valueIntegriteImg from '@/assets/woleu/value-integrite.jpg';
import valueParticipationImg from '@/assets/woleu/value-participation.jpg';
import valueSolidariteImg from '@/assets/woleu/value-solidarite.jpg';
import valueInnovationImg from '@/assets/woleu/value-innovation.jpg';
import objectiveGovernanceImg from '@/assets/woleu/objective-governance.jpg';
import objectiveDevelopmentImg from '@/assets/woleu/objective-development.jpg';
import objectiveAutonomisationImg from '@/assets/woleu/objective-autonomisation.jpg';

const coreValues = [
  {
    icon: Shield,
    title: "Intégrité",
    description: "Une gestion transparente et honnête des affaires publiques, sans compromis sur l'éthique.",
    color: "from-blue-500 to-blue-600",
    image: valueIntegriteImg
  },
  {
    icon: Users,
    title: "Participation",
    description: "Impliquer chaque citoyen dans les décisions qui concernent leur quotidien et leur avenir.",
    color: "from-green-500 to-green-600",
    image: valueParticipationImg
  },
  {
    icon: Heart,
    title: "Solidarité",
    description: "Ne laisser personne de côté, particulièrement les plus vulnérables de notre communauté.",
    color: "from-rose-500 to-rose-600",
    image: valueSolidariteImg
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Adopter des solutions modernes et durables pour répondre aux défis du département.",
    color: "from-amber-500 to-amber-600",
    image: valueInnovationImg
  }
];

const objectives = [
  {
    title: "Gouvernance transparente",
    description: "Mettre fin à l'opacité dans la gestion des fonds publics et rendre compte de chaque franc dépensé.",
    metrics: ["100% des dépenses publiées", "Rapports trimestriels", "Audits indépendants"],
    image: objectiveGovernanceImg,
    icon: Eye
  },
  {
    title: "Développement inclusif",
    description: "Garantir que le progrès bénéficie à tous les habitants, des villages les plus reculés à la capitale.",
    metrics: ["Tous les cantons desservis", "Réduction des inégalités", "Accès universel aux services"],
    image: objectiveDevelopmentImg,
    icon: Target
  },
  {
    title: "Autonomisation citoyenne",
    description: "Donner aux citoyens les outils et le pouvoir de participer activement à la vie démocratique.",
    metrics: ["8 Cercles Citoyens actifs", "Consultations régulières", "Budget participatif"],
    image: objectiveAutonomisationImg,
    icon: Users
  }
];

const timeline = [
  { year: "2025", milestone: "Élection et mise en place des Cercles Citoyens", status: "upcoming" },
  { year: "2026", milestone: "Lancement de Woleu Transparent et premiers projets d'infrastructure", status: "planned" },
  { year: "2027", milestone: "Électrification solaire de 50% des villages non connectés", status: "planned" },
  { year: "2028", milestone: "Réhabilitation complète des axes routiers prioritaires", status: "planned" },
  { year: "2029", milestone: "Couverture santé de base pour 100% de la population", status: "planned" },
  { year: "2030", milestone: "Bilan de mandature et transfert des acquis", status: "planned" }
];

export const WoleuVisionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader />
      
      {/* Hero with parallax effect */}
      <section className="relative pt-24 pb-24 bg-gradient-to-br from-green-800 via-green-700 to-green-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-10 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"
            animate={{ 
              x: [-50, 50, -50],
              y: [-30, 30, -30]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vision-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vision-grid)" className="text-white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-6 px-6 py-2 bg-amber-500/20 text-amber-200 border-amber-400/30 text-sm">
                <Eye className="w-4 h-4 mr-2" />
                Notre Vision pour le Woleu
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6 leading-tight">
              Un Woleu{' '}
              <span className="relative">
                <span className="text-amber-400">digne et prospère</span>
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-amber-400/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
              Notre vision est celle d'un département où chaque citoyen vit dignement, 
              participe aux décisions et bénéficie équitablement du développement.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold px-8">
                Découvrir nos valeurs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Voir la feuille de route
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Quote with Image - Enhanced layout */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              {/* Image - larger */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src={visionLeadershipImg} 
                    alt="Réunion de leadership du Conseil Départemental" 
                    className="w-full h-80 lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="bg-amber-500/90 text-green-900 font-medium">
                      Leadership engagé
                    </Badge>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-xl -z-10" />
              </motion.div>

              {/* Quote Card - enhanced */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-3"
              >
                <Card className="bg-gradient-to-br from-green-700 via-green-700 to-green-800 text-white border-0 overflow-hidden relative shadow-2xl">
                  <Quote className="absolute top-6 right-6 h-40 w-40 text-white/5" />
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl" />
                  <CardContent className="p-10 md:p-12 relative z-10">
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed mb-10">
                      "Le Woleu mérite mieux. L'ère de l'opacité est terminée. 
                      Ensemble, nous bâtirons un département où la transparence n'est pas 
                      un slogan, mais une réalité quotidienne."
                    </blockquote>
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl font-bold text-green-900 shadow-lg">
                        MO
                      </div>
                      <div>
                        <div className="font-semibold text-xl">Marc Ona Essangui</div>
                        <div className="text-white/70">Tête de liste • Union Démocratique des Bâtisseurs</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values - Visual cards with images */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-5">
              <Compass className="w-4 h-4" />
              Nos valeurs fondamentales
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-5">
              Les principes qui nous guident
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ces valeurs sont le socle de notre action et de notre engagement envers les citoyens du Woleu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                    {/* Image section */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={value.image} 
                        alt={value.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${value.color} opacity-40 group-hover:opacity-50 transition-opacity`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating icon */}
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Objectives - Full width cards with images */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-5">
              <Target className="w-4 h-4" />
              Objectifs stratégiques
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-5">
              Ce que nous voulons accomplir
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trois axes prioritaires pour transformer le Woleu
            </p>
          </motion.div>

          <div className="space-y-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={objective.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                    <div className={`grid lg:grid-cols-2 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                      {/* Image */}
                      <div className={`relative h-64 lg:h-auto ${isEven ? '' : 'lg:order-2'}`}>
                        <img 
                          src={objective.image} 
                          alt={objective.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">{index + 1}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className={`p-8 lg:p-12 flex flex-col justify-center ${isEven ? '' : 'lg:order-1'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-green-600" />
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-bold font-serif">{objective.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                          {objective.description}
                        </p>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {objective.metrics.map((metric, i) => (
                            <div 
                              key={i} 
                              className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span className="text-sm font-medium">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline - Modern horizontal/vertical design */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-400 text-sm font-medium mb-5">
              <Calendar className="w-4 h-4" />
              Feuille de route
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-5">
              Notre plan d'action 2025-2030
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une vision à long terme avec des étapes claires et mesurables
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="relative">
              {/* Main timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-green-600 to-amber-500 rounded-full transform -translate-y-1/2" />
              
              <div className="grid grid-cols-6 gap-4">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${index % 2 === 0 ? 'pt-8' : 'pb-8'}`}
                  >
                    {/* Connector */}
                    <div className={`absolute left-1/2 transform -translate-x-1/2 ${index % 2 === 0 ? 'top-0' : 'bottom-0'} w-0.5 h-8 bg-green-400`} />
                    
                    {/* Year bubble */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                        index === 0 
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-green-900' 
                          : 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                      }`}>
                        {item.year}
                      </div>
                    </div>
                    
                    {/* Content card */}
                    <Card className={`${index % 2 === 0 ? 'mb-16' : 'mt-16'} shadow-lg hover:shadow-xl transition-shadow`}>
                      <CardContent className="p-4">
                        <p className="text-sm font-medium leading-snug">{item.milestone}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden max-w-md mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-amber-500" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-6 pb-8"
                >
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg ${
                    index === 0 
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-green-900' 
                      : 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                  }`}>
                    {item.year}
                  </div>
                  <Card className="flex-1 shadow-md">
                    <CardContent className="p-4">
                      <p className="font-medium">{item.milestone}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-5">
              <Camera className="w-4 h-4" />
              Galerie Photos
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-5">
              Le Woleu en images
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez notre département, ses infrastructures, ses projets et sa communauté
            </p>
          </motion.div>

          <WoleuPhotoGallery />
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-10 right-20 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-10 left-20 w-48 h-48 bg-green-400/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Star className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
              Partagez notre vision
            </h2>
            <p className="text-white/80 text-xl mb-10 leading-relaxed">
              Rejoignez le mouvement pour un Woleu transparent, participatif et prospère. 
              Ensemble, nous pouvons bâtir l'avenir que nos enfants méritent.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold px-8 py-6 text-lg">
                Rejoindre un Cercle Citoyen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                En savoir plus
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
