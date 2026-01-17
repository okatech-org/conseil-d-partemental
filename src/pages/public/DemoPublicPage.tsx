import { useState } from "react";
import { motion } from "framer-motion";
import { MonitorPlay, Play, Pause, SkipForward, ChevronRight, Users, FileText, HelpCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { InstitutionSubHeader } from "@/components/layout/InstitutionSubHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const scenarios = [
  {
    id: 1,
    title: "Suivre une délibération",
    description: "Apprenez à consulter l'avancement d'une délibération en temps réel.",
    duration: "5 min",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Consulter les élus",
    description: "Trouvez votre conseiller départemental et ses coordonnées.",
    duration: "3 min",
    icon: Users,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Accéder aux aides",
    description: "Découvrez les aides sociales et comment en faire la demande.",
    duration: "7 min",
    icon: HelpCircle,
    color: "bg-purple-500",
  },
];

const videos = [
  {
    id: 1,
    title: "Présentation générale de la plateforme",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
    duration: "4:32",
  },
  {
    id: 2,
    title: "Naviguer dans l'espace citoyen",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    duration: "3:15",
  },
  {
    id: 3,
    title: "Comprendre les délibérations",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    duration: "5:48",
  },
];

const sandboxFeatures = [
  { id: "search", label: "Recherche avancée", enabled: true },
  { id: "filters", label: "Filtres par commission", enabled: true },
  { id: "notifications", label: "Alertes personnalisées", enabled: false },
  { id: "bookmarks", label: "Favoris et signets", enabled: true },
];

export const DemoPublicPage = () => {
  const [demoMode, setDemoMode] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [features, setFeatures] = useState(sandboxFeatures);

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ));
  };

  return (
    <PublicLayout>
      <InstitutionSubHeader 
        icon={MonitorPlay}
        title="Démonstration"
        description="Explorez les fonctionnalités de la plateforme en mode démonstration"
      />

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Demo Mode Toggle */}
        <Card className="border-2 border-dashed border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {demoMode ? (
                  <ToggleRight className="h-8 w-8 text-primary" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                )}
                <div>
                  <CardTitle>Mode Démonstration</CardTitle>
                  <CardDescription>
                    Activez le mode démo pour explorer la plateforme avec des données fictives
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="demo-mode">
                  {demoMode ? "Activé" : "Désactivé"}
                </Label>
                <Switch
                  id="demo-mode"
                  checked={demoMode}
                  onCheckedChange={setDemoMode}
                />
              </div>
            </div>
          </CardHeader>
          {demoMode && (
            <CardContent>
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <p className="text-success font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Mode démonstration actif - Les données affichées sont fictives
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Guided Scenarios */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-6">Scénarios guidés</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${scenario.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <scenario.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {scenario.title}
                    </CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{scenario.duration}</Badge>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Commencer
                        <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-6">Vidéos de présentation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Video Player */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-black">
                <img 
                  src={videos[activeVideo ?? 0].thumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-primary"
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                  <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-white rounded-full" />
                  </div>
                  <span className="text-white text-sm">
                    {videos[activeVideo ?? 0].duration}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{videos[activeVideo ?? 0].title}</CardTitle>
              </CardHeader>
            </Card>

            {/* Playlist */}
            <div className="space-y-3">
              {videos.map((video, index) => (
                <Card 
                  key={video.id}
                  className={`cursor-pointer transition-all ${
                    activeVideo === index 
                      ? 'ring-2 ring-primary' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveVideo(index)}
                >
                  <div className="flex gap-4 p-3">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-clamp-2">{video.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {video.duration}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Sandbox */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-6">Sandbox interactif</h2>
          <Card>
            <CardHeader>
              <CardTitle>Testez les fonctionnalités</CardTitle>
              <CardDescription>
                Activez ou désactivez les fonctionnalités pour personnaliser votre expérience de démonstration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div 
                    key={feature.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <Label htmlFor={feature.id} className="cursor-pointer">
                      {feature.label}
                    </Label>
                    <Switch
                      id={feature.id}
                      checked={feature.enabled}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-6 border-2 border-dashed border-border rounded-lg bg-muted/30 text-center">
                <p className="text-muted-foreground mb-4">
                  Zone de test interactive
                </p>
                <Button>
                  Lancer la démo avec ces paramètres
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};
