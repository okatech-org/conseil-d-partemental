import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, TrendingUp, FileText, Users, Wallet, PieChart,
  ArrowUp, ArrowDown, Download, Search, Filter,
  Building2, HeartPulse, GraduationCap, Sprout, CheckCircle2,
  AlertCircle, Clock, BarChart3
} from 'lucide-react';
import transparentMeetingImg from '@/assets/woleu/transparent-meeting.jpg';

const budgetOverview = {
  total: 2800000000,
  spent: 1250000000,
  committed: 850000000,
  available: 700000000
};

const budgetByCategory = [
  { name: "Infrastructures", amount: 980000000, percentage: 35, color: "bg-orange-500" },
  { name: "Santé", amount: 560000000, percentage: 20, color: "bg-red-500" },
  { name: "Éducation", amount: 420000000, percentage: 15, color: "bg-blue-500" },
  { name: "Économie locale", amount: 392000000, percentage: 14, color: "bg-green-500" },
  { name: "Gouvernance", amount: 168000000, percentage: 6, color: "bg-purple-500" },
  { name: "Fonctionnement", amount: 280000000, percentage: 10, color: "bg-gray-500" }
];

const recentTransactions = [
  { id: 1, description: "Achat matériaux - Route Oyem-Bitam", amount: 45000000, date: "2025-01-20", category: "Infrastructures", type: "expense" },
  { id: 2, description: "Dotation État - Q1 2025", amount: 350000000, date: "2025-01-15", category: "Recettes", type: "income" },
  { id: 3, description: "Équipements médicaux - Mitzic", amount: 28000000, date: "2025-01-12", category: "Santé", type: "expense" },
  { id: 4, description: "Kits scolaires - Distribution", amount: 12500000, date: "2025-01-10", category: "Éducation", type: "expense" },
  { id: 5, description: "Formation agents", amount: 8000000, date: "2025-01-08", category: "Fonctionnement", type: "expense" }
];

const projects = [
  { name: "Route Oyem-Bitam", progress: 45, budget: 2500000000, spent: 1125000000, status: "En cours" },
  { name: "Centre de santé Mitzic", progress: 78, budget: 280000000, spent: 218400000, status: "En cours" },
  { name: "Rénovation écoles Oyem", progress: 92, budget: 320000000, spent: 294400000, status: "Finition" },
  { name: "Électrification solaire", progress: 35, budget: 380000000, spent: 133000000, status: "En cours" },
  { name: "Plateforme numérique", progress: 85, budget: 45000000, spent: 38250000, status: "En cours" }
];

const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} Mds`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)} M`;
  }
  return amount.toLocaleString();
};

export const WoleuTransparentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader />
      
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={transparentMeetingImg} 
            alt="Réunion transparente du Conseil" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="transparent-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#transparent-grid)" className="text-white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Eye className="w-3 h-3 mr-1" />
              Transparence totale
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
              Woleu <span className="text-amber-400">Transparent</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Suivez en temps réel l'utilisation des fonds publics et l'avancement des projets. 
              Chaque franc compte, chaque franc est tracé.
            </p>

            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Données mises à jour en temps réel
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Budget Total</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(budgetOverview.total)} FCFA</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Dépensé</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(budgetOverview.spent)} FCFA</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {((budgetOverview.spent / budgetOverview.total) * 100).toFixed(1)}% du budget
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-muted-foreground">Engagé</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(budgetOverview.committed)} FCFA</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-muted-foreground">Disponible</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(budgetOverview.available)} FCFA</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Budget by Category */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Répartition du budget
                      </CardTitle>
                      <CardDescription>
                        Allocation des fonds par secteur d'activité
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {budgetByCategory.map((category, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                                <span className="font-medium">{category.name}</span>
                              </div>
                              <div className="text-sm">
                                <span className="font-bold">{formatCurrency(category.amount)}</span>
                                <span className="text-muted-foreground ml-2">({category.percentage}%)</span>
                              </div>
                            </div>
                            <Progress value={category.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Activité récente
                      </CardTitle>
                      <CardDescription>
                        Dernières transactions enregistrées
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.slice(0, 5).map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{transaction.description}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                                <Badge variant="outline" className="text-xs">{transaction.category}</Badge>
                              </div>
                            </div>
                            <div className={`font-bold whitespace-nowrap ml-4 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full mt-4">
                        Voir toutes les transactions
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Suivi des projets</CardTitle>
                        <CardDescription>État d'avancement de tous les projets en cours</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Projet</th>
                            <th className="text-left py-3 px-4 font-medium">Avancement</th>
                            <th className="text-left py-3 px-4 font-medium">Budget</th>
                            <th className="text-left py-3 px-4 font-medium">Dépensé</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project, index) => (
                            <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                              <td className="py-4 px-4 font-medium">{project.name}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <Progress value={project.progress} className="h-2 w-24" />
                                  <span className="text-sm">{project.progress}%</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">{formatCurrency(project.budget)} FCFA</td>
                              <td className="py-4 px-4">{formatCurrency(project.spent)} FCFA</td>
                              <td className="py-4 px-4">
                                <Badge variant={project.status === 'Finition' ? 'default' : 'secondary'}>
                                  {project.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="transactions">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle>Journal des transactions</CardTitle>
                        <CardDescription>Historique complet des mouvements financiers</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filtrer
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Exporter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <Card key={transaction.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                  {transaction.type === 'income' ? (
                                    <ArrowDown className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <ArrowUp className="w-5 h-5 text-red-600" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{transaction.description}</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{new Date(transaction.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    <span>•</span>
                                    <Badge variant="outline">{transaction.category}</Badge>
                                  </div>
                                </div>
                              </div>
                              <div className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)} FCFA
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Notre engagement
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              La transparence n'est pas un slogan
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Chaque transaction, chaque dépense, chaque projet est documenté et accessible. 
              Vous avez le droit de savoir comment votre argent est utilisé.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <FileText className="w-10 h-10 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Rapports mensuels</h3>
                  <p className="text-sm text-muted-foreground">
                    Publication mensuelle des états financiers
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-10 h-10 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Audits citoyens</h3>
                  <p className="text-sm text-muted-foreground">
                    Les Cercles Citoyens vérifient les comptes
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <AlertCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Signalements</h3>
                  <p className="text-sm text-muted-foreground">
                    Canal sécurisé pour signaler les irrégularités
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
