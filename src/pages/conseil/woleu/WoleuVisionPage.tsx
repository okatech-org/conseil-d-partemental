import React from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, Quote, CheckCircle2, Target, Heart, Users, 
  Lightbulb, Shield, ArrowRight, Star, Compass
} from 'lucide-react';
import visionLeadershipImg from '@/assets/woleu/vision-leadership.jpg';

const coreValues = [
  {
    icon: Shield,
    title: "Intégrité",
    description: "Une gestion transparente et honnête des affaires publiques, sans compromis sur l'éthique.",
    color: "bg-blue-500"
  },
  {
    icon: Users,
    title: "Participation",
    description: "Impliquer chaque citoyen dans les décisions qui concernent leur quotidien et leur avenir.",
    color: "bg-green-500"
  },
  {
    icon: Heart,
    title: "Solidarité",
    description: "Ne laisser personne de côté, particulièrement les plus vulnérables de notre communauté.",
    color: "bg-red-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Adopter des solutions modernes et durables pour répondre aux défis du département.",
    color: "bg-amber-500"
  }
];

const objectives = [
  {
    title: "Gouvernance transparente",
    description: "Mettre fin à l'opacité dans la gestion des fonds publics et rendre compte de chaque franc dépensé.",
    metrics: ["100% des dépenses publiées", "Rapports trimestriels", "Audits indépendants"]
  },
  {
    title: "Développement inclusif",
    description: "Garantir que le progrès bénéficie à tous les habitants, des villages les plus reculés à la capitale.",
    metrics: ["Tous les cantons desservis", "Réduction des inégalités", "Accès universel aux services"]
  },
  {
    title: "Autonomisation citoyenne",
    description: "Donner aux citoyens les outils et le pouvoir de participer activement à la vie démocratique.",
    metrics: ["8 Cercles Citoyens actifs", "Consultations régulières", "Budget participatif"]
  }
];

const timeline = [
  { year: "2025", milestone: "Élection et mise en place des Cercles Citoyens" },
  { year: "2026", milestone: "Lancement de Woleu Transparent et premiers projets d'infrastructure" },
  { year: "2027", milestone: "Électrification solaire de 50% des villages non connectés" },
  { year: "2028", milestone: "Réhabilitation complète des axes routiers prioritaires" },
  { year: "2029", milestone: "Couverture santé de base pour 100% de la population" },
  { year: "2030", milestone: "Bilan de mandature et transfert des acquis" }
];

export const WoleuVisionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader />
      
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-green-800 via-green-700 to-green-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vision-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vision-grid)" className="text-white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Eye className="w-3 h-3 mr-1" />
              Notre Vision
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
              Un Woleu <span className="text-amber-400">digne et prospère</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Notre vision est celle d'un département où chaque citoyen vit dignement, 
              participe aux décisions et bénéficie équitablement du développement.
            </p>
          </motion.div>
        </div>

        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-green-400/10 rounded-full blur-3xl" />
      </section>

      {/* Main Quote with Image */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={visionLeadershipImg} 
                  alt="Réunion de leadership du Conseil Départemental" 
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
              </div>
              <Card className="bg-gradient-to-br from-green-700 to-green-800 text-white border-0 overflow-hidden relative">
                <Quote className="absolute top-4 right-4 h-32 w-32 text-white/10" />
                <CardContent className="p-8 md:p-10">
                  <blockquote className="text-xl md:text-2xl font-serif leading-relaxed mb-8 relative z-10">
                    "Le Woleu mérite mieux. L'ère de l'opacité est terminée. 
                    Ensemble, nous bâtirons un département où la transparence n'est pas 
                    un slogan, mais une réalité quotidienne."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-lg font-bold text-green-900">
                      MO
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Marc Ona Essangui</div>
                      <div className="text-white/70 text-sm">Tête de liste • Union Démocratique des Bâtisseurs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-4">
              <Compass className="w-4 h-4" />
              Nos valeurs fondamentales
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all group">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
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

      {/* Strategic Objectives */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Objectifs stratégiques
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Ce que nous voulons accomplir
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-t-4 border-t-green-600">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <span className="text-green-600 font-bold">{index + 1}</span>
                    </div>
                    <CardTitle className="text-xl">{objective.title}</CardTitle>
                    <CardDescription className="text-base">
                      {objective.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {objective.metrics.map((metric, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-400 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Feuille de route
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Notre plan d'action 2025-2030
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200 dark:bg-green-800" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-6 pb-8"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.year}
                  </div>
                  <div className="flex-1 pt-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="font-medium">{item.milestone}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Partagez notre vision
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Rejoignez le mouvement pour un Woleu transparent, participatif et prospère
            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold">
              Rejoindre un Cercle Citoyen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
