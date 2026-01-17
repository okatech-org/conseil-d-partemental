import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MonitorPlay, Play, ChevronRight, Users, FileText, HelpCircle, 
  ToggleLeft, ToggleRight, Crown, Building2, Briefcase, UserCheck,
  Landmark, Shield, Wallet, Users2, HardHat, Scale, TreeDeciduous,
  GraduationCap, Heart, Truck, MapPin, X, Check, Mail, Lock
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { InstitutionSubHeader } from "@/components/layout/InstitutionSubHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

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

// Profils d'accès pour les acteurs du conseil départemental
const accessProfiles = [
  {
    id: "executif",
    title: "Exécutif Départemental",
    subtitle: "Direction du Conseil Départemental",
    icon: Crown,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    accounts: [
      { role: "Président du Conseil", email: "president@demo.conseil.ga", permissions: ["Toutes"] },
      { role: "Vice-président Finances", email: "vp.finances@demo.conseil.ga", permissions: ["Budget", "Marchés"] },
      { role: "Vice-président Social", email: "vp.social@demo.conseil.ga", permissions: ["Action Sociale", "Solidarité"] },
    ],
    module: "Gestion du Conseil",
    moduleIcon: Landmark,
  },
  {
    id: "conseillers",
    title: "Conseillers Départementaux",
    subtitle: "Élus du Département",
    icon: Users2,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    accounts: [
      { role: "Conseiller - Commission Finances", email: "conseiller.finances@demo.conseil.ga", permissions: ["Budget", "Délibérations"] },
      { role: "Conseiller - Commission Routes", email: "conseiller.routes@demo.conseil.ga", permissions: ["Voirie", "Aménagement"] },
      { role: "Conseiller - Commission Social", email: "conseiller.social@demo.conseil.ga", permissions: ["Solidarité", "PMI"] },
    ],
    module: "Gestion du Conseil",
    moduleIcon: Landmark,
  },
  {
    id: "secretariat",
    title: "Secrétariat Général",
    subtitle: "Administration centrale",
    icon: Building2,
    color: "from-slate-500 to-gray-700",
    bgColor: "bg-slate-50 dark:bg-slate-950/20",
    borderColor: "border-slate-200 dark:border-slate-800",
    accounts: [
      { role: "Secrétaire Général", email: "sg@demo.conseil.ga", permissions: ["Administration", "RH", "Budget"] },
      { role: "Directeur Juridique", email: "dir.juridique@demo.conseil.ga", permissions: ["Conformité", "Marchés"] },
      { role: "Chef de Cabinet", email: "cabinet@demo.conseil.ga", permissions: ["Communication", "Agenda"] },
    ],
    module: "Tutelle & Conformité",
    moduleIcon: Shield,
  },
  {
    id: "finances",
    title: "Direction des Finances",
    subtitle: "Budget & Comptabilité",
    icon: Wallet,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    accounts: [
      { role: "Directeur Financier", email: "dir.finances@demo.conseil.ga", permissions: ["Budget", "Comptabilité"] },
      { role: "Responsable Budget", email: "resp.budget@demo.conseil.ga", permissions: ["Prévisions", "Suivi"] },
      { role: "Contrôleur de Gestion", email: "controleur@demo.conseil.ga", permissions: ["Audit", "Reporting"] },
    ],
    module: "Budget & Finances",
    moduleIcon: Wallet,
  },
  {
    id: "rh",
    title: "Ressources Humaines",
    subtitle: "Gestion du Personnel",
    icon: UserCheck,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    borderColor: "border-rose-200 dark:border-rose-800",
    accounts: [
      { role: "DRH", email: "drh@demo.conseil.ga", permissions: ["Personnel", "Paie", "Formation"] },
      { role: "Responsable Recrutement", email: "recrutement@demo.conseil.ga", permissions: ["Recrutement", "Concours"] },
      { role: "Gestionnaire Carrières", email: "carrieres@demo.conseil.ga", permissions: ["Avancement", "Mutations"] },
    ],
    module: "Ressources Humaines",
    moduleIcon: Users,
  },
  {
    id: "directions",
    title: "Directions Sectorielles",
    subtitle: "Services opérationnels",
    icon: Briefcase,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    borderColor: "border-violet-200 dark:border-violet-800",
    accounts: [
      { role: "Dir. Urbanisme & Cadastre", email: "dir.urbanisme@demo.conseil.ga", permissions: ["Aménagement", "Permis"], domain: "Aménagement" },
      { role: "Dir. Action Sociale", email: "dir.social@demo.conseil.ga", permissions: ["RSA", "Handicap", "PA"], domain: "Social" },
      { role: "Dir. Éducation", email: "dir.education@demo.conseil.ga", permissions: ["Collèges", "Transport scolaire"], domain: "Éducation" },
      { role: "Dir. Routes", email: "dir.routes@demo.conseil.ga", permissions: ["Voirie", "Entretien"], domain: "Infrastructure" },
    ],
    module: "Patrimoine & Projets",
    moduleIcon: MapPin,
  },
  {
    id: "terrain",
    title: "Agents de Terrain",
    subtitle: "Services techniques",
    icon: HardHat,
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    accounts: [
      { role: "Agent Routes Secteur Nord", email: "agent.routes.nord@demo.conseil.ga", permissions: ["Interventions", "Signalements"] },
      { role: "Agent Bâtiments", email: "agent.batiments@demo.conseil.ga", permissions: ["Maintenance", "Travaux"] },
      { role: "Agent Espaces Verts", email: "agent.espaces@demo.conseil.ga", permissions: ["Entretien", "Plantations"] },
    ],
    module: "Patrimoine & Projets",
    moduleIcon: MapPin,
  },
  {
    id: "commissions",
    title: "Commissions & Comités",
    subtitle: "Instances délibératives",
    icon: Scale,
    color: "from-cyan-500 to-sky-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    accounts: [
      { role: "Président Commission Finances", email: "president.commission.finances@demo.conseil.ga", permissions: ["Délibérations Finances"] },
      { role: "Président Commission Social", email: "president.commission.social@demo.conseil.ga", permissions: ["Délibérations Social"] },
      { role: "Président Commission Environnement", email: "president.commission.env@demo.conseil.ga", permissions: ["Délibérations Environnement"] },
    ],
    module: "Gestion du Conseil",
    moduleIcon: Landmark,
  },
  {
    id: "citoyen",
    title: "Portail Citoyen",
    subtitle: "Accès public",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    accounts: [
      { role: "Citoyen", email: "citoyen@demo.conseil.ga", permissions: ["Consultation", "Demandes d'aides"] },
      { role: "Association", email: "association@demo.conseil.ga", permissions: ["Subventions", "Réservations"] },
      { role: "Entreprise", email: "entreprise@demo.conseil.ga", permissions: ["Marchés publics", "Appels d'offres"] },
    ],
    module: "Portail Citoyen",
    moduleIcon: Heart,
  },
];

// Modules avec leurs icônes et couleurs
const modulesList = [
  { name: "Gestion du Conseil", icon: Landmark, color: "text-amber-600 dark:text-amber-400" },
  { name: "Budget & Finances", icon: Wallet, color: "text-emerald-600 dark:text-emerald-400" },
  { name: "Tutelle & Conformité", icon: Shield, color: "text-slate-600 dark:text-slate-400" },
  { name: "Ressources Humaines", icon: Users, color: "text-rose-600 dark:text-rose-400" },
  { name: "Patrimoine & Projets", icon: MapPin, color: "text-violet-600 dark:text-violet-400" },
  { name: "Portail Citoyen", icon: Heart, color: "text-red-600 dark:text-red-400" },
];

interface SelectedAccount {
  profile: typeof accessProfiles[0];
  account: typeof accessProfiles[0]["accounts"][0];
}

export const DemoPublicPage = () => {
  const [demoMode, setDemoMode] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [features, setFeatures] = useState(sandboxFeatures);
  const [selectedAccount, setSelectedAccount] = useState<SelectedAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const handleAccountSelect = (profile: typeof accessProfiles[0], account: typeof accessProfiles[0]["accounts"][0]) => {
    setSelectedAccount({ profile, account });
  };

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setSelectedAccount(null);
      navigate("/dashboard");
    }, 1500);
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

        {/* Quick Access Modules */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-6">Accès aux Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modulesList.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group text-center p-4">
                  <module.icon className={`h-8 w-8 mx-auto mb-3 ${module.color} group-hover:scale-110 transition-transform`} />
                  <p className="font-medium text-sm">{module.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Access Profiles Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-serif">Comptes d'accès démo</h2>
              <p className="text-muted-foreground mt-1">
                Sélectionnez un profil pour accéder à la plateforme avec des permissions prédéfinies
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              {accessProfiles.reduce((acc, p) => acc + p.accounts.length, 0)} comptes disponibles
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`h-full ${profile.bgColor} ${profile.borderColor} border-2 hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-lg`}>
                        <profile.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs flex items-center gap-1">
                        <profile.moduleIcon className="h-3 w-3" />
                        {profile.module}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3">{profile.title}</CardTitle>
                    <CardDescription>{profile.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Separator className="mb-4" />
                    <div className="space-y-2">
                      {profile.accounts.map((account, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAccountSelect(profile, account)}
                          className="w-full text-left p-3 rounded-lg bg-background/60 hover:bg-background border border-border/50 hover:border-primary/50 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                {account.role}
                              </p>
                              <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {account.email}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

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

      {/* Connection Confirmation Modal */}
      <AnimatePresence>
        {selectedAccount && (
          <Dialog open={!!selectedAccount} onOpenChange={() => setSelectedAccount(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedAccount.profile.color} flex items-center justify-center`}>
                    <selectedAccount.profile.icon className="h-5 w-5 text-white" />
                  </div>
                  Connexion Démo
                </DialogTitle>
                <DialogDescription>
                  Vous allez accéder à la plateforme avec le profil sélectionné
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Profile Info */}
                <div className={`p-4 rounded-lg ${selectedAccount.profile.bgColor} ${selectedAccount.profile.borderColor} border`}>
                  <div className="flex items-center gap-3 mb-3">
                    <selectedAccount.profile.moduleIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{selectedAccount.profile.module}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Profil:</span>
                      <span className="font-medium text-sm">{selectedAccount.account.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Email:</span>
                      <span className="font-mono text-sm text-primary">{selectedAccount.account.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mot de passe:</span>
                      <span className="font-mono text-sm">••••••••</span>
                      <Badge variant="outline" className="text-xs">demo</Badge>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Permissions accordées:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAccount.account.permissions.map((perm, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedAccount(null)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                  <Button
                    className={`flex-1 bg-gradient-to-r ${selectedAccount.profile.color} text-white hover:opacity-90`}
                    onClick={handleConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Connexion...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Se connecter
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
};
