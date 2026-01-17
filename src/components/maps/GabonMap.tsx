import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Province {
  id: string;
  name: string;
  capital: string;
  departments: number;
  path: string;
  labelPosition: { x: number; y: number };
}

interface GabonMapProps {
  onProvinceSelect?: (provinceId: string) => void;
  selectedProvince?: string | null;
  className?: string;
}

// SVG paths for Gabon provinces (simplified polygons)
const provinces: Province[] = [
  {
    id: 'estuaire',
    name: 'Estuaire',
    capital: 'Libreville',
    departments: 6,
    path: 'M 145,85 L 175,75 L 200,85 L 210,110 L 200,140 L 180,155 L 150,150 L 130,130 L 125,105 Z',
    labelPosition: { x: 165, y: 115 }
  },
  {
    id: 'haut-ogooue',
    name: 'Haut-Ogooué',
    capital: 'Franceville',
    departments: 7,
    path: 'M 280,200 L 340,180 L 380,200 L 390,250 L 380,310 L 340,340 L 290,330 L 260,290 L 255,240 Z',
    labelPosition: { x: 320, y: 265 }
  },
  {
    id: 'moyen-ogooue',
    name: 'Moyen-Ogooué',
    capital: 'Lambaréné',
    departments: 2,
    path: 'M 150,150 L 180,155 L 210,165 L 230,190 L 220,220 L 190,235 L 155,225 L 135,195 L 140,165 Z',
    labelPosition: { x: 180, y: 190 }
  },
  {
    id: 'ngounie',
    name: 'Ngounié',
    capital: 'Mouila',
    departments: 7,
    path: 'M 155,225 L 190,235 L 220,250 L 240,290 L 230,340 L 195,365 L 155,355 L 130,315 L 135,265 Z',
    labelPosition: { x: 185, y: 295 }
  },
  {
    id: 'nyanga',
    name: 'Nyanga',
    capital: 'Tchibanga',
    departments: 6,
    path: 'M 130,315 L 155,355 L 160,400 L 140,435 L 100,445 L 70,420 L 65,375 L 85,340 Z',
    labelPosition: { x: 115, y: 385 }
  },
  {
    id: 'ogooue-ivindo',
    name: 'Ogooué-Ivindo',
    capital: 'Makokou',
    departments: 5,
    path: 'M 230,60 L 290,45 L 340,60 L 360,100 L 350,150 L 310,175 L 260,165 L 230,130 L 220,90 Z',
    labelPosition: { x: 285, y: 110 }
  },
  {
    id: 'ogooue-lolo',
    name: 'Ogooué-Lolo',
    capital: 'Koulamoutou',
    departments: 3,
    path: 'M 220,220 L 260,210 L 280,200 L 290,230 L 285,280 L 260,310 L 230,320 L 210,290 L 210,250 Z',
    labelPosition: { x: 250, y: 265 }
  },
  {
    id: 'ogooue-maritime',
    name: 'Ogooué-Maritime',
    capital: 'Port-Gentil',
    departments: 4,
    path: 'M 70,140 L 125,105 L 150,150 L 140,165 L 135,195 L 110,220 L 75,215 L 50,185 L 55,155 Z',
    labelPosition: { x: 95, y: 175 }
  },
  {
    id: 'woleu-ntem',
    name: 'Woleu-Ntem',
    capital: 'Oyem',
    departments: 7,
    path: 'M 175,20 L 230,10 L 290,20 L 310,45 L 290,75 L 250,90 L 210,85 L 175,65 L 165,40 Z',
    labelPosition: { x: 235, y: 52 }
  }
];

const provinceColors: Record<string, string> = {
  'estuaire': 'hsl(210, 70%, 50%)',
  'haut-ogooue': 'hsl(35, 70%, 50%)',
  'moyen-ogooue': 'hsl(160, 60%, 45%)',
  'ngounie': 'hsl(280, 50%, 55%)',
  'nyanga': 'hsl(190, 60%, 45%)',
  'ogooue-ivindo': 'hsl(120, 50%, 40%)',
  'ogooue-lolo': 'hsl(350, 60%, 50%)',
  'ogooue-maritime': 'hsl(200, 70%, 45%)',
  'woleu-ntem': 'hsl(45, 70%, 50%)'
};

const GabonMap: React.FC<GabonMapProps> = ({ 
  onProvinceSelect, 
  selectedProvince,
  className 
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const handleProvinceClick = (provinceId: string) => {
    onProvinceSelect?.(provinceId);
  };

  const getProvinceInfo = (id: string) => {
    return provinces.find(p => p.id === id);
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Tooltip */}
      {hoveredProvince && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-card border border-border rounded-lg shadow-lg p-3 pointer-events-none"
        >
          <div className="text-center">
            <p className="font-bold text-foreground">{getProvinceInfo(hoveredProvince)?.name}</p>
            <p className="text-sm text-muted-foreground">
              Capitale: {getProvinceInfo(hoveredProvince)?.capital}
            </p>
            <p className="text-xs text-muted-foreground">
              {getProvinceInfo(hoveredProvince)?.departments} départements
            </p>
          </div>
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

        {/* Province paths */}
        {provinces.map((province) => {
          const isSelected = selectedProvince === province.id;
          const isHovered = hoveredProvince === province.id;
          
          return (
            <g key={province.id}>
              <motion.path
                d={province.path}
                fill={provinceColors[province.id]}
                stroke={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--background))'}
                strokeWidth={isSelected ? 3 : 1.5}
                className="cursor-pointer transition-all"
                style={{
                  filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
                  opacity: isSelected ? 1 : isHovered ? 0.9 : 0.8
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProvinceClick(province.id)}
                onMouseEnter={() => setHoveredProvince(province.id)}
                onMouseLeave={() => setHoveredProvince(null)}
              />
              
              {/* Province label */}
              <text
                x={province.labelPosition.x}
                y={province.labelPosition.y}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="white"
                className="pointer-events-none select-none"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {province.name.length > 12 
                  ? province.name.split('-').map((part, i) => (
                      <tspan 
                        key={i} 
                        x={province.labelPosition.x} 
                        dy={i === 0 ? 0 : 11}
                      >
                        {part}
                      </tspan>
                    ))
                  : province.name
                }
              </text>
              
              {/* Capital dot */}
              <circle
                cx={province.labelPosition.x}
                cy={province.labelPosition.y + 12}
                r="3"
                fill="white"
                stroke="hsl(var(--background))"
                strokeWidth="1"
                className="pointer-events-none"
              />
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
            47 Départements
          </text>
          <text x="10" y="56" fontSize="8" fill="hsl(var(--muted-foreground))">
            135 Entités
          </text>
          <line x1="10" y1="62" x2="100" y2="62" stroke="hsl(var(--border))" strokeWidth="0.5" />
          <text x="10" y="74" fontSize="7" fill="hsl(var(--muted-foreground))">
            Cliquez sur une province
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

        {/* Scale bar */}
        <g transform="translate(20, 450)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="30" y="12" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
            ~200 km
          </text>
        </g>
      </svg>

      {/* Selected province info card */}
      {selectedProvince && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-card border border-border rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: provinceColors[selectedProvince] }}
            />
            <div>
              <h3 className="font-bold text-foreground">
                {getProvinceInfo(selectedProvince)?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Capitale: {getProvinceInfo(selectedProvince)?.capital} • {' '}
                {getProvinceInfo(selectedProvince)?.departments} départements
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GabonMap;
