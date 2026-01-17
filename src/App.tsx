import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TenantProvider } from "@/contexts/TenantContext";
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
  </QueryClientProvider>
);

export default App;
