import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BudgetOverview {
  id: string;
  fiscal_year: number;
  total: number;
  spent: number;
  committed: number;
  available: number;
  updated_at: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string | null;
  display_order: number;
  fiscal_year: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  transaction_date: string;
  category: string;
  transaction_type: 'income' | 'expense';
  reference_number: string | null;
  notes: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  progress: number;
  budget: number;
  spent: number;
  status: string;
  category: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  location: string | null;
  updated_at: string;
}

// Type assertion for Supabase client to work with new tables
const supabaseTyped = supabase as any;

export function useWoleuTransparentData() {
  const [budgetOverview, setBudgetOverview] = useState<BudgetOverview | null>(null);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch budget overview
        const { data: overviewData } = await supabaseTyped
          .from('woleu_budget_overview')
          .select('*')
          .eq('fiscal_year', 2025)
          .maybeSingle();
        
        if (overviewData) {
          setBudgetOverview(overviewData as BudgetOverview);
        }

        // Fetch categories
        const { data: categoriesData } = await supabaseTyped
          .from('woleu_budget_categories')
          .select('*')
          .eq('fiscal_year', 2025)
          .order('display_order', { ascending: true });
        
        if (categoriesData) {
          setCategories(categoriesData as BudgetCategory[]);
        }

        // Fetch recent transactions
        const { data: transactionsData } = await supabaseTyped
          .from('woleu_transactions')
          .select('*')
          .order('transaction_date', { ascending: false })
          .limit(20);
        
        if (transactionsData) {
          setTransactions(transactionsData as Transaction[]);
        }

        // Fetch projects
        const { data: projectsData } = await supabaseTyped
          .from('woleu_projects')
          .select('*')
          .order('progress', { ascending: false });
        
        if (projectsData) {
          setProjects(projectsData as Project[]);
        }

        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching Woleu Transparent data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    // Subscribe to budget overview changes
    const overviewChannel = supabase
      .channel('woleu-budget-overview')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'woleu_budget_overview' },
        (payload) => {
          console.log('Budget overview changed:', payload);
          if (payload.new && (payload.new as BudgetOverview).fiscal_year === 2025) {
            setBudgetOverview(payload.new as BudgetOverview);
            setLastUpdated(new Date());
          }
        }
      )
      .subscribe();

    // Subscribe to categories changes
    const categoriesChannel = supabase
      .channel('woleu-budget-categories')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'woleu_budget_categories' },
        async () => {
          console.log('Categories changed');
          const { data } = await supabaseTyped
            .from('woleu_budget_categories')
            .select('*')
            .eq('fiscal_year', 2025)
            .order('display_order', { ascending: true });
          
          if (data) {
            setCategories(data as BudgetCategory[]);
            setLastUpdated(new Date());
          }
        }
      )
      .subscribe();

    // Subscribe to transactions changes
    const transactionsChannel = supabase
      .channel('woleu-transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'woleu_transactions' },
        async (payload) => {
          console.log('Transactions changed:', payload);
          if (payload.eventType === 'INSERT') {
            setTransactions((prev) => [payload.new as Transaction, ...prev].slice(0, 20));
          } else {
            const { data } = await supabaseTyped
              .from('woleu_transactions')
              .select('*')
              .order('transaction_date', { ascending: false })
              .limit(20);
            
            if (data) {
              setTransactions(data as Transaction[]);
            }
          }
          setLastUpdated(new Date());
        }
      )
      .subscribe();

    // Subscribe to projects changes
    const projectsChannel = supabase
      .channel('woleu-projects')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'woleu_projects' },
        async (payload) => {
          console.log('Projects changed:', payload);
          if (payload.eventType === 'UPDATE') {
            setProjects((prev) =>
              prev.map((p) => (p.id === (payload.new as Project).id ? (payload.new as Project) : p))
            );
          } else {
            const { data } = await supabaseTyped
              .from('woleu_projects')
              .select('*')
              .order('progress', { ascending: false });
            
            if (data) {
              setProjects(data as Project[]);
            }
          }
          setLastUpdated(new Date());
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(overviewChannel);
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(transactionsChannel);
      supabase.removeChannel(projectsChannel);
    };
  }, []);

  return {
    budgetOverview,
    categories,
    transactions,
    projects,
    isLoading,
    lastUpdated,
  };
}
