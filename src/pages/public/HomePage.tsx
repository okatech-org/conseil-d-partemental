import { motion } from "framer-motion";
import { 
  Users, CalendarDays, FileText, Vote, ArrowRight, 
  Clock, Building2, ExternalLink, ChevronRight,
  Heart, GraduationCap, Car, Leaf, Map
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const InteractiveGabonMap = lazy(() => import("@/components/maps/InteractiveGabonMap"));

const stats = [
  { label: "Conseillers départementaux", value: "42", icon: Users, color: "text-blue-500" },
  { label: "Sessions actives", value: "3", icon: CalendarDays, color: "text-green-500" },
  { label: "Dossiers en cours", value: "127", icon: FileText, color: "text-orange-500" },
  { label: "Délibérations du jour", value: "8", icon: Vote, color: "text-purple-500" },
];

const recentDeliberations = [
  {
    id: 1,
    title: "Plan départemental d'insertion 2026-2028",
    commission: "Commission des affaires sociales",
    status: "En cours",
    progress: 65,
    date: "2026-01-20",
  },
  {
    id: 2,
    title: "Schéma routier départemental",
    commission: "Commission des infrastructures",
    status: "Adopté",
    progress: 100,
    date: "2026-01-15",
  },
  {
    id: 3,
    title: "Budget des collèges - exercice 2026",
    commission: "Commission éducation",
    status: "En examen",
    progress: 40,
    date: "2026-01-18",
  },
];

const upcomingSessions = [
  {
    id: 1,
    title: "Commission permanente",
    date: "2026-01-22",
    time: "14:00",
    location: "Hémicycle",
    type: "commission",
  },
  {
    id: 2,
    title: "Assemblée plénière - Budget 2026",
    date: "2026-01-28",
    time: "09:30",
    location: "Hémicycle",
    type: "pleniere",
  },
  {
    id: 3,
    title: "Commission des affaires sociales",
    date: "2026-02-03",
    time: "10:00",
    location: "Salle des commissions",
    type: "thematique",
  },
];

const quickLinks = [
  { 
    title: "Élus", 
    description: "Trouvez votre conseiller départemental",
    icon: Users,
    href: "/elus",
    color: "bg-blue-500"
  },
  { 
    title: "Commissions", 
    description: "Découvrez les commissions thématiques",
    icon: Building2,
    href: "/commissions",
    color: "bg-green-500"
  },
  { 
    title: "Votes", 
    description: "Consultez les résultats des votes",
    icon: Vote,
    href: "/votes",
    color: "bg-purple-500"
  },
];

const competences = [
  { icon: Heart, label: "Action sociale", color: "bg-pink-500" },
  { icon: GraduationCap, label: "Collèges", color: "bg-blue-500" },
  { icon: Car, label: "Routes", color: "bg-orange-500" },
  { icon: Leaf, label: "Environnement", color: "bg-green-500" },
];

export const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <PublicLayout>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              Mandature 2021-2027
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">
              Conseil Départemental
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl">
              Au service des citoyens et du territoire, nous œuvrons pour la solidarité, 
              l'éducation et le développement durable de notre département.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                Hémicycle virtuel
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Travaux en cours
              </Button>
            </div>
            
            {/* Competences badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {competences.map((comp, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm"
                >
                  <div className={`w-6 h-6 rounded-full ${comp.color} flex items-center justify-center`}>
                    <comp.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">{comp.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deliberations Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-serif">Délibérations récentes</h2>
              <Button variant="ghost" className="group">
                Voir tout
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentDeliberations.map((delib, index) => (
                <motion.div
                  key={delib.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {delib.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {delib.commission}
                          </p>
                        </div>
                        <Badge variant={delib.status === 'Adopté' ? 'default' : 'secondary'}>
                          {delib.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium">{delib.progress}%</span>
                        </div>
                        <Progress value={delib.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Sessions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-serif">Prochaines sessions</h2>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                          <span className="text-lg font-bold">
                            {new Date(session.date).getDate()}
                          </span>
                          <span className="text-xs uppercase">
                            {new Date(session.date).toLocaleDateString('fr-FR', { month: 'short' })}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{session.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {session.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="h-3 w-3" />
                            {session.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-serif">Carte des 42 Conseils Départementaux</h2>
            <p className="text-muted-foreground mt-1">Explorez les conseils départementaux du Gabon</p>
          </div>
          <Button variant="outline" className="group" onClick={() => navigate('/conseils')}>
            <Map className="mr-2 h-4 w-4" />
            Voir tout
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <Suspense fallback={
          <div className="h-[400px] bg-muted rounded-xl animate-pulse flex items-center justify-center">
            <span className="text-muted-foreground">Chargement de la carte...</span>
          </div>
        }>
          <InteractiveGabonMap height="400px" />
        </Suspense>
      </div>

      {/* Quick Access Cards */}
      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold font-serif mb-6">Accès rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <link.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {link.title}
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto group/btn">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};
