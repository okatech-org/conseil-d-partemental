import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto">
        <Dashboard />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                <span className="text-sm font-bold text-primary-foreground">CD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Plateforme Conseil Départemental</p>
                <p className="text-xs text-muted-foreground">République Gabonaise - Ministère de l'Intérieur</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © 2026 Direction Générale de la Décentralisation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
