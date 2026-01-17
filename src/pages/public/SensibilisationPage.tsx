import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Download, Users, MapPin, ThumbsUp, Calendar, ArrowRight, FileText, Loader2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { InstitutionSubHeader } from "@/components/layout/InstitutionSubHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const campaigns = [
  {
    id: 1,
    title: "Solidarité Seniors",
    description: "Programme d'accompagnement et de lutte contre l'isolement des personnes âgées dans nos cantons.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    status: "active",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
  },
  {
    id: 2,
    title: "Mobilité Durable",
    description: "Promotion des transports en commun et du covoiturage pour réduire notre empreinte carbone.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    status: "active",
    startDate: "2026-02-01",
    endDate: "2026-12-31",
  },
  {
    id: 3,
    title: "Collèges Numériques",
    description: "Équipement des collégiens en outils numériques et formation aux bonnes pratiques digitales.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    status: "upcoming",
    startDate: "2026-03-15",
    endDate: "2026-09-15",
  },
  {
    id: 4,
    title: "Biodiversité en Danger",
    description: "Sensibilisation à la protection des espèces menacées sur notre territoire départemental.",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80",
    status: "active",
    startDate: "2025-09-01",
    endDate: "2026-08-31",
  },
];

const stats = [
  { value: "125 000", label: "Citoyens sensibilisés", icon: Users },
  { value: "340", label: "Ateliers organisés", icon: Calendar },
  { value: "47", label: "Cantons couverts", icon: MapPin },
  { value: "94%", label: "Taux satisfaction", icon: ThumbsUp },
];

const guides = [
  {
    id: 1,
    title: "Guide des aides sociales",
    description: "Toutes les aides disponibles pour les familles, seniors et personnes en situation de handicap.",
    icon: FileText,
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Kit éco-gestes",
    description: "50 gestes simples pour réduire votre impact environnemental au quotidien.",
    icon: FileText,
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Guide du transport scolaire",
    description: "Tout savoir sur les inscriptions, horaires et tarifs du transport scolaire départemental.",
    icon: FileText,
    size: "980 KB",
  },
  {
    id: 4,
    title: "Livret du citoyen",
    description: "Comprendre le fonctionnement du Conseil Départemental et vos droits.",
    icon: FileText,
    size: "3.1 MB",
  },
  {
    id: 5,
    title: "Guide des collèges",
    description: "Présentation des établissements, options et projets pédagogiques.",
    icon: FileText,
    size: "4.2 MB",
  },
  {
    id: 6,
    title: "Annuaire des services sociaux",
    description: "Coordonnées et horaires de tous les services d'action sociale du territoire.",
    icon: FileText,
    size: "1.5 MB",
  },
];

export const SensibilisationPage = () => {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 2000);
  };

  return (
    <PublicLayout>
      <InstitutionSubHeader 
        icon={Lightbulb}
        title="Sensibilisation"
        description="Découvrez nos campagnes de sensibilisation et ressources pour les citoyens"
      />

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="campaigns" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-12">
            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <stat.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </motion.div>

            {/* Campaigns Grid */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6">Campagnes actives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={campaign.image} 
                          alt={campaign.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge 
                          className={`absolute top-4 right-4 ${
                            campaign.status === 'active' 
                              ? 'bg-success text-success-foreground' 
                              : 'bg-warning text-warning-foreground'
                          }`}
                        >
                          {campaign.status === 'active' ? 'En cours' : 'À venir'}
                        </Badge>
                      </div>
                      <CardHeader className="flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {campaign.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {campaign.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(campaign.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                            {' - '}
                            {new Date(campaign.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                          </div>
                          <Button size="sm" className="group/btn">
                            Participer
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6">Guides téléchargeables</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col">
                      <CardHeader className="flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <guide.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{guide.size}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(guide.id)}
                            disabled={downloadingId === guide.id}
                          >
                            {downloadingId === guide.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Téléchargement...
                              </>
                            ) : (
                              <>
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PublicLayout>
  );
};
