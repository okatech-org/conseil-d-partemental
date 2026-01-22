import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, Menu, Sun, Moon, LogIn, UserPlus, Map, Home, 
  FileText, Newspaper, Megaphone, Eye, Users, Sprout, ChevronDown, Compass 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WoleuHeaderProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

const mainNavItems = [
  { label: "Accueil", href: "/conseil/woleu", icon: Home },
  { label: "Découvrir", href: "/conseil/woleu/decouvrir", icon: Compass },
  { label: "Actualités", href: "/conseil/woleu/actualites", icon: Newspaper },
  { label: "Sensibilisation", href: "/conseil/woleu/sensibilisation", icon: Megaphone },
  { label: "Conseils", href: "/conseils", icon: Map }
];

const programmeItems = [
  { label: "Vue d'ensemble", href: "/conseil/woleu/programme", icon: FileText },
  { label: "Notre Vision", href: "/conseil/woleu/vision", icon: Eye },
  { label: "Les 5 Chantiers", href: "/conseil/woleu/chantiers", icon: Building2 },
  { label: "Woleu Transparent", href: "/conseil/woleu/transparent", icon: Sprout },
  { label: "Cercles Citoyens", href: "/conseil/woleu/cercles", icon: Users }
];

export const WoleuHeader: React.FC<WoleuHeaderProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/conseil/woleu') {
      return location.pathname === '/conseil/woleu';
    }
    return location.pathname.startsWith(href);
  };

  const isProgrammeActive = programmeItems.some(item => location.pathname === item.href);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 dark:bg-emerald-950/95 backdrop-blur-md shadow-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-emerald-600' : 'bg-white/20'
            }`}>
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className={`font-bold text-base sm:text-lg leading-tight transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                Conseil Départemental du Woleu
              </h1>
              <p className={`text-xs transition-colors ${
                isScrolled ? 'text-muted-foreground' : 'text-white/70'
              }`}>
                Woleu-Ntem • Oyem
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Accueil */}
            <Link
              to="/conseil/woleu"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/conseil/woleu'
                  ? isScrolled 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white/20 text-white'
                  : isScrolled 
                    ? 'text-foreground hover:bg-muted' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Accueil
            </Link>

            {/* Programme Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    isProgrammeActive
                      ? isScrolled 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-white/20 text-white'
                      : isScrolled 
                        ? 'text-foreground hover:bg-muted' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Programme
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {programmeItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link to={item.href} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other nav items */}
            {mainNavItems.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? isScrolled 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-white/20 text-white'
                    : isScrolled 
                      ? 'text-foreground hover:bg-muted' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={isScrolled ? '' : 'text-white hover:bg-white/10'}
              >
                <Sun className={`h-5 w-5 transition-all duration-300 ${resolvedTheme === 'dark' ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
                <Moon className={`absolute h-5 w-5 transition-all duration-300 ${resolvedTheme === 'dark' ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
              </Button>
            )}
            <Link to="/conseil/woleu/connexion">
              <Button 
                variant={isScrolled ? "ghost" : "outline"} 
                size="sm"
                className={isScrolled ? '' : 'border-white/30 text-white hover:bg-white/10'}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
            <Link to="/conseil/woleu/connexion">
              <Button 
                size="sm" 
                className="bg-amber-500 hover:bg-amber-600 text-emerald-900 font-semibold"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Inscription
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className={isScrolled ? '' : 'text-white hover:bg-white/10'}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-emerald-950 border-emerald-800">
              <div className="flex flex-col h-full text-white">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">CD Woleu</div>
                    <div className="text-xs text-white/70">Woleu-Ntem</div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto">
                  <Link
                    to="/conseil/woleu"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === '/conseil/woleu'
                        ? "bg-emerald-700 font-medium" 
                        : "hover:bg-white/10"
                    }`}
                  >
                    <Home className="h-5 w-5" />
                    Accueil
                  </Link>

                  {/* Programme section */}
                  <div className="pt-2">
                    <p className="px-4 py-2 text-xs text-white/50 uppercase tracking-wider">Programme</p>
                    {programmeItems.map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            active 
                              ? "bg-emerald-700 font-medium" 
                              : "hover:bg-white/10"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Other items */}
                  <div className="pt-2">
                    <p className="px-4 py-2 text-xs text-white/50 uppercase tracking-wider">Navigation</p>
                    {mainNavItems.slice(1).map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            active 
                              ? "bg-emerald-700 font-medium" 
                              : "hover:bg-white/10"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* Actions */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  {mounted && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    >
                      {resolvedTheme === 'dark' ? (
                        <>
                          <Sun className="mr-2 h-4 w-4" />
                          Mode clair
                        </>
                      ) : (
                        <>
                          <Moon className="mr-2 h-4 w-4" />
                          Mode sombre
                        </>
                      )}
                    </Button>
                  )}
                  <Link to="/conseil/woleu/connexion" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <LogIn className="mr-2 h-4 w-4" />
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/conseil/woleu/connexion" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-emerald-900 font-semibold">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Inscription
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
