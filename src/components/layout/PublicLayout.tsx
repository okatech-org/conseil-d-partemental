import { ReactNode } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { motion } from "framer-motion";

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main className="pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Conseil Départemental</h3>
          <p className="text-primary-foreground/70 text-sm">
            Au service des citoyens et du territoire.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="/" className="hover:text-primary-foreground transition-colors">Accueil</a></li>
            <li><a href="/actualites" className="hover:text-primary-foreground transition-colors">Actualités</a></li>
            <li><a href="/sensibilisation" className="hover:text-primary-foreground transition-colors">Sensibilisation</a></li>
            <li><a href="/tutoriels" className="hover:text-primary-foreground transition-colors">Tutoriels</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Ressources</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="/processus" className="hover:text-primary-foreground transition-colors">Processus</a></li>
            <li><a href="/demo" className="hover:text-primary-foreground transition-colors">Démonstration</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-primary-foreground/70">
            Hôtel du Département<br />
            contact@departement.fr
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
        © 2026 Conseil Départemental. Tous droits réservés.
      </div>
    </div>
  </footer>
);
