-- Tables pour Woleu Transparent - Données budgétaires en temps réel

-- Vue d'ensemble du budget
CREATE TABLE public.woleu_budget_overview (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    fiscal_year INTEGER NOT NULL DEFAULT 2025,
    total BIGINT NOT NULL DEFAULT 0,
    spent BIGINT NOT NULL DEFAULT 0,
    committed BIGINT NOT NULL DEFAULT 0,
    available BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (fiscal_year)
);

-- Catégories budgétaires
CREATE TABLE public.woleu_budget_categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    amount BIGINT NOT NULL DEFAULT 0,
    percentage INTEGER NOT NULL DEFAULT 0,
    color TEXT NOT NULL DEFAULT 'bg-gray-500',
    icon TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    fiscal_year INTEGER NOT NULL DEFAULT 2025,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Transactions financières
CREATE TABLE public.woleu_transactions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    description TEXT NOT NULL,
    amount BIGINT NOT NULL,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    category TEXT NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('income', 'expense')),
    reference_number TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projets et leur avancement
CREATE TABLE public.woleu_projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    budget BIGINT NOT NULL DEFAULT 0,
    spent BIGINT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Planifié' CHECK (status IN ('Planifié', 'Démarré', 'En cours', 'Finition', 'Terminé', 'Suspendu')),
    category TEXT,
    start_date DATE,
    expected_end_date DATE,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (lecture publique pour transparence)
ALTER TABLE public.woleu_budget_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.woleu_budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.woleu_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.woleu_projects ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique (transparence citoyenne)
CREATE POLICY "Lecture publique du budget" ON public.woleu_budget_overview FOR SELECT USING (true);
CREATE POLICY "Lecture publique des catégories" ON public.woleu_budget_categories FOR SELECT USING (true);
CREATE POLICY "Lecture publique des transactions" ON public.woleu_transactions FOR SELECT USING (true);
CREATE POLICY "Lecture publique des projets" ON public.woleu_projects FOR SELECT USING (true);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers pour updated_at
CREATE TRIGGER update_woleu_budget_overview_updated_at
    BEFORE UPDATE ON public.woleu_budget_overview
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_woleu_budget_categories_updated_at
    BEFORE UPDATE ON public.woleu_budget_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_woleu_transactions_updated_at
    BEFORE UPDATE ON public.woleu_transactions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_woleu_projects_updated_at
    BEFORE UPDATE ON public.woleu_projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Activer le temps réel sur ces tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.woleu_budget_overview;
ALTER PUBLICATION supabase_realtime ADD TABLE public.woleu_budget_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.woleu_transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.woleu_projects;

-- Données initiales pour le budget 2025
INSERT INTO public.woleu_budget_overview (fiscal_year, total, spent, committed, available) VALUES
(2025, 2800000000, 1250000000, 850000000, 700000000);

-- Données initiales pour les catégories
INSERT INTO public.woleu_budget_categories (name, amount, percentage, color, icon, display_order, fiscal_year) VALUES
('Infrastructures', 980000000, 35, 'bg-orange-500', 'Building2', 1, 2025),
('Santé', 560000000, 20, 'bg-red-500', 'HeartPulse', 2, 2025),
('Éducation', 420000000, 15, 'bg-blue-500', 'GraduationCap', 3, 2025),
('Économie locale', 392000000, 14, 'bg-green-500', 'Sprout', 4, 2025),
('Gouvernance', 168000000, 6, 'bg-purple-500', 'Scale', 5, 2025),
('Fonctionnement', 280000000, 10, 'bg-gray-500', 'Settings', 6, 2025);

-- Données initiales pour les transactions
INSERT INTO public.woleu_transactions (description, amount, transaction_date, category, transaction_type) VALUES
('Achat matériaux - Route Oyem-Bitam', 45000000, '2025-01-20', 'Infrastructures', 'expense'),
('Dotation État - Q1 2025', 350000000, '2025-01-15', 'Recettes', 'income'),
('Équipements médicaux - Mitzic', 28000000, '2025-01-12', 'Santé', 'expense'),
('Kits scolaires - Distribution', 12500000, '2025-01-10', 'Éducation', 'expense'),
('Formation agents', 8000000, '2025-01-08', 'Fonctionnement', 'expense'),
('Panneaux solaires - Lot 1', 35000000, '2025-01-05', 'Économie locale', 'expense'),
('Subvention agricole départementale', 120000000, '2025-01-03', 'Recettes', 'income');

-- Données initiales pour les projets
INSERT INTO public.woleu_projects (name, description, progress, budget, spent, status, category, location) VALUES
('Route Oyem-Bitam', 'Bitumage de l''axe principal reliant Oyem à Bitam', 45, 2500000000, 1125000000, 'En cours', 'Infrastructures', 'Oyem-Bitam'),
('Centre de santé Mitzic', 'Rénovation et équipement complet du centre de santé', 78, 280000000, 218400000, 'En cours', 'Santé', 'Mitzic'),
('Rénovation écoles Oyem', 'Réhabilitation des établissements scolaires du chef-lieu', 92, 320000000, 294400000, 'Finition', 'Éducation', 'Oyem'),
('Électrification solaire', 'Installation de panneaux solaires dans 25 villages', 35, 380000000, 133000000, 'En cours', 'Économie locale', 'Département'),
('Plateforme Woleu Transparent', 'Développement de la plateforme numérique de transparence', 85, 45000000, 38250000, 'En cours', 'Gouvernance', 'Oyem'),
('Pont sur l''Okano', 'Construction d''un pont sur la rivière Okano', 20, 450000000, 90000000, 'Démarré', 'Infrastructures', 'Canton Kyé'),
('Caravanes médicales', 'Organisation de campagnes médicales mobiles', 60, 120000000, 72000000, 'En cours', 'Santé', 'Département');