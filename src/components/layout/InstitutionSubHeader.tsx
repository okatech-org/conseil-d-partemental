import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface InstitutionSubHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  badge?: string;
}

export const InstitutionSubHeader = ({ 
  icon: Icon, 
  title, 
  description,
  badge 
}: InstitutionSubHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground py-12 px-4"
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Icon className="h-8 w-8" />
          </div>
          {badge && (
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
              {badge}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">{title}</h1>
        {description && (
          <p className="text-primary-foreground/80 text-lg max-w-2xl">{description}</p>
        )}
      </div>
    </motion.div>
  );
};
