import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TenantProvider } from "@/contexts/TenantContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { ConseilPage } from "./pages/conseil/ConseilPage";
import { BudgetPage } from "./pages/budget/BudgetPage";
import { TutellePage } from "./pages/tutelle/TutellePage";
import { RHPage } from "./pages/rh/RHPage";
import { PatrimoinePage } from "./pages/patrimoine/PatrimoinePage";
import { CitoyenPage } from "./pages/citoyen/CitoyenPage";
import { DemoConseillPage } from "./pages/demo/DemoConseillPage";
import { DemoMapPage } from "./pages/demo/DemoMapPage";
import { ConseilHomePage } from "./pages/conseil/ConseilHomePage";
import { WoleuHomePage } from "./pages/conseil/WoleuHomePage";
import { WoleuProgramPage } from "./pages/conseil/woleu/WoleuProgramPage";
import { WoleuActualitesPage } from "./pages/conseil/woleu/WoleuActualitesPage";
import { WoleuSensibilisationPage } from "./pages/conseil/woleu/WoleuSensibilisationPage";
import { WoleuVisionPage } from "./pages/conseil/woleu/WoleuVisionPage";
import { WoleuChantiersPage } from "./pages/conseil/woleu/WoleuChantiersPage";
import { WoleuTransparentPage } from "./pages/conseil/woleu/WoleuTransparentPage";
import { WoleuCerclesPage } from "./pages/conseil/woleu/WoleuCerclesPage";
import { WoleuDecouvrirPage } from "./pages/conseil/woleu/WoleuDecouvrirPage";
import { WoleuAuthPage } from "./pages/conseil/woleu/WoleuAuthPage";

// Public pages
import { HomePage } from "./pages/public/HomePage";
import { ActualitesPage } from "./pages/public/ActualitesPage";
import { SensibilisationPage } from "./pages/public/SensibilisationPage";
import { TutorielsPage } from "./pages/public/TutorielsPage";
import { ProcessusPage } from "./pages/public/ProcessusPage";
import { DemoPublicPage } from "./pages/public/DemoPublicPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <TenantProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/actualites" element={<ActualitesPage />} />
              <Route path="/sensibilisation" element={<SensibilisationPage />} />
              <Route path="/tutoriels" element={<TutorielsPage />} />
              <Route path="/processus" element={<ProcessusPage />} />
              <Route path="/demo" element={<DemoPublicPage />} />
              
              {/* Map of 42 departmental councils */}
              <Route path="/conseils" element={<DemoMapPage />} />
              
              {/* Woleu special pages */}
              <Route path="/conseil/woleu" element={<WoleuHomePage />} />
              <Route path="/conseil/woleu/programme" element={<WoleuProgramPage />} />
              <Route path="/conseil/woleu/actualites" element={<WoleuActualitesPage />} />
              <Route path="/conseil/woleu/sensibilisation" element={<WoleuSensibilisationPage />} />
              <Route path="/conseil/woleu/vision" element={<WoleuVisionPage />} />
              <Route path="/conseil/woleu/chantiers" element={<WoleuChantiersPage />} />
              <Route path="/conseil/woleu/transparent" element={<WoleuTransparentPage />} />
              <Route path="/conseil/woleu/cercles" element={<WoleuCerclesPage />} />
              <Route path="/conseil/woleu/decouvrir" element={<WoleuDecouvrirPage />} />
              <Route path="/conseil/woleu/connexion" element={<WoleuAuthPage />} />
              
              {/* Individual departmental council pages */}
              <Route path="/conseil/:departmentId" element={<ConseilHomePage />} />
              
              {/* Admin demo page */}
              <Route path="/demo-conseil" element={<DemoConseillPage />} />
              
              {/* App routes with layout */}
              <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
              <Route path="/conseil" element={<AppLayout><ConseilPage /></AppLayout>} />
              <Route path="/budget" element={<AppLayout><BudgetPage /></AppLayout>} />
              <Route path="/tutelle" element={<AppLayout><TutellePage /></AppLayout>} />
              <Route path="/rh" element={<AppLayout><RHPage /></AppLayout>} />
              <Route path="/patrimoine" element={<AppLayout><PatrimoinePage /></AppLayout>} />
              <Route path="/citoyen" element={<AppLayout><CitoyenPage /></AppLayout>} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TenantProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
