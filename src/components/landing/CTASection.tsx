import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const benefits = [
    "Déploiement en moins de 30 jours",
    "Formation complète des équipes",
    "Support 24/7 en français",
    "Migration des données existantes"
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Prêt à Moderniser ?</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Digitalisez Votre
              <br />
              <span className="text-secondary">Conseil Départemental</span>
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-lg">
              Rejoignez les départements qui ont déjà fait le choix de la modernisation 
              et de la conformité avec notre plateforme SaaS.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-secondary" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold group"
              >
                Demander une Démo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Phone className="mr-2 h-4 w-4" />
                Nous Contacter
              </Button>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Abstract shapes */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-72 h-72 border-2 border-dashed border-white/20 rounded-full mx-auto"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-white/10 rounded-full"
              />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary">47</div>
                  <div className="text-sm text-white/80">Conseils</div>
                </div>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-8 h-8 bg-secondary rounded-full shadow-gold" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
              >
                <div className="w-6 h-6 bg-accent rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
