import { motion } from "framer-motion";
import { Star, Quote, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Cette plateforme a révolutionné notre gestion budgétaire. Nous respectons désormais 100% des délais de transmission à la tutelle.",
    author: "Jean-Pierre Nzamba",
    role: "Président du Conseil Départemental",
    department: "Mpassa",
    province: "Haut-Ogooué",
    rating: 5,
    avatar: "JN"
  },
  {
    quote: "Le suivi en temps réel de l'exécution budgétaire nous permet de prendre des décisions éclairées. Un outil indispensable pour la modernisation.",
    author: "Marie-Claire Obiang",
    role: "Secrétaire Générale",
    department: "Libreville",
    province: "Estuaire",
    rating: 5,
    avatar: "MO"
  },
  {
    quote: "La consolidation provinciale me donne une vue d'ensemble de mes 7 départements. Le contrôle de légalité est devenu beaucoup plus efficace.",
    author: "François Essono",
    role: "Gouverneur",
    department: "",
    province: "Woleu-Ntem",
    rating: 5,
    avatar: "FE"
  },
  {
    quote: "Les citoyens peuvent maintenant demander leurs extraits d'état civil en ligne. C'est une avancée majeure pour le service public.",
    author: "Pauline Mboumba",
    role: "Directrice État Civil",
    department: "Port-Gentil",
    province: "Ogooué-Maritime",
    rating: 5,
    avatar: "PM"
  }
];

const partners = [
  "Ministère de l'Intérieur",
  "Direction Générale de la Décentralisation",
  "Cour des Comptes",
  "CNSS Gabon",
  "CNAMGS"
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Quote className="h-4 w-4" />
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ils Utilisent Notre Plateforme
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les retours d'expérience des responsables de collectivités à travers le Gabon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full border-border/50 bg-card hover:shadow-lg transition-all duration-300">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-0.5">
                      <Building2 className="h-3 w-3" />
                      {testimonial.department ? `${testimonial.department}, ` : ''}{testimonial.province}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">En partenariat avec</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-3 bg-muted/50 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
