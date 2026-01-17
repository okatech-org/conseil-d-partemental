import { useState } from "react";
import { 
  Users, 
  Wallet, 
  Shield, 
  UserCog, 
  Building2, 
  Globe,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Calendar,
  FileCheck,
  Clock
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { ModuleCard } from "@/components/ui/module-card";
import { ProvinceCard } from "@/components/ui/province-card";
import { provinces, getTotalStats, modules } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, any> = {
  Users,
  Wallet,
  Shield,
  UserCog,
  Building2,
  Globe,
};

export function Dashboard() {
  const stats = getTotalStats();
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);
  
  const executionRate = Math.round((stats.totalExecuted / stats.totalBudget) * 100);

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl gradient-hero p-8 lg:p-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <Badge className="bg-secondary text-secondary-foreground shadow-gold">
                République Gabonaise
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-primary-foreground font-serif">
                Tableau de Bord National
              </h1>
              <p className="text-primary-foreground/80 max-w-2xl">
                Supervision en temps réel des {stats.totalDepartments} conseils départementaux 
                répartis sur {stats.totalProvinces} provinces. Population totale desservie : {(stats.totalPopulation / 1000000).toFixed(2)} millions d'habitants.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
              <Clock className="h-4 w-4" />
              <span>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Départements"
          value={stats.totalDepartments}
          subtitle={`Sur ${stats.totalProvinces} provinces`}
          icon={MapPin}
          variant="default"
        />
        <StatCard
          title="Budget Total"
          value={`${(stats.totalBudget / 1000).toFixed(1)} Mds`}
          subtitle="FCFA - Exercice 2026"
          icon={Wallet}
          trend={{ value: 12, label: "vs 2025" }}
          variant="default"
        />
        <StatCard
          title="Taux d'Exécution"
          value={`${executionRate}%`}
          subtitle={`${(stats.totalExecuted / 1000).toFixed(1)} Mds FCFA réalisés`}
          icon={TrendingUp}
          variant="default"
        />
        <StatCard
          title="Score Conformité"
          value={`${stats.avgCompliance}%`}
          subtitle={stats.avgCompliance >= 85 ? "Excellent" : stats.avgCompliance >= 70 ? "Satisfaisant" : "À améliorer"}
          icon={Shield}
          variant="default"
        />
      </div>

      {/* Alerts Section */}
      {(stats.criticalDepartments > 0 || stats.warningDepartments > 0) && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-destructive/20 p-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Alertes Actives</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.criticalDepartments > 0 && (
                  <span className="text-destructive font-medium">{stats.criticalDepartments} département{stats.criticalDepartments > 1 ? 's' : ''} en situation critique</span>
                )}
                {stats.criticalDepartments > 0 && stats.warningDepartments > 0 && ' • '}
                {stats.warningDepartments > 0 && (
                  <span className="text-warning font-medium">{stats.warningDepartments} département{stats.warningDepartments > 1 ? 's' : ''} sous surveillance</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="destructive" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  2 budgets non votés
                </Badge>
                <Badge variant="outline" className="gap-1 border-warning text-warning">
                  <FileCheck className="h-3 w-3" />
                  5 délibérations en attente
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  3 sessions à planifier
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Execution Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6 font-serif">Exécution Budgétaire par Section</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Section Fonctionnement</span>
                <span className="text-muted-foreground">72% exécuté</span>
              </div>
              <Progress value={72} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5.8 Mds FCFA réalisés</span>
                <span>8.1 Mds FCFA prévus</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Section Investissement</span>
                <span className="text-muted-foreground">58% exécuté</span>
              </div>
              <Progress value={58} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2.9 Mds FCFA réalisés</span>
                <span>5.0 Mds FCFA prévus</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">45</p>
                  <p className="text-xs text-muted-foreground">Budgets votés</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">2</p>
                  <p className="text-xs text-muted-foreground">En attente</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">89%</p>
                  <p className="text-xs text-muted-foreground">Transmis à temps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6 font-serif">Sessions du Conseil</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">Session T2 2026</p>
                  <p className="text-xs text-muted-foreground">Avril - Juin</p>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground">Terminée</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-info/10 border border-info/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-info/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="font-medium text-sm">Session T4 2026</p>
                  <p className="text-xs text-muted-foreground">Octobre - Décembre</p>
                </div>
              </div>
              <Badge variant="outline" className="border-info text-info">En cours</Badge>
            </div>
            
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sessions T2 tenues</span>
                <span className="font-medium">47/47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sessions T4 planifiées</span>
                <span className="font-medium text-warning">44/47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sessions extraordinaires</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 font-serif">Modules de Gestion</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.name}
              description={module.description}
              icon={iconMap[module.icon]}
              color={module.color as any}
              stats={module.stats}
            />
          ))}
        </div>
      </div>

      {/* Provinces List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground font-serif">Provinces & Départements</h2>
          <Badge variant="secondary" className="gap-1">
            <MapPin className="h-3 w-3" />
            {stats.totalDepartments} départements
          </Badge>
        </div>
        
        <div className="space-y-3">
          {provinces.map((province) => (
            <ProvinceCard
              key={province.id}
              province={province}
              isExpanded={expandedProvince === province.id}
              onToggle={() => setExpandedProvince(
                expandedProvince === province.id ? null : province.id
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
