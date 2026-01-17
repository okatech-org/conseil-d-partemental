import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Menu, 
  LogIn,
  UserPlus,
  Sun,
  Moon
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Actualités", href: "/actualites" },
  { label: "Sensibilisation", href: "/sensibilisation" },
  { label: "Tutoriels", href: "/tutoriels" },
  { label: "Processus", href: "/processus" },
  { label: "Démo", href: "/demo" }
];

const modules = [
  { label: "Gestion du Conseil", href: "/conseil" },
  { label: "Budget & Finances", href: "/budget" },
  { label: "Tutelle & Conformité", href: "/tutelle" },
  { label: "Ressources Humaines", href: "/rh" },
  { label: "Patrimoine & Projets", href: "/patrimoine" },
  { label: "Portail Citoyen", href: "/citoyen" }
];

const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isScrolled ? "bg-primary" : "bg-white/20 backdrop-blur-sm"
            }`}>
              <MapPin className={`h-5 w-5 ${isScrolled ? "text-primary-foreground" : "text-white"}`} />
            </div>
            <div className={`hidden sm:block transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>
              <div className="font-bold text-lg leading-tight">Conseils</div>
              <div className="text-xs opacity-80">Départementaux</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isScrolled 
                    ? "text-foreground hover:bg-muted" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Auth Buttons & Theme Toggle - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className={`relative overflow-hidden ${!isScrolled ? "text-white hover:bg-white/10" : ""}`}
                aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
              >
                <Sun className={`h-5 w-5 transition-all duration-300 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
                <Moon className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
              </Button>
            )}
            <Button 
              variant={isScrolled ? "ghost" : "outline"} 
              size="sm"
              className={!isScrolled ? "border-white/30 text-white hover:bg-white/10" : ""}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Connexion
            </Button>
            <Button 
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Inscription
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? "" : "text-white hover:bg-white/10"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-bold">Conseils</div>
                    <div className="text-xs text-muted-foreground">Départementaux</div>
                  </div>
                </div>

                <nav className="flex-1 space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="space-y-3 pt-6 border-t border-border">
                  {/* Mobile Theme Toggle */}
                  {mounted && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={toggleTheme}
                    >
                      {isDark ? (
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
                  <Button variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Connexion
                  </Button>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => setMobileOpen(false)}>
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

export default LandingHeader;
