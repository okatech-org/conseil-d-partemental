import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Info, Globe, ChevronRight, 
  Search, Filter, Users, Wallet, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate, Link } from 'react-router-dom';
import MapboxGabonMap from '@/components/maps/MapboxGabonMap';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { provincesData, getTotalDemoStats } from '@/lib/departments-data';

export const DemoMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [provinceFilter, setProvinceFilter] = useState<string>('all');
  
  const stats = getTotalDemoStats();

  const handleDepartmentSelect = (deptId: string, provinceId: string) => {
    setSelectedDepartment(deptId);
  };

  const handleAccessCouncil = (deptId: string) => {
    // Open in new tab
    window.open(`/conseil/${deptId}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">Conseils Départementaux</h1>
                <p className="text-xs text-muted-foreground">République Gabonaise</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <Link to="/demo-conseil">
                  <Info className="h-4 w-4 mr-2" />
                  Démo complète
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              🇬🇦 Décentralisation Phase 1 - 2025
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              42 Conseils Départementaux du Gabon
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Carte interactive des 42 départements autonomes répartis dans les 9 provinces. 
              Chaque conseil dispose de son propre portail de gestion.
            </p>
            
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary">{stats.totalProvinces}</div>
                <div className="text-xs text-muted-foreground">Provinces</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary">{stats.totalDepartments}</div>
                <div className="text-xs text-muted-foreground">Départements</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary">{stats.operationalDepts}</div>
                <div className="text-xs text-muted-foreground">Opérationnels</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary">{stats.totalCompetences}</div>
                <div className="text-xs text-muted-foreground">Compétences</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un département..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={provinceFilter} onValueChange={setProvinceFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Toutes les provinces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les provinces</SelectItem>
                {provincesData.map(province => (
                  <SelectItem key={province.id} value={province.id}>
                    {province.name} ({province.departments.length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-6">
          <Globe className="h-4 w-4" />
          <AlertTitle>Portails autonomes</AlertTitle>
          <AlertDescription>
            Cliquez sur une province pour voir ses départements, puis accédez au portail de chaque conseil départemental.
          </AlertDescription>
        </Alert>

        <MapboxGabonMap
          height="550px"
          showStats={true}
          showLoginButtons={true}
          onDepartmentSelect={(deptId) => handleDepartmentSelect(deptId, '')}
        />

        {/* Province overview */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Toutes les provinces</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {provincesData.map((province, index) => (
              <motion.div
                key={province.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl ${province.color} flex items-center justify-center`}>
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline">{province.departments.length} dép.</Badge>
                    </div>
                    <CardTitle className="mt-3">{province.name}</CardTitle>
                    <CardDescription>Capitale: {province.capital}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
                      <div className="p-2 bg-muted rounded">
                        <Users className="h-4 w-4 mx-auto mb-1" />
                        <div className="font-medium">{(province.populationEstimate / 1000).toFixed(0)}k</div>
                        <div className="text-muted-foreground">habitants</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <Wallet className="h-4 w-4 mx-auto mb-1" />
                        <div className="font-medium">{province.totalAgents}</div>
                        <div className="text-muted-foreground">agents</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <Shield className="h-4 w-4 mx-auto mb-1" />
                        <div className="font-medium">{province.departments.filter(d => d.status === 'operational').length}</div>
                        <div className="text-muted-foreground">opér.</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {province.departments.slice(0, 3).map(dept => (
                        <Button
                          key={dept.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between"
                          onClick={() => handleAccessCouncil(dept.id)}
                        >
                          <span className="flex items-center gap-2">
                            {dept.isProvinceCapital && <span className="text-xs">⭐</span>}
                            {dept.name}
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ))}
                      {province.departments.length > 3 && (
                        <p className="text-xs text-center text-muted-foreground">
                          +{province.departments.length - 3} autres départements
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <div className="font-semibold">Conseils Départementaux du Gabon</div>
                <div className="text-sm text-muted-foreground">Plateforme de Décentralisation</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>Décret n°0453/PR/MISD du 14 novembre 2025</p>
              <p>© 2026 Direction Générale de la Décentralisation</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoMapPage;
