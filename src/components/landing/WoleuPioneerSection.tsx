import { motion } from "framer-motion";
import { 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Users, 
  Eye,
  Sparkles,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import woleuPioneerBuilding from "@/assets/landing/woleu-pioneer-building.jpg";

const achievements = [
  { text: "Premier conseil à adopter la plateforme", icon: Trophy },
  { text: "Transparence budgétaire totale", icon: Eye },
  { text: "8 Cercles Citoyens actifs", icon: Users },
  { text: "100% des délibérations numériques", icon: CheckCircle2 },
];

const stats = [
  { value: "2.8", suffix: "Mds", label: "Budget géré" },
  { value: "12", suffix: "", label: "Projets actifs" },
  { value: "230+", suffix: "", label: "Membres engagés" },
  { value: "100%", suffix: "", label: "Transparence" },
];

const WoleuPioneerSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-background to-amber-50/30 dark:from-emerald-950/30 dark:via-background dark:to-amber-950/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Trophy className="h-4 w-4" />
              Premier Conseil Digitalisé
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Le <span className="text-emerald-600 dark:text-emerald-400">Woleu</span> montre la voie
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Le Conseil Départemental du Woleu est le <strong className="text-foreground">premier département du Gabon</strong> à 
              adopter intégralement la plateforme de digitalisation. Un modèle de transparence 
              et de gouvernance moderne pour tout le pays.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-card rounded-xl border shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <achievement.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{achievement.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white group"
                asChild
              >
                <Link to="/conseil/woleu">
                  Découvrir le Portail Woleu
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-emerald-600/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                asChild
              >
                <Link to="/conseil/woleu/transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  Woleu Transparent
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={woleuPioneerBuilding} 
                alt="Conseil Départemental du Woleu"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent" />
              
              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Conseil Départemental du Woleu</h3>
                    <p className="text-white/70 text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Woleu-Ntem • Oyem
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats card floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 hidden lg:block"
            >
              <Card className="p-4 shadow-xl bg-card border-emerald-200 dark:border-emerald-800">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        {stat.value}<span className="text-sm">{stat.suffix}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Pioneer badge floating */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 hidden lg:flex items-center gap-2 bg-amber-500 text-amber-900 rounded-xl px-4 py-3 shadow-lg font-semibold"
            >
              <Sparkles className="h-4 w-4" />
              Pionnier 2025
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WoleuPioneerSection;
