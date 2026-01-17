import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Wallet, 
  Shield, 
  ArrowRight, 
  Play,
  Sparkles,
  MapPin,
  TrendingUp
} from "lucide-react";

const HeroSection = () => {
  const miniFeatures = [
    { icon: Building2, title: "47 Départements", desc: "Gestion unifiée" },
    { icon: Users, title: "2.5M Citoyens", desc: "Services accessibles" },
    { icon: Wallet, title: "12.8 Mds FCFA", desc: "Budget consolidé" },
    { icon: Shield, title: "100% Conforme", desc: "Loi organique 001/2014" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
      
      <div className="container relative z-10 mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <MapPin className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">République Gabonaise</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-secondary">Conseils</span>
              <br />
              <span className="text-white">Départementaux</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-2 font-light">
              Plateforme nationale de digitalisation
            </p>
            
            <p className="text-base md:text-lg text-white/70 mb-8 max-w-xl">
              Modernisez la gestion des 47 conseils départementaux avec une solution 
              SaaS unifiée, transparente et conforme à la loi organique.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold group"
              >
                Accéder au Tableau de Bord
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Play className="mr-2 h-4 w-4" />
                Voir la Démo
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-white hover:bg-white/10 relative"
              >
                <Sparkles className="mr-2 h-4 w-4 text-secondary animate-pulse" />
                IA Intégrée
              </Button>
            </div>

            {/* Mini features grid */}
            <div className="grid grid-cols-2 gap-3">
              {miniFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300"
                >
                  <feature.icon className="h-5 w-5 text-secondary mb-2" />
                  <h3 className="font-semibold text-sm text-white">{feature.title}</h3>
                  <p className="text-xs text-white/60">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Floating stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Main stat card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Performance Nationale</h3>
                  <p className="text-white/60 text-sm">Temps réel</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/80">Exécution Budgétaire</span>
                    <span className="text-secondary font-semibold">76.8%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "76.8%" }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-secondary to-secondary/70 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/80">Score Conformité</span>
                    <span className="text-accent font-semibold">85%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/80">Sessions Tenues</span>
                    <span className="text-info font-semibold">94%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      className="h-full bg-gradient-to-r from-info to-info/70 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-4 bg-secondary text-secondary-foreground rounded-xl p-4 shadow-gold"
            >
              <div className="text-2xl font-bold">9</div>
              <div className="text-xs">Provinces</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-8 bg-white/90 text-primary rounded-xl p-4 shadow-xl"
            >
              <div className="text-2xl font-bold">47</div>
              <div className="text-xs">Départements</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
