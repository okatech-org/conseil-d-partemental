import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Users, Crown, Briefcase, Network, HardHat, ClipboardCheck,
  MapPin, ChevronRight, Check, Info, FileText, Wallet, Shield, 
  TreePine, TrendingUp, Heart, Palette, ArrowLeft, ExternalLink,
  AlertCircle, Sparkles, Globe, Phone, Mail, Clock, Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import GabonMap from '@/components/maps/GabonMap';
import { 
  provincesData, 
  profileTypes, 
  competencesDomains, 
  fundsInfo,
  getDepartmentById,
  getProvinceByDepartmentId,
  generateDemoEmail,
  getTotalDemoStats,
  type ProvinceDetail,
  type DepartmentDetail
} from '@/lib/departments-data';

// Stepper component
const Stepper = ({ currentStep, steps }: { currentStep: number; steps: string[] }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {steps.map((step, index) => (
      <React.Fragment key={step}>
        <div className="flex items-center gap-2">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
            transition-all duration-300
            ${index < currentStep 
              ? 'bg-accent text-accent-foreground' 
              : index === currentStep 
                ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                : 'bg-muted text-muted-foreground'}
          `}>
            {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
          </div>
          <span className={`text-sm font-medium hidden sm:block ${index === currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
            {step}
          </span>
        </div>
        {index < steps.length - 1 && (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </React.Fragment>
    ))}
  </div>
);

// Province Card component
const ProvinceCard = ({ 
  province, 
  isSelected, 
  onClick 
}: { 
  province: ProvinceDetail; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -4 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card 
      className={`
        cursor-pointer transition-all duration-300 h-full
        ${isSelected 
          ? 'ring-2 ring-primary shadow-lg border-primary' 
          : 'hover:shadow-md hover:border-primary/50'}
      `}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl ${province.color} flex items-center justify-center`}>
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <Badge variant="outline" className="text-xs">
            {province.departments.length} dép.
          </Badge>
        </div>
        <CardTitle className="text-lg mt-3">{province.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Building2 className="h-3 w-3" />
          {province.capital}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">{province.populationEstimate.toLocaleString()}</span>
            <br />hab. estimés
          </div>
          <div>
            <span className="font-medium text-foreground">{province.totalAgents}</span>
            <br />agents
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Department Card component
const DepartmentCard = ({ 
  department, 
  province,
  isSelected, 
  onClick 
}: { 
  department: DepartmentDetail;
  province: ProvinceDetail;
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
  >
    <Card 
      className={`
        cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'ring-2 ring-primary shadow-lg border-primary bg-primary/5' 
          : 'hover:shadow-md hover:border-primary/50'}
      `}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{department.name}</h4>
              {department.isProvinceCapital && (
                <Badge className="bg-secondary text-secondary-foreground text-[10px]">⭐ Capital</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {department.chefLieu}
            </p>
          </div>
          <Badge variant={department.status === 'operational' ? 'default' : 'secondary'} className="text-xs">
            {department.status === 'operational' ? '✓ Opérationnel' : '⟳ Transition'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-foreground">{department.communes.length}</div>
            <div className="text-muted-foreground">Communes</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-foreground">{department.activeCompetences}/23</div>
            <div className="text-muted-foreground">Compét.</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-foreground">{(department.budgetEstimate / 1000).toFixed(1)}B</div>
            <div className="text-muted-foreground">Budget</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-foreground">{department.transferredStaff + department.localRecruits}</div>
            <div className="text-muted-foreground">Agents</div>
          </div>
        </div>

        {department.activeFunds.length > 0 && (
          <div className="flex gap-1 mt-3 flex-wrap">
            {department.activeFunds.map(fund => (
              <Badge key={fund} variant="outline" className="text-[10px]">
                {fundsInfo[fund].name}
              </Badge>
            ))}
          </div>
        )}

        {department.specialZone && (
          <Badge className="mt-2 text-[10px]" variant="secondary">
            {department.specialZone === 'mining' && '🔶 Zone Minière'}
            {department.specialZone === 'petroleum' && '🛢️ Zone Pétrolière'}
            {department.specialZone === 'coastal' && '🌊 Zone Côtière'}
            {department.specialZone === 'forest' && '🌲 Zone Forestière'}
          </Badge>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

// Profile Card component
const ProfileCard = ({ 
  profile, 
  department,
  onSelect 
}: { 
  profile: typeof profileTypes[0];
  department: DepartmentDetail;
  onSelect: (roleId: string, roleName: string) => void;
}) => {
  const IconComponent = {
    Crown, Users, Briefcase, Network, HardHat, ClipboardCheck
  }[profile.icon] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className={`w-14 h-14 rounded-xl ${profile.color} flex items-center justify-center mb-2`}>
            <IconComponent className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-lg">{profile.name}</CardTitle>
          <CardDescription>{profile.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {'roles' in profile && profile.roles && (
            <div className="space-y-2">
              {profile.roles.map(role => (
                <Button
                  key={role.id}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => onSelect(role.id, role.label)}
                >
                  <div>
                    <div className="font-medium text-sm">{role.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {generateDemoEmail(role.email, department.id)}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
          
          {'domains' in profile && profile.domains && (
            <Accordion type="single" collapsible className="w-full">
              {profile.domains.slice(0, 4).map(domain => (
                <AccordionItem key={domain.id} value={domain.id}>
                  <AccordionTrigger className="text-sm py-2">
                    {domain.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      {domain.competences.map(comp => (
                        <Button
                          key={comp.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-1.5"
                          onClick={() => onSelect(`dir_${comp.id}`, `Directeur ${comp.name}`)}
                        >
                          <div className="text-xs">
                            <div className="font-medium">{comp.name}</div>
                            <div className="text-muted-foreground">
                              dir.{comp.id}@{department.id}.conseil.ga
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({
  open,
  onClose,
  department,
  province,
  selectedRole,
  selectedRoleLabel,
  onConfirm
}: {
  open: boolean;
  onClose: () => void;
  department: DepartmentDetail | null;
  province: ProvinceDetail | null;
  selectedRole: string;
  selectedRoleLabel: string;
  onConfirm: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!department || !province) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConfirm();
  };

  const profile = profileTypes.find(p => 
    ('roles' in p && p.roles?.some(r => r.id === selectedRole)) ||
    selectedRole.startsWith('dir_')
  );

  const scenarios = profile?.scenarios || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl">Conseil Départemental de {department.name}</DialogTitle>
              <DialogDescription>
                {province.name} • {department.chefLieu}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {/* Status */}
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Phase 1 - Décentralisation Active</AlertTitle>
              <AlertDescription>
                Décret n°0453/PR/MISD du 14 novembre 2025
              </AlertDescription>
            </Alert>

            {/* Account Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Compte de démonstration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profil</span>
                  <span className="font-medium">{selectedRoleLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                    {generateDemoEmail(selectedRole.replace('dir_', 'dir.'), department.id)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Département</span>
                  <span className="font-medium">{department.name}</span>
                </div>
              </CardContent>
            </Card>

            {/* Competences */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Compétences du département ({department.activeCompetences}/23)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {competencesDomains.flatMap(d => d.competences).slice(0, department.activeCompetences).map((comp, i) => (
                    <Badge 
                      key={comp.id} 
                      variant={i < department.activeCompetences - 3 ? 'default' : 'secondary'}
                      className="text-[10px]"
                    >
                      {i < department.activeCompetences - 3 ? '✓' : '⟳'} {comp.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Funds */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Financement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dotation État</span>
                  <span className="font-medium">{(department.budgetEstimate * 0.4).toFixed(0)} M FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fonds Péréquation</span>
                  <span className="font-medium">{(department.budgetEstimate * 0.15).toFixed(0)} M FCFA</span>
                </div>
                {department.activeFunds.map(fund => (
                  <div key={fund} className="flex justify-between">
                    <span className="text-muted-foreground">{fundsInfo[fund].name}</span>
                    <span className="font-medium">{(department.budgetEstimate * 0.1).toFixed(0)} M FCFA</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t font-semibold">
                  <span>Budget Total Estimé</span>
                  <span className="text-primary">{department.budgetEstimate.toLocaleString()} M FCFA</span>
                </div>
              </CardContent>
            </Card>

            {/* Scenarios */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Scénarios de démonstration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scenarios.map((scenario, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{scenario}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose}>
            Modifier sélection
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading} className="min-w-[200px]">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                Connexion en cours...
              </>
            ) : (
              <>
                Accéder au Conseil Départemental
                <ExternalLink className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
export const DemoConseillPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceDetail | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDetail | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedRoleLabel, setSelectedRoleLabel] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const steps = ['Sélection Province', 'Sélection Département', 'Sélection Profil'];
  const stats = getTotalDemoStats();

  const handleProvinceSelect = (province: ProvinceDetail) => {
    setSelectedProvince(province);
    setSelectedDepartment(null);
    setCurrentStep(1);
  };

  const handleDepartmentSelect = (department: DepartmentDetail) => {
    setSelectedDepartment(department);
    setCurrentStep(2);
  };

  const handleRoleSelect = (roleId: string, roleLabel: string) => {
    setSelectedRole(roleId);
    setSelectedRoleLabel(roleLabel);
    setShowConfirmModal(true);
  };

  const handleConfirmAccess = () => {
    // Store selection in session
    sessionStorage.setItem('demo_department', JSON.stringify(selectedDepartment));
    sessionStorage.setItem('demo_province', JSON.stringify(selectedProvince));
    sessionStorage.setItem('demo_role', selectedRole);
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 2) {
        setSelectedDepartment(null);
      } else if (currentStep === 1) {
        setSelectedProvince(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇬🇦</span>
                  <h1 className="text-xl font-bold">Espace Démonstration - Conseils Départementaux</h1>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Explorez la gestion départementale selon votre profil
                </p>
              </div>
            </div>
            <Badge className="bg-secondary text-secondary-foreground">
              Décentralisation - Phase 1
            </Badge>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-accent" />
              <span className="font-medium">Décret n°0453/PR/MISD</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4 text-accent" />
              <span>{stats.totalDepartments} départements</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-accent" />
              <span>{stats.totalCompetences}+ compétences transférées</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Auto-connexion • Données de démonstration</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stepper */}
        <Stepper currentStep={currentStep} steps={steps} />

        {/* Back button */}
        {currentStep > 0 && (
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Province Selection */}
          {currentStep === 0 && (
            <motion.div
              key="provinces"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Sélectionnez une Province</h2>
                <p className="text-muted-foreground">
                  Le Gabon compte {stats.totalProvinces} provinces et {stats.totalDepartments} départements
                </p>
              </div>

              <Tabs defaultValue="map" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                  <TabsTrigger value="map" className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    Carte Interactive
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Liste Provinces
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="map">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Interactive Map */}
                    <Card className="p-4">
                      <GabonMap 
                        selectedProvince={selectedProvince?.id || null}
                        onProvinceSelect={(provinceId) => {
                          const province = provincesData.find(p => p.id === provinceId);
                          if (province) {
                            handleProvinceSelect(province);
                          }
                        }}
                      />
                    </Card>

                    {/* Province List Sidebar */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Provinces du Gabon
                      </h3>
                      <ScrollArea className="h-[450px] pr-4">
                        <div className="space-y-2">
                          {provincesData.map((province) => (
                            <motion.div
                              key={province.id}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Card 
                                className={`cursor-pointer transition-all p-3 ${
                                  selectedProvince?.id === province.id 
                                    ? 'ring-2 ring-primary bg-primary/5' 
                                    : 'hover:bg-muted/50'
                                }`}
                                onClick={() => handleProvinceSelect(province)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg ${province.color} flex items-center justify-center`}>
                                    <MapPin className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium">{province.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {province.capital} • {province.departments.length} dép.
                                    </div>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="grid">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {provincesData.map((province, index) => (
                      <motion.div
                        key={province.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <ProvinceCard
                          province={province}
                          isSelected={selectedProvince?.id === province.id}
                          onClick={() => handleProvinceSelect(province)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {/* Step 2: Department Selection */}
          {currentStep === 1 && selectedProvince && (
            <motion.div
              key="departments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <Badge className={`${selectedProvince.color} text-white mb-2`}>
                  {selectedProvince.name}
                </Badge>
                <h2 className="text-2xl font-bold mb-2">Sélectionnez un Département</h2>
                <p className="text-muted-foreground">
                  {selectedProvince.departments.length} départements dans la province de {selectedProvince.name}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProvince.departments.map((department, index) => (
                  <motion.div
                    key={department.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <DepartmentCard
                      department={department}
                      province={selectedProvince}
                      isSelected={selectedDepartment?.id === department.id}
                      onClick={() => handleDepartmentSelect(department)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Profile Selection */}
          {currentStep === 2 && selectedDepartment && selectedProvince && (
            <motion.div
              key="profiles"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className={`${selectedProvince.color} text-white`}>
                    {selectedProvince.name}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">
                    {selectedDepartment.name}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">Sélectionnez votre Profil</h2>
                <p className="text-muted-foreground">
                  Choisissez le profil correspondant à votre rôle dans le conseil départemental
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileTypes.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProfileCard
                      profile={profile}
                      department={selectedDepartment}
                      onSelect={handleRoleSelect}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Information Panels */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4 text-center">Informations Contextuelles</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="decret">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Décret de Décentralisation
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p><strong>Référence :</strong> Décret n°0453/PR/MISD du 14 novembre 2025</p>
                  <p><strong>Cadre légal :</strong> Loi n°028/2020, Ordonnance n°006/PR/2025</p>
                  <p><strong>Contexte :</strong> Première phase du transfert des compétences de l'État vers les collectivités locales</p>
                  <p><strong>Timeline :</strong> Phase 1 (2025-2026), Phases ultérieures en préparation</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <FileText className="h-4 w-4 mr-2" />
                    Télécharger le décret (PDF)
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="competences">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Cartographie des Compétences (20+ secteurs)
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {competencesDomains.map(domain => (
                    <Card key={domain.id} className="p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${domain.color}`} />
                        {domain.name}
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {domain.competences.map(comp => (
                          <li key={comp.id} className="flex items-center justify-between">
                            <span>{comp.name}</span>
                            <Badge variant="outline" className="text-[10px]">
                              {comp.transferLevel === 'total' ? 'Total' : comp.transferLevel === 'partial' ? 'Partiel' : 'Collab.'}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="organisation">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  Organisation Type Conseil Départemental
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
{`ASSEMBLÉE DÉPARTEMENTALE
└─ Conseillers Départementaux
   └─ Commissions permanentes (7)

EXÉCUTIF
├─ Président Conseil Départemental
├─ 4-5 Vice-présidents thématiques
└─ Bureau du Conseil

ADMINISTRATION
├─ Secrétariat Général
│  ├─ DGS
│  ├─ DAF
│  ├─ DRH
│  └─ DCSI
└─ Directions Sectorielles (20+)
   ├─ Direction Aménagement
   ├─ Direction Infrastructures
   ├─ Direction Environnement
   ├─ Direction Développement Économique
   ├─ Direction Services Sociaux
   ├─ Direction Culture & Jeunesse
   └─ Direction Finances`}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="financement">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-amber-500" />
                  Financement & Fonds
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Dotation État</h4>
                      <p className="text-muted-foreground">5-10% des ressources propres de l'État</p>
                      <ul className="mt-2 space-y-1 text-xs">
                        <li>• 97% → développement collectivités</li>
                        <li>• 1,5% → Fonds Péréquation</li>
                        <li>• 1,5% → organes décentralisation</li>
                      </ul>
                    </Card>
                    {Object.entries(fundsInfo).map(([key, fund]) => (
                      <Card key={key} className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${fund.color}`} />
                          {fund.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">{fund.description}</p>
                        <Badge variant="outline" className="mt-2">{fund.rate}</Badge>
                      </Card>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rh">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Ressources Humaines
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Personnel transféré de l'État (Article 4)</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Mise à disposition ou détachement avec solde</li>
                      <li>• Conservation du plan de carrière fonction publique</li>
                      <li>• Coordination avec le Ministère de la Fonction Publique</li>
                    </ul>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Recrutement local</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Possible si l'État ne peut transférer du personnel</li>
                      <li>• Limité par les ressources financières disponibles</li>
                      <li>• Respect des textes en vigueur</li>
                    </ul>
                  </Card>
                  <div className="bg-muted p-4 rounded-lg">
                    <p><strong>Statistiques :</strong> En moyenne {Math.round(stats.totalStaff / stats.totalDepartments)} agents par département</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        department={selectedDepartment}
        province={selectedProvince}
        selectedRole={selectedRole}
        selectedRoleLabel={selectedRoleLabel}
        onConfirm={handleConfirmAccess}
      />
    </div>
  );
};

export default DemoConseillPage;
