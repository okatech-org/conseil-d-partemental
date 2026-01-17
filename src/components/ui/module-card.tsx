import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon, ArrowRight } from "lucide-react";

const moduleCardVariants = cva(
  "group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-card border-border hover:border-primary/30 hover:shadow-elevated",
        highlighted: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 hover:shadow-elevated",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconContainerVariants = cva(
  "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
  {
    variants: {
      color: {
        primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
        secondary: "bg-secondary/20 text-secondary-foreground group-hover:bg-secondary group-hover:text-secondary-foreground",
        accent: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
        success: "bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground",
        warning: "bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground",
        info: "bg-info/10 text-info group-hover:bg-info group-hover:text-info-foreground",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

export interface ModuleCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof moduleCardVariants> {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "info";
  stats?: {
    active: number;
    pending: number;
  };
}

const ModuleCard = React.forwardRef<HTMLDivElement, ModuleCardProps>(
  ({ className, variant, title, description, icon: Icon, color = "primary", stats, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(moduleCardVariants({ variant, className }))}
        {...props}
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className={cn(iconContainerVariants({ color }))}>
              <Icon className="h-6 w-6" />
            </div>
            
            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
          </div>
          
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
          
          {stats && (
            <div className="mt-4 flex items-center gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">{stats.active} actifs</span>
              </div>
              {stats.pending > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-warning" />
                  <span className="text-xs text-muted-foreground">{stats.pending} en attente</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ModuleCard.displayName = "ModuleCard";

export { ModuleCard, moduleCardVariants };
