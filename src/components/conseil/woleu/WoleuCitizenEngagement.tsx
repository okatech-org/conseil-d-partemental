import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, ArrowRight, CheckCircle2, Send, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import cercleCitoyenImg from '@/assets/woleu/cercle-citoyen.jpg';
import cercleKye from '@/assets/woleu/cercle-kye.jpg';
import cercleMitzic from '@/assets/woleu/cercle-mitzic.jpg';
import cercleOyem from '@/assets/woleu/cercle-oyem.jpg';
import cercleMinvoul from '@/assets/woleu/cercle-minvoul.jpg';

const circles = [
  { 
    name: "Cercle Canton Kyé", 
    members: 45, 
    nextMeeting: "25 Jan 2025",
    image: cercleKye,
    status: "Actif"
  },
  { 
    name: "Cercle Canton Mitzic", 
    members: 62, 
    nextMeeting: "28 Jan 2025",
    image: cercleMitzic,
    status: "Actif"
  },
  { 
    name: "Cercle Canton Oyem", 
    members: 89, 
    nextMeeting: "30 Jan 2025",
    image: cercleOyem,
    status: "Populaire"
  },
  { 
    name: "Cercle Canton Minvoul", 
    members: 34, 
    nextMeeting: "1 Fév 2025",
    image: cercleMinvoul,
    status: "Nouveau"
  }
];

const benefits = [
  { text: "Participer aux décisions locales", icon: "🗳️" },
  { text: "Proposer des projets pour votre canton", icon: "💡" },
  { text: "Suivre l'avancement des travaux", icon: "📊" },
  { text: "Rencontrer vos élus", icon: "🤝" }
];

export const WoleuCitizenEngagement: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Veuillez entrer votre adresse email");
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail('');
    toast.success("Inscription réussie ! Vous recevrez bientôt des informations sur les Cercles Citoyens.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Populaire": return "bg-amber-500 text-white";
      case "Nouveau": return "bg-green-500 text-white";
      default: return "bg-white/20 text-white";
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={cercleCitoyenImg} 
          alt="Cercle citoyen" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-emerald-800/90 to-emerald-900/95" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Users className="w-4 h-4" />
            Démocratie participative
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
            Votre voix compte :<br />
            <span className="text-amber-400">Les Cercles Citoyens</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            La politique se fait désormais avec vous. Rejoignez les assemblées locales 
            pour décider des projets de votre canton.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Benefits & Signup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Benefits cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all group">
                    <CardContent className="p-4 text-center">
                      <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">{benefit.icon}</span>
                      <span className="text-sm text-white/90">{benefit.text}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Signup card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-amber-500/30 to-amber-600/20 border-amber-400/40 backdrop-blur-md shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="font-semibold text-lg text-white">Rejoindre un Cercle</h3>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Inscrivez-vous pour recevoir les informations sur les prochaines réunions citoyennes.
                  </p>
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <Input
                      type="email"
                      placeholder="Votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white/15 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-amber-400 focus-visible:border-amber-400"
                    />
                    <Button 
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-emerald-900 font-semibold shadow-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="animate-spin">⏳</span>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Rejoindre
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right side - Circles with images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Cercles actifs dans le Woleu
              </h3>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                4 cercles actifs
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {circles.map((circle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group h-full">
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={circle.image} 
                        alt={circle.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <Badge className={`absolute top-2 right-2 text-xs ${getStatusColor(circle.status)}`}>
                        {circle.status}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-white text-sm mb-2 line-clamp-1">{circle.name}</h4>
                      <div className="space-y-1 text-xs text-white/70">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {circle.members} membres
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {circle.nextMeeting}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 backdrop-blur-sm mt-4"
            >
              Voir tous les cercles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
