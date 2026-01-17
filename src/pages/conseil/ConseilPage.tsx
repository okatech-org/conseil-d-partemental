import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Vote,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserPlus,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { mockCouncilors, mockSessions, mockDeliberations } from '@/lib/mock-data';

export function ConseilPage() {
  const [activeTab, setActiveTab] = useState('councilors');
  const [searchTerm, setSearchTerm] = useState('');

  const councilors = mockCouncilors;
  const sessions = mockSessions;
  const deliberations = mockDeliberations;

  const getFunctionBadge = (func: string) => {
    switch (func) {
      case 'president':
        return <Badge className="bg-primary">Président</Badge>;
      case 'vice_president':
        return <Badge variant="secondary">Vice-Président</Badge>;
      default:
        return <Badge variant="outline">Conseiller</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Actif</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Terminée</Badge>;
      case 'planned':
        return <Badge variant="secondary">Planifiée</Badge>;
      case 'adopted':
      case 'approved':
        return <Badge className="bg-green-500">Adoptée</Badge>;
      case 'transmitted':
        return <Badge className="bg-blue-500">Transmise</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion du Conseil</h1>
          <p className="text-muted-foreground">
            Conseillers, sessions, délibérations et votes
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle action
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conseillers
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{councilors.length}</div>
            <p className="text-xs text-muted-foreground">
              {councilors.filter(c => c.status === 'active').length} actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessions 2025
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground">
              {sessions.filter(s => s.status === 'completed').length} terminées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Délibérations
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliberations.length}</div>
            <p className="text-xs text-muted-foreground">
              {deliberations.filter(d => d.status === 'approved').length} approuvées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prochaine Session
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {sessions.find(s => s.status === 'planned')?.startDate.toLocaleDateString('fr-FR') || '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              Session T2 2026
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="councilors" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Conseillers</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Sessions</span>
          </TabsTrigger>
          <TabsTrigger value="deliberations" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Délibérations</span>
          </TabsTrigger>
          <TabsTrigger value="votes" className="gap-2">
            <Vote className="h-4 w-4" />
            <span className="hidden sm:inline">Votes</span>
          </TabsTrigger>
        </TabsList>

        {/* Councilors Tab */}
        <TabsContent value="councilors" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un conseiller..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conseiller</TableHead>
                    <TableHead>Fonction</TableHead>
                    <TableHead className="hidden md:table-cell">Commission</TableHead>
                    <TableHead className="hidden lg:table-cell">Mandat</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {councilors.map((councilor) => (
                    <TableRow key={councilor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={councilor.photo} />
                            <AvatarFallback>
                              {councilor.firstName[0]}{councilor.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {councilor.lastName} {councilor.firstName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {councilor.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getFunctionBadge(councilor.function)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {councilor.commission || '-'}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm">
                          {councilor.mandateStart.toLocaleDateString('fr-FR')} - {councilor.mandateEnd.toLocaleDateString('fr-FR')}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(councilor.status)}</TableCell>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
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

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une session..." className="pl-9" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Session
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription>
                        {session.type === 'ordinary' ? `Session Ordinaire ${session.quarter}` : 'Session Extraordinaire'}
                      </CardDescription>
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date début</p>
                      <p className="font-medium">{session.startDate.toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date fin</p>
                      <p className="font-medium">
                        {session.endDate?.toLocaleDateString('fr-FR') || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Lieu</p>
                      <p className="font-medium">{session.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Points à l'ordre du jour</p>
                      <p className="font-medium">{session.agenda.length}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    {session.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PV
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Deliberations Tab */}
        <TabsContent value="deliberations" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une délibération..." className="pl-9" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Délibération
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Numéro</TableHead>
                    <TableHead>Objet</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden lg:table-cell">Vote</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliberations.map((delib) => (
                    <TableRow key={delib.id}>
                      <TableCell className="font-mono text-sm">
                        {delib.number}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium truncate max-w-[300px]">
                          {delib.subject}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {delib.type}
                        </p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {delib.date.toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {delib.vote && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">✓ {delib.vote.forVotes}</span>
                            <span className="text-red-600">✗ {delib.vote.againstVotes}</span>
                            <span className="text-muted-foreground">○ {delib.vote.abstentions}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(delib.status)}</TableCell>
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
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger PDF
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

        {/* Votes Tab */}
        <TabsContent value="votes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Votes</CardTitle>
              <CardDescription>
                Tous les scrutins avec résultats et audit trail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliberations.filter(d => d.vote).map((delib) => (
                  <div key={delib.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{delib.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {delib.number} • {delib.vote?.conductedAt.toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Badge className={
                        delib.vote?.result === 'adopted' ? 'bg-green-500' : 'bg-red-500'
                      }>
                        {delib.vote?.result === 'adopted' ? 'Adoptée' : 'Rejetée'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-2 rounded bg-green-50 dark:bg-green-950">
                        <p className="text-2xl font-bold text-green-600">{delib.vote?.forVotes}</p>
                        <p className="text-xs text-muted-foreground">Pour</p>
                      </div>
                      <div className="text-center p-2 rounded bg-red-50 dark:bg-red-950">
                        <p className="text-2xl font-bold text-red-600">{delib.vote?.againstVotes}</p>
                        <p className="text-xs text-muted-foreground">Contre</p>
                      </div>
                      <div className="text-center p-2 rounded bg-gray-50 dark:bg-gray-900">
                        <p className="text-2xl font-bold text-muted-foreground">{delib.vote?.abstentions}</p>
                        <p className="text-xs text-muted-foreground">Abstentions</p>
                      </div>
                      <div className="text-center p-2 rounded bg-blue-50 dark:bg-blue-950">
                        <p className="text-2xl font-bold text-blue-600">{delib.vote?.proxies}</p>
                        <p className="text-xs text-muted-foreground">Procurations</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        Vote {delib.vote?.type === 'public' ? 'public' : 
                              delib.vote?.type === 'secret' ? 'secret' : 'nominal'}
                      </Badge>
                      {delib.vote?.quorumMet && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-3 w-3" />
                          Quorum atteint
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
