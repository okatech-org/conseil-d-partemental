import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Send,
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  ArrowRight,
  Scale,
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
import { cn } from '@/lib/utils';
import { mockDeliberations, mockAlerts } from '@/lib/mock-data';

export function TutellePage() {
  const [activeTab, setActiveTab] = useState('transmissions');

  const transmissions = mockDeliberations.map(d => ({
    id: d.id,
    type: 'deliberation',
    number: d.number,
    subject: d.subject,
    date: d.date,
    transmittedAt: d.transmittedAt,
    receiptNumber: d.receiptNumber,
    status: d.tutelleStatus || 'pending',
    deadline: d.transmittedAt ? new Date(d.transmittedAt.getTime() + 15 * 24 * 60 * 60 * 1000) : null,
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approuvé</Badge>;
      case 'pending':
        return <Badge className="bg-blue-500">En examen</Badge>;
      case 'correction_requested':
        return <Badge className="bg-amber-500">Correction demandée</Badge>;
      case 'referred_to_court':
        return <Badge className="bg-red-500">Déféré au juge</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'correction_requested':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'referred_to_court':
        return <Scale className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Calculate compliance stats
  const complianceStats = {
    score: 87,
    budgetCompliance: 92,
    transmissionCompliance: 85,
    sessionCompliance: 100,
    personnelCompliance: 75,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tutelle & Conformité</h1>
          <p className="text-muted-foreground">
            Contrôle de légalité et transmission des actes
          </p>
        </div>
        <Badge variant={complianceStats.score >= 80 ? "default" : "destructive"} className="text-lg px-4 py-2">
          Score: {complianceStats.score}/100
        </Badge>
      </div>

      {/* Compliance Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conformité Budget
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.budgetCompliance}%</div>
            <Progress value={complianceStats.budgetCompliance} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">
              Équilibre respecté, délais tenus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transmission Actes
            </CardTitle>
            <Send className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.transmissionCompliance}%</div>
            <Progress value={complianceStats.transmissionCompliance} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">
              96% des actes transmis dans les délais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessions Conseil
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.sessionCompliance}%</div>
            <Progress value={complianceStats.sessionCompliance} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">
              Toutes les sessions tenues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Charges Personnel
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{complianceStats.personnelCompliance}%</div>
            <Progress value={complianceStats.personnelCompliance} className="mt-2 h-1.5 [&>div]:bg-amber-500" />
            <p className="text-xs text-amber-600 mt-1">
              Dépasse le seuil de 60%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="transmissions" className="gap-2">
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Transmissions</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Conformité</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Alertes</span>
          </TabsTrigger>
        </TabsList>

        {/* Transmissions Tab */}
        <TabsContent value="transmissions" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un acte..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Acte</TableHead>
                    <TableHead>Objet</TableHead>
                    <TableHead className="hidden md:table-cell">Transmis le</TableHead>
                    <TableHead className="hidden lg:table-cell">Récépissé</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transmissions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-sm">{t.number}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="truncate max-w-[250px]">{t.subject}</p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {t.transmittedAt?.toLocaleDateString('fr-FR') || '-'}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-sm">
                        {t.receiptNumber || '-'}
                      </TableCell>
                      <TableCell>{getStatusBadge(t.status)}</TableCell>
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

          {/* Workflow explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workflow de Transmission</CardTitle>
              <CardDescription>
                Conformément à l'article 358 de la Loi organique n°001/2014
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    1
                  </div>
                  <span className="text-sm">Adoption</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    2
                  </div>
                  <span className="text-sm">Signature</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    3
                  </div>
                  <span className="text-sm">Transmission (8j)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    4
                  </div>
                  <span className="text-sm">Récépissé</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                    5
                  </div>
                  <span className="text-sm">Exécutoire (15j)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tableau de Conformité Détaillé</CardTitle>
              <CardDescription>
                État de conformité au {new Date().toLocaleDateString('fr-FR')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget Compliance */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      📅 Délais Budgétaires
                    </h4>
                  </div>
                  <Badge className="bg-green-500">Conforme</Badge>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Budget primitif 2026</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Vote: 15/11/2025</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Transmission tutelle</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">20/11/2025 (J+5)</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Approbation gouverneur</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">03/12/2025</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Equilibrium */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      📊 Équilibre Budgétaire
                    </h4>
                  </div>
                  <Badge className="bg-amber-500">Attention</Badge>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Équilibre réel respecté</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Charges obligatoires inscrites</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ratio fonctionnement: 62%</span>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Emprunts: 18% ressources</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Sessions */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      🏛️ Sessions Conseil
                    </h4>
                  </div>
                  <Badge className="bg-green-500">Conforme</Badge>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Session T2 2025</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">15-18/05/2025</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session T4 2025</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">12-15/11/2025</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Prochaine session T2 2026</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Programmée: 02/05/2026</span>
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertes Actives</CardTitle>
              <CardDescription>
                {mockAlerts.length} alertes nécessitent votre attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-lg border flex items-start gap-4",
                    alert.level === 'critical' && "bg-destructive/10 border-destructive/30",
                    alert.level === 'alert' && "bg-orange-500/10 border-orange-500/30",
                    alert.level === 'warning' && "bg-amber-500/10 border-amber-500/30",
                    alert.level === 'info' && "bg-blue-500/10 border-blue-500/30"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-full",
                    alert.level === 'critical' && "bg-destructive/20",
                    alert.level === 'alert' && "bg-orange-500/20",
                    alert.level === 'warning' && "bg-amber-500/20",
                    alert.level === 'info' && "bg-blue-500/20"
                  )}>
                    <AlertTriangle className={cn(
                      "h-5 w-5",
                      alert.level === 'critical' && "text-destructive",
                      alert.level === 'alert' && "text-orange-500",
                      alert.level === 'warning' && "text-amber-500",
                      alert.level === 'info' && "text-blue-500"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {alert.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                    {alert.action && (
                      <p className="text-sm font-medium text-primary">
                        Action: {alert.action}
                      </p>
                    )}
                    {alert.deadline && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Échéance: {alert.deadline.toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    Traiter
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
