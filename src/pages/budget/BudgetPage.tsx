import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Receipt,
  CreditCard,
  Banknote,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { mockBudgetLines, calculateBudgetSummary } from '@/lib/mock-data';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount);
};

const formatMillions = (amount: number) => {
  return (amount / 1000000).toFixed(1) + 'M';
};

export function BudgetPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedSection, setSelectedSection] = useState('all');

  const budgetLines = mockBudgetLines;
  const summary = calculateBudgetSummary(budgetLines);

  const filteredLines = budgetLines.filter(line => {
    if (selectedSection === 'all') return true;
    if (selectedSection === 'operating') return line.section === 'operating';
    if (selectedSection === 'investment') return line.section === 'investment';
    return true;
  });

  const operatingLines = budgetLines.filter(l => l.section === 'operating');
  const investmentLines = budgetLines.filter(l => l.section === 'investment');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Budget & Finances</h1>
          <p className="text-muted-foreground">
            Élaboration, exécution et suivi budgétaire
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel Engagement
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget Voté
            </CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">520M</div>
            <p className="text-xs text-muted-foreground">
              Budget primitif 2026
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recettes Encaissées
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatMillions(summary.operating.paidRevenue + summary.investment.paidRevenue)}
            </div>
            <Progress 
              value={((summary.operating.paidRevenue + summary.investment.paidRevenue) / 
                     (summary.operating.forecastRevenue + summary.investment.forecastRevenue)) * 100} 
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dépenses Payées
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatMillions(summary.operating.paidExpenditure + summary.investment.paidExpenditure)}
            </div>
            <Progress 
              value={((summary.operating.paidExpenditure + summary.investment.paidExpenditure) / 
                     (summary.operating.forecastExpenditure + summary.investment.forecastExpenditure)) * 100} 
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Solde Disponible
            </CardTitle>
            <Calculator className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMillions(
                (summary.operating.paidRevenue + summary.investment.paidRevenue) -
                (summary.operating.paidExpenditure + summary.investment.paidExpenditure)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Trésorerie courante
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview" className="gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Vue d'ensemble</span>
          </TabsTrigger>
          <TabsTrigger value="lines" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Lignes</span>
          </TabsTrigger>
          <TabsTrigger value="engagements" className="gap-2">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">Engagements</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Mandats</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Operating Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  Section Fonctionnement
                </CardTitle>
                <CardDescription>
                  Prévisions: {formatMillions(summary.operating.forecastRevenue)} FCFA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Revenues */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Recettes</h4>
                  <div className="space-y-2">
                    {operatingLines.filter(l => l.type === 'revenue').map(line => (
                      <div key={line.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground truncate max-w-[200px]">
                          {line.code} - {line.title}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs">
                            {formatCurrency(line.paidAmount)} / {formatCurrency(line.forecastAmount)}
                          </span>
                          <div className="w-16">
                            <Progress value={line.executionRate} className="h-1.5" />
                          </div>
                          <span className="w-10 text-right text-xs font-medium">
                            {line.executionRate}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expenditures */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Dépenses</h4>
                  <div className="space-y-2">
                    {operatingLines.filter(l => l.type === 'expenditure').slice(0, 5).map(line => (
                      <div key={line.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground truncate max-w-[200px]">
                          {line.code} - {line.title}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs">
                            {formatCurrency(line.paidAmount)} / {formatCurrency(line.forecastAmount)}
                          </span>
                          <div className="w-16">
                            <Progress value={line.executionRate} className="h-1.5" />
                          </div>
                          <span className="w-10 text-right text-xs font-medium">
                            {line.executionRate}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="pt-4 border-t grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
                    <p className="text-xs text-muted-foreground">Total Recettes</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatMillions(summary.operating.paidRevenue)}
                    </p>
                    <p className="text-xs text-green-600">{summary.operating.revenueRate}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950">
                    <p className="text-xs text-muted-foreground">Total Dépenses</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatMillions(summary.operating.paidExpenditure)}
                    </p>
                    <p className="text-xs text-red-600">{summary.operating.expenditureRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Section Investissement
                </CardTitle>
                <CardDescription>
                  Prévisions: {formatMillions(summary.investment.forecastRevenue)} FCFA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Revenues */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Recettes</h4>
                  <div className="space-y-2">
                    {investmentLines.filter(l => l.type === 'revenue').map(line => (
                      <div key={line.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground truncate max-w-[200px]">
                          {line.code} - {line.title}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs">
                            {formatCurrency(line.paidAmount)} / {formatCurrency(line.forecastAmount)}
                          </span>
                          <div className="w-16">
                            <Progress value={line.executionRate} className="h-1.5 [&>div]:bg-accent" />
                          </div>
                          <span className="w-10 text-right text-xs font-medium">
                            {line.executionRate}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expenditures */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Dépenses</h4>
                  <div className="space-y-2">
                    {investmentLines.filter(l => l.type === 'expenditure').map(line => (
                      <div key={line.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground truncate max-w-[200px]">
                          {line.code} - {line.title}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs">
                            {formatCurrency(line.paidAmount)} / {formatCurrency(line.forecastAmount)}
                          </span>
                          <div className="w-16">
                            <Progress value={line.executionRate} className="h-1.5 [&>div]:bg-accent" />
                          </div>
                          <span className="w-10 text-right text-xs font-medium">
                            {line.executionRate}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="pt-4 border-t grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
                    <p className="text-xs text-muted-foreground">Total Recettes</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatMillions(summary.investment.paidRevenue)}
                    </p>
                    <p className="text-xs text-green-600">{summary.investment.revenueRate}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950">
                    <p className="text-xs text-muted-foreground">Total Dépenses</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatMillions(summary.investment.paidExpenditure)}
                    </p>
                    <p className="text-xs text-red-600">{summary.investment.expenditureRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alertes Budgétaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">
                      Charges de personnel élevées
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Les charges de personnel représentent 62% du budget de fonctionnement. 
                      Le seuil recommandé est de 60%.
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Budget additionnel à préparer
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Le budget additionnel doit être voté avant le 30 juin 2026.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Lines Tab */}
        <TabsContent value="lines" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sections</SelectItem>
                  <SelectItem value="operating">Fonctionnement</SelectItem>
                  <SelectItem value="investment">Investissement</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-9" />
              </div>
            </div>
            <div className="flex gap-2">
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
                    <TableHead>Code</TableHead>
                    <TableHead>Libellé</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead className="text-right">Prévisions</TableHead>
                    <TableHead className="text-right">Réalisations</TableHead>
                    <TableHead className="text-right">Taux</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLines.map((line) => (
                    <TableRow key={line.id}>
                      <TableCell className="font-mono">{line.code}</TableCell>
                      <TableCell>{line.title}</TableCell>
                      <TableCell>
                        <Badge variant={line.section === 'operating' ? 'default' : 'secondary'}>
                          {line.section === 'operating' ? 'Fonct.' : 'Invest.'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(line.forecastAmount)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(line.paidAmount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={line.executionRate} className="w-16 h-1.5" />
                          <span className={cn(
                            "text-sm font-medium w-12",
                            line.executionRate >= 80 ? "text-green-600" :
                            line.executionRate >= 50 ? "text-amber-600" : "text-red-600"
                          )}>
                            {line.executionRate}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagements Tab */}
        <TabsContent value="engagements" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un engagement..." className="pl-9" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel Engagement
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagements en cours</CardTitle>
              <CardDescription>
                Suivi de la chaîne de la dépense
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun engagement en attente</p>
                <Button className="mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un engagement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un mandat..." className="pl-9" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Mandat
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mandats de paiement</CardTitle>
              <CardDescription>
                Suivi des ordres de paiement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun mandat en attente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
