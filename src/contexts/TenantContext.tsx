import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tenant, User, UserRole } from '@/types';
import { provinces } from '@/lib/data';

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoading: boolean;
  switchTenant: (tenantCode: string) => void;
  hasPermission: (permission: string) => boolean;
  isNationalLevel: boolean;
  isProvinceLevel: boolean;
  isDepartmentLevel: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

// Role-based permissions
const rolePermissions: Record<UserRole, string[]> = {
  super_admin: ['*'], // All permissions
  governor: [
    'view:all_departments',
    'view:province_dashboard',
    'approve:acts',
    'view:compliance',
    'view:budgets',
  ],
  president: [
    'manage:council',
    'manage:sessions',
    'manage:deliberations',
    'sign:acts',
    'manage:budget',
    'manage:personnel',
    'manage:assets',
    'manage:projects',
    'view:compliance',
  ],
  vice_president: [
    'view:council',
    'vote:deliberations',
    'view:budget',
    'view:personnel',
  ],
  secretary_general: [
    'manage:council',
    'manage:sessions',
    'manage:personnel',
    'manage:assets',
    'prepare:budget',
    'view:compliance',
  ],
  councilor: [
    'view:council',
    'vote:deliberations',
    'view:budget',
  ],
  director: [
    'manage:service',
    'view:budget',
    'prepare:engagements',
  ],
  agent: [
    'view:assigned_tasks',
    'process:requests',
  ],
  receiver: [
    'validate:payments',
    'view:budget',
    'reject:mandates',
  ],
  citizen: [
    'view:public_documents',
    'submit:requests',
    'view:transparency',
  ],
};

// Mock tenants for demo
const mockTenants: Record<string, Tenant> = {
  mpassa: {
    id: 'tenant-mpassa',
    code: 'MPASSA',
    name: 'Conseil Départemental de Mpassa',
    provinceId: 'haut-ogooue',
    dbName: 'conseil_mpassa',
    status: 'active',
    plan: 'premium',
    quotas: {
      users: 100,
      storageGb: 500,
      apiCallsMonth: 500000,
    },
    customDomain: 'mpassa.conseil-gabon.ga',
    createdAt: new Date('2024-01-01'),
  },
  national: {
    id: 'tenant-national',
    code: 'NATIONAL',
    name: 'Direction Générale de la Décentralisation',
    provinceId: '',
    dbName: 'conseil_national',
    status: 'active',
    plan: 'enterprise',
    quotas: {
      users: 500,
      storageGb: 5000,
      apiCallsMonth: 5000000,
    },
    createdAt: new Date('2024-01-01'),
  },
};

// Mock user for demo
const mockUser: User = {
  id: 'user-1',
  email: 'president@conseil-mpassa.ga',
  firstName: 'Jean-Baptiste',
  lastName: 'NTOUTOUME',
  role: 'president',
  tenantId: 'tenant-mpassa',
  isActive: true,
  lastLogin: new Date(),
};

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading tenant from subdomain or session
    const loadTenant = async () => {
      try {
        // In production, this would parse the subdomain
        // const subdomain = window.location.hostname.split('.')[0];
        
        // For demo, default to Mpassa
        setCurrentTenant(mockTenants.mpassa);
        setCurrentUser(mockUser);
      } catch (error) {
        console.error('Failed to load tenant:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenant();
  }, []);

  const switchTenant = (tenantCode: string) => {
    const tenant = mockTenants[tenantCode.toLowerCase()];
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    
    const userPermissions = rolePermissions[currentUser.role];
    
    // Super admin has all permissions
    if (userPermissions.includes('*')) return true;
    
    // Check specific permission
    return userPermissions.includes(permission);
  };

  const isNationalLevel = currentUser?.role === 'super_admin';
  const isProvinceLevel = currentUser?.role === 'governor';
  const isDepartmentLevel = !isNationalLevel && !isProvinceLevel;

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        setCurrentTenant,
        currentUser,
        setCurrentUser,
        isLoading,
        switchTenant,
        hasPermission,
        isNationalLevel,
        isProvinceLevel,
        isDepartmentLevel,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
