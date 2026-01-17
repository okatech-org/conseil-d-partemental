import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Play, Clock, Star, CheckCircle, BookOpen, Award, ChevronRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { InstitutionSubHeader } from "@/components/layout/InstitutionSubHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const tutorials = [
  {
    id: 1,
    title: "Comprendre le fonctionnement du Département",
    description: "Découvrez le rôle, les compétences et l'organisation du Conseil Départemental.",
    duration: "15 min",
    level: "Débutant",
    rating: 4.8,
    reviews: 234,
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
    completed: true,
  },
  {
    id: 2,
    title: "Le processus d'adoption du budget départemental",
    description: "Suivez les étapes clés de la préparation au vote du budget annuel.",
    duration: "25 min",
    level: "Intermédiaire",
    rating: 4.6,
    reviews: 156,
    progress: 60,
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    completed: false,
  },
  {
    id: 3,
    title: "Les compétences du Département expliquées",
    description: "Action sociale, collèges, routes, environnement... Tout comprendre.",
    duration: "30 min",
    level: "Débutant",
    rating: 4.9,
    reviews: 312,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    completed: false,
  },
  {
    id: 4,
    title: "Participer aux sessions publiques",
    description: "Comment assister aux réunions de l'assemblée départementale.",
    duration: "10 min",
    level: "Débutant",
    rating: 4.7,
    reviews: 89,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&q=80",
    completed: false,
  },
  {
    id: 5,
    title: "Les aides sociales départementales",
    description: "RSA, APA, PCH... Comment bénéficier des aides du Département.",
    duration: "20 min",
    level: "Intermédiaire",
    rating: 4.8,
    reviews: 267,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80",
    completed: false,
  },
  {
    id: 6,
    title: "Le rôle des élus départementaux",
    description: "Comprendre les missions des conseillers départementaux.",
    duration: "12 min",
    level: "Avancé",
    rating: 4.5,
    reviews: 123,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    completed: false,
  },
];

const recommendations = [
  "Les marchés publics expliqués",
  "Le schéma départemental routier",
  "L'organisation des transports scolaires",
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Débutant": return "bg-success text-success-foreground";
    case "Intermédiaire": return "bg-warning text-warning-foreground";
    case "Avancé": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted";
  }
};

export const TutorielsPage = () => {
  const completedCount = tutorials.filter(t => t.completed).length;
  const totalHours = tutorials.reduce((acc, t) => {
    const minutes = parseInt(t.duration);
    return acc + minutes;
  }, 0) / 60;

  return (
    <PublicLayout>
      <InstitutionSubHeader 
        icon={GraduationCap}
        title="Tutoriels"
        description="Apprenez tout sur le fonctionnement de votre Conseil Départemental"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6">Formations disponibles</h2>
              <div className="space-y-4">
                {tutorials.map((tutorial, index) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-32 sm:h-auto flex-shrink-0">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="h-5 w-5 text-primary ml-1" />
                            </div>
                          </div>
                          {tutorial.completed && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="h-6 w-6 text-success fill-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {tutorial.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {tutorial.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-4">
                            <Badge variant="outline" className={getLevelColor(tutorial.level)}>
                              {tutorial.level}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {tutorial.duration}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {tutorial.rating} ({tutorial.reviews})
                            </span>
                          </div>
                          {tutorial.progress > 0 && tutorial.progress < 100 && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Progression</span>
                                <span className="font-medium">{tutorial.progress}%</span>
                              </div>
                              <Progress value={tutorial.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6">Pour aller plus loin</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <Card 
                    key={index} 
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium group-hover:text-primary transition-colors">{rec}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Premium CTA */}
            <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white border-0 overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle className="text-white">Certification Citoyen</CardTitle>
                <CardDescription className="text-white/80">
                  Obtenez votre certificat de connaissance du fonctionnement départemental
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white text-purple-700 hover:bg-white/90">
                  Commencer l'examen
                </Button>
              </CardContent>
            </Card>

            {/* Personal Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Vos statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Heures de formation</span>
                  <span className="font-bold text-lg">{totalHours.toFixed(1)}h</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Tutoriels complétés</span>
                  <span className="font-bold text-lg">{completedCount}/{tutorials.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Certificats obtenus</span>
                  <span className="font-bold text-lg">0</span>
                </div>
                <Progress value={(completedCount / tutorials.length) * 100} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  {completedCount}/{tutorials.length} tutoriels terminés
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
