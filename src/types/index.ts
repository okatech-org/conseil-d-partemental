// ============= Core Domain Types =============

// Multi-Tenant
export interface Tenant {
  id: string;
  code: string;
  name: string;
  provinceId: string;
  dbName: string;
  status: 'active' | 'suspended' | 'pending';
  plan: 'essential' | 'premium' | 'enterprise';
  quotas: {
    users: number;
    storageGb: number;
    apiCallsMonth: number;
  };
  customDomain?: string;
  logoUrl?: string;
  themeColors?: Record<string, string>;
  createdAt: Date;
}

// Users & Auth
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  avatar?: string;
  phone?: string;
  lastLogin?: Date;
  isActive: boolean;
}

export type UserRole = 
  | 'super_admin'      // Niveau national
  | 'governor'         // Gouverneur province
  | 'president'        // Président conseil départemental
  | 'vice_president'   // Vice-président
  | 'secretary_general'// Secrétaire général
  | 'councilor'        // Conseiller départemental
  | 'director'         // Directeur service
  | 'agent'            // Agent administratif
  | 'receiver'         // Receveur municipal
  | 'citizen';         // Citoyen

// ============= Module 1: Conseil Départemental =============

export interface Councilor {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  dateOfBirth: Date;
  placeOfBirth: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  photo?: string;
  function: 'president' | 'vice_president' | 'councilor';
  electionDate: Date;
  mandateStart: Date;
  mandateEnd: Date;
  status: 'active' | 'resigned' | 'deceased' | 'suspended';
  commission?: string;
  biography?: string;
  createdAt: Date;
}

export interface Session {
  id: string;
  tenantId: string;
  type: 'ordinary' | 'extraordinary';
  quarter?: 'T2' | 'T4';
  year: number;
  title: string;
  convocationDate: Date;
  startDate: Date;
  endDate?: Date;
  location: string;
  agenda: AgendaItem[];
  status: 'planned' | 'convened' | 'in_progress' | 'completed' | 'cancelled';
  quorumRequired: number;
  quorumMet: boolean;
  attendees: SessionAttendee[];
  minutes?: Minutes;
  createdAt: Date;
}

export interface AgendaItem {
  id: string;
  order: number;
  title: string;
  description: string;
  type: 'information' | 'deliberation' | 'vote';
  documents: Document[];
  deliberation?: Deliberation;
}

export interface SessionAttendee {
  id: string;
  councilorId: string;
  councilor: Councilor;
  status: 'present' | 'absent' | 'excused';
  proxy?: string; // ID du conseiller qui détient le mandat
  signedAt?: Date;
}

export interface Deliberation {
  id: string;
  tenantId: string;
  sessionId: string;
  number: string;
  year: number;
  date: Date;
  subject: string;
  content: string;
  type: 'regulatory' | 'individual' | 'budgetary' | 'organizational';
  vote?: Vote;
  status: 'draft' | 'adopted' | 'rejected' | 'transmitted' | 'approved' | 'challenged';
  signedBy?: string;
  signedAt?: Date;
  transmittedAt?: Date;
  receiptNumber?: string;
  tutelleStatus?: 'pending' | 'approved' | 'correction_requested' | 'referred_to_court';
  executoryDate?: Date;
  documents: Document[];
  createdAt: Date;
}

export interface Vote {
  id: string;
  deliberationId: string;
  type: 'public' | 'secret' | 'roll_call';
  forVotes: number;
  againstVotes: number;
  abstentions: number;
  proxies: number;
  quorumMet: boolean;
  presidentVote?: 'for' | 'against' | 'abstain';
  result: 'adopted' | 'rejected' | 'invalid';
  conductedAt: Date;
  auditTrail: VoteAuditEntry[];
}

export interface VoteAuditEntry {
  councilorId: string;
  vote: 'for' | 'against' | 'abstain';
  timestamp: Date;
  isProxy: boolean;
}

export interface Minutes {
  id: string;
  sessionId: string;
  content: string;
  attendees: string[];
  absentees: string[];
  excused: string[];
  agenda: string[];
  deliberations: string[];
  signedByPresident: boolean;
  signedBySecretary: boolean;
  signedByMembers: string[];
  publishedAt?: Date;
  documentUrl?: string;
}

// ============= Module 2: Budget & Finances =============

export interface Budget {
  id: string;
  tenantId: string;
  year: number;
  type: 'primitive' | 'additional' | 'supplementary';
  status: 'draft' | 'submitted' | 'voted' | 'transmitted' | 'approved' | 'executed';
  deliberationId?: string;
  operatingSection: BudgetSection;
  investmentSection: BudgetSection;
  totalRevenue: number;
  totalExpenditure: number;
  balance: number;
  votedAt?: Date;
  approvedAt?: Date;
  createdAt: Date;
}

export interface BudgetSection {
  type: 'operating' | 'investment';
  revenues: BudgetLine[];
  expenditures: BudgetLine[];
  totalRevenues: number;
  totalExpenditures: number;
  balance: number;
}

export interface BudgetLine {
  id: string;
  code: string;
  title: string;
  chapter: string;
  article: string;
  paragraph?: string;
  section: 'operating' | 'investment';
  type: 'revenue' | 'expenditure';
  forecastAmount: number;
  engagedAmount: number;
  liquidatedAmount: number;
  paidAmount: number;
  available: number;
  executionRate: number;
}

export interface Engagement {
  id: string;
  tenantId: string;
  number: string;
  year: number;
  budgetLineId: string;
  amount: number;
  object: string;
  beneficiary: string;
  status: 'pending' | 'approved' | 'rejected';
  receiverVisa?: boolean;
  receiverVisaDate?: Date;
  creditBefore: number;
  creditAfter: number;
  createdBy: string;
  createdAt: Date;
}

export interface Liquidation {
  id: string;
  engagementId: string;
  amount: number;
  serviceDone: boolean;
  serviceDoneDate?: Date;
  invoiceNumber?: string;
  invoiceDate?: Date;
  exigibilityDate: Date;
  documents: Document[];
  status: 'pending' | 'certified' | 'rejected';
  createdAt: Date;
}

export interface PaymentOrder {
  id: string;
  tenantId: string;
  number: string;
  year: number;
  liquidationId: string;
  amount: number;
  beneficiary: string;
  bankDetails?: BankDetails;
  status: 'issued' | 'submitted' | 'approved' | 'rejected' | 'paid';
  issuedBy: string;
  issuedAt: Date;
  receiverVisa?: boolean;
  receiverVisaDate?: Date;
  rejectionReason?: string;
  paymentDate?: Date;
  paymentReference?: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  iban?: string;
  swift?: string;
}

// ============= Module 3: Tutelle & Conformité =============

export interface TutelleTransmission {
  id: string;
  tenantId: string;
  actType: 'deliberation' | 'order' | 'decision' | 'budget';
  actId: string;
  actNumber: string;
  subject: string;
  transmittedAt: Date;
  receiptNumber: string;
  receiptDate: Date;
  deadline: Date; // 15 days from receipt
  status: 'transmitted' | 'received' | 'under_review' | 'approved' | 'correction_requested' | 'referred_to_court' | 'executory';
  governorRemarks?: string;
  correctionRequest?: string;
  correctionDeadline?: Date;
  correctedAt?: Date;
  executoryDate?: Date;
  courtReferralDate?: Date;
  courtDecision?: 'pending' | 'confirmed' | 'annulled';
  documents: Document[];
}

export interface ComplianceScore {
  tenantId: string;
  period: string; // YYYY-MM
  budgetCompliance: number;
  transmissionCompliance: number;
  sessionCompliance: number;
  personnelCompliance: number;
  globalScore: number;
  alerts: ComplianceAlert[];
}

export interface ComplianceAlert {
  id: string;
  tenantId: string;
  level: 'info' | 'warning' | 'alert' | 'critical';
  category: 'budget' | 'transmission' | 'session' | 'personnel' | 'deadline';
  title: string;
  message: string;
  action?: string;
  deadline?: Date;
  acknowledged: boolean;
  createdAt: Date;
}

// ============= Module 4: GRH & Administration =============

export interface Employee {
  id: string;
  tenantId: string;
  matricule: string;
  type: 'elected' | 'seconded' | 'local_civil_service' | 'contractual';
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  dateOfBirth: Date;
  placeOfBirth: string;
  nationality: string;
  idNumber: string;
  idType: 'cni' | 'passport';
  address: string;
  phone: string;
  email?: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  numberOfChildren: number;
  recruitmentDate: Date;
  tenureDate?: Date;
  grade: string;
  echelon: number;
  index: number;
  position: string;
  service: string;
  baseSalary: number;
  status: 'active' | 'suspended' | 'retired' | 'terminated';
  bankDetails?: BankDetails;
  photo?: string;
  documents: Document[];
  createdAt: Date;
}

export interface Payslip {
  id: string;
  employeeId: string;
  period: string; // YYYY-MM
  baseSalary: number;
  allowances: PayComponent[];
  deductions: PayComponent[];
  grossSalary: number;
  netSalary: number;
  employerContributions: PayComponent[];
  totalEmployerCost: number;
  generatedAt: Date;
  paidAt?: Date;
  paymentReference?: string;
}

export interface PayComponent {
  code: string;
  label: string;
  amount: number;
  rate?: number;
  base?: number;
}

export interface CivilStatusAct {
  id: string;
  tenantId: string;
  type: 'birth' | 'marriage' | 'death';
  number: string;
  year: number;
  date: Date;
  location: string;
  
  // Birth
  childName?: string;
  childFirstNames?: string;
  childGender?: 'M' | 'F';
  birthDate?: Date;
  birthTime?: string;
  birthPlace?: string;
  fatherName?: string;
  fatherFirstNames?: string;
  fatherProfession?: string;
  motherName?: string;
  motherFirstNames?: string;
  motherProfession?: string;
  
  // Marriage
  spouseName?: string;
  spouseFirstNames?: string;
  spouseBirthDate?: Date;
  spouse2Name?: string;
  spouse2FirstNames?: string;
  spouse2BirthDate?: Date;
  matrimonialRegime?: string;
  
  // Death
  deceasedName?: string;
  deceasedFirstNames?: string;
  deceasedBirthDate?: Date;
  deathDate?: Date;
  deathTime?: string;
  deathPlace?: string;
  deathCause?: string;
  
  officerId: string;
  officerName: string;
  officerTitle: string;
  marginalNotes: MarginalNote[];
  documents: Document[];
  createdAt: Date;
}

export interface MarginalNote {
  id: string;
  type: string;
  content: string;
  date: Date;
  reference: string;
}

// ============= Module 5: Patrimoine & Projets =============

export interface Asset {
  id: string;
  tenantId: string;
  inventoryNumber: string;
  category: 'public_domain' | 'private_domain';
  type: 'land' | 'building' | 'vehicle' | 'furniture' | 'equipment';
  nature: string;
  designation: string;
  description?: string;
  address?: string;
  commune?: string;
  area?: number; // m²
  latitude?: number;
  longitude?: number;
  acquisitionDate?: Date;
  acquisitionMode: 'purchase' | 'donation' | 'construction' | 'expropriation' | 'abandoned';
  acquisitionOrigin?: string;
  landTitleRef?: string;
  originalValue: number;
  currentValue: number;
  lastValuationDate?: Date;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'to_reform';
  assignment?: string;
  occupant?: string;
  occupancyMode?: 'public_service' | 'rental' | 'free' | 'vacant';
  insured: boolean;
  insuranceCompany?: string;
  insuranceNumber?: string;
  insuranceExpiry?: Date;
  photos: string[];
  documents: Document[];
  maintenanceHistory: MaintenanceRecord[];
  status: 'active' | 'reformed' | 'transferred' | 'destroyed';
  createdAt: Date;
}

export interface MaintenanceRecord {
  id: string;
  date: Date;
  type: 'preventive' | 'corrective' | 'upgrade';
  description: string;
  cost: number;
  contractor?: string;
}

export interface InvestmentProject {
  id: string;
  tenantId: string;
  code: string;
  title: string;
  description: string;
  category: 'building' | 'infrastructure' | 'equipment';
  projectType: 'construction' | 'rehabilitation' | 'extension' | 'acquisition';
  objectives: string;
  beneficiaries: string;
  location: string;
  latitude?: number;
  longitude?: number;
  inscriptionYear: number;
  deliberationNumber?: string;
  priority: number;
  estimatedCost: number;
  actualCost?: number;
  funding: ProjectFunding[];
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  durationMonths: number;
  contractNumber?: string;
  contractor?: string;
  contractAmount?: number;
  progressPercentage: number;
  phase: 'study' | 'tender' | 'execution' | 'reception' | 'completed';
  status: 'planned' | 'in_progress' | 'delayed' | 'suspended' | 'completed' | 'cancelled';
  provisionalReceptionDate?: Date;
  finalReceptionDate?: Date;
  photos: string[];
  documents: Document[];
  createdAt: Date;
}

export interface ProjectFunding {
  source: 'own_funds' | 'state_grant' | 'loan' | 'partners' | 'fdl';
  amount: number;
  percentage: number;
  reference?: string;
}

export interface PublicContract {
  id: string;
  tenantId: string;
  projectId?: string;
  number: string;
  subject: string;
  type: 'works' | 'supplies' | 'services';
  procurementMode: 'open_tender' | 'restricted_tender' | 'direct_agreement';
  contractorName: string;
  contractorTaxId: string;
  contractorAddress: string;
  contractorPhone: string;
  initialAmount: number;
  revisedAmount?: number;
  paidAmount: number;
  executionDays: number;
  notificationDate: Date;
  startOrderDate?: Date;
  actualStartDate?: Date;
  plannedEndDate: Date;
  actualEndDate?: Date;
  provisionalDeposit: number;
  finalDeposit: number;
  retentionRate: number;
  delayPenalties: number;
  progressPercentage: number;
  provisionalReceptionDate?: Date;
  finalReceptionDate?: Date;
  status: 'preparation' | 'tender' | 'awarded' | 'in_progress' | 'reception' | 'completed' | 'terminated';
  documents: Document[];
  createdAt: Date;
}

// ============= Module 6: Portail Citoyen =============

export interface CitizenRequest {
  id: string;
  tenantId: string;
  type: 'birth_certificate' | 'marriage_certificate' | 'death_certificate' | 'residence_certificate' | 'legalization' | 'other';
  trackingNumber: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail?: string;
  requesterIdNumber: string;
  details: Record<string, any>;
  documents: Document[];
  status: 'submitted' | 'processing' | 'ready' | 'delivered' | 'rejected';
  fee?: number;
  paymentStatus?: 'pending' | 'paid';
  paymentReference?: string;
  assignedTo?: string;
  processedAt?: Date;
  deliveredAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
}

export interface PublicConsultation {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'closed' | 'archived';
  documents: Document[];
  contributions: Contribution[];
  summary?: string;
  createdAt: Date;
}

export interface Contribution {
  id: string;
  consultationId: string;
  citizenName: string;
  citizenEmail?: string;
  content: string;
  createdAt: Date;
}

// ============= Common Types =============

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  tenantId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
}

// Stats & Dashboard
export interface DashboardStats {
  budget: {
    voted: number;
    executed: number;
    executionRate: number;
    operatingBalance: number;
    investmentBalance: number;
  };
  sessions: {
    held: number;
    required: number;
    nextSession?: Date;
  };
  deliberations: {
    total: number;
    transmitted: number;
    approved: number;
    pending: number;
  };
  personnel: {
    total: number;
    elected: number;
    agents: number;
    payrollCost: number;
  };
  projects: {
    total: number;
    inProgress: number;
    completed: number;
    delayed: number;
  };
  compliance: {
    score: number;
    alerts: number;
    criticalAlerts: number;
  };
}
