import { motion } from "framer-motion";
import { 
  Users, 
  Wallet, 
  Shield, 
  UserCog, 
  Building2, 
  Globe,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";

const quickLinks = [
  {
    icon: Users,
    title: "Gestion du Conseil",
    description: "Conseillers, sessions et délibérations",
    color: "bg-primary/10 text-primary",
    href: "/conseil"
  },
  {
    icon: Wallet,
    title: "Budget & Finances",
    description: "Élaboration et exécution budgétaire",
    color: "bg-success/10 text-success",
    href: "/budget"
  },
  {
    icon: Shield,
    title: "Tutelle & Conformité",
    description: "Contrôle de légalité et transmission",
    color: "bg-info/10 text-info",
    href: "/tutelle"
  },
  {
    icon: UserCog,
    title: "Ressources Humaines",
    description: "Personnel, paie et état civil",
    color: "bg-accent/10 text-accent",
    href: "/rh"
  },
  {
    icon: Building2,
    title: "Patrimoine & Projets",
    description: "Inventaire et investissements",
    color: "bg-warning/10 text-warning",
    href: "/patrimoine"
  },
  {
    icon: Globe,
    title: "Portail Citoyen",
    description: "Transparence et e-services",
    color: "bg-secondary/10 text-secondary",
    href: "/citoyen"
  },
];

const QuickLinksSection = () => {
  return (
    <section className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Accès Rapide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Modules de Gestion
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six modules intégrés pour une gestion complète et harmonisée des conseils départementaux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 bg-card">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${link.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <link.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 shrink-0" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
