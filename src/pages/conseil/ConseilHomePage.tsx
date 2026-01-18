import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Users, Phone, Mail, Globe, 
  Calendar, Shield, TrendingUp, Wallet, LogIn,
  Eye, FileText, Award, ChevronRight, ArrowLeft,
  Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  provincesData, 
  getDepartmentById, 
  getProvinceByDepartmentId,
  profileTypes,
  fundsInfo,
  type DepartmentDetail,
  type ProvinceDetail
} from '@/lib/departments-data';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const ConseilHomePage: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();
  const [department, setDepartment] = useState<DepartmentDetail | null>(null);
  const [province, setProvince] = useState<ProvinceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('accueil');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (departmentId) {
      const dept = getDepartmentById(departmentId);
      const prov = getProvinceByDepartmentId(departmentId);
      setDepartment(dept || null);
      setProvince(prov || null);
      setIsLoading(false);
    }
  }, [departmentId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsConnecting(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, accept any email/password with the department domain
    if (loginEmail.includes(`@${departmentId}.conseil.ga`)) {
      navigate(`/dashboard?tenant=${departmentId}`);
    } else {
      setLoginError('Identifiants incorrects. Utilisez un email @' + departmentId + '.conseil.ga');
      setIsConnecting(false);
    }
  };

  const handleDemoAccess = (roleId: string) => {
    setLoginEmail(`${roleId}@${departmentId}.conseil.ga`);
    setLoginPassword('demo2026');
  };

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
              onClick={() => navigate('/demo')}
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
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/demo')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${province.color} flex items-center justify-center`}>
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-tight">CD {department.name}</h1>
                  <p className="text-xs text-muted-foreground">{province.name} • {department.chefLieu}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Badge variant={department.status === 'operational' ? 'default' : 'secondary'}>
                {department.status === 'operational' ? '✓ Opérationnel' : '⟳ Transition'}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="accueil">Accueil</TabsTrigger>
            <TabsTrigger value="connexion">Connexion</TabsTrigger>
            <TabsTrigger value="infos">Informations</TabsTrigger>
          </TabsList>

          {/* Accueil Tab */}
          <TabsContent value="accueil" className="space-y-6">
            {/* Hero section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
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
                onClick={() => setActiveTab('connexion')}
              >
                <LogIn className="h-5 w-5" />
                Se connecter au portail
              </Button>
            </motion.div>

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
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-xs">Délibérations</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-xs">Sessions</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Eye className="h-6 w-6" />
                  <span className="text-xs">Transparence</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Phone className="h-6 w-6" />
                  <span className="text-xs">Contact</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connexion Tab */}
          <TabsContent value="connexion" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Login form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Connexion au portail
                  </CardTitle>
                  <CardDescription>
                    Accédez à votre espace personnel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={`utilisateur@${departmentId}.conseil.ga`}
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    {loginError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{loginError}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isConnecting}>
                      {isConnecting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Connexion en cours...
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4 mr-2" />
                          Se connecter
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      En vous connectant, vous acceptez les conditions d'utilisation
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Demo accounts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Comptes de démonstration
                  </CardTitle>
                  <CardDescription>
                    Cliquez sur un profil pour pré-remplir les identifiants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profileTypes.slice(0, 4).map((profile) => (
                    <div key={profile.id} className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${profile.color}`} />
                        {profile.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {'roles' in profile && profile.roles?.slice(0, 2).map(role => (
                          <Button
                            key={role.id}
                            variant="outline"
                            size="sm"
                            className="text-xs justify-start"
                            onClick={() => handleDemoAccess(role.id)}
                          >
                            <ChevronRight className="h-3 w-3 mr-1" />
                            {role.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Alert className="mt-4">
                    <Clock className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Mot de passe démo: <code className="bg-muted px-1 rounded">demo2026</code>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Infos Tab */}
          <TabsContent value="infos" className="space-y-6">
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
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Communes</span>
                    <span className="font-medium">{department.communes.join(', ')}</span>
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

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Compétences transférées ({department.activeCompetences}/23)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {department.prioritySectors.map((sector, i) => (
                      <Badge 
                        key={sector} 
                        variant={i < 3 ? 'default' : 'secondary'}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {sector.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
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
