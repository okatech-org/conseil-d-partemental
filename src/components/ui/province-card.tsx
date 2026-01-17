import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Province } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface ProvinceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  province: Province;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent':
      return 'bg-success/10 text-success border-success/20';
    case 'good':
      return 'bg-info/10 text-info border-info/20';
    case 'warning':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'critical':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

const ProvinceCard = React.forwardRef<HTMLDivElement, ProvinceCardProps>(
  ({ className, province, isExpanded, onToggle, ...props }, ref) => {
    const totalBudget = province.departments.reduce((sum, d) => sum + d.budget, 0);
    const totalExecuted = province.departments.reduce((sum, d) => sum + d.budgetExecuted, 0);
    const executionRate = Math.round((totalExecuted / totalBudget) * 100);
    const totalAlerts = province.departments.reduce((sum, d) => sum + d.alerts, 0);
    const avgCompliance = Math.round(
      province.departments.reduce((sum, d) => sum + d.complianceScore, 0) / province.departments.length
    );

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card overflow-hidden transition-all duration-300",
          isExpanded && "shadow-elevated",
          className
        )}
        {...props}
      >
        {/* Header */}
        <button
          onClick={onToggle}
          className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm",
              `bg-${province.color}`
            )}
            style={{
              backgroundColor: `hsl(var(--${province.color}))`
            }}
            >
              {province.code}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">{province.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{province.departments.length} départements</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <div className="text-right">
                <p className="text-muted-foreground">Budget</p>
                <p className="font-semibold">{totalBudget}M FCFA</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-right">
                <p className="text-muted-foreground">Exécution</p>
                <p className="font-semibold text-success">{executionRate}%</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-right">
                <p className="text-muted-foreground">Conformité</p>
                <p className={cn(
                  "font-semibold",
                  avgCompliance >= 85 ? "text-success" : avgCompliance >= 70 ? "text-warning" : "text-destructive"
                )}>{avgCompliance}%</p>
              </div>
            </div>
            
            {totalAlerts > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                {totalAlerts}
              </Badge>
            )}
            
            <ChevronRight className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-90"
            )} />
          </div>
        </button>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border">
            <div className="p-4 bg-muted/30">
              <div className="grid gap-2">
                {province.departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-md flex items-center justify-center text-xs font-medium border",
                        getStatusColor(dept.status)
                      )}>
                        {dept.code}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{dept.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Pop. {(dept.population / 1000).toFixed(0)}k • Budget {dept.budget}M FCFA
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex items-center gap-3 text-xs">
                        <div className="text-right">
                          <span className="text-muted-foreground">Exéc.</span>
                          <span className="ml-1 font-medium">{Math.round((dept.budgetExecuted / dept.budget) * 100)}%</span>
                        </div>
                        <div className="text-right">
                          <span className="text-muted-foreground">Conf.</span>
                          <span className={cn(
                            "ml-1 font-medium",
                            dept.complianceScore >= 85 ? "text-success" : dept.complianceScore >= 70 ? "text-warning" : "text-destructive"
                          )}>{dept.complianceScore}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {dept.status === 'excellent' && <CheckCircle2 className="h-4 w-4 text-success" />}
                          {dept.status === 'critical' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                          {dept.alerts > 0 && (
                            <Badge variant="outline" className="text-xs h-5">
                              {dept.alerts} alerte{dept.alerts > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
ProvinceCard.displayName = "ProvinceCard";

export { ProvinceCard };
