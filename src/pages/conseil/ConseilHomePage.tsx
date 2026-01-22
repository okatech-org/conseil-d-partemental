import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Users, Phone, Mail, Globe, 
  Shield, TrendingUp, Wallet, LogIn, UserPlus,
  FileText, Award, ChevronRight, ArrowLeft,
  Clock, AlertCircle, Newspaper, Menu, Sun, Moon,
  PlayCircle, ListChecks, BookOpen, 
  Bell, Video, Home, Map
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getDepartmentById, 
  getProvinceByDepartmentId,
  fundsInfo,
  type DepartmentDetail,
  type ProvinceDetail
} from '@/lib/departments-data';
import { DemoAccessProfiles } from '@/components/demo/DemoAccessProfiles';

// Mock data for news
const mockActualites = [
  { id: 1, title: "Session budgétaire Q1 2026", date: "2026-01-15", category: "Session", excerpt: "Adoption du budget primitif pour l'exercice 2026." },
  { id: 2, title: "Inauguration de la mairie annexe", date: "2026-01-10", category: "Infrastructure", excerpt: "Le président a inauguré la nouvelle mairie annexe." },
  { id: 3, title: "Programme de formation des agents", date: "2026-01-05", category: "Formation", excerpt: "Lancement du programme de renforcement des capacités." },
];

// Mock data for tutorials
const mockTutoriels = [
  { id: 1, title: "Comment accéder au portail citoyen", duration: "5 min", icon: PlayCircle },
  { id: 2, title: "Demander un document administratif", duration: "8 min", icon: FileText },
  { id: 3, title: "Suivre l'état de ma demande", duration: "3 min", icon: ListChecks },
  { id: 4, title: "Consulter les délibérations", duration: "4 min", icon: BookOpen },
];

// Mock data for processes
const mockProcessus = [
  { id: 1, title: "Demande d'extrait de naissance", steps: 4, duration: "24h" },
  { id: 2, title: "Permis de construire", steps: 7, duration: "30 jours" },
  { id: 3, title: "Inscription sur les listes électorales", steps: 3, duration: "48h" },
  { id: 4, title: "Demande d'aide sociale", steps: 5, duration: "15 jours" },
];

// Navigation items matching main landing page
const navItems = [
  { label: "Accueil", value: "accueil", icon: Home },
  { label: "Conseils", href: "/conseils", icon: Map },
  { label: "Actualités", value: "actualites", icon: Newspaper },
  { label: "Sensibilisation", value: "sensibilisation", icon: Bell },
  { label: "Tutoriels", value: "tutoriels", icon: Video },
  { label: "Processus", value: "processus", icon: ListChecks },
  { label: "Démo", value: "demo", icon: PlayCircle }
];

export const ConseilHomePage: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();
  const [department, setDepartment] = useState<DepartmentDetail | null>(null);
  const [province, setProvince] = useState<ProvinceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('accueil');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (departmentId) {
      const dept = getDepartmentById(departmentId);
      const prov = getProvinceByDepartmentId(departmentId);
      setDepartment(dept || null);
      setProvince(prov || null);
      setIsLoading(false);
    }
  }, [departmentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!department || !province) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Conseil non trouvé</CardTitle>
            <CardDescription>
              Le département "{departmentId}" n'existe pas dans notre système.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => navigate('/conseils')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la carte des conseils
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header - Same style as main landing page */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${province.color} flex items-center justify-center`}>
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg leading-tight">Conseil Départemental de {department.name}</h1>
                <p className="text-xs text-muted-foreground">{province.name} • {department.chefLieu}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                item.href ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.value!)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.value 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </nav>

            {/* Auth Buttons & Theme Toggle - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {mounted && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  <Sun className={`h-5 w-5 transition-all duration-300 ${resolvedTheme === 'dark' ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
                  <Moon className={`absolute h-5 w-5 transition-all duration-300 ${resolvedTheme === 'dark' ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
                </Button>
              )}
              <Badge variant={department.status === 'operational' ? 'default' : 'secondary'}>
                {department.status === 'operational' ? '✓ Opérationnel' : '⟳ Transition'}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setActiveTab('demo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
              <Button 
                size="sm" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => {
                  setActiveTab('demo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Inscription
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-10 h-10 rounded-xl ${province.color} flex items-center justify-center`}>
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">CD {department.name}</div>
                      <div className="text-xs text-muted-foreground">{province.name}</div>
                    </div>
                  </div>

                  <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = !item.href && activeTab === item.value;
                      return item.href ? (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={item.label}
                          onClick={() => {
                            setActiveTab(item.value!);
                            setMobileOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive 
                              ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {isActive && <div className="w-1 h-5 bg-primary-foreground rounded-full mr-1" />}
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>

                  <div className="space-y-3 pt-6 border-t border-border">
                    <Badge variant={department.status === 'operational' ? 'default' : 'secondary'} className="w-full justify-center">
                      {department.status === 'operational' ? '✓ Opérationnel' : '⟳ Transition'}
                    </Badge>
                    {mounted && (
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                      >
                        {resolvedTheme === 'dark' ? (
                          <>
                            <Sun className="mr-2 h-4 w-4" />
                            Mode clair
                          </>
                        ) : (
                          <>
                            <Moon className="mr-2 h-4 w-4" />
                            Mode sombre
                          </>
                        )}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        setActiveTab('demo');
                        setMobileOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Connexion
                    </Button>
                    <Button 
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" 
                      onClick={() => {
                        setActiveTab('demo');
                        setMobileOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Inscription
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'accueil' && (
              <motion.div
                key="accueil"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TabsContent value="accueil" className="space-y-6 mt-0" forceMount>
                  {/* Hero section */}
                  <div className="text-center py-8">
                    <div className={`w-20 h-20 rounded-2xl ${province.color} flex items-center justify-center mx-auto mb-4`}>
                      <Building2 className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">
                      Conseil Départemental de {department.name}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      Province de {province.name} • Chef-lieu: {department.chefLieu}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {department.isProvinceCapital && (
                        <Badge variant="secondary" className="gap-1">
                          <Award className="h-3 w-3" /> Capitale provinciale
                        </Badge>
                      )}
                      {department.specialZone && (
                        <Badge variant="outline">
                          {department.specialZone === 'mining' && '🔶 Zone Minière'}
                          {department.specialZone === 'petroleum' && '🛢️ Zone Pétrolière'}
                          {department.specialZone === 'coastal' && '🌊 Zone Côtière'}
                          {department.specialZone === 'forest' && '🌲 Zone Forestière'}
                        </Badge>
                      )}
                      {department.activeFunds.map(fund => (
                        <Badge key={fund} variant="outline" className="text-xs">
                          {fundsInfo[fund].name}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      size="lg" 
                      className="gap-2"
                      onClick={() => setActiveTab('demo')}
                    >
                      <LogIn className="h-5 w-5" />
                      Se connecter au portail
                    </Button>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{department.population?.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Habitants</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{department.activeCompetences}/23</div>
                        <div className="text-xs text-muted-foreground">Compétences</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Wallet className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{(department.budgetEstimate / 1000).toFixed(1)}B</div>
                        <div className="text-xs text-muted-foreground">Budget FCFA</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{department.transferredStaff + department.localRecruits}</div>
                        <div className="text-xs text-muted-foreground">Agents</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick access */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Accès rapide</CardTitle>
                      <CardDescription>Services publics et informations</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab('actualites')}>
                        <Newspaper className="h-6 w-6" />
                        <span className="text-xs">Actualités</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab('processus')}>
                        <ListChecks className="h-6 w-6" />
                        <span className="text-xs">Démarches</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab('tutoriels')}>
                        <Video className="h-6 w-6" />
                        <span className="text-xs">Tutoriels</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <Phone className="h-6 w-6" />
                        <span className="text-xs">Contact</span>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Contact info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          Informations générales
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Département</span>
                          <span className="font-medium">{department.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Code</span>
                          <span className="font-mono">{department.code}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Chef-lieu</span>
                          <span className="font-medium">{department.chefLieu}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Province</span>
                          <span className="font-medium">{province.name}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="h-5 w-5" />
                          Contact
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">contact@{departmentId}.conseil.ga</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">+241 XX XX XX XX</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{departmentId}.conseil.ga</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Hôtel du Département, {department.chefLieu}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </motion.div>
            )}

            {activeTab === 'actualites' && (
              <motion.div
                key="actualites"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TabsContent value="actualites" className="space-y-6 mt-0" forceMount>
                  <div className="text-center py-4">
                    <Newspaper className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Actualités du Conseil</h2>
                    <p className="text-muted-foreground">Suivez les dernières nouvelles de votre département</p>
                  </div>

                  <div className="grid gap-4">
                    {mockActualites.map((actu, index) => (
                      <motion.div
                        key={actu.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">{actu.category}</Badge>
                                  <span className="text-sm text-muted-foreground">{actu.date}</span>
                                </div>
                                <h3 className="font-semibold mb-1">{actu.title}</h3>
                                <p className="text-sm text-muted-foreground">{actu.excerpt}</p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button variant="outline">
                      Voir toutes les actualités
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
              </motion.div>
            )}

            {activeTab === 'sensibilisation' && (
              <motion.div
                key="sensibilisation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TabsContent value="sensibilisation" className="space-y-6 mt-0" forceMount>
                  <div className="text-center py-4">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Campagnes de Sensibilisation</h2>
                    <p className="text-muted-foreground">Informations importantes pour les citoyens</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-primary/50 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <BookOpen className="h-5 w-5" />
                          Éducation civique
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Comprendre le fonctionnement de votre conseil départemental et vos droits en tant que citoyen.
                        </p>
                        <Button variant="outline" size="sm">En savoir plus</Button>
                      </CardContent>
                    </Card>

                    <Card className="border-green-500/50 bg-green-500/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Shield className="h-5 w-5" />
                          Santé publique
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Campagnes de vaccination et informations sanitaires pour la population.
                        </p>
                        <Button variant="outline" size="sm">En savoir plus</Button>
                      </CardContent>
                    </Card>

                    <Card className="border-yellow-500/50 bg-yellow-500/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Globe className="h-5 w-5" />
                          Transparence
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Accédez aux délibérations, budgets et décisions du conseil en toute transparence.
                        </p>
                        <Button variant="outline" size="sm">Consulter</Button>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/50 bg-blue-500/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Users className="h-5 w-5" />
                          Participation citoyenne
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Comment participer aux décisions locales et faire entendre votre voix.
                        </p>
                        <Button variant="outline" size="sm">Participer</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </motion.div>
            )}

            {activeTab === 'tutoriels' && (
              <motion.div
                key="tutoriels"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TabsContent value="tutoriels" className="space-y-6 mt-0" forceMount>
                  <div className="text-center py-4">
                    <Video className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Tutoriels vidéo</h2>
                    <p className="text-muted-foreground">Apprenez à utiliser les services numériques du département</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {mockTutoriels.map((tuto, index) => (
                      <motion.div
                        key={tuto.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <tuto.icon className="h-8 w-8 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{tuto.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{tuto.duration}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <PlayCircle className="h-6 w-6 text-primary" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </motion.div>
            )}

            {activeTab === 'processus' && (
              <motion.div
                key="processus"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TabsContent value="processus" className="space-y-6 mt-0" forceMount>
                  <div className="text-center py-4">
                    <ListChecks className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Démarches administratives</h2>
                    <p className="text-muted-foreground">Toutes les procédures et leurs étapes</p>
                  </div>

                  <div className="grid gap-4">
                    {mockProcessus.map((proc, index) => (
                      <motion.div
                        key={proc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">{proc.title}</h3>
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <ListChecks className="h-3 w-3" /> {proc.steps} étapes
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" /> {proc.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Commencer
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </motion.div>
            )}

            {activeTab === 'demo' && (
              <motion.div
                key="demo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TabsContent value="demo" className="space-y-6 mt-0" forceMount>
                  <div className="text-center py-4">
                    <PlayCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Démonstration du portail</h2>
                    <p className="text-muted-foreground">Testez le système de gestion du conseil départemental de {department.name}</p>
                  </div>

                  {/* Full Demo Access Profiles Component */}
                  <DemoAccessProfiles departmentId={departmentId} showModules={true} />
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2026 Conseil Départemental de {department.name}. Décentralisation Phase 1.
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Décret n°0453/PR/MISD du 14 novembre 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConseilHomePage;
