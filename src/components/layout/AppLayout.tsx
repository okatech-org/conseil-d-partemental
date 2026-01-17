import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Wallet, 
  Shield, 
  UserCog, 
  Building2, 
  Globe,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/TenantContext';
import { provinces } from '@/lib/data';

const modules = [
  { id: 'dashboard', name: 'Tableau de Bord', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'conseil', name: 'Gestion du Conseil', icon: Users, path: '/conseil' },
  { id: 'budget', name: 'Budget & Finances', icon: Wallet, path: '/budget' },
  { id: 'tutelle', name: 'Tutelle & Conformité', icon: Shield, path: '/tutelle' },
  { id: 'rh', name: 'Ressources Humaines', icon: UserCog, path: '/rh' },
  { id: 'patrimoine', name: 'Patrimoine & Projets', icon: Building2, path: '/patrimoine' },
  { id: 'citoyen', name: 'Portail Citoyen', icon: Globe, path: '/citoyen' },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTenant, currentUser } = useTenant();

  const currentModule = modules.find(m => location.pathname.startsWith(m.path));

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={cn(
      "flex flex-col h-full",
      mobile ? "p-4" : "p-4 border-r border-border bg-card"
    )}>
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <span className="text-lg font-bold text-primary-foreground">CD</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">Conseil</span>
          <span className="text-xs text-muted-foreground">Départemental</span>
        </div>
      </Link>

      {/* Tenant Selector */}
      {currentTenant && (
        <div className="mb-6 px-2">
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Département actif</p>
            <p className="font-semibold text-sm truncate">{currentTenant.name.replace('Conseil Départemental de ', '')}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = location.pathname.startsWith(module.path);
          
          return (
            <Link
              key={module.id}
              to={module.path}
              onClick={() => mobile && setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{module.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="pt-4 border-t border-border space-y-1">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <Settings className="w-5 h-5" />
          <span>Paramètres</span>
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Aide</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                {currentTenant?.name.replace('Conseil Départemental de ', '')}
              </span>
              {currentModule && (
                <>
                  <ChevronDown className="h-4 w-4 text-muted-foreground rotate-[-90deg]" />
                  <span className="font-medium">{currentModule.name}</span>
                </>
              )}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-9 bg-muted/50 border-transparent focus:bg-background focus:border-input"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Dark mode toggle */}
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start text-left">
                      <span className="text-sm font-medium">
                        {currentUser?.firstName} {currentUser?.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {currentUser?.role?.replace('_', ' ')}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => navigate('/')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
