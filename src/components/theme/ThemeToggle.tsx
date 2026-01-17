import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "default" | "header" | "ghost";
  className?: string;
}

export function ThemeToggle({ variant = "default", className = "" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={className}>
        <div className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (variant === "header") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={`relative overflow-hidden transition-colors ${className}`}
        aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
      >
        <Sun className={`h-5 w-5 transition-all ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
        <Moon className={`absolute h-5 w-5 transition-all ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative overflow-hidden ${className}`}
      aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
    </Button>
  );
}
