// Complete Gabonese Departmental Councils Data
// Based on Decree n°0453/PR/MISD of November 14, 2025

export interface DepartmentDetail {
  id: string;
  name: string;
  code: string;
  chefLieu: string;
  isProvinceCapital?: boolean;
  specialZone?: 'mining' | 'petroleum' | 'coastal' | 'forest';
  population: number;
  communes: string[];
  activeFunds: ('fdl_forestier' | 'fdl_minier' | 'fdl_petrolier')[];
  prioritySectors: string[];
  budgetEstimate: number; // in millions XAF
  transferredStaff: number;
  localRecruits: number;
  activeCompetences: number;
  status: 'operational' | 'transition';
}

export interface ProvinceDetail {
  id: string;
  name: string;
  code: string;
  capital: string;
  departments: DepartmentDetail[];
  color: string;
  populationEstimate: number;
  totalAgents: number;
}

export interface Competence {
  id: string;
  name: string;
  domain: string;
  ministry: string;
  transferLevel: 'total' | 'partial' | 'collaboration';
  description: string;
  examples: string[];
}

export interface DemoAccount {
  id: string;
  email: string;
  role: string;
  roleLabel: string;
  name: string;
  department: string;
  province: string;
  sector?: string;
  permissions: string[];
  dashboard: string;
  scenarios: string[];
}

// 20+ Transferred Competences by Domain
export const competencesDomains = [
  {
    id: 'amenagement',
    name: 'Aménagement & Urbanisme',
    icon: 'Building2',
    color: 'bg-blue-500',
    competences: [
      { id: 'urbanisme', name: 'Urbanisme & Cadastre', ministry: 'Urbanisme', transferLevel: 'partial' as const },
      { id: 'logement', name: 'Logement & Habitat', ministry: 'Habitat', transferLevel: 'partial' as const },
      { id: 'voirie', name: 'Voirie Départementale', ministry: 'Travaux Publics', transferLevel: 'total' as const },
      { id: 'planification', name: 'Planification Territoriale', ministry: 'Aménagement', transferLevel: 'collaboration' as const },
    ]
  },
  {
    id: 'infrastructures',
    name: 'Infrastructures',
    icon: 'Hammer',
    color: 'bg-slate-600',
    competences: [
      { id: 'travaux', name: 'Travaux Publics', ministry: 'Travaux Publics', transferLevel: 'partial' as const },
      { id: 'eau', name: 'Eau & Assainissement', ministry: 'Énergie', transferLevel: 'total' as const },
      { id: 'energie', name: 'Énergie & Éclairage Public', ministry: 'Énergie', transferLevel: 'partial' as const },
      { id: 'transports', name: 'Transports & Mobilité', ministry: 'Transports', transferLevel: 'collaboration' as const },
    ]
  },
  {
    id: 'environnement',
    name: 'Environnement & Ressources',
    icon: 'TreePine',
    color: 'bg-green-600',
    competences: [
      { id: 'environnement', name: 'Environnement & Écologie', ministry: 'Environnement', transferLevel: 'partial' as const },
      { id: 'eaux_forets', name: 'Eaux, Forêts & Biodiversité', ministry: 'Eaux et Forêts', transferLevel: 'collaboration' as const },
      { id: 'mines', name: 'Mines & Carrières Communautaires', ministry: 'Mines', transferLevel: 'partial' as const },
      { id: 'peche', name: 'Pêche & Aquaculture', ministry: 'Pêche', transferLevel: 'total' as const },
    ]
  },
  {
    id: 'economie',
    name: 'Développement Économique',
    icon: 'TrendingUp',
    color: 'bg-orange-500',
    competences: [
      { id: 'agriculture', name: 'Agriculture & Élevage', ministry: 'Agriculture', transferLevel: 'total' as const },
      { id: 'industrie', name: 'Industrie & Zones Industrielles', ministry: 'Industrie', transferLevel: 'partial' as const },
      { id: 'commerce', name: 'Commerce & PME', ministry: 'Commerce', transferLevel: 'total' as const },
      { id: 'tourisme', name: 'Tourisme & Artisanat', ministry: 'Tourisme', transferLevel: 'total' as const },
    ]
  },
  {
    id: 'social',
    name: 'Services Sociaux',
    icon: 'Heart',
    color: 'bg-pink-500',
    competences: [
      { id: 'education', name: 'Éducation Primaire', ministry: 'Éducation', transferLevel: 'partial' as const },
      { id: 'sante', name: 'Santé & Dispensaires', ministry: 'Santé', transferLevel: 'partial' as const },
      { id: 'action_sociale', name: 'Action Sociale', ministry: 'Affaires Sociales', transferLevel: 'total' as const },
      { id: 'femme_enfance', name: 'Femme, Famille & Enfance', ministry: 'Famille', transferLevel: 'total' as const },
    ]
  },
  {
    id: 'culture',
    name: 'Culture & Jeunesse',
    icon: 'Palette',
    color: 'bg-purple-500',
    competences: [
      { id: 'jeunesse_sports', name: 'Jeunesse, Sports & Loisirs', ministry: 'Jeunesse', transferLevel: 'total' as const },
      { id: 'culture', name: 'Culture & Patrimoine', ministry: 'Culture', transferLevel: 'partial' as const },
      { id: 'vie_associative', name: 'Vie Associative', ministry: 'Intérieur', transferLevel: 'total' as const },
    ]
  },
  {
    id: 'finances',
    name: 'Finances & Budget',
    icon: 'Wallet',
    color: 'bg-amber-500',
    competences: [
      { id: 'finances_locales', name: 'Finances & Fiscalité Locale', ministry: 'Économie', transferLevel: 'partial' as const },
      { id: 'budget', name: 'Budget & Contrôle de Gestion', ministry: 'Budget', transferLevel: 'total' as const },
      { id: 'participations', name: 'Participations & PPP', ministry: 'Économie', transferLevel: 'collaboration' as const },
    ]
  },
];

// Complete 47 Departments Data
export const provincesData: ProvinceDetail[] = [
  {
    id: 'estuaire',
    name: 'Estuaire',
    code: 'EST',
    capital: 'Libreville',
    color: 'bg-sky-500',
    populationEstimate: 1200000,
    totalAgents: 850,
    departments: [
      {
        id: 'komo-mondah',
        name: 'Komo-Mondah',
        code: 'KMO',
        chefLieu: 'Ntoum',
        population: 89000,
        communes: ['Ntoum', 'Okolassi'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'transports', 'education', 'sante', 'environnement'],
        budgetEstimate: 1200,
        transferredStaff: 45,
        localRecruits: 12,
        activeCompetences: 18,
        status: 'operational'
      },
      {
        id: 'komo-ocean',
        name: 'Komo-Océan',
        code: 'KOC',
        chefLieu: 'Libreville',
        isProvinceCapital: true,
        population: 850000,
        communes: ['Libreville', 'Owendo', 'Akanda'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['urbanisme', 'transports', 'education', 'sante', 'commerce'],
        budgetEstimate: 8500,
        transferredStaff: 320,
        localRecruits: 85,
        activeCompetences: 22,
        status: 'operational'
      },
      {
        id: 'komo',
        name: 'Komo',
        code: 'KOM',
        chefLieu: 'Kougouleu',
        population: 25000,
        communes: ['Kougouleu'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 450,
        transferredStaff: 18,
        localRecruits: 5,
        activeCompetences: 15,
        status: 'transition'
      },
      {
        id: 'noya',
        name: 'Noya',
        code: 'NOY',
        chefLieu: 'Cocobeach',
        specialZone: 'coastal',
        population: 18000,
        communes: ['Cocobeach'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['peche', 'tourisme', 'transports', 'sante', 'education'],
        budgetEstimate: 380,
        transferredStaff: 15,
        localRecruits: 4,
        activeCompetences: 14,
        status: 'transition'
      }
    ]
  },
  {
    id: 'haut-ogooue',
    name: 'Haut-Ogooué',
    code: 'HOG',
    capital: 'Franceville',
    color: 'bg-emerald-500',
    populationEstimate: 280000,
    totalAgents: 420,
    departments: [
      {
        id: 'djouori-agnili',
        name: 'Djouori-Agnili',
        code: 'DJA',
        chefLieu: 'Bongoville',
        population: 28000,
        communes: ['Bongoville'],
        activeFunds: ['fdl_forestier', 'fdl_minier'],
        prioritySectors: ['mines', 'agriculture', 'education', 'sante', 'environnement'],
        budgetEstimate: 650,
        transferredStaff: 22,
        localRecruits: 6,
        activeCompetences: 16,
        status: 'operational'
      },
      {
        id: 'djoue',
        name: 'Djoué',
        code: 'DJO',
        chefLieu: 'Onga',
        population: 12000,
        communes: ['Onga'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 320,
        transferredStaff: 12,
        localRecruits: 3,
        activeCompetences: 14,
        status: 'transition'
      },
      {
        id: 'lekoko',
        name: 'Lékoko',
        code: 'LEK',
        chefLieu: 'Akiéni',
        population: 15000,
        communes: ['Akiéni'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'commerce', 'education', 'sante', 'tourisme'],
        budgetEstimate: 380,
        transferredStaff: 14,
        localRecruits: 4,
        activeCompetences: 15,
        status: 'operational'
      },
      {
        id: 'lemboumbi-leyou',
        name: 'Lemboumbi-Leyou',
        code: 'LEM',
        chefLieu: 'Moanda',
        specialZone: 'mining',
        population: 45000,
        communes: ['Moanda', 'Bakoumba'],
        activeFunds: ['fdl_forestier', 'fdl_minier'],
        prioritySectors: ['mines', 'environnement', 'sante', 'education', 'eaux_forets'],
        budgetEstimate: 2800,
        transferredStaff: 65,
        localRecruits: 18,
        activeCompetences: 20,
        status: 'operational'
      },
      {
        id: 'lekabi-lewolo',
        name: 'Lékabi-Léwolo',
        code: 'LKL',
        chefLieu: 'Bakoumba',
        specialZone: 'mining',
        population: 18000,
        communes: ['Bakoumba'],
        activeFunds: ['fdl_forestier', 'fdl_minier'],
        prioritySectors: ['mines', 'environnement', 'agriculture', 'sante', 'education'],
        budgetEstimate: 950,
        transferredStaff: 25,
        localRecruits: 7,
        activeCompetences: 17,
        status: 'operational'
      },
      {
        id: 'mpassa',
        name: 'Mpassa',
        code: 'MPA',
        chefLieu: 'Franceville',
        isProvinceCapital: true,
        population: 110000,
        communes: ['Franceville'],
        activeFunds: ['fdl_forestier', 'fdl_minier'],
        prioritySectors: ['education', 'sante', 'urbanisme', 'transports', 'eaux_forets'],
        budgetEstimate: 3200,
        transferredStaff: 180,
        localRecruits: 45,
        activeCompetences: 22,
        status: 'operational'
      },
      {
        id: 'plateaux',
        name: 'Plateaux',
        code: 'PLA',
        chefLieu: 'Lékoni',
        population: 22000,
        communes: ['Lékoni'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'elevage', 'education', 'sante', 'commerce'],
        budgetEstimate: 520,
        transferredStaff: 18,
        localRecruits: 5,
        activeCompetences: 16,
        status: 'operational'
      },
      {
        id: 'sebe-brikolo',
        name: 'Sébé-Brikolo',
        code: 'SEB',
        chefLieu: 'Okondja',
        population: 15000,
        communes: ['Okondja'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 380,
        transferredStaff: 14,
        localRecruits: 4,
        activeCompetences: 15,
        status: 'transition'
      }
    ]
  },
  {
    id: 'moyen-ogooue',
    name: 'Moyen-Ogooué',
    code: 'MOG',
    capital: 'Lambaréné',
    color: 'bg-violet-500',
    populationEstimate: 75000,
    totalAgents: 120,
    departments: [
      {
        id: 'abanga-bigne',
        name: 'Abanga-Bigné',
        code: 'ABA',
        chefLieu: 'Ndjolé',
        population: 28000,
        communes: ['Ndjolé'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['eaux_forets', 'agriculture', 'education', 'sante', 'transports'],
        budgetEstimate: 580,
        transferredStaff: 22,
        localRecruits: 6,
        activeCompetences: 16,
        status: 'operational'
      },
      {
        id: 'ogooue-lacs',
        name: 'Ogooué et Lacs',
        code: 'OGL',
        chefLieu: 'Lambaréné',
        isProvinceCapital: true,
        population: 47000,
        communes: ['Lambaréné'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['peche', 'tourisme', 'sante', 'education', 'commerce'],
        budgetEstimate: 1200,
        transferredStaff: 55,
        localRecruits: 15,
        activeCompetences: 19,
        status: 'operational'
      }
    ]
  },
  {
    id: 'ngounie',
    name: 'Ngounié',
    code: 'NGO',
    capital: 'Mouila',
    color: 'bg-amber-500',
    populationEstimate: 180000,
    totalAgents: 280,
    departments: [
      {
        id: 'dola',
        name: 'Dola',
        code: 'DOL',
        chefLieu: 'Ndendé',
        population: 22000,
        communes: ['Ndendé'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'commerce'],
        budgetEstimate: 480,
        transferredStaff: 18,
        localRecruits: 5,
        activeCompetences: 16,
        status: 'operational'
      },
      {
        id: 'douya-onoye',
        name: 'Douya-Onoye',
        code: 'DOU',
        chefLieu: 'Mouila',
        isProvinceCapital: true,
        population: 38000,
        communes: ['Mouila'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['education', 'sante', 'agriculture', 'commerce', 'transports'],
        budgetEstimate: 1100,
        transferredStaff: 52,
        localRecruits: 14,
        activeCompetences: 19,
        status: 'operational'
      },
      {
        id: 'louetsi-wano',
        name: 'Louétsi-Wano',
        code: 'LWA',
        chefLieu: 'Lebamba',
        population: 16000,
        communes: ['Lebamba'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 380,
        transferredStaff: 14,
        localRecruits: 4,
        activeCompetences: 15,
        status: 'operational'
      },
      {
        id: 'louetsi-bibaka',
        name: 'Louétsi-Bibaka',
        code: 'LBI',
        chefLieu: 'Malinga',
        population: 12000,
        communes: ['Malinga'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 320,
        transferredStaff: 12,
        localRecruits: 3,
        activeCompetences: 14,
        status: 'transition'
      },
      {
        id: 'mougalaba',
        name: 'Mougalaba',
        code: 'MGA',
        chefLieu: 'Guietsou',
        population: 18000,
        communes: ['Guietsou'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'commerce', 'education', 'sante', 'tourisme'],
        budgetEstimate: 420,
        transferredStaff: 15,
        localRecruits: 4,
        activeCompetences: 15,
        status: 'operational'
      },
      {
        id: 'ndolou',
        name: 'Ndolou',
        code: 'NDO',
        chefLieu: 'Mandji',
        population: 14000,
        communes: ['Mandji'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'peche', 'education', 'sante', 'voirie'],
        budgetEstimate: 350,
        transferredStaff: 13,
        localRecruits: 3,
        activeCompetences: 14,
        status: 'operational'
      },
      {
        id: 'ogoulou',
        name: 'Ogoulou',
        code: 'OGO',
        chefLieu: 'Mbigou',
        population: 15000,
        communes: ['Mbigou'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'mines'],
        budgetEstimate: 380,
        transferredStaff: 14,
        localRecruits: 4,
        activeCompetences: 15,
        status: 'transition'
      },
      {
        id: 'tsamba-magotsi',
        name: 'Tsamba-Magotsi',
        code: 'TSM',
        chefLieu: 'Fougamou',
        population: 20000,
        communes: ['Fougamou'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'tourisme', 'education', 'sante', 'commerce'],
        budgetEstimate: 450,
        transferredStaff: 16,
        localRecruits: 4,
        activeCompetences: 16,
        status: 'operational'
      }
    ]
  },
  {
    id: 'nyanga',
    name: 'Nyanga',
    code: 'NYA',
    capital: 'Tchibanga',
    color: 'bg-rose-500',
    populationEstimate: 65000,
    totalAgents: 110,
    departments: [
      {
        id: 'basse-banio',
        name: 'Basse-Banio',
        code: 'BBA',
        chefLieu: 'Mayumba',
        specialZone: 'coastal',
        population: 12000,
        communes: ['Mayumba'],
        activeFunds: ['fdl_forestier', 'fdl_petrolier'],
        prioritySectors: ['peche', 'tourisme', 'environnement', 'sante', 'education'],
        budgetEstimate: 580,
        transferredStaff: 18,
        localRecruits: 5,
        activeCompetences: 17,
        status: 'operational'
      },
      {
        id: 'douigny',
        name: 'Douigny',
        code: 'DIG',
        chefLieu: 'Moabi',
        population: 10000,
        communes: ['Moabi'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 280,
        transferredStaff: 10,
        localRecruits: 3,
        activeCompetences: 13,
        status: 'transition'
      },
      {
        id: 'mongo',
        name: 'Mongo',
        code: 'MON',
        chefLieu: 'Tchibanga',
        isProvinceCapital: true,
        population: 28000,
        communes: ['Tchibanga'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['education', 'sante', 'commerce', 'agriculture', 'transports'],
        budgetEstimate: 750,
        transferredStaff: 35,
        localRecruits: 10,
        activeCompetences: 18,
        status: 'operational'
      },
      {
        id: 'mougoutsi',
        name: 'Mougoutsi',
        code: 'MGT',
        chefLieu: 'Moulengui-Binza',
        population: 15000,
        communes: ['Moulengui-Binza'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 380,
        transferredStaff: 14,
        localRecruits: 4,
        activeCompetences: 15,
        status: 'operational'
      }
    ]
  },
  {
    id: 'ogooue-ivindo',
    name: 'Ogooué-Ivindo',
    code: 'OIV',
    capital: 'Makokou',
    color: 'bg-teal-500',
    populationEstimate: 70000,
    totalAgents: 120,
    departments: [
      {
        id: 'ivindo',
        name: 'Ivindo',
        code: 'IVI',
        chefLieu: 'Makokou',
        isProvinceCapital: true,
        specialZone: 'forest',
        population: 35000,
        communes: ['Makokou'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['eaux_forets', 'tourisme', 'education', 'sante', 'environnement'],
        budgetEstimate: 950,
        transferredStaff: 42,
        localRecruits: 12,
        activeCompetences: 18,
        status: 'operational'
      },
      {
        id: 'lope',
        name: 'Lopé',
        code: 'LOP',
        chefLieu: 'Booué',
        specialZone: 'forest',
        population: 12000,
        communes: ['Booué'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['tourisme', 'eaux_forets', 'environnement', 'education', 'sante'],
        budgetEstimate: 520,
        transferredStaff: 18,
        localRecruits: 5,
        activeCompetences: 16,
        status: 'operational'
      },
      {
        id: 'mvoung',
        name: 'Mvoung',
        code: 'MVO',
        chefLieu: 'Ovan',
        population: 10000,
        communes: ['Ovan'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 280,
        transferredStaff: 10,
        localRecruits: 3,
        activeCompetences: 13,
        status: 'transition'
      },
      {
        id: 'zadie',
        name: 'Zadié',
        code: 'ZAD',
        chefLieu: 'Mékambo',
        specialZone: 'forest',
        population: 13000,
        communes: ['Mékambo'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['eaux_forets', 'agriculture', 'education', 'sante', 'environnement'],
        budgetEstimate: 350,
        transferredStaff: 12,
        localRecruits: 3,
        activeCompetences: 14,
        status: 'operational'
      }
    ]
  },
  {
    id: 'ogooue-lolo',
    name: 'Ogooué-Lolo',
    code: 'OLO',
    capital: 'Koulamoutou',
    color: 'bg-fuchsia-500',
    populationEstimate: 75000,
    totalAgents: 130,
    departments: [
      {
        id: 'lolo-bouenguidi',
        name: 'Lolo-Bouenguidi',
        code: 'LBO',
        chefLieu: 'Koulamoutou',
        isProvinceCapital: true,
        population: 32000,
        communes: ['Koulamoutou'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['education', 'sante', 'eaux_forets', 'commerce', 'transports'],
        budgetEstimate: 850,
        transferredStaff: 38,
        localRecruits: 10,
        activeCompetences: 18,
        status: 'operational'
      },
      {
        id: 'lombo-bouenguidi',
        name: 'Lombo-Bouenguidi',
        code: 'LMB',
        chefLieu: 'Lastourville',
        population: 18000,
        communes: ['Lastourville'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['eaux_forets', 'agriculture', 'education', 'sante', 'transports'],
        budgetEstimate: 450,
        transferredStaff: 16,
        localRecruits: 4,
        activeCompetences: 16,
        status: 'operational'
      },
      {
        id: 'mouloundou',
        name: 'Mouloundou',
        code: 'MOU',
        chefLieu: 'Pana',
        population: 12000,
        communes: ['Pana'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 320,
        transferredStaff: 12,
        localRecruits: 3,
        activeCompetences: 14,
        status: 'transition'
      },
      {
        id: 'offoue-onoye',
        name: 'Offoué-Onoye',
        code: 'OFO',
        chefLieu: 'Iboundji',
        population: 13000,
        communes: ['Iboundji'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'voirie'],
        budgetEstimate: 340,
        transferredStaff: 13,
        localRecruits: 3,
        activeCompetences: 14,
        status: 'operational'
      }
    ]
  },
  {
    id: 'ogooue-maritime',
    name: 'Ogooué-Maritime',
    code: 'OMA',
    capital: 'Port-Gentil',
    color: 'bg-cyan-500',
    populationEstimate: 180000,
    totalAgents: 280,
    departments: [
      {
        id: 'bendje',
        name: 'Bendjé',
        code: 'BEN',
        chefLieu: 'Port-Gentil',
        isProvinceCapital: true,
        specialZone: 'petroleum',
        population: 140000,
        communes: ['Port-Gentil'],
        activeFunds: ['fdl_forestier', 'fdl_petrolier'],
        prioritySectors: ['industrie', 'peche', 'tourisme', 'education', 'sante'],
        budgetEstimate: 5200,
        transferredStaff: 185,
        localRecruits: 48,
        activeCompetences: 22,
        status: 'operational'
      },
      {
        id: 'etimboue',
        name: 'Étimbouè',
        code: 'ETI',
        chefLieu: 'Omboué',
        specialZone: 'coastal',
        population: 15000,
        communes: ['Omboué'],
        activeFunds: ['fdl_forestier', 'fdl_petrolier'],
        prioritySectors: ['peche', 'tourisme', 'environnement', 'education', 'sante'],
        budgetEstimate: 580,
        transferredStaff: 18,
        localRecruits: 5,
        activeCompetences: 17,
        status: 'operational'
      },
      {
        id: 'ndougou',
        name: 'Ndougou',
        code: 'NDG',
        chefLieu: 'Gamba',
        specialZone: 'petroleum',
        population: 18000,
        communes: ['Gamba', 'Sette-Cama'],
        activeFunds: ['fdl_forestier', 'fdl_petrolier'],
        prioritySectors: ['environnement', 'peche', 'tourisme', 'education', 'sante'],
        budgetEstimate: 850,
        transferredStaff: 25,
        localRecruits: 7,
        activeCompetences: 18,
        status: 'operational'
      },
      {
        id: 'ogooue-maritime-dept',
        name: 'Ogooué-Maritime',
        code: 'OGM',
        chefLieu: 'Port-Gentil',
        population: 7000,
        communes: ['Ozouri'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['peche', 'agriculture', 'education', 'sante', 'voirie'],
        budgetEstimate: 280,
        transferredStaff: 10,
        localRecruits: 3,
        activeCompetences: 13,
        status: 'transition'
      }
    ]
  },
  {
    id: 'woleu-ntem',
    name: 'Woleu-Ntem',
    code: 'WNT',
    capital: 'Oyem',
    color: 'bg-lime-600',
    populationEstimate: 180000,
    totalAgents: 290,
    departments: [
      {
        id: 'haut-como',
        name: 'Haut-Como',
        code: 'HCO',
        chefLieu: 'Médouneu',
        population: 15000,
        communes: ['Médouneu'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'commerce'],
        budgetEstimate: 380,
        transferredStaff: 14,
        localRecruits: 4,
        activeCompetences: 15,
        status: 'operational'
      },
      {
        id: 'haut-ntem',
        name: 'Haut-Ntem',
        code: 'HNT',
        chefLieu: 'Minvoul',
        population: 12000,
        communes: ['Minvoul'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['eaux_forets', 'agriculture', 'education', 'sante', 'voirie'],
        budgetEstimate: 320,
        transferredStaff: 12,
        localRecruits: 3,
        activeCompetences: 14,
        status: 'transition'
      },
      {
        id: 'ntem',
        name: 'Ntem',
        code: 'NTE',
        chefLieu: 'Bitam',
        population: 35000,
        communes: ['Bitam'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'commerce', 'education', 'sante', 'transports'],
        budgetEstimate: 850,
        transferredStaff: 32,
        localRecruits: 9,
        activeCompetences: 18,
        status: 'operational'
      },
      {
        id: 'okano',
        name: 'Okano',
        code: 'OKA',
        chefLieu: 'Mitzic',
        population: 18000,
        communes: ['Mitzic'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['agriculture', 'eaux_forets', 'education', 'sante', 'commerce'],
        budgetEstimate: 420,
        transferredStaff: 15,
        localRecruits: 4,
        activeCompetences: 16,
        status: 'operational'
      },
      {
        id: 'woleu',
        name: 'Woleu',
        code: 'WOL',
        chefLieu: 'Oyem',
        isProvinceCapital: true,
        population: 100000,
        communes: ['Oyem'],
        activeFunds: ['fdl_forestier'],
        prioritySectors: ['education', 'sante', 'commerce', 'agriculture', 'urbanisme'],
        budgetEstimate: 2800,
        transferredStaff: 125,
        localRecruits: 32,
        activeCompetences: 21,
        status: 'operational'
      }
    ]
  }
];

// Profile types for demo accounts
export const profileTypes = [
  {
    id: 'executif',
    name: 'Exécutif Départemental',
    icon: 'Crown',
    description: 'Pilotage stratégique et gouvernance territoriale',
    color: 'bg-primary',
    roles: [
      { id: 'president', label: 'Président du Conseil', email: 'president', permissions: ['budget_validation', 'conventions_signature', 'strategic_piloting', 'commissions_presidency'] },
      { id: 'vp_finances', label: 'Vice-président Finances', email: 'vp.finances', permissions: ['budget_preparation', 'financial_oversight', 'audit_monitoring'] },
      { id: 'vp_amenagement', label: 'VP Aménagement Territorial', email: 'vp.amenagement', permissions: ['urban_planning', 'infrastructure_oversight', 'land_management'] },
      { id: 'vp_developpement', label: 'VP Développement Économique', email: 'vp.developpement', permissions: ['economic_projects', 'ppp_management', 'investment_attraction'] },
      { id: 'vp_social', label: 'VP Affaires Sociales', email: 'vp.affaires-sociales', permissions: ['social_programs', 'health_education_oversight', 'vulnerable_populations'] },
    ],
    scenarios: [
      'Approuver le budget annuel 2026',
      'Valider convention partenariat zone industrielle',
      'Arbitrer répartition Fonds Développement Local',
      'Présider Commission Gestion Revenus Forestiers'
    ]
  },
  {
    id: 'assemblee',
    name: 'Assemblée Départementale',
    icon: 'Users',
    description: 'Délibération et contrôle de l\'action départementale',
    color: 'bg-blue-600',
    roles: [
      { id: 'conseiller_finances', label: 'Conseiller - Commission Finances', email: 'conseiller.finances', permissions: ['vote_deliberations', 'budget_review', 'financial_reports'] },
      { id: 'conseiller_amenagement', label: 'Conseiller - Commission Aménagement', email: 'conseiller.amenagement', permissions: ['vote_deliberations', 'urban_projects_review', 'infrastructure_reports'] },
      { id: 'conseiller_social', label: 'Conseiller - Commission Sociale', email: 'conseiller.social', permissions: ['vote_deliberations', 'social_programs_review', 'health_education_reports'] },
      { id: 'conseiller_environnement', label: 'Conseiller - Commission Environnement', email: 'conseiller.environnement', permissions: ['vote_deliberations', 'environment_projects', 'forestry_oversight'] },
    ],
    scenarios: [
      'Voter délibération budget primitif',
      'Examiner rapport commission finances',
      'Proposer amendement projet urbanisme',
      'Participer session ordinaire T4'
    ]
  },
  {
    id: 'administration',
    name: 'Administration Départementale',
    icon: 'Briefcase',
    description: 'Coordination opérationnelle et gestion administrative',
    color: 'bg-slate-600',
    roles: [
      { id: 'sg', label: 'Secrétaire Général', email: 'sg', permissions: ['staff_management', 'budget_execution', 'contract_management', 'coordination'] },
      { id: 'dgs', label: 'Directeur Général des Services', email: 'dgs', permissions: ['operations_management', 'service_coordination', 'performance_monitoring'] },
      { id: 'daf', label: 'Directeur Affaires Financières', email: 'daf', permissions: ['budget_preparation', 'payment_authorization', 'financial_reporting'] },
      { id: 'drh', label: 'Directeur Ressources Humaines', email: 'drh', permissions: ['recruitment', 'payroll', 'career_management', 'training'] },
      { id: 'dcsi', label: 'Dir. Centrale Systèmes Info', email: 'dcsi', permissions: ['it_management', 'digital_transformation', 'data_security'] },
    ],
    scenarios: [
      'Préparer ordre du jour session conseil',
      'Valider état d\'engagement budgétaire',
      'Gérer recrutement agent technique',
      'Superviser déploiement système information'
    ]
  },
  {
    id: 'directions',
    name: 'Directions Sectorielles',
    icon: 'Network',
    description: 'Mise en œuvre des 20+ compétences transférées',
    color: 'bg-green-600',
    domains: competencesDomains,
    scenarios: [
      'Délivrer autorisation carrière communautaire',
      'Gérer programme entretien voirie',
      'Superviser campagne vaccination dispensaires',
      'Coordonner projet agricole départemental'
    ]
  },
  {
    id: 'terrain',
    name: 'Agents de Terrain',
    icon: 'HardHat',
    description: 'Exécution opérationnelle dans les 20+ secteurs',
    color: 'bg-orange-500',
    roles: [
      { id: 'agent_routes', label: 'Agent Entretien Routes', email: 'agent.routes', permissions: ['field_reports', 'maintenance_requests', 'equipment_inventory'] },
      { id: 'agent_dispensaire', label: 'Agent Dispensaire', email: 'agent.dispensaire', permissions: ['patient_records', 'supply_requests', 'health_reports'] },
      { id: 'agent_forets', label: 'Agent Surveillance Forêts', email: 'agent.forets', permissions: ['patrol_reports', 'incident_logging', 'permit_verification'] },
      { id: 'agent_tourisme', label: 'Agent Office Tourisme', email: 'agent.tourisme', permissions: ['visitor_stats', 'event_management', 'promotion_activities'] },
      { id: 'agent_social', label: 'Agent Action Sociale', email: 'agent.social', permissions: ['case_management', 'benefit_distribution', 'household_surveys'] },
    ],
    scenarios: [
      'Signaler dégradation route départementale',
      'Programmer entretien pistes rurales',
      'Inventorier équipements signalisation',
      'Renseigner registre activité quotidienne'
    ]
  },
  {
    id: 'commissions',
    name: 'Commissions & Comités',
    icon: 'ClipboardCheck',
    description: 'Instances consultatives et comités participatifs',
    color: 'bg-purple-600',
    roles: [
      { id: 'president_forets', label: 'Président Commission Forêts', email: 'president.commission.forets', permissions: ['meeting_convocation', 'report_validation', 'fund_distribution'] },
      { id: 'membre_fdl', label: 'Membre Comité FDL', email: 'membre.comite.fdl', permissions: ['project_review', 'fund_allocation_vote', 'monitoring'] },
      { id: 'rapporteur_amenagement', label: 'Rapporteur Aménagement', email: 'rapporteur.amenagement', permissions: ['report_drafting', 'data_collection', 'presentation'] },
      { id: 'membre_parcs', label: 'Membre Comité Parcs Nationaux', email: 'membre.comite.parcs', permissions: ['conservation_oversight', 'tourism_development', 'community_liaison'] },
    ],
    scenarios: [
      'Organiser session Commission Revenus Forestiers',
      'Préparer rapport distribution FDL',
      'Voter attribution subvention projet local',
      'Évaluer candidature zone protection'
    ]
  }
];

// Funds information
export const fundsInfo = {
  fdl_forestier: {
    name: 'FDL Forestier',
    rate: '800 FCFA/m³',
    description: 'Fonds de Développement Local Forestier - Prélevé sur chaque mètre cube de bois sorti des permis forestiers',
    color: 'bg-green-500'
  },
  fdl_minier: {
    name: 'FDL Minier',
    rate: 'Variable',
    description: 'Fonds de Développement Local Minier - Taxation sur l\'exploitation des carrières et ressources minières',
    color: 'bg-amber-600'
  },
  fdl_petrolier: {
    name: 'FDL Pétrolier/Gazier',
    rate: 'Variable',
    description: 'Fonds de Développement Local Pétrolier - Applicable aux zones d\'exploitation pétrolière et gazière',
    color: 'bg-slate-700'
  }
};

// Generate demo account email
export const generateDemoEmail = (emailPrefix: string, departmentSlug: string): string => {
  return `${emailPrefix}@${departmentSlug}.conseil.ga`;
};

// Get department by ID
export const getDepartmentById = (id: string): DepartmentDetail | undefined => {
  for (const province of provincesData) {
    const dept = province.departments.find(d => d.id === id);
    if (dept) return dept;
  }
  return undefined;
};

// Get province by department ID
export const getProvinceByDepartmentId = (deptId: string): ProvinceDetail | undefined => {
  return provincesData.find(p => p.departments.some(d => d.id === deptId));
};

// Get total statistics
export const getTotalDemoStats = () => {
  const allDepts = provincesData.flatMap(p => p.departments);
  return {
    totalProvinces: provincesData.length,
    totalDepartments: allDepts.length,
    totalPopulation: allDepts.reduce((sum, d) => sum + d.population, 0),
    totalBudget: allDepts.reduce((sum, d) => sum + d.budgetEstimate, 0),
    totalStaff: allDepts.reduce((sum, d) => sum + d.transferredStaff + d.localRecruits, 0),
    operationalDepts: allDepts.filter(d => d.status === 'operational').length,
    transitionDepts: allDepts.filter(d => d.status === 'transition').length,
    totalCompetences: 23 // Based on decree
  };
};
