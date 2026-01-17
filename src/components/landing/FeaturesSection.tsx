import { motion } from "framer-motion";
import { 
  Vote, 
  FileText, 
  PieChart, 
  Clock, 
  Bell, 
  Fingerprint,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Vote,
    title: "Vote Électronique Sécurisé",
    description: "Système de vote conforme à l'Article 68 avec audit trail complet, gestion des mandats et voix prépondérante du président.",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=80",
    color: "bg-primary"
  },
  {
    icon: FileText,
    title: "Génération Automatique des PV",
    description: "Procès-verbaux conformes à l'Article 72 avec signature électronique et publication automatique sous 8 jours.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    color: "bg-accent"
  },
  {
    icon: PieChart,
    title: "Tableaux de Bord en Temps Réel",
    description: "Suivi de l'exécution budgétaire, alertes automatiques et consolidation provinciale pour les gouverneurs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "bg-info"
  },
  {
    icon: Clock,
    title: "Transmission Instantanée",
    description: "Envoi automatique des actes à la tutelle sous 8 jours avec récépissé électronique instantané.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    color: "bg-secondary"
  },
  {
    icon: Bell,
    title: "Alertes Multi-Niveaux",
    description: "Notifications intelligentes par email et SMS pour les échéances budgétaires et les sessions obligatoires.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&q=80",
    color: "bg-warning"
  },
  {
    icon: Fingerprint,
    title: "Signature Électronique",
    description: "Signature sécurisée des délibérations, mandats et actes d'état civil avec authentification forte.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    color: "bg-success"
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-secondary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <FileText className="h-4 w-4" />
            Fonctionnalités Clés
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Une Plateforme Complète et Conforme
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chaque fonctionnalité est conçue pour répondre aux exigences de la loi organique n°001/2014 
            sur la décentralisation au Gabon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-border/50 bg-card hover:shadow-2xl transition-all duration-500 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Floating icon */}
                  <div className={`absolute -bottom-6 left-6 w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-8">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="mt-4 p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Découvrir Toutes les Fonctionnalités
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
