import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Briefcase,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Car,
  Home,
  Trees,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { mockAssets, mockProjects } from '@/lib/mock-data';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount);
};

const formatMillions = (amount: number) => {
  return (amount / 1000000).toFixed(0) + 'M';
};

export function PatrimoinePage() {
  const [activeTab, setActiveTab] = useState('assets');

  const assets = mockAssets;
  const projects = mockProjects;

  // Stats
  const stats = {
    totalAssets: 156,
    buildings: 42,
    vehicles: 28,
    furniture: 86,
    totalValue: 4500000000,
    projects: 8,
    projectsInProgress: 5,
    projectsBudget: 850000000,
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-500">Bon</Badge>;
      case 'fair':
        return <Badge className="bg-amber-500">Moyen</Badge>;
      case 'poor':
        return <Badge className="bg-red-500">Mauvais</Badge>;
      case 'to_reform':
        return <Badge variant="destructive">À réformer</Badge>;
      default:
        return <Badge variant="outline">{condition}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Terminé</Badge>;
      case 'planned':
        return <Badge variant="secondary">Planifié</Badge>;
      case 'delayed':
        return <Badge className="bg-red-500">Retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'building':
        return <Home className="h-4 w-4" />;
      case 'vehicle':
        return <Car className="h-4 w-4" />;
      case 'land':
        return <Trees className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Patrimoine & Projets</h1>
          <p className="text-muted-foreground">
            Inventaire, marchés et investissements
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau bien
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Biens inventoriés
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssets}</div>
            <p className="text-xs text-muted-foreground">
              {stats.buildings} bâtiments • {stats.vehicles} véhicules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valeur du patrimoine
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMillions(stats.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              FCFA estimés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projets en cours
            </CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectsInProgress}</div>
            <p className="text-xs text-muted-foreground">
              sur {stats.projects} projets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget investissement
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMillions(stats.projectsBudget)}</div>
            <p className="text-xs text-muted-foreground">
              FCFA programmés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="assets" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Inventaire</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Carte</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Projets</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Marchés</span>
          </TabsTrigger>
        </TabsList>

        {/* Assets Tab */}
        <TabsContent value="assets" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un bien..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Inventaire</TableHead>
                    <TableHead>Désignation</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Valeur</TableHead>
                    <TableHead>État</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-mono text-sm">
                        {asset.inventoryNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(asset.type)}
                          <div>
                            <p className="font-medium truncate max-w-[200px]">
                              {asset.designation}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {asset.address || asset.nature}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {asset.type === 'building' ? 'Bâtiment' : 
                           asset.type === 'vehicle' ? 'Véhicule' : asset.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono">
                        {formatCurrency(asset.currentValue)}
                      </TableCell>
                      <TableCell>{getConditionBadge(asset.condition)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="h-4 w-4 mr-2" />
                              Localiser
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Map Tab */}
        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cartographie du Patrimoine</CardTitle>
              <CardDescription>
                Système d'Information Géographique (SIG) départemental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Carte interactive du patrimoine
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Intégration Leaflet/Mapbox à venir
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un projet..." className="pl-9" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Projet
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </CardDescription>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Avancement</span>
                      <span className="font-medium">{project.progressPercentage}%</span>
                    </div>
                    <Progress value={project.progressPercentage} className="h-2" />
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-medium">{formatMillions(project.estimatedCost)} FCFA</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Entreprise</p>
                      <p className="font-medium">{project.contractor || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Début prévu</p>
                      <p className="font-medium">
                        {project.plannedStartDate.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fin prévue</p>
                      <p className="font-medium">
                        {project.plannedEndDate.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {/* Funding */}
                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium mb-2">Financement</p>
                    <div className="flex flex-wrap gap-2">
                      {project.funding.map((f, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {f.source === 'state_grant' ? 'État' :
                           f.source === 'own_funds' ? 'Fonds propres' :
                           f.source === 'fdl' ? 'FDL' : f.source}: {f.percentage}%
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marchés Publics</CardTitle>
              <CardDescription>
                Appels d'offres, attribution et suivi des marchés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Module des marchés publics</p>
                <p className="text-sm">Gestion des appels d'offres et contrats</p>
                <Button className="mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel appel d'offres
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
