import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Eye, TrendingUp, FileText, Users, Wallet, PieChart,
  ArrowUp, ArrowDown, Download, Search, Filter,
  Building2, HeartPulse, GraduationCap, Sprout, CheckCircle2,
  AlertCircle, Clock, BarChart3, RefreshCw, Wifi
} from 'lucide-react';
import transparentMeetingImg from '@/assets/woleu/transparent-meeting.jpg';
import { useWoleuTransparentData } from '@/hooks/useWoleuTransparentData';

const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} Mds`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)} M`;
  }
  return amount.toLocaleString();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const WoleuTransparentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { budgetOverview, categories, transactions, projects, isLoading, lastUpdated } = useWoleuTransparentData();

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
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <span>Temps réel • Mis à jour à {formatTime(lastUpdated)}</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-card shadow-lg">
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-8 w-32" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : budgetOverview ? (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Budget Total</span>
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(budgetOverview.total)} FCFA</div>
                    <div className="text-xs text-muted-foreground mt-1">Exercice 2025</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Dépensé</span>
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(budgetOverview.spent)} FCFA</div>
                    <div className="text-xs text-green-600 mt-1">
                      {((budgetOverview.spent / budgetOverview.total) * 100).toFixed(1)}% du budget
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Engagé</span>
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(budgetOverview.committed)} FCFA</div>
                    <div className="text-xs text-amber-600 mt-1">En attente d'exécution</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-purple-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Disponible</span>
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(budgetOverview.available)} FCFA</div>
                    <div className="text-xs text-purple-600 mt-1">Reste à allouer</div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          ) : null}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="gap-2">
                <PieChart className="w-4 h-4" />
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <Building2 className="w-4 h-4" />
                Projets
              </TabsTrigger>
              <TabsTrigger value="transactions" className="gap-2">
                <FileText className="w-4 h-4" />
                Transactions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Budget by Category */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-green-600" />
                        Répartition du budget
                      </CardTitle>
                      <CardDescription>
                        Allocation des fonds par secteur d'activité
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i}>
                              <Skeleton className="h-4 w-full mb-2" />
                              <Skeleton className="h-2 w-full" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {categories.map((category, index) => (
                            <motion.div 
                              key={category.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
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
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                            Activité récente
                          </CardTitle>
                          <CardDescription>
                            Dernières transactions enregistrées
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <RefreshCw className="w-3 h-3" />
                          Live
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2">
                              <div className="flex-1">
                                <Skeleton className="h-4 w-3/4 mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                              </div>
                              <Skeleton className="h-5 w-20" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {transactions.slice(0, 5).map((transaction, index) => (
                            <motion.div 
                              key={transaction.id} 
                              className="flex items-center justify-between py-3 border-b last:border-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  transaction.transaction_type === 'income' 
                                    ? 'bg-green-100 dark:bg-green-900/30' 
                                    : 'bg-red-100 dark:bg-red-900/30'
                                }`}>
                                  {transaction.transaction_type === 'income' ? (
                                    <ArrowDown className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <ArrowUp className="w-4 h-4 text-red-600" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{transaction.description}</p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{formatDate(transaction.transaction_date)}</span>
                                    <Badge variant="outline" className="text-xs py-0">{transaction.category}</Badge>
                                  </div>
                                </div>
                              </div>
                              <div className={`font-bold whitespace-nowrap text-sm ${
                                transaction.transaction_type === 'income' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.transaction_type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      <Button variant="ghost" className="w-full mt-4" onClick={() => setActiveTab('transactions')}>
                        Voir toutes les transactions
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-green-600" />
                          Suivi des projets
                        </CardTitle>
                        <CardDescription>État d'avancement de tous les projets en cours</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="gap-1">
                          <RefreshCw className="w-3 h-3" />
                          Temps réel
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Exporter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Skeleton key={i} className="h-16 w-full" />
                        ))}
                      </div>
                    ) : (
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
                              <motion.tr 
                                key={project.id} 
                                className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-4 px-4">
                                  <div>
                                    <div className="font-medium">{project.name}</div>
                                    {project.location && (
                                      <div className="text-xs text-muted-foreground">{project.location}</div>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-3">
                                    <Progress value={project.progress} className="h-2 w-24" />
                                    <span className="text-sm font-medium">{project.progress}%</span>
                                  </div>
                                </td>
                                <td className="py-4 px-4 font-medium">{formatCurrency(project.budget)} FCFA</td>
                                <td className="py-4 px-4">
                                  <div>
                                    <div>{formatCurrency(project.spent)} FCFA</div>
                                    <div className="text-xs text-muted-foreground">
                                      {((project.spent / project.budget) * 100).toFixed(0)}% utilisé
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <Badge variant={
                                    project.status === 'Terminé' ? 'default' :
                                    project.status === 'Finition' ? 'default' :
                                    project.status === 'En cours' ? 'secondary' :
                                    'outline'
                                  }>
                                    {project.status}
                                  </Badge>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="transactions">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          Journal des transactions
                        </CardTitle>
                        <CardDescription>Historique complet des mouvements financiers</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="gap-1">
                          <RefreshCw className="w-3 h-3" />
                          Temps réel
                        </Badge>
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
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Skeleton key={i} className="h-20 w-full" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {transactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <Card className="border hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                      transaction.transaction_type === 'income' 
                                        ? 'bg-green-100 dark:bg-green-900/30' 
                                        : 'bg-red-100 dark:bg-red-900/30'
                                    }`}>
                                      {transaction.transaction_type === 'income' ? (
                                        <ArrowDown className="w-6 h-6 text-green-600" />
                                      ) : (
                                        <ArrowUp className="w-6 h-6 text-red-600" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-medium">{transaction.description}</p>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{formatDate(transaction.transaction_date)}</span>
                                        <span>•</span>
                                        <Badge variant="outline">{transaction.category}</Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`text-lg font-bold ${
                                    transaction.transaction_type === 'income' ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {transaction.transaction_type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)} FCFA
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Download Reports */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold font-serif mb-2">Télécharger les rapports</h2>
            <p className="text-muted-foreground">Accédez aux documents officiels de transparence budgétaire</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Rapport trimestriel Q4 2024", type: "PDF", size: "2.4 MB" },
              { title: "État des dépenses Janvier 2025", type: "XLSX", size: "1.1 MB" },
              { title: "Avancement projets 2025", type: "PDF", size: "3.8 MB" }
            ].map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                    </div>
                    <Download className="w-5 h-5 text-muted-foreground group-hover:text-green-600 transition-colors" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
              Une anomalie détectée ?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              La transparence, c'est aussi le droit de signaler. 
              Si vous constatez une irrégularité, faites-le nous savoir.
            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold">
              Signaler une anomalie
            </Button>
          </motion.div>
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
