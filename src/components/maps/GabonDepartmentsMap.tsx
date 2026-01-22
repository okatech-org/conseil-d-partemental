import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { provincesData, type ProvinceDetail, type DepartmentDetail } from '@/lib/departments-data';
import { MapPin, Building2, Users, ChevronLeft, ExternalLink, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface GabonDepartmentsMapProps {
  onDepartmentSelect?: (departmentId: string, provinceId: string) => void;
  selectedDepartment?: string | null;
  className?: string;
  showLoginButtons?: boolean;
}

// Coordonnées approximatives des centres de chaque département
const departmentPositions: Record<string, { x: number; y: number; province: string }> = {
  // Estuaire
  'komo-mondah': { x: 165, y: 95, province: 'estuaire' },
  'komo-ocean': { x: 175, y: 115, province: 'estuaire' },
  'komo': { x: 145, y: 105, province: 'estuaire' },
  'noya': { x: 135, y: 85, province: 'estuaire' },
  'cap': { x: 185, y: 130, province: 'estuaire' },
  'mondah': { x: 155, y: 140, province: 'estuaire' },
  
  // Haut-Ogooué
  'djouori-agnili': { x: 290, y: 215, province: 'haut-ogooue' },
  'djoue': { x: 355, y: 195, province: 'haut-ogooue' },
  'lekoko': { x: 325, y: 220, province: 'haut-ogooue' },
  'lemboumbi-leyou': { x: 370, y: 250, province: 'haut-ogooue' },
  'lekabi-lewolo': { x: 350, y: 280, province: 'haut-ogooue' },
  'mpassa': { x: 310, y: 265, province: 'haut-ogooue' },
  'plateaux': { x: 340, y: 310, province: 'haut-ogooue' },
  'sebe-brikolo': { x: 285, y: 250, province: 'haut-ogooue' },
  
  // Moyen-Ogooué
  'abanga-bigne': { x: 195, y: 175, province: 'moyen-ogooue' },
  'ogooue-lacs': { x: 175, y: 205, province: 'moyen-ogooue' },
  
  // Ngounié
  'dola': { x: 165, y: 290, province: 'ngounie' },
  'douya-onoye': { x: 185, y: 270, province: 'ngounie' },
  'louetsi-wano': { x: 200, y: 310, province: 'ngounie' },
  'louetsi-bibaka': { x: 175, y: 330, province: 'ngounie' },
  'mougalaba': { x: 150, y: 300, province: 'ngounie' },
  'ndolou': { x: 195, y: 340, province: 'ngounie' },
  'ogoulou': { x: 220, y: 325, province: 'ngounie' },
  'tsamba-magotsi': { x: 210, y: 290, province: 'ngounie' },
  
  // Nyanga
  'basse-banio': { x: 95, y: 410, province: 'nyanga' },
  'douigny': { x: 130, y: 350, province: 'nyanga' },
  'mongo': { x: 110, y: 375, province: 'nyanga' },
  'mougoutsi': { x: 85, y: 340, province: 'nyanga' },
  
  // Ogooué-Ivindo
  'ivindo': { x: 285, y: 95, province: 'ogooue-ivindo' },
  'lope': { x: 265, y: 130, province: 'ogooue-ivindo' },
  'mvoung': { x: 310, y: 130, province: 'ogooue-ivindo' },
  'zadie': { x: 335, y: 85, province: 'ogooue-ivindo' },
  
  // Ogooué-Lolo
  'lolo-bouenguidi': { x: 245, y: 260, province: 'ogooue-lolo' },
  'lombo-bouenguidi': { x: 265, y: 235, province: 'ogooue-lolo' },
  'mouloundou': { x: 240, y: 290, province: 'ogooue-lolo' },
  'offoue-onoye': { x: 225, y: 270, province: 'ogooue-lolo' },
  
  // Ogooué-Maritime
  'bendje': { x: 95, y: 165, province: 'ogooue-maritime' },
  'etimboue': { x: 75, y: 195, province: 'ogooue-maritime' },
  'ndougou': { x: 90, y: 230, province: 'ogooue-maritime' },
  'ogooue-maritime-dept': { x: 110, y: 180, province: 'ogooue-maritime' },
  
  // Woleu-Ntem
  'haut-como': { x: 195, y: 45, province: 'woleu-ntem' },
  'haut-ntem': { x: 275, y: 25, province: 'woleu-ntem' },
  'ntem': { x: 250, y: 35, province: 'woleu-ntem' },
  'okano': { x: 220, y: 60, province: 'woleu-ntem' },
  'woleu': { x: 240, y: 50, province: 'woleu-ntem' },
};

const provinceColors: Record<string, { fill: string; hover: string; border: string }> = {
  'estuaire': { fill: 'hsl(205, 75%, 55%)', hover: 'hsl(205, 75%, 65%)', border: 'hsl(205, 75%, 40%)' },
  'haut-ogooue': { fill: 'hsl(152, 60%, 45%)', hover: 'hsl(152, 60%, 55%)', border: 'hsl(152, 60%, 35%)' },
  'moyen-ogooue': { fill: 'hsl(280, 60%, 55%)', hover: 'hsl(280, 60%, 65%)', border: 'hsl(280, 60%, 45%)' },
  'ngounie': { fill: 'hsl(45, 90%, 50%)', hover: 'hsl(45, 90%, 60%)', border: 'hsl(45, 90%, 40%)' },
  'nyanga': { fill: 'hsl(350, 70%, 55%)', hover: 'hsl(350, 70%, 65%)', border: 'hsl(350, 70%, 45%)' },
  'ogooue-ivindo': { fill: 'hsl(175, 65%, 45%)', hover: 'hsl(175, 65%, 55%)', border: 'hsl(175, 65%, 35%)' },
  'ogooue-lolo': { fill: 'hsl(290, 70%, 55%)', hover: 'hsl(290, 70%, 65%)', border: 'hsl(290, 70%, 45%)' },
  'ogooue-maritime': { fill: 'hsl(200, 70%, 50%)', hover: 'hsl(200, 70%, 60%)', border: 'hsl(200, 70%, 40%)' },
  'woleu-ntem': { fill: 'hsl(100, 55%, 45%)', hover: 'hsl(100, 55%, 55%)', border: 'hsl(100, 55%, 35%)' },
};

const provincePaths: Record<string, string> = {
  'estuaire': 'M 145,85 L 175,75 L 200,85 L 210,110 L 200,140 L 180,155 L 150,150 L 130,130 L 125,105 Z',
  'haut-ogooue': 'M 280,200 L 340,180 L 380,200 L 390,250 L 380,310 L 340,340 L 290,330 L 260,290 L 255,240 Z',
  'moyen-ogooue': 'M 150,150 L 180,155 L 210,165 L 230,190 L 220,220 L 190,235 L 155,225 L 135,195 L 140,165 Z',
  'ngounie': 'M 155,225 L 190,235 L 220,250 L 240,290 L 230,340 L 195,365 L 155,355 L 130,315 L 135,265 Z',
  'nyanga': 'M 130,315 L 155,355 L 160,400 L 140,435 L 100,445 L 70,420 L 65,375 L 85,340 Z',
  'ogooue-ivindo': 'M 230,60 L 290,45 L 340,60 L 360,100 L 350,150 L 310,175 L 260,165 L 230,130 L 220,90 Z',
  'ogooue-lolo': 'M 220,220 L 260,210 L 280,200 L 290,230 L 285,280 L 260,310 L 230,320 L 210,290 L 210,250 Z',
  'ogooue-maritime': 'M 70,140 L 125,105 L 150,150 L 140,165 L 135,195 L 110,220 L 75,215 L 50,185 L 55,155 Z',
  'woleu-ntem': 'M 175,20 L 230,10 L 290,20 L 310,45 L 290,75 L 250,90 L 210,85 L 175,65 L 165,40 Z',
};

const GabonDepartmentsMap: React.FC<GabonDepartmentsMapProps> = ({
  onDepartmentSelect,
  selectedDepartment,
  className,
  showLoginButtons = true,
}) => {
  const navigate = useNavigate();
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const allDepartments = useMemo(() => {
    return provincesData.flatMap(p => p.departments.map(d => ({
      ...d,
      provinceId: p.id,
      provinceName: p.name,
      provinceColor: p.color,
    })));
  }, []);

  const filteredDepartments = useMemo(() => {
    if (!selectedProvince) return allDepartments;
    return allDepartments.filter(d => d.provinceId === selectedProvince);
  }, [selectedProvince, allDepartments]);

  const selectedProvinceData = useMemo(() => {
    return provincesData.find(p => p.id === selectedProvince);
  }, [selectedProvince]);

  const getDepartmentInfo = (id: string) => {
    return allDepartments.find(d => d.id === id);
  };

  const handleDepartmentClick = (deptId: string) => {
    const dept = getDepartmentInfo(deptId);
    if (dept) {
      onDepartmentSelect?.(deptId, dept.provinceId);
    }
  };

  const handleLoginClick = (deptId: string) => {
    // Open in new tab
    window.open(`/conseil/${deptId}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Header with back button */}
      {selectedProvince && (
        <div className="mb-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedProvince(null)}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux provinces
          </Button>
          <span className="text-muted-foreground">|</span>
          <span className="font-medium">{selectedProvinceData?.name}</span>
          <Badge variant="secondary">{selectedProvinceData?.departments.length} départements</Badge>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="relative">
          {/* Tooltip */}
          {(hoveredDepartment || hoveredProvince) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-card border border-border rounded-lg shadow-lg p-3 pointer-events-none"
            >
              {hoveredDepartment ? (
                <div className="text-center">
                  <p className="font-bold text-foreground">{getDepartmentInfo(hoveredDepartment)?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Chef-lieu: {getDepartmentInfo(hoveredDepartment)?.chefLieu}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getDepartmentInfo(hoveredDepartment)?.population?.toLocaleString()} habitants
                  </p>
                </div>
              ) : hoveredProvince && !selectedProvince ? (
                <div className="text-center">
                  <p className="font-bold text-foreground">{provincesData.find(p => p.id === hoveredProvince)?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Capitale: {provincesData.find(p => p.id === hoveredProvince)?.capital}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {provincesData.find(p => p.id === hoveredProvince)?.departments.length} départements
                  </p>
                </div>
              ) : null}
            </motion.div>
          )}

          <svg
            viewBox="0 0 420 470"
            className="w-full h-auto"
            style={{ maxHeight: '500px' }}
          >
            {/* Background */}
            <rect x="0" y="0" width="420" height="470" fill="hsl(var(--muted))" rx="8" />
            
            {/* Ocean indicator */}
            <text x="30" y="130" fontSize="10" fill="hsl(var(--muted-foreground))" opacity="0.5">
              Océan
            </text>
            <text x="20" y="145" fontSize="10" fill="hsl(var(--muted-foreground))" opacity="0.5">
              Atlantique
            </text>

            {/* Province paths as base layer */}
            {Object.entries(provincePaths).map(([provinceId, path]) => {
              const colors = provinceColors[provinceId];
              const isProvinceSelected = selectedProvince === provinceId;
              const isProvinceHovered = hoveredProvince === provinceId && !selectedProvince;
              
              return (
                <motion.path
                  key={provinceId}
                  d={path}
                  fill={isProvinceHovered ? colors.hover : colors.fill}
                  stroke={isProvinceSelected ? 'hsl(var(--primary))' : colors.border}
                  strokeWidth={isProvinceSelected ? 3 : 1.5}
                  className={cn("transition-all", !selectedProvince && "cursor-pointer")}
                  style={{
                    opacity: selectedProvince && !isProvinceSelected ? 0.3 : 1,
                  }}
                  onClick={() => !selectedProvince && setSelectedProvince(provinceId)}
                  onMouseEnter={() => setHoveredProvince(provinceId)}
                  onMouseLeave={() => setHoveredProvince(null)}
                />
              );
            })}

            {/* Department markers */}
            {filteredDepartments.map((dept) => {
              const pos = departmentPositions[dept.id];
              if (!pos) return null;
              
              const isSelected = selectedDepartment === dept.id;
              const isHovered = hoveredDepartment === dept.id;
              
              return (
                <g key={dept.id}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 10 : isHovered ? 8 : 6}
                    fill={isSelected ? 'hsl(var(--primary))' : isHovered ? 'white' : 'rgba(255,255,255,0.8)'}
                    stroke={isSelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--background))'}
                    strokeWidth={2}
                    className="cursor-pointer transition-all"
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDepartmentClick(dept.id)}
                    onMouseEnter={() => setHoveredDepartment(dept.id)}
                    onMouseLeave={() => setHoveredDepartment(null)}
                  />
                  {dept.isProvinceCapital && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={12}
                      fill="none"
                      stroke="gold"
                      strokeWidth={2}
                      className="pointer-events-none"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    />
                  )}
                </g>
              );
            })}

            {/* Legend */}
            <g transform="translate(300, 380)">
              <rect x="0" y="0" width="110" height="80" fill="hsl(var(--card))" rx="6" opacity="0.95" />
              <text x="10" y="18" fontSize="10" fontWeight="bold" fill="hsl(var(--foreground))">
                🇬🇦 GABON
              </text>
              <text x="10" y="32" fontSize="8" fill="hsl(var(--muted-foreground))">
                9 Provinces
              </text>
              <text x="10" y="44" fontSize="8" fill="hsl(var(--muted-foreground))">
                42 Départements
              </text>
              <text x="10" y="56" fontSize="8" fill="hsl(var(--muted-foreground))">
                ⭐ = Capitale provinciale
              </text>
              <line x1="10" y1="62" x2="100" y2="62" stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x="10" y="74" fontSize="7" fill="hsl(var(--muted-foreground))">
                Cliquez pour explorer
              </text>
            </g>

            {/* North indicator */}
            <g transform="translate(380, 30)">
              <circle cx="0" cy="0" r="15" fill="hsl(var(--card))" opacity="0.9" />
              <text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="bold" fill="hsl(var(--foreground))">
                N
              </text>
              <path d="M 0,-10 L 3,-5 L 0,-7 L -3,-5 Z" fill="hsl(var(--foreground))" />
            </g>
          </svg>
        </div>

        {/* Departments list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {selectedProvince 
                ? `Départements de ${selectedProvinceData?.name}` 
                : 'Tous les départements (42)'}
            </h3>
            <Badge variant="outline">{filteredDepartments.length} conseils</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {filteredDepartments.map((dept) => (
                <motion.div
                  key={dept.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className={cn(
                      "cursor-pointer hover:shadow-md transition-all",
                      selectedDepartment === dept.id && "ring-2 ring-primary"
                    )}
                    onClick={() => handleDepartmentClick(dept.id)}
                    onMouseEnter={() => setHoveredDepartment(dept.id)}
                    onMouseLeave={() => setHoveredDepartment(null)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <h4 className="font-medium text-sm truncate">{dept.name}</h4>
                            {dept.isProvinceCapital && <span className="text-xs">⭐</span>}
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {dept.chefLieu}
                          </p>
                        </div>
                        <Badge 
                          variant={dept.status === 'operational' ? 'default' : 'secondary'} 
                          className="text-[10px] shrink-0"
                        >
                          {dept.status === 'operational' ? '✓' : '⟳'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span><Users className="h-3 w-3 inline mr-1" />{dept.population?.toLocaleString()}</span>
                        <span>•</span>
                        <span>{dept.activeCompetences}/23 comp.</span>
                      </div>

                      {showLoginButtons && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoginClick(dept.id);
                          }}
                        >
                          <LogIn className="h-3 w-3" />
                          Accéder au conseil
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GabonDepartmentsMap;
