import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, X, Mail, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { accessProfiles, modulesList, getDepartmentEmail, getTotalAccountsCount, type AccessProfile, type DemoAccount } from '@/lib/demo-access-profiles';

interface SelectedAccount {
  profile: AccessProfile;
  account: DemoAccount;
}

interface DemoAccessProfilesProps {
  departmentId?: string;
  onAccountSelect?: (profile: AccessProfile, account: DemoAccount) => void;
  showModules?: boolean;
}

export const DemoAccessProfiles: React.FC<DemoAccessProfilesProps> = ({ 
  departmentId, 
  onAccountSelect,
  showModules = true 
}) => {
  const [selectedAccount, setSelectedAccount] = useState<SelectedAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleAccountSelect = (profile: AccessProfile, account: DemoAccount) => {
    const adjustedAccount = departmentId 
      ? { ...account, email: getDepartmentEmail(account.email, departmentId) }
      : account;
    
    if (onAccountSelect) {
      onAccountSelect(profile, adjustedAccount);
    } else {
      setSelectedAccount({ profile, account: adjustedAccount });
    }
  };

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setSelectedAccount(null);
      if (departmentId) {
        navigate(`/dashboard?tenant=${departmentId}`);
      } else {
        navigate("/dashboard");
      }
    }, 1500);
  };

  return (
    <>
      {/* Quick Access Modules */}
      {showModules && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-serif mb-6">Accès aux Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modulesList.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group text-center p-4">
                  <module.icon className={`h-8 w-8 mx-auto mb-3 ${module.color} group-hover:scale-110 transition-transform`} />
                  <p className="font-medium text-sm">{module.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Access Profiles Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-serif">Comptes d'accès démo</h2>
            <p className="text-muted-foreground mt-1">
              Sélectionnez un profil pour accéder à la plateforme avec des permissions prédéfinies
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            {getTotalAccountsCount()} comptes disponibles
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`h-full ${profile.bgColor} ${profile.borderColor} border-2 hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-lg`}>
                      <profile.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <profile.moduleIcon className="h-3 w-3" />
                      {profile.module}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3">{profile.title}</CardTitle>
                  <CardDescription>{profile.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <div className="space-y-2">
                    {profile.accounts.map((account, idx) => {
                      const displayEmail = departmentId 
                        ? getDepartmentEmail(account.email, departmentId)
                        : account.email;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAccountSelect(profile, account)}
                          className="w-full text-left p-3 rounded-lg bg-background/60 hover:bg-background border border-border/50 hover:border-primary/50 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                {account.role}
                              </p>
                              <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {displayEmail}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connection Confirmation Modal */}
      <AnimatePresence>
        {selectedAccount && (
          <Dialog open={!!selectedAccount} onOpenChange={() => setSelectedAccount(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedAccount.profile.color} flex items-center justify-center`}>
                    <selectedAccount.profile.icon className="h-5 w-5 text-white" />
                  </div>
                  Connexion Démo
                </DialogTitle>
                <DialogDescription>
                  Vous allez accéder à la plateforme avec le profil sélectionné
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Profile Info */}
                <div className={`p-4 rounded-lg ${selectedAccount.profile.bgColor} ${selectedAccount.profile.borderColor} border`}>
                  <div className="flex items-center gap-3 mb-3">
                    <selectedAccount.profile.moduleIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{selectedAccount.profile.module}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Profil:</span>
                      <span className="font-medium text-sm">{selectedAccount.account.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Email:</span>
                      <span className="font-mono text-sm text-primary truncate">{selectedAccount.account.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mot de passe:</span>
                      <span className="font-mono text-sm">••••••••</span>
                      <Badge variant="outline" className="text-xs">demo</Badge>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Permissions accordées:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAccount.account.permissions.map((perm, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedAccount(null)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                  <Button
                    className={`flex-1 bg-gradient-to-r ${selectedAccount.profile.color} text-white hover:opacity-90`}
                    onClick={handleConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Connexion...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Se connecter
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default DemoAccessProfiles;
