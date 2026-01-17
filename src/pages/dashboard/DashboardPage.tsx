import React from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Wallet,
  Shield,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Briefcase,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useTenant } from '@/contexts/TenantContext';
import { mockDashboardStats, mockAlerts, mockProjects, calculateBudgetSummary, mockBudgetLines } from '@/lib/mock-data';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};

const formatMillions = (amount: number) => {
  return (amount / 1000000).toFixed(0) + 'M';
};

export function DashboardPage() {
  const { currentTenant, currentUser } = useTenant();
  const stats = mockDashboardStats;
  const alerts = mockAlerts;
  const projects = mockProjects;
  const budgetSummary = calculateBudgetSummary(mockBudgetLines);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tableau de Bord</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble du {currentTenant?.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            <Calendar className="w-3 h-3 mr-1" />
            Exercice 2026
          </Badge>
          <Badge 
            variant={stats.compliance.score >= 80 ? "default" : "destructive"}
            className="text-sm"
          >
            Score: {stats.compliance.score}/100
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Budget Execution */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Exécution Budgétaire
            </CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.budget.executionRate}%</div>
            <Progress value={stats.budget.executionRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {formatMillions(stats.budget.executed)} / {formatMillions(stats.budget.voted)} FCFA
            </p>
          </CardContent>
        </Card>

        {/* Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessions Conseil
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.sessions.held}/{stats.sessions.required}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Sessions T4 2025 tenues</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Prochaine: {stats.sessions.nextSession?.toLocaleDateString('fr-FR')}
            </p>
          </CardContent>
        </Card>

        {/* Deliberations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Délibérations
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliberations.total}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {stats.deliberations.approved} approuvées
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {stats.deliberations.pending} en attente
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conformité
            </CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stats.compliance.score}</span>
              <span className="text-muted-foreground">/100</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {stats.compliance.alerts > 0 ? (
                <>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-amber-600">{stats.compliance.alerts} alertes</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Conforme</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Budget Overview - 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Exécution Budgétaire par Section
            </CardTitle>
            <CardDescription>Exercice 2026 - Situation au {new Date().toLocaleDateString('fr-FR')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Operating Section */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  Section Fonctionnement
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Recettes</span>
                      <span className="font-medium">{budgetSummary.operating.revenueRate}%</span>
                    </div>
                    <Progress value={parseFloat(budgetSummary.operating.revenueRate)} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatMillions(budgetSummary.operating.paidRevenue)} / {formatMillions(budgetSummary.operating.forecastRevenue)}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Dépenses</span>
                      <span className="font-medium">{budgetSummary.operating.expenditureRate}%</span>
                    </div>
                    <Progress value={parseFloat(budgetSummary.operating.expenditureRate)} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatMillions(budgetSummary.operating.paidExpenditure)} / {formatMillions(budgetSummary.operating.forecastExpenditure)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Investment Section */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Section Investissement
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Recettes</span>
                      <span className="font-medium">{budgetSummary.investment.revenueRate}%</span>
                    </div>
                    <Progress value={parseFloat(budgetSummary.investment.revenueRate)} className="h-2 [&>div]:bg-accent" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatMillions(budgetSummary.investment.paidRevenue)} / {formatMillions(budgetSummary.investment.forecastRevenue)}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Dépenses</span>
                      <span className="font-medium">{budgetSummary.investment.expenditureRate}%</span>
                    </div>
                    <Progress value={parseFloat(budgetSummary.investment.expenditureRate)} className="h-2 [&>div]:bg-accent" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatMillions(budgetSummary.investment.paidExpenditure)} / {formatMillions(budgetSummary.investment.forecastExpenditure)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-end">
              <Button variant="outline" size="sm">
                Voir détails budget
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertes
            </CardTitle>
            <CardDescription>{alerts.length} alertes en cours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={cn(
                  "p-3 rounded-lg border",
                  alert.level === 'critical' && "bg-destructive/10 border-destructive/30",
                  alert.level === 'alert' && "bg-orange-500/10 border-orange-500/30",
                  alert.level === 'warning' && "bg-amber-500/10 border-amber-500/30",
                  alert.level === 'info' && "bg-blue-500/10 border-blue-500/30"
                )}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className={cn(
                    "h-4 w-4 mt-0.5",
                    alert.level === 'critical' && "text-destructive",
                    alert.level === 'alert' && "text-orange-500",
                    alert.level === 'warning' && "text-amber-500",
                    alert.level === 'info' && "text-blue-500"
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    {alert.deadline && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Échéance: {alert.deadline.toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Projects & Personnel */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Projets d'Investissement
            </CardTitle>
            <CardDescription>
              {stats.projects.total} projets • {stats.projects.inProgress} en cours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.title}</p>
                  <p className="text-xs text-muted-foreground">{project.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.progressPercentage}%</p>
                    <Progress value={project.progressPercentage} className="w-20 h-1.5" />
                  </div>
                  <Badge variant={
                    project.status === 'in_progress' ? 'default' :
                    project.status === 'delayed' ? 'destructive' : 'secondary'
                  }>
                    {project.phase}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" size="sm">
              Voir tous les projets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Personnel Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Ressources Humaines
            </CardTitle>
            <CardDescription>
              {stats.personnel.total} agents • Masse salariale: {formatMillions(stats.personnel.payrollCost)} FCFA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.personnel.elected}</p>
                <p className="text-sm text-muted-foreground">Élus locaux</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.personnel.agents}</p>
                <p className="text-sm text-muted-foreground">Agents</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Ratio charges personnel</span>
                <span className="text-sm font-medium">
                  {((stats.personnel.payrollCost / budgetSummary.operating.forecastExpenditure) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(stats.personnel.payrollCost / budgetSummary.operating.forecastExpenditure) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Seuil recommandé: 60% du budget de fonctionnement
              </p>
            </div>

            <Button variant="outline" className="w-full mt-4" size="sm">
              Voir détails RH
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Planifier Session</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Nouvelle Délibération</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Wallet className="h-5 w-5" />
              <span className="text-sm">Créer Engagement</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Briefcase className="h-5 w-5" />
              <span className="text-sm">Nouveau Projet</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
