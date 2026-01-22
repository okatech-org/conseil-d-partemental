import { 
  Crown, Building2, Briefcase, UserCheck, Users2, 
  Wallet, Shield, MapPin, Heart, HardHat, Scale,
  Landmark, Users
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DemoAccount {
  role: string;
  email: string;
  permissions: string[];
  domain?: string;
}

export interface AccessProfile {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  accounts: DemoAccount[];
  module: string;
  moduleIcon: LucideIcon;
}

// Profils d'accès pour les acteurs du conseil départemental
export const accessProfiles: AccessProfile[] = [
  {
    id: "executif",
    title: "Exécutif Départemental",
    subtitle: "Direction du Conseil Départemental",
    icon: Crown,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    accounts: [
      { role: "Président du Conseil", email: "president@demo.conseil.ga", permissions: ["Toutes"] },
      { role: "Vice-président Finances", email: "vp.finances@demo.conseil.ga", permissions: ["Budget", "Marchés"] },
      { role: "Vice-président Social", email: "vp.social@demo.conseil.ga", permissions: ["Action Sociale", "Solidarité"] },
    ],
    module: "Gestion du Conseil",
    moduleIcon: Landmark,
  },
  {
    id: "conseillers",
    title: "Conseillers Départementaux",
    subtitle: "Élus du Département",
    icon: Users2,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    accounts: [
      { role: "Conseiller - Commission Finances", email: "conseiller.finances@demo.conseil.ga", permissions: ["Budget", "Délibérations"] },
      { role: "Conseiller - Commission Routes", email: "conseiller.routes@demo.conseil.ga", permissions: ["Voirie", "Aménagement"] },
      { role: "Conseiller - Commission Social", email: "conseiller.social@demo.conseil.ga", permissions: ["Solidarité", "PMI"] },
    ],
    module: "Gestion du Conseil",
    moduleIcon: Landmark,
  },
  {
    id: "secretariat",
    title: "Secrétariat Général",
    subtitle: "Administration centrale",
    icon: Building2,
    color: "from-slate-500 to-gray-700",
    bgColor: "bg-slate-50 dark:bg-slate-950/20",
    borderColor: "border-slate-200 dark:border-slate-800",
    accounts: [
      { role: "Secrétaire Général", email: "sg@demo.conseil.ga", permissions: ["Administration", "RH", "Budget"] },
      { role: "Directeur Juridique", email: "dir.juridique@demo.conseil.ga", permissions: ["Conformité", "Marchés"] },
      { role: "Chef de Cabinet", email: "cabinet@demo.conseil.ga", permissions: ["Communication", "Agenda"] },
    ],
    module: "Tutelle & Conformité",
    moduleIcon: Shield,
  },
  {
    id: "finances",
    title: "Direction des Finances",
    subtitle: "Budget & Comptabilité",
    icon: Wallet,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    accounts: [
      { role: "Directeur Financier", email: "dir.finances@demo.conseil.ga", permissions: ["Budget", "Comptabilité"] },
      { role: "Responsable Budget", email: "resp.budget@demo.conseil.ga", permissions: ["Prévisions", "Suivi"] },
      { role: "Contrôleur de Gestion", email: "controleur@demo.conseil.ga", permissions: ["Audit", "Reporting"] },
    ],
    module: "Budget & Finances",
    moduleIcon: Wallet,
  },
  {
    id: "rh",
    title: "Ressources Humaines",
    subtitle: "Gestion du Personnel",
    icon: UserCheck,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    borderColor: "border-rose-200 dark:border-rose-800",
    accounts: [
      { role: "DRH", email: "drh@demo.conseil.ga", permissions: ["Personnel", "Paie", "Formation"] },
      { role: "Responsable Recrutement", email: "recrutement@demo.conseil.ga", permissions: ["Recrutement", "Concours"] },
      { role: "Gestionnaire Carrières", email: "carrieres@demo.conseil.ga", permissions: ["Avancement", "Mutations"] },
    ],
    module: "Ressources Humaines",
    moduleIcon: Users,
  },
  {
    id: "directions",
    title: "Directions Sectorielles",
    subtitle: "Services opérationnels",
    icon: Briefcase,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    borderColor: "border-violet-200 dark:border-violet-800",
    accounts: [
      { role: "Dir. Urbanisme & Cadastre", email: "dir.urbanisme@demo.conseil.ga", permissions: ["Aménagement", "Permis"], domain: "Aménagement" },
      { role: "Dir. Action Sociale", email: "dir.social@demo.conseil.ga", permissions: ["RSA", "Handicap", "PA"], domain: "Social" },
      { role: "Dir. Éducation", email: "dir.education@demo.conseil.ga", permissions: ["Collèges", "Transport scolaire"], domain: "Éducation" },
      { role: "Dir. Routes", email: "dir.routes@demo.conseil.ga", permissions: ["Voirie", "Entretien"], domain: "Infrastructure" },
    ],
    module: "Patrimoine & Projets",
    moduleIcon: MapPin,
  },
  {
    id: "terrain",
    title: "Agents de Terrain",
    subtitle: "Services techniques",
    icon: HardHat,
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    accounts: [
      { role: "Agent Routes Secteur Nord", email: "agent.routes.nord@demo.conseil.ga", permissions: ["Interventions", "Signalements"] },
      { role: "Agent Bâtiments", email: "agent.batiments@demo.conseil.ga", permissions: ["Maintenance", "Travaux"] },
      { role: "Agent Espaces Verts", email: "agent.espaces@demo.conseil.ga", permissions: ["Entretien", "Plantations"] },
    ],
    module: "Patrimoine & Projets",
    moduleIcon: MapPin,
  },
  {
    id: "commissions",
    title: "Commissions & Comités",
    subtitle: "Instances délibératives",
    icon: Scale,
    color: "from-cyan-500 to-sky-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    accounts: [
      { role: "Président Commission Finances", email: "president.commission.finances@demo.conseil.ga", permissions: ["Délibérations Finances"] },
      { role: "Président Commission Social", email: "president.commission.social@demo.conseil.ga", permissions: ["Délibérations Social"] },
      { role: "Président Commission Environnement", email: "president.commission.env@demo.conseil.ga", permissions: ["Délibérations Environnement"] },
    ],
    module: "Gestion du Conseil",
    moduleIcon: Landmark,
  },
  {
    id: "citoyen",
    title: "Portail Citoyen",
    subtitle: "Accès public",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    accounts: [
      { role: "Citoyen", email: "citoyen@demo.conseil.ga", permissions: ["Consultation", "Demandes d'aides"] },
      { role: "Association", email: "association@demo.conseil.ga", permissions: ["Subventions", "Réservations"] },
      { role: "Entreprise", email: "entreprise@demo.conseil.ga", permissions: ["Marchés publics", "Appels d'offres"] },
    ],
    module: "Portail Citoyen",
    moduleIcon: Heart,
  },
];

// Modules avec leurs icônes et couleurs
export const modulesList = [
  { name: "Gestion du Conseil", icon: Landmark, color: "text-amber-600 dark:text-amber-400" },
  { name: "Budget & Finances", icon: Wallet, color: "text-emerald-600 dark:text-emerald-400" },
  { name: "Tutelle & Conformité", icon: Shield, color: "text-slate-600 dark:text-slate-400" },
  { name: "Ressources Humaines", icon: Users, color: "text-rose-600 dark:text-rose-400" },
  { name: "Patrimoine & Projets", icon: MapPin, color: "text-violet-600 dark:text-violet-400" },
  { name: "Portail Citoyen", icon: Heart, color: "text-red-600 dark:text-red-400" },
];

// Helper to generate department-specific emails
export const getDepartmentEmail = (baseEmail: string, departmentId: string): string => {
  const [user, domain] = baseEmail.split('@');
  return `${user}@${departmentId}.conseil.ga`;
};

// Get total accounts count
export const getTotalAccountsCount = (): number => {
  return accessProfiles.reduce((acc, p) => acc + p.accounts.length, 0);
};
