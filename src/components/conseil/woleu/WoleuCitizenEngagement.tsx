import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import cercleCitoyenImg from '@/assets/woleu/cercle-citoyen.jpg';

const circles = [
  { name: "Cercle Canton Kyé", members: 45, nextMeeting: "25 Jan 2025" },
  { name: "Cercle Canton Mitzic", members: 62, nextMeeting: "28 Jan 2025" },
  { name: "Cercle Canton Oyem", members: 89, nextMeeting: "30 Jan 2025" },
  { name: "Cercle Canton Minvoul", members: 34, nextMeeting: "1 Fév 2025" }
];

const benefits = [
  "Participer aux décisions locales",
  "Proposer des projets pour votre canton",
  "Suivre l'avancement des travaux",
  "Rencontrer vos élus"
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail('');
    toast.success("Inscription réussie ! Vous recevrez bientôt des informations sur les Cercles Citoyens.");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={cercleCitoyenImg} 
          alt="Cercle citoyen" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/95 via-green-900/90 to-green-900/95" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Démocratie participative
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              Votre voix compte :<br />
              <span className="text-amber-400">Les Cercles Citoyens</span>
            </h2>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              La politique se fait désormais avec vous. Rejoignez les assemblées locales 
              pour décider des projets de votre canton et participer activement 
              à la transformation du Woleu.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Signup form */}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400"
              />
              <Button 
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold"
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
          </motion.div>

          {/* Right side - Circles list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              Cercles actifs dans le Woleu
            </h3>

            {circles.map((circle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{circle.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-white/70">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {circle.members} membres
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {circle.nextMeeting}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10 mt-4"
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
