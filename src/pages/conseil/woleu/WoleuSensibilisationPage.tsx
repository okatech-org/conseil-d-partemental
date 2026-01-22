import React from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Megaphone, Users, Target, Calendar, MapPin, ArrowRight,
  PlayCircle, FileText, Download, Share2, Heart, Lightbulb,
  Vote, Scale, Wallet, Eye
} from 'lucide-react';
import sensibilisationCampagneImg from '@/assets/woleu/sensibilisation-campagne.jpg';
import campagneBudgetImg from '@/assets/woleu/campagne-budget.jpg';
import campagneCerclesImg from '@/assets/woleu/campagne-cercles.jpg';
import campagneTransparenceImg from '@/assets/woleu/campagne-transparence.jpg';
import campagneConseilImg from '@/assets/woleu/campagne-conseil.jpg';
import eventAtelierBudgetImg from '@/assets/woleu/event-atelier-budget.jpg';
import eventPortesOuvertesImg from '@/assets/woleu/event-portes-ouvertes.jpg';
import eventFormationOnlineImg from '@/assets/woleu/event-formation-online.jpg';

const campaigns = [
  {
    id: 1,
    title: "Comprendre le budget départemental",
    description: "Apprenez comment sont utilisés les fonds publics et comment vous pouvez suivre les dépenses.",
    icon: Wallet,
    progress: 75,
    participants: 1250,
    status: 'active',
    color: 'bg-blue-500',
    image: campagneBudgetImg
  },
  {
    id: 2,
    title: "Les Cercles Citoyens : votre voix compte",
    description: "Découvrez comment participer aux décisions locales à travers les assemblées citoyennes.",
    icon: Users,
    progress: 60,
    participants: 890,
    status: 'active',
    color: 'bg-green-500',
    image: campagneCerclesImg
  },
  {
    id: 3,
    title: "Transparence et lutte anticorruption",
    description: "Comprendre les mécanismes de contrôle et comment signaler les irrégularités.",
    icon: Eye,
    progress: 45,
    participants: 650,
    status: 'active',
    color: 'bg-purple-500',
    image: campagneTransparenceImg
  },
  {
    id: 4,
    title: "Le rôle du Conseil Départemental",
    description: "Tout savoir sur les compétences et responsabilités de votre conseil local.",
    icon: Scale,
    progress: 100,
    participants: 2100,
    status: 'completed',
    color: 'bg-amber-500',
    image: campagneConseilImg
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Atelier 'Budget participatif'",
    date: "2025-02-05",
    time: "10:00",
    location: "Mairie d'Oyem",
    type: "atelier",
    image: eventAtelierBudgetImg
  },
  {
    id: 2,
    title: "Journée portes ouvertes",
    date: "2025-02-12",
    time: "09:00",
    location: "Hôtel du Département",
    type: "evenement",
    image: eventPortesOuvertesImg
  },
  {
    id: 3,
    title: "Formation 'Woleu Transparent'",
    date: "2025-02-20",
    time: "14:00",
    location: "En ligne",
    type: "formation",
    image: eventFormationOnlineImg
  }
];

const resources = [
  {
    id: 1,
    title: "Guide du citoyen",
    description: "Tout ce que vous devez savoir sur vos droits et devoirs",
    type: "PDF",
    icon: FileText
  },
  {
    id: 2,
    title: "Vidéo : Les 5 Chantiers expliqués",
    description: "Présentation détaillée du programme 2025-2030",
    type: "Vidéo",
    icon: PlayCircle
  },
  {
    id: 3,
    title: "Infographie : Budget 2025",
    description: "Visualisez l'allocation du budget départemental",
    type: "Image",
    icon: Download
  }
];

export const WoleuSensibilisationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader onNavigate={() => {}} activeSection="sensibilisation" />
      
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={sensibilisationCampagneImg} 
            alt="Campagne de sensibilisation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sensi-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sensi-grid)" className="text-white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Megaphone className="w-3 h-3 mr-1" />
              Éducation citoyenne
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">
              Sensibilisation
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Ensemble, développons une culture de la transparence et de la participation citoyenne
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">4,890</div>
                <div className="text-white/70 text-sm">Citoyens sensibilisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">12</div>
                <div className="text-white/70 text-sm">Campagnes actives</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">8</div>
                <div className="text-white/70 text-sm">Cantons couverts</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-green-400/10 rounded-full blur-3xl" />
      </section>

      {/* Active Campaigns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Campagnes en cours
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Participez à nos campagnes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Rejoignez les milliers de citoyens qui s'engagent pour un Woleu plus transparent
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {campaigns.map((campaign, index) => {
              const Icon = campaign.icon;
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all group cursor-pointer overflow-hidden">
                    {/* Campaign Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-lg ${campaign.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge 
                        variant={campaign.status === 'active' ? 'default' : 'secondary'}
                        className="absolute top-3 right-3"
                      >
                        {campaign.status === 'active' ? 'En cours' : 'Terminée'}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {campaign.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progression</span>
                            <span className="font-medium">{campaign.progress}%</span>
                          </div>
                          <Progress value={campaign.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {campaign.participants.toLocaleString()} participants
                          </span>
                          <Button variant="ghost" size="sm" className="text-green-600 group/btn">
                            Participer
                            <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Agenda
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Événements à venir
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer overflow-hidden group">
                  {/* Event Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-green-600 text-white">
                      <span className="text-lg font-bold leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-[10px] uppercase">
                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </span>
                    </div>
                    <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{event.title}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-400 text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              Ressources
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Outils et documents
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Téléchargez nos ressources pour mieux comprendre le fonctionnement du département
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all group cursor-pointer border-dashed hover:border-solid">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                        <Icon className="h-8 w-8 text-muted-foreground group-hover:text-green-600 transition-colors" />
                      </div>
                      <Badge variant="secondary" className="mb-3">{resource.type}</Badge>
                      <h3 className="font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {resource.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </CardContent>
                  </Card>
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
            <Heart className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
              Devenez ambassadeur
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Aidez-nous à diffuser le message de la transparence et de la participation 
              citoyenne dans votre communauté
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold">
                Devenir ambassadeur
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
