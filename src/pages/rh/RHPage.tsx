import React, { useState } from 'react';
import { 
  UserCog, 
  Users, 
  Briefcase,
  CreditCard,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Heart,
  Baby,
  Skull,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { mockEmployees } from '@/lib/mock-data';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};

export function RHPage() {
  const [activeTab, setActiveTab] = useState('personnel');

  const employees = mockEmployees;
  
  // Stats
  const stats = {
    total: 225,
    elected: 12,
    seconded: 45,
    localCivilService: 120,
    contractual: 48,
    payrollCost: 165000000,
  };

  // Mock civil status stats
  const civilStatusStats = {
    births: 156,
    marriages: 23,
    deaths: 18,
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'elected':
        return <Badge className="bg-purple-500">Élu</Badge>;
      case 'seconded':
        return <Badge className="bg-blue-500">Détaché</Badge>;
      case 'local_civil_service':
        return <Badge className="bg-green-500">FPL</Badge>;
      case 'contractual':
        return <Badge variant="secondary">Contractuel</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ressources Humaines</h1>
          <p className="text-muted-foreground">
            Personnel, paie et état civil
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Effectif Total
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.elected} élus • {stats.seconded + stats.localCivilService + stats.contractual} agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Masse Salariale
            </CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">165M</div>
            <p className="text-xs text-muted-foreground">
              FCFA / mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Naissances 2025
            </CardTitle>
            <Baby className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{civilStatusStats.births}</div>
            <p className="text-xs text-muted-foreground">
              Actes enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mariages 2025
            </CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{civilStatusStats.marriages}</div>
            <p className="text-xs text-muted-foreground">
              Unions célébrées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="personnel" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Personnel</span>
          </TabsTrigger>
          <TabsTrigger value="payroll" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Paie</span>
          </TabsTrigger>
          <TabsTrigger value="civil-status" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">État Civil</span>
          </TabsTrigger>
          <TabsTrigger value="careers" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Carrières</span>
          </TabsTrigger>
        </TabsList>

        {/* Personnel Tab */}
        <TabsContent value="personnel" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un agent..." className="pl-9" />
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

          {/* Personnel distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition par catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 text-center">
                  <p className="text-2xl font-bold text-purple-600">{stats.elected}</p>
                  <p className="text-sm text-muted-foreground">Élus locaux</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats.seconded}</p>
                  <p className="text-sm text-muted-foreground">Détachés État</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 text-center">
                  <p className="text-2xl font-bold text-green-600">{stats.localCivilService}</p>
                  <p className="text-sm text-muted-foreground">FP Locale</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 text-center">
                  <p className="text-2xl font-bold text-gray-600">{stats.contractual}</p>
                  <p className="text-sm text-muted-foreground">Contractuels</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personnel Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Matricule</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Poste</TableHead>
                    <TableHead className="hidden lg:table-cell">Service</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.photo} />
                            <AvatarFallback>
                              {employee.firstName[0]}{employee.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {employee.lastName} {employee.firstName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {employee.matricule}
                      </TableCell>
                      <TableCell>{getTypeBadge(employee.type)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {employee.position}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {employee.service}
                      </TableCell>
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
                              Voir dossier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Bulletin paie
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

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion de la Paie</CardTitle>
              <CardDescription>
                Génération des bulletins et déclarations sociales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Current month */}
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-4">Paie Janvier 2026</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Masse salariale brute</span>
                      <span className="font-medium">185 000 000 FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cotisations CNSS</span>
                      <span className="font-medium">18 500 000 FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cotisations CNAMGS</span>
                      <span className="font-medium">7 400 000 FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IRPP retenu</span>
                      <span className="font-medium">12 300 000 FCFA</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between">
                      <span className="font-medium">Net à payer</span>
                      <span className="font-bold text-lg">165 000 000 FCFA</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1">
                      Générer bulletins
                    </Button>
                    <Button variant="outline">
                      Valider
                    </Button>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Actions rapides</h4>
                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Calendrier paie 2026
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Déclaration CNSS mensuelle
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Journal de paie
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      État des virements
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Civil Status Tab */}
        <TabsContent value="civil-status" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un acte..." className="pl-9" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel Acte
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-pink-200 dark:border-pink-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Baby className="h-5 w-5 text-pink-500" />
                  Naissances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pink-600">{civilStatusStats.births}</div>
                <p className="text-sm text-muted-foreground">actes en 2025</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Nouvel acte de naissance
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-red-500" />
                  Mariages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{civilStatusStats.marriages}</div>
                <p className="text-sm text-muted-foreground">unions en 2025</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Nouvel acte de mariage
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Skull className="h-5 w-5 text-gray-500" />
                  Décès
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-600">{civilStatusStats.deaths}</div>
                <p className="text-sm text-muted-foreground">actes en 2025</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Nouvel acte de décès
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Derniers actes enregistrés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Sélectionnez une catégorie pour voir les actes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Careers Tab */}
        <TabsContent value="careers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Carrières</CardTitle>
              <CardDescription>
                Avancements, promotions et mouvements de personnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Module de gestion des carrières</p>
                <p className="text-sm">Avancements, promotions, mutations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
