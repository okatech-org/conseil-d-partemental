import { motion } from "framer-motion";
import { 
  Check, 
  BarChart3, 
  FileCheck2, 
  Users2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const showcaseSections = [
  {
    badge: { icon: BarChart3, text: "Module Budget" },
    title: "Gestion Budgétaire Automatisée",
    description: "Élaborez, exécutez et suivez les budgets en conformité totale avec les Articles 267 à 277 de la loi organique.",
    features: [
      "Équilibre réel vérifié automatiquement",
      "Règle 60/40 fonctionnement/investissement",
      "Nomenclature budgétaire standardisée",
      "Génération automatique des documents requis"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    stats: [
      { value: "80%", label: "Réduction délais" },
      { value: "100%", label: "Automatisation" }
    ],
    reverse: false
  },
  {
    badge: { icon: FileCheck2, text: "Module Tutelle" },
    title: "Contrôle de Légalité Simplifié",
    description: "Transmettez automatiquement les actes aux gouverneurs avec récépissé instantané et suivi du délai de 15 jours.",
    features: [
      "Transmission sous 8 jours garantie",
      "Récépissé électronique instantané",
      "Chronomètre automatique 15 jours",
      "Tableaux de bord consolidés par province"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    stats: [
      { value: "8j", label: "Délai max" },
      { value: "100%", label: "Traçabilité" }
    ],
    reverse: true
  },
  {
    badge: { icon: Users2, text: "Portail Citoyen" },
    title: "Transparence et E-Services",
    description: "Offrez aux citoyens un accès complet aux délibérations, budgets et services d'état civil en ligne.",
    features: [
      "Open Data budgétaire",
      "Demandes d'extraits en ligne",
      "Référendum d'initiative locale",
      "Application mobile disponible"
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
    stats: [
      { value: "2.5M", label: "Citoyens servis" },
      { value: "24/7", label: "Accessibilité" }
    ],
    reverse: false
  }
];

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {showcaseSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center mb-24 last:mb-0`}
          >
            {/* Content */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <section.badge.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{section.badge.text}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {section.title}
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {section.description}
              </p>

              <ul className="space-y-3">
                {section.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button className="bg-primary hover:bg-primary/90 group">
                Explorer ce Module
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Visual */}
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 hidden lg:block"
              >
                <Card className="p-4 shadow-xl bg-card border-border/50">
                  <div className="flex items-center gap-4">
                    {section.stats.map((stat, index) => (
                      <div key={stat.label} className={index > 0 ? "border-l border-border pl-4" : ""}>
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Decorative badge */}
              {sectionIndex === 0 && (
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-xl p-3 shadow-gold hidden lg:flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">IA Intégrée</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
