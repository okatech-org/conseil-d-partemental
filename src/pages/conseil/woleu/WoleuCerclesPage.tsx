import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, MapPin, Calendar, ArrowRight, CheckCircle2, 
  MessageSquare, Vote, FileText, Clock, Star, Send,
  Heart, Lightbulb, HandHeart, Target
} from 'lucide-react';
import { toast } from 'sonner';
import cercleCitoyenImg from '@/assets/woleu/cercle-citoyen.jpg';

const circles = [
  {
    id: 1,
    name: "Cercle Citoyen d'Oyem",
    canton: "Canton Oyem",
    members: 156,
    nextMeeting: "2025-02-05",
    meetingTime: "10:00",
    location: "Mairie d'Oyem",
    status: "active",
    topics: ["Budget 2025", "Route principale", "Centre de santé"]
  },
  {
    id: 2,
    name: "Cercle Citoyen de Mitzic",
    canton: "Canton Mitzic",
    members: 89,
    nextMeeting: "2025-02-08",
    meetingTime: "14:00",
    location: "Maison communautaire",
    status: "active",
    topics: ["École primaire", "Eau potable", "Électrification"]
  },
  {
    id: 3,
    name: "Cercle Citoyen de Bitam",
    canton: "Canton Bitam",
    members: 112,
    nextMeeting: "2025-02-10",
    meetingTime: "09:00",
    location: "Salle des fêtes",
    status: "active",
    topics: ["Marché local", "Assainissement", "Sport jeunesse"]
  },
  {
    id: 4,
    name: "Cercle Citoyen de Kyé",
    canton: "Canton Kyé",
    members: 67,
    nextMeeting: "2025-02-12",
    meetingTime: "11:00",
    location: "Sous le manguier central",
    status: "active",
    topics: ["Pistes rurales", "Agriculture", "Santé mobile"]
  },
  {
    id: 5,
    name: "Cercle Citoyen de Minvoul",
    canton: "Canton Minvoul",
    members: 45,
    nextMeeting: "2025-02-15",
    meetingTime: "10:00",
    location: "École communale",
    status: "formation",
    topics: ["Organisation", "Priorités locales"]
  },
  {
    id: 6,
    name: "Cercle Citoyen de Médouneu",
    canton: "Canton Médouneu",
    members: 38,
    nextMeeting: "2025-02-18",
    meetingTime: "14:00",
    location: "Centre polyvalent",
    status: "formation",
    topics: ["Lancement", "Besoins urgents"]
  }
];

const principles = [
  {
    icon: Users,
    title: "Inclusion",
    description: "Chaque citoyen a sa place, quelle que soit son origine, son âge ou son statut social."
  },
  {
    icon: MessageSquare,
    title: "Dialogue",
    description: "Les décisions se prennent par le débat constructif et le consensus."
  },
  {
    icon: Vote,
    title: "Démocratie",
    description: "Un citoyen, une voix. Les votes sont transparents et respectés."
  },
  {
    icon: FileText,
    title: "Traçabilité",
    description: "Chaque proposition et décision est documentée et publiée."
  }
];

const activities = [
  {
    title: "Assemblées mensuelles",
    description: "Réunions ouvertes à tous pour discuter des priorités locales",
    icon: Calendar
  },
  {
    title: "Consultations sur les projets",
    description: "Donnez votre avis avant le lancement de tout projet majeur",
    icon: Lightbulb
  },
  {
    title: "Suivi des travaux",
    description: "Comités citoyens de surveillance des chantiers",
    icon: Target
  },
  {
    title: "Médiation locale",
    description: "Résolution des conflits et problèmes communautaires",
    icon: HandHeart
  }
];

export const WoleuCerclesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    canton: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.canton) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', canton: '', motivation: '' });
    toast.success("Votre demande a été envoyée ! Nous vous contacterons bientôt.");
  };

  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader />
      
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={cercleCitoyenImg} 
            alt="Cercle citoyen sous l'arbre" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cercles-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cercles-grid)" className="text-white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Users className="w-3 h-3 mr-1" />
              Démocratie participative
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
              Les <span className="text-amber-400">Cercles Citoyens</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              La politique se fait désormais avec vous. Rejoignez les assemblées locales 
              pour décider des projets de votre canton.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">6</div>
                <div className="text-white/70 text-sm">Cercles actifs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">507</div>
                <div className="text-white/70 text-sm">Membres inscrits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">24</div>
                <div className="text-white/70 text-sm">Réunions tenues</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">15</div>
                <div className="text-white/70 text-sm">Projets proposés</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
      </section>

      {/* Principles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Nos principes fondateurs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Les Cercles Citoyens fonctionnent selon des règles claires et équitables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Circles List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              Cercles par canton
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Trouvez votre Cercle
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Chaque canton dispose de son propre Cercle Citoyen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {circles.map((circle, index) => (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{circle.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {circle.canton}
                        </CardDescription>
                      </div>
                      <Badge variant={circle.status === 'active' ? 'default' : 'secondary'}>
                        {circle.status === 'active' ? 'Actif' : 'En formation'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {circle.members} membres
                        </span>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          Prochaine réunion
                        </div>
                        <div className="text-sm">
                          <div>{new Date(circle.nextMeeting).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {circle.meetingTime} - {circle.location}
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Sujets à l'ordre du jour :</p>
                        <div className="flex flex-wrap gap-1">
                          {circle.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:shadow-md transition-all">
                        Rejoindre ce cercle
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Activités
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Ce que font les Cercles
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-t-4 border-t-amber-500">
                    <CardContent className="p-6">
                      <Icon className="w-10 h-10 text-amber-500 mb-4" />
                      <h3 className="font-semibold mb-2">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Rejoignez un Cercle Citoyen</CardTitle>
                  <CardDescription className="text-base">
                    Inscrivez-vous pour participer aux assemblées et contribuer 
                    au développement de votre canton
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Nom complet *</label>
                        <Input
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Téléphone</label>
                        <Input
                          placeholder="+241 XX XX XX XX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Canton *</label>
                        <Input
                          placeholder="Votre canton de résidence"
                          value={formData.canton}
                          onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Motivation (optionnel)</label>
                      <Textarea
                        placeholder="Pourquoi souhaitez-vous rejoindre un Cercle Citoyen ?"
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </span>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer ma demande
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
