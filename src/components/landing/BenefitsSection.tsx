import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  DollarSign, 
  Eye, 
  Users
} from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: TrendingUp,
    title: "Efficience Accrue",
    description: "Réduction de 80% des délais administratifs grâce à l'automatisation des processus",
    stat: "80%",
    statLabel: "Gain de temps",
    color: "from-success/20 to-success/5",
    iconColor: "text-success"
  },
  {
    icon: Clock,
    title: "Temps Réel",
    description: "Suivi instantané de l'exécution budgétaire et de la conformité des 47 départements",
    stat: "24/7",
    statLabel: "Monitoring",
    color: "from-info/20 to-info/5",
    iconColor: "text-info"
  },
  {
    icon: Shield,
    title: "Conformité Garantie",
    description: "Respect automatique de la loi organique n°001/2014 sur la décentralisation",
    stat: "100%",
    statLabel: "Conformité",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Économies",
    description: "Mutualisation des coûts d'infrastructure entre les 47 conseils départementaux",
    stat: "60%",
    statLabel: "Économies",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary"
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Accès citoyen complet aux délibérations, budgets et projets d'investissement",
    stat: "2.5M",
    statLabel: "Citoyens",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Coordination facilitée entre départements, provinces et tutelle nationale",
    stat: "47",
    statLabel: "Conseils",
    color: "from-warning/20 to-warning/5",
    iconColor: "text-warning"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Avantages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi Choisir Notre Plateforme ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une solution complète conçue spécifiquement pour les besoins des collectivités territoriales gabonaises
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden p-6 h-full bg-gradient-to-br ${benefit.color} border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                {/* Background stat */}
                <div className="absolute -right-4 -bottom-4 text-7xl font-bold opacity-10 text-foreground select-none">
                  {benefit.stat}
                </div>

                <div className={`w-14 h-14 rounded-xl bg-card flex items-center justify-center mb-4 shadow-md`}>
                  <benefit.icon className={`h-7 w-7 ${benefit.iconColor}`} />
                </div>

                <h3 className="font-bold text-xl text-foreground mb-2">
                  {benefit.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {benefit.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${benefit.iconColor}`}>
                    {benefit.stat}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {benefit.statLabel}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
