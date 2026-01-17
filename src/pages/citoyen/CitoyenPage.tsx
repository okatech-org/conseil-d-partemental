import React, { useState } from 'react';
import { 
  Globe, 
  FileText, 
  Users,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Clock,
  Vote,
  Newspaper,
  Database,
  HelpCircle,
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
import { mockDeliberations } from '@/lib/mock-data';

export function CitoyenPage() {
  const [activeTab, setActiveTab] = useState('transparency');

  // Stats
  const stats = {
    publications: 248,
    deliberations: 125,
    requests: 45,
    pendingRequests: 12,
    consultations: 3,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Portail Citoyen</h1>
          <p className="text-muted-foreground">
            Transparence, participation et e-services
          </p>
        </div>
        <Button variant="outline">
          <ExternalLink className="w-4 h-4 mr-2" />
          Voir le portail public
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Documents publiés
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publications}</div>
            <p className="text-xs text-muted-foreground">
              En accès libre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Délibérations
            </CardTitle>
            <Newspaper className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliberations}</div>
            <p className="text-xs text-muted-foreground">
              Publiées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Demandes citoyens
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.requests}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingRequests} en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consultations
            </CardTitle>
            <Vote className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.consultations}</div>
            <p className="text-xs text-muted-foreground">
              En cours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="transparency" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Transparence</span>
          </TabsTrigger>
          <TabsTrigger value="opendata" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Open Data</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Demandes</span>
          </TabsTrigger>
          <TabsTrigger value="participation" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Participation</span>
          </TabsTrigger>
        </TabsList>

        {/* Transparency Tab */}
        <TabsContent value="transparency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publications Obligatoires</CardTitle>
              <CardDescription>
                Conformément à l'article 42 de la Loi organique n°001/2014
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Category cards */}
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Délibérations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockDeliberations.length}</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Toutes publiées
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Consulter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      Budgets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">4</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Documents budgétaires
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Consulter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-amber-500" />
                      Marchés publics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Avis et attributions
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Consulter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Arrêtés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">38</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Arrêtés du président
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Consulter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-500" />
                      Comptes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comptes administratifs
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Consulter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-teal-500" />
                      Coopération
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Accords et conventions
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Consulter
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Recent publications */}
          <Card>
            <CardHeader>
              <CardTitle>Publications récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDeliberations.slice(0, 5).map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{doc.subject}</p>
                          <p className="text-sm text-muted-foreground">{doc.number}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Délibération</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {doc.date.toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Open Data Tab */}
        <TabsContent value="opendata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portail Open Data</CardTitle>
              <CardDescription>
                Jeux de données ouverts en téléchargement libre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Budget', icon: '💰', datasets: 4, formats: ['CSV', 'JSON'] },
                  { name: 'Délibérations', icon: '📜', datasets: 12, formats: ['JSON', 'PDF'] },
                  { name: 'Patrimoine', icon: '🏛️', datasets: 3, formats: ['CSV', 'GeoJSON'] },
                  { name: 'Démographie', icon: '👥', datasets: 4, formats: ['CSV'] },
                  { name: 'Marchés', icon: '📋', datasets: 6, formats: ['CSV', 'JSON'] },
                  { name: 'Projets', icon: '🚧', datasets: 2, formats: ['CSV', 'JSON'] },
                ].map((dataset) => (
                  <Card key={dataset.name} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{dataset.icon}</span>
                        <div>
                          <h4 className="font-semibold">{dataset.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {dataset.datasets} jeux de données
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {dataset.formats.map((format) => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* API Info */}
              <div className="mt-6 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">API REST</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Accédez aux données programmatiquement
                </p>
                <code className="text-sm bg-background p-2 rounded block">
                  https://api.conseil-gabon.ga/v1/public/mpassa
                </code>
                <Button variant="link" size="sm" className="mt-2 p-0">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Documentation API
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une demande..." className="pl-9" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Demandes en ligne</CardTitle>
              <CardDescription>
                Traitement des demandes citoyennes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">En attente</span>
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pendingRequests}</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">En cours</span>
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Traitées</span>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600 mt-1">25</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Suivi</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Demandeur</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">DEM-2026-0045</TableCell>
                    <TableCell>Extrait naissance</TableCell>
                    <TableCell>Jean M.</TableCell>
                    <TableCell className="hidden md:table-cell">15/01/2026</TableCell>
                    <TableCell><Badge className="bg-amber-500">En attente</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">DEM-2026-0044</TableCell>
                    <TableCell>Légalisation</TableCell>
                    <TableCell>Marie O.</TableCell>
                    <TableCell className="hidden md:table-cell">14/01/2026</TableCell>
                    <TableCell><Badge className="bg-blue-500">En cours</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">DEM-2026-0043</TableCell>
                    <TableCell>Certificat résidence</TableCell>
                    <TableCell>Pierre N.</TableCell>
                    <TableCell className="hidden md:table-cell">13/01/2026</TableCell>
                    <TableCell><Badge className="bg-green-500">Prêt</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Participation Tab */}
        <TabsContent value="participation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Participation Citoyenne</CardTitle>
              <CardDescription>
                Consultations publiques et référendums locaux (Art. 37)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Active consultation */}
                <div className="p-4 rounded-lg border-2 border-primary">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className="bg-green-500 mb-2">En cours</Badge>
                      <h4 className="font-semibold">
                        Consultation sur le Plan d'Aménagement Urbain 2026-2030
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Donnez votre avis sur les orientations d'urbanisme
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Jusqu'au 31/01/2026
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      23 contributions
                    </span>
                  </div>
                  <Button>
                    Participer
                  </Button>
                </div>

                {/* Upcoming */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="secondary" className="mb-2">À venir</Badge>
                      <h4 className="font-semibold">
                        Consultation sur le Budget Participatif 2027
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Proposez des projets pour le budget participatif
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Début: 15/02/2026
                    </span>
                  </div>
                </div>

                {/* Closed */}
                <div className="p-4 rounded-lg border opacity-60">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="outline" className="mb-2">Terminée</Badge>
                      <h4 className="font-semibold">
                        Nom des nouvelles rues du quartier Extension
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Consultation close - 156 participants
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir les résultats
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
