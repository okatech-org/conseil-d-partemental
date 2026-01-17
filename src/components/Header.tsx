import { Bell, Search, User, Menu, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
              <span className="text-lg font-bold text-primary-foreground">CD</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground font-serif">
                Conseil Départemental
              </h1>
              <p className="text-xs text-muted-foreground">
                Plateforme de Gestion Unifiée
              </p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un département, une délibération..."
              className="pl-10 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Province selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden lg:flex gap-2">
                <span className="text-sm">Toutes provinces</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filtrer par province</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Toutes provinces</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Estuaire</DropdownMenuItem>
              <DropdownMenuItem>Haut-Ogooué</DropdownMenuItem>
              <DropdownMenuItem>Moyen-Ogooué</DropdownMenuItem>
              <DropdownMenuItem>Ngounié</DropdownMenuItem>
              <DropdownMenuItem>Nyanga</DropdownMenuItem>
              <DropdownMenuItem>Ogooué-Ivindo</DropdownMenuItem>
              <DropdownMenuItem>Ogooué-Lolo</DropdownMenuItem>
              <DropdownMenuItem>Ogooué-Maritime</DropdownMenuItem>
              <DropdownMenuItem>Woleu-Ntem</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-destructive">
                  8
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">8 nouvelles</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-destructive" />
                    <span className="font-medium text-sm">Alerte Budget</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lemboumbi-Leyou : Budget additionnel non voté (J+15)
                  </p>
                  <span className="text-xs text-muted-foreground">Il y a 2h</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-warning" />
                    <span className="font-medium text-sm">Session T4</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    3 départements n'ont pas planifié leur session T4
                  </p>
                  <span className="text-xs text-muted-foreground">Il y a 5h</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    <span className="font-medium text-sm">Transmission</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Délibération #2026-045 approuvée par le Gouverneur
                  </p>
                  <span className="text-xs text-muted-foreground">Il y a 1j</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-primary justify-center">
                Voir toutes les notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium">Administrateur</p>
                  <p className="text-xs text-muted-foreground">Niveau National</p>
                </div>
                <ChevronDown className="h-4 w-4 hidden lg:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuItem>Journal d'activité</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
