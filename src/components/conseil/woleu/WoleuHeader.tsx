import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Menu, Sun, Moon, LogIn, UserPlus, Map, Home, Eye, Users as UsersIcon, BookOpen, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

interface WoleuHeaderProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
}

const navItems = [
  { label: "Accueil", value: "hero", icon: Home },
  { label: "Notre Vision", value: "vision", icon: Eye },
  { label: "Les 5 Chantiers", value: "axes", icon: BookOpen },
  { label: "Woleu Transparent", value: "transparent", icon: Eye },
  { label: "Cercles Citoyens", value: "cercles", icon: UsersIcon },
  { label: "Conseils", href: "/conseils", icon: Map },
  { label: "Contact", value: "contact", icon: Phone }
];

export const WoleuHeader: React.FC<WoleuHeaderProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

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

  const handleNavClick = (value: string) => {
    onNavigate(value);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-green-950/95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-green-600' : 'bg-white/20'
            }`}>
              <Building2 className={`h-5 w-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
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
            {navItems.map((item) => (
              item.href ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isScrolled 
                      ? 'text-foreground hover:bg-muted' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.value!)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.value
                      ? isScrolled 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white/20 text-white'
                      : isScrolled 
                        ? 'text-foreground hover:bg-muted' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              )
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
            <Button 
              variant={isScrolled ? "ghost" : "outline"} 
              size="sm"
              className={isScrolled ? '' : 'border-white/30 text-white hover:bg-white/10'}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Connexion
            </Button>
            <Button 
              size="sm" 
              className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Inscription
            </Button>
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
            <SheetContent side="right" className="w-80 bg-green-950 border-green-800">
              <div className="flex flex-col h-full text-white">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">CD Woleu</div>
                    <div className="text-xs text-white/70">Woleu-Ntem</div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.value;
                    return item.href ? (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.value!)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive 
                            ? "bg-green-700 font-medium" 
                            : "hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </button>
                    );
                  })}
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
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <LogIn className="mr-2 h-4 w-4" />
                    Connexion
                  </Button>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Inscription
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
