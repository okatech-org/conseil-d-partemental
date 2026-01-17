export interface Department {
  id: string;
  name: string;
  code: string;
  population: number;
  budget: number;
  budgetExecuted: number;
  complianceScore: number;
  sessionsHeld: number;
  sessionsRequired: number;
  alerts: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface Province {
  id: string;
  name: string;
  code: string;
  departments: Department[];
  color: string;
}

export const provinces: Province[] = [
  {
    id: 'estuaire',
    name: 'Estuaire',
    code: 'EST',
    color: 'province-estuaire',
    departments: [
      { id: 'komo-ocean', name: 'Komo-Océan', code: 'KOC', population: 125000, budget: 450, budgetExecuted: 342, complianceScore: 94, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'komo-mondah', name: 'Komo-Mondah', code: 'KMO', population: 89000, budget: 320, budgetExecuted: 245, complianceScore: 87, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'libreville', name: 'Libreville', code: 'LBV', population: 850000, budget: 2800, budgetExecuted: 2150, complianceScore: 91, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'owendo', name: 'Owendo', code: 'OWE', population: 95000, budget: 380, budgetExecuted: 285, complianceScore: 82, sessionsHeld: 2, sessionsRequired: 2, alerts: 2, status: 'good' },
      { id: 'ntoum', name: 'Ntoum', code: 'NTO', population: 42000, budget: 180, budgetExecuted: 125, complianceScore: 78, sessionsHeld: 1, sessionsRequired: 2, alerts: 3, status: 'warning' },
      { id: 'cap-esterias', name: 'Cap-Estérias', code: 'CAP', population: 18000, budget: 95, budgetExecuted: 72, complianceScore: 85, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
    ]
  },
  {
    id: 'haut-ogooue',
    name: 'Haut-Ogooué',
    code: 'HOG',
    color: 'province-haut-ogooue',
    departments: [
      { id: 'djouori-agnili', name: 'Djouori-Agnili', code: 'DJA', population: 28000, budget: 250, budgetExecuted: 180, complianceScore: 72, sessionsHeld: 2, sessionsRequired: 2, alerts: 4, status: 'warning' },
      { id: 'lekoko', name: 'Lékoko', code: 'LEK', population: 15000, budget: 120, budgetExecuted: 92, complianceScore: 85, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'lekoni-lekori', name: 'Lékoni-Lékori', code: 'LKL', population: 22000, budget: 195, budgetExecuted: 146, complianceScore: 88, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'good' },
      { id: 'lemboumbi', name: 'Lemboumbi-Leyou', code: 'LEM', population: 18000, budget: 145, budgetExecuted: 98, complianceScore: 68, sessionsHeld: 1, sessionsRequired: 2, alerts: 5, status: 'critical' },
      { id: 'mpassa', name: 'Mpassa', code: 'MPA', population: 85000, budget: 520, budgetExecuted: 400, complianceScore: 87, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'plateaux', name: 'Plateaux', code: 'PLA', population: 32000, budget: 280, budgetExecuted: 202, complianceScore: 91, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'sebe-brikolo', name: 'Sébé-Brikolo', code: 'SEB', population: 12000, budget: 98, budgetExecuted: 71, complianceScore: 79, sessionsHeld: 2, sessionsRequired: 2, alerts: 2, status: 'warning' },
    ]
  },
  {
    id: 'moyen-ogooue',
    name: 'Moyen-Ogooué',
    code: 'MOG',
    color: 'province-moyen-ogooue',
    departments: [
      { id: 'abanga-bigne', name: 'Abanga-Bigné', code: 'ABA', population: 24000, budget: 210, budgetExecuted: 168, complianceScore: 90, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'ogooue-et-lacs', name: 'Ogooué et Lacs', code: 'OGL', population: 45000, budget: 340, budgetExecuted: 255, complianceScore: 86, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
    ]
  },
  {
    id: 'ngounie',
    name: 'Ngounié',
    code: 'NGO',
    color: 'province-ngounie',
    departments: [
      { id: 'dola', name: 'Dola', code: 'DOL', population: 18000, budget: 155, budgetExecuted: 112, complianceScore: 84, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'douya-onoy', name: 'Douya-Onoye', code: 'DOU', population: 28000, budget: 235, budgetExecuted: 188, complianceScore: 92, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'louetsi-bibaka', name: 'Louétsi-Bibaka', code: 'LBI', population: 14000, budget: 115, budgetExecuted: 78, complianceScore: 71, sessionsHeld: 1, sessionsRequired: 2, alerts: 4, status: 'warning' },
      { id: 'louetsi-wano', name: 'Louétsi-Wano', code: 'LWA', population: 16000, budget: 128, budgetExecuted: 95, complianceScore: 83, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'mougalaba', name: 'Mougalaba', code: 'MOU', population: 22000, budget: 185, budgetExecuted: 142, complianceScore: 88, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'good' },
      { id: 'ndolou', name: 'Ndolou', code: 'NDO', population: 19000, budget: 162, budgetExecuted: 121, complianceScore: 85, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'tsamba-magotsi', name: 'Tsamba-Magotsi', code: 'TSA', population: 35000, budget: 290, budgetExecuted: 232, complianceScore: 93, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
    ]
  },
  {
    id: 'nyanga',
    name: 'Nyanga',
    code: 'NYA',
    color: 'province-nyanga',
    departments: [
      { id: 'basse-banio', name: 'Basse-Banio', code: 'BBA', population: 12000, budget: 95, budgetExecuted: 68, complianceScore: 76, sessionsHeld: 2, sessionsRequired: 2, alerts: 2, status: 'warning' },
      { id: 'douigny', name: 'Douigny', code: 'DIG', population: 8000, budget: 72, budgetExecuted: 54, complianceScore: 82, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'doutsila', name: 'Doutsila', code: 'DTS', population: 10000, budget: 85, budgetExecuted: 62, complianceScore: 79, sessionsHeld: 2, sessionsRequired: 2, alerts: 2, status: 'warning' },
      { id: 'haute-banio', name: 'Haute-Banio', code: 'HBA', population: 15000, budget: 125, budgetExecuted: 98, complianceScore: 86, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'mougoutsi', name: 'Mougoutsi', code: 'MGT', population: 28000, budget: 235, budgetExecuted: 189, complianceScore: 91, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'mongo', name: 'Mongo', code: 'MON', population: 9000, budget: 78, budgetExecuted: 55, complianceScore: 74, sessionsHeld: 1, sessionsRequired: 2, alerts: 3, status: 'warning' },
    ]
  },
  {
    id: 'ogooue-ivindo',
    name: 'Ogooué-Ivindo',
    code: 'OIV',
    color: 'province-ogooue-ivindo',
    departments: [
      { id: 'ivindo', name: 'Ivindo', code: 'IVI', population: 18000, budget: 155, budgetExecuted: 118, complianceScore: 87, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'lope', name: 'Lopé', code: 'LOP', population: 12000, budget: 105, budgetExecuted: 82, complianceScore: 89, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'good' },
      { id: 'mvoung', name: 'Mvoung', code: 'MVO', population: 8000, budget: 68, budgetExecuted: 48, complianceScore: 75, sessionsHeld: 1, sessionsRequired: 2, alerts: 3, status: 'warning' },
      { id: 'zadie', name: 'Zadié', code: 'ZAD', population: 14000, budget: 120, budgetExecuted: 95, complianceScore: 90, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'djouah', name: 'Djouah', code: 'DJO', population: 6000, budget: 52, budgetExecuted: 35, complianceScore: 68, sessionsHeld: 1, sessionsRequired: 2, alerts: 4, status: 'critical' },
    ]
  },
  {
    id: 'ogooue-lolo',
    name: 'Ogooué-Lolo',
    code: 'OLO',
    color: 'province-ogooue-lolo',
    departments: [
      { id: 'lolo-bouenguidi', name: 'Lolo-Bouenguidi', code: 'LBO', population: 25000, budget: 215, budgetExecuted: 172, complianceScore: 88, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'lombo-bouenguidi', name: 'Lombo-Bouenguidi', code: 'LMB', population: 18000, budget: 152, budgetExecuted: 115, complianceScore: 84, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'mulundu', name: 'Mulundu', code: 'MUL', population: 22000, budget: 188, budgetExecuted: 145, complianceScore: 86, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
    ]
  },
  {
    id: 'ogooue-maritime',
    name: 'Ogooué-Maritime',
    code: 'OMA',
    color: 'province-ogooue-maritime',
    departments: [
      { id: 'bendje', name: 'Bendjé', code: 'BEN', population: 45000, budget: 380, budgetExecuted: 304, complianceScore: 92, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'etimboue', name: 'Étimbouè', code: 'ETI', population: 12000, budget: 102, budgetExecuted: 75, complianceScore: 80, sessionsHeld: 2, sessionsRequired: 2, alerts: 2, status: 'good' },
      { id: 'ndougou', name: 'Ndougou', code: 'NDG', population: 8000, budget: 68, budgetExecuted: 48, complianceScore: 73, sessionsHeld: 1, sessionsRequired: 2, alerts: 3, status: 'warning' },
      { id: 'port-gentil', name: 'Port-Gentil', code: 'POG', population: 180000, budget: 1450, budgetExecuted: 1175, complianceScore: 95, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
    ]
  },
  {
    id: 'woleu-ntem',
    name: 'Woleu-Ntem',
    code: 'WNT',
    color: 'province-woleu-ntem',
    departments: [
      { id: 'haut-como', name: 'Haut-Como', code: 'HCO', population: 18000, budget: 155, budgetExecuted: 118, complianceScore: 85, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'haut-ntem', name: 'Haut-Ntem', code: 'HNT', population: 22000, budget: 188, budgetExecuted: 145, complianceScore: 87, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'ntem', name: 'Ntem', code: 'NTE', population: 28000, budget: 235, budgetExecuted: 182, complianceScore: 84, sessionsHeld: 2, sessionsRequired: 2, alerts: 2, status: 'good' },
      { id: 'okano', name: 'Okano', code: 'OKA', population: 15000, budget: 128, budgetExecuted: 98, complianceScore: 82, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'oyem', name: 'Oyem', code: 'OYE', population: 65000, budget: 520, budgetExecuted: 416, complianceScore: 93, sessionsHeld: 2, sessionsRequired: 2, alerts: 0, status: 'excellent' },
      { id: 'bitam', name: 'Bitam', code: 'BIT', population: 35000, budget: 295, budgetExecuted: 232, complianceScore: 89, sessionsHeld: 2, sessionsRequired: 2, alerts: 1, status: 'good' },
      { id: 'mitzic', name: 'Mitzic', code: 'MIT', population: 12000, budget: 105, budgetExecuted: 78, complianceScore: 80, sessionsHeld: 2, sessionsRequired: 2, alerts: 2, status: 'good' },
    ]
  },
];

// Calculate totals
export const getTotalStats = () => {
  const allDepartments = provinces.flatMap(p => p.departments);
  
  return {
    totalDepartments: allDepartments.length,
    totalProvinces: provinces.length,
    totalPopulation: allDepartments.reduce((sum, d) => sum + d.population, 0),
    totalBudget: allDepartments.reduce((sum, d) => sum + d.budget, 0),
    totalExecuted: allDepartments.reduce((sum, d) => sum + d.budgetExecuted, 0),
    avgCompliance: Math.round(allDepartments.reduce((sum, d) => sum + d.complianceScore, 0) / allDepartments.length),
    totalAlerts: allDepartments.reduce((sum, d) => sum + d.alerts, 0),
    criticalDepartments: allDepartments.filter(d => d.status === 'critical').length,
    warningDepartments: allDepartments.filter(d => d.status === 'warning').length,
  };
};

export const modules = [
  {
    id: 'conseil',
    name: 'Gestion du Conseil',
    description: 'Conseillers, sessions, délibérations et votes',
    icon: 'Users',
    color: 'primary',
    stats: { active: 47, pending: 3 }
  },
  {
    id: 'budget',
    name: 'Budget & Finances',
    description: 'Élaboration, exécution et suivi budgétaire',
    icon: 'Wallet',
    color: 'success',
    stats: { active: 45, pending: 2 }
  },
  {
    id: 'tutelle',
    name: 'Tutelle & Conformité',
    description: 'Contrôle de légalité et transmission des actes',
    icon: 'Shield',
    color: 'info',
    stats: { active: 47, pending: 8 }
  },
  {
    id: 'rh',
    name: 'Ressources Humaines',
    description: 'Personnel, paie et état civil',
    icon: 'UserCog',
    color: 'accent',
    stats: { active: 44, pending: 5 }
  },
  {
    id: 'patrimoine',
    name: 'Patrimoine & Projets',
    description: 'Inventaire, marchés et investissements',
    icon: 'Building2',
    color: 'warning',
    stats: { active: 42, pending: 12 }
  },
  {
    id: 'citoyen',
    name: 'Portail Citoyen',
    description: 'Transparence et e-services',
    icon: 'Globe',
    color: 'secondary',
    stats: { active: 38, pending: 15 }
  },
];
