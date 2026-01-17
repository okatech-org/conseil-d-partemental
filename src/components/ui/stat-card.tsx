import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const statCardVariants = cva(
  "relative overflow-hidden rounded-xl p-6 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border border-border shadow-soft hover:shadow-elevated",
        primary: "gradient-hero text-primary-foreground",
        secondary: "gradient-gold text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        info: "bg-info text-info-foreground",
        ghost: "bg-transparent border border-border",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  decorative?: boolean;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant, size, title, value, subtitle, icon: Icon, trend, decorative = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statCardVariants({ variant, size, className }))}
        {...props}
      >
        {decorative && (
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        )}
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className={cn(
                "text-sm font-medium",
                variant === "default" ? "text-muted-foreground" : "opacity-80"
              )}>
                {title}
              </p>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {subtitle && (
                <p className={cn(
                  "text-sm",
                  variant === "default" ? "text-muted-foreground" : "opacity-70"
                )}>
                  {subtitle}
                </p>
              )}
            </div>
            
            {Icon && (
              <div className={cn(
                "rounded-lg p-2.5",
                variant === "default" 
                  ? "bg-primary/10 text-primary" 
                  : "bg-white/20 text-current"
              )}>
                <Icon className="h-5 w-5" />
              </div>
            )}
          </div>
          
          {trend && (
            <div className="mt-4 flex items-center gap-2">
              <span className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                trend.value >= 0 
                  ? "bg-success/20 text-success" 
                  : "bg-destructive/20 text-destructive"
              )}>
                {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className={cn(
                "text-xs",
                variant === "default" ? "text-muted-foreground" : "opacity-70"
              )}>
                {trend.label}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
StatCard.displayName = "StatCard";

export { StatCard, statCardVariants };
