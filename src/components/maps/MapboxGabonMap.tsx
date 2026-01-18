import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { provincesData, type DepartmentDetail } from '@/lib/departments-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, TrendingUp, MapPin, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

// Department coordinates with real GPS positions
const departmentCoordinates: Record<string, { lng: number; lat: number }> = {
  // Estuaire
  'komo-mondah': { lng: 9.7667, lat: 0.3833 },
  'komo-ocean': { lng: 9.4500, lat: 0.4000 },
  'komo': { lng: 10.0667, lat: 0.5000 },
  'noya': { lng: 9.6000, lat: 1.0333 },
  'cap': { lng: 9.4167, lat: 0.3833 },
  'mondah': { lng: 9.4833, lat: 0.5667 },
  
  // Haut-Ogooué
  'djouori-agnili': { lng: 13.5167, lat: -1.3167 },
  'djoue': { lng: 14.2000, lat: -1.6333 },
  'lekoko': { lng: 13.8500, lat: -1.5000 },
  'lemboumbi-leyou': { lng: 13.2000, lat: -1.8333 },
  'lekabi-lewolo': { lng: 12.9667, lat: -1.6500 },
  'mpassa': { lng: 13.5833, lat: -1.6333 },
  'plateaux': { lng: 14.1333, lat: -1.7833 },
  'sebe-brikolo': { lng: 13.6667, lat: -0.9333 },
  
  // Moyen-Ogooué
  'abanga-bigne': { lng: 10.7833, lat: -0.1833 },
  'ogooue-lacs': { lng: 10.2333, lat: -0.7000 },
  
  // Ngounié
  'dola': { lng: 11.0167, lat: -2.0667 },
  'douya-onoye': { lng: 11.0500, lat: -1.8667 },
  'louetsi-wano': { lng: 11.4833, lat: -2.1500 },
  'louetsi-bibaka': { lng: 11.2667, lat: -2.3167 },
  'mougalaba': { lng: 10.7833, lat: -2.3333 },
  'ndolou': { lng: 10.6000, lat: -2.4500 },
  'ogoulou': { lng: 11.6500, lat: -2.2667 },
  'tsamba-magotsi': { lng: 11.1833, lat: -2.0000 },
  
  // Nyanga
  'basse-banio': { lng: 10.7833, lat: -3.0833 },
  'douigny': { lng: 11.0167, lat: -2.7333 },
  'mongo': { lng: 10.8500, lat: -2.8667 },
  'mougoutsi': { lng: 10.4833, lat: -2.8000 },
  
  // Ogooué-Ivindo
  'ivindo': { lng: 12.8333, lat: 0.8333 },
  'lope': { lng: 11.7167, lat: -0.2167 },
  'mvoung': { lng: 13.0500, lat: 0.5167 },
  'zadie': { lng: 13.1333, lat: 1.0667 },
  
  // Ogooué-Lolo
  'lolo-bouenguidi': { lng: 12.5167, lat: -0.8333 },
  'lombo-bouenguidi': { lng: 12.4000, lat: -0.5833 },
  'mouloundou': { lng: 12.9000, lat: -1.0500 },
  'offoue-onoye': { lng: 11.9333, lat: -0.8000 },
  
  // Ogooué-Maritime
  'bendje': { lng: 8.7833, lat: -0.7000 },
  'etimboue': { lng: 9.5500, lat: -1.6500 },
  'ndougou': { lng: 9.5667, lat: -2.4333 },
  'ogooue-maritime-dept': { lng: 8.7000, lat: -1.6000 },
  
  // Woleu-Ntem
  'haut-como': { lng: 10.3667, lat: 1.4500 },
  'haut-ntem': { lng: 11.5167, lat: 2.0833 },
  'ntem': { lng: 11.5667, lat: 2.1500 },
  'okano': { lng: 10.7500, lat: 1.0333 },
  'woleu': { lng: 11.5833, lat: 1.8833 },
};

// Province colors
const provinceColors: Record<string, string> = {
  'estuaire': '#3b82f6',
  'haut-ogooue': '#10b981',
  'moyen-ogooue': '#8b5cf6',
  'ngounie': '#f59e0b',
  'nyanga': '#ef4444',
  'ogooue-ivindo': '#14b8a6',
  'ogooue-lolo': '#a855f7',
  'ogooue-maritime': '#06b6d4',
  'woleu-ntem': '#22c55e',
};

interface MapboxGabonMapProps {
  height?: string;
  showStats?: boolean;
  showLoginButtons?: boolean;
  onDepartmentSelect?: (departmentId: string) => void;
}

interface DepartmentStats {
  totalPopulation: number;
  activeCouncils: number;
  avgCompetences: number;
  totalBudget: number;
}

const MapboxGabonMap: React.FC<MapboxGabonMapProps> = ({
  height = '500px',
  showStats = true,
  showLoginButtons = true,
  onDepartmentSelect,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const navigate = useNavigate();
  
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDetail | null>(null);
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [stats, setStats] = useState<DepartmentStats>({
    totalPopulation: 0,
    activeCouncils: 0,
    avgCompetences: 0,
    totalBudget: 0,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  // Fetch Mapbox token from Edge Function
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setTokenLoading(true);
        setTokenError(null);
        
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          setTokenError('Impossible de charger la clé Mapbox');
          return;
        }
        
        if (data?.token) {
          setMapboxToken(data.token);
        } else {
          setTokenError('Clé Mapbox non configurée');
        }
      } catch (err) {
        console.error('Error:', err);
        setTokenError('Erreur de connexion');
      } finally {
        setTokenLoading(false);
      }
    };

    fetchToken();
  }, []);

  // Calculate real-time statistics
  useEffect(() => {
    const allDepartments = provincesData.flatMap(p => p.departments);
    const totalPop = allDepartments.reduce((sum, d) => sum + d.population, 0);
    const activeCount = allDepartments.filter(d => d.status === 'operational').length;
    const avgComp = allDepartments.reduce((sum, d) => sum + d.activeCompetences, 0) / allDepartments.length;
    const totalBudget = allDepartments.reduce((sum, d) => sum + d.budgetEstimate, 0);
    
    setStats({
      totalPopulation: totalPop,
      activeCouncils: activeCount,
      avgCompetences: Math.round(avgComp * 10) / 10,
      totalBudget,
    });
  }, []);

  // Add markers for departments
  const addDepartmentMarkers = useCallback(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    provincesData.forEach((province) => {
      province.departments.forEach((dept) => {
        const coords = departmentCoordinates[dept.id];
        if (!coords) return;

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'mapbox-marker';
        el.style.cssText = `
          width: ${dept.isProvinceCapital ? '24px' : '18px'};
          height: ${dept.isProvinceCapital ? '24px' : '18px'};
          background-color: ${provinceColors[province.id]};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        `;

        if (dept.isProvinceCapital) {
          el.style.boxShadow = `0 0 0 3px ${provinceColors[province.id]}40, 0 2px 8px rgba(0,0,0,0.3)`;
        }

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)';
          setHoveredDepartment(dept.id);
          showPopup(dept, province.name, coords);
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          setHoveredDepartment(null);
          popupRef.current?.remove();
        });

        el.addEventListener('click', () => {
          setSelectedDepartment(dept);
          onDepartmentSelect?.(dept.id);
          
          map.current?.flyTo({
            center: [coords.lng, coords.lat],
            zoom: 9,
            duration: 1000,
          });
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat([coords.lng, coords.lat])
          .addTo(map.current!);

        markersRef.current.push(marker);
      });
    });
  }, [onDepartmentSelect]);

  // Show popup on hover
  const showPopup = useCallback((
    dept: DepartmentDetail, 
    provinceName: string, 
    coords: { lng: number; lat: number }
  ) => {
    if (!map.current) return;

    popupRef.current?.remove();

    const popupContent = `
      <div style="padding: 8px; min-width: 180px;">
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">
          ${dept.name}
          ${dept.isProvinceCapital ? '⭐' : ''}
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
          Province: ${provinceName}
        </div>
        <div style="display: grid; gap: 4px; font-size: 11px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Chef-lieu:</span>
            <strong>${dept.chefLieu}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Population:</span>
            <strong>${dept.population.toLocaleString()}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Compétences:</span>
            <strong>${dept.activeCompetences}/23</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Statut:</span>
            <span style="color: ${dept.status === 'operational' ? '#22c55e' : '#f59e0b'}">
              ${dept.status === 'operational' ? '✓ Opérationnel' : '⟳ En transition'}
            </span>
          </div>
        </div>
      </div>
    `;

    popupRef.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 15,
    })
      .setLngLat([coords.lng, coords.lat])
      .setHTML(popupContent)
      .addTo(map.current);
  }, []);

  // Initialize map when token is available
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [11.5, -0.8], // Center of Gabon
      zoom: 5.5,
      minZoom: 4,
      maxZoom: 12,
      maxBounds: [
        [6, -5], // Southwest
        [16, 4], // Northeast
      ],
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
      addDepartmentMarkers();
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      popupRef.current?.remove();
      map.current?.remove();
    };
  }, [mapboxToken, addDepartmentMarkers]);

  // Handle login navigation
  const handleAccessCouncil = (deptId: string) => {
    navigate(`/conseil/${deptId}`);
  };

  // Reset view
  const resetView = () => {
    setSelectedDepartment(null);
    map.current?.flyTo({
      center: [11.5, -0.8],
      zoom: 5.5,
      duration: 1000,
    });
  };

  // Get province for a department
  const getDepartmentProvince = (deptId: string) => {
    return provincesData.find(p => p.departments.some(d => d.id === deptId));
  };

  // Loading state
  if (tokenLoading) {
    return (
      <Card className="p-8">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Chargement de la carte...</p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (tokenError || !mapboxToken) {
    return (
      <Card className="p-8">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Carte non disponible</h3>
          <p className="text-muted-foreground text-sm text-center max-w-md">
            {tokenError || 'La clé API Mapbox n\'est pas configurée. Veuillez configurer MAPBOX_API_KEY dans les secrets.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Real-time Statistics Bar */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-blue-700">
                  {stats.totalPopulation.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Population totale</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-green-700">
                  {stats.activeCouncils}/42
                </div>
                <div className="text-xs text-muted-foreground">Conseils actifs</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-purple-700">
                  {stats.avgCompetences}/23
                </div>
                <div className="text-xs text-muted-foreground">Moy. compétences</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-200/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-amber-500 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-amber-700">
                  {(stats.totalBudget / 1000).toFixed(1)}B
                </div>
                <div className="text-xs text-muted-foreground">Budget XAF</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="rounded-xl overflow-hidden border"
          style={{ height }}
        />
        
        {/* Map loading overlay */}
        {!mapLoaded && mapboxToken && (
          <div className="absolute inset-0 bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
              <span className="text-muted-foreground">Initialisation de la carte...</span>
            </div>
          </div>
        )}

        {/* Province Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border max-h-48 overflow-y-auto">
          <h4 className="font-semibold text-xs mb-2">🇬🇦 Provinces</h4>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {provincesData.map((province) => (
              <div key={province.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: provinceColors[province.id] }}
                />
                <span className="truncate">{province.name}</span>
                <span className="text-muted-foreground ml-auto">
                  ({province.departments.length})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Department Card */}
        {selectedDepartment && (
          <Card className="absolute top-4 right-4 w-72 shadow-xl border-2 bg-card/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-1">
                    {selectedDepartment.name}
                    {selectedDepartment.isProvinceCapital && <span>⭐</span>}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getDepartmentProvince(selectedDepartment.id)?.name}
                  </p>
                </div>
                <Badge 
                  variant={selectedDepartment.status === 'operational' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {selectedDepartment.status === 'operational' ? '✓ Actif' : '⟳ Transition'}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chef-lieu:</span>
                  <span className="font-medium">{selectedDepartment.chefLieu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Population:</span>
                  <span className="font-medium">{selectedDepartment.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compétences:</span>
                  <span className="font-medium">{selectedDepartment.activeCompetences}/23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">{selectedDepartment.budgetEstimate} M XAF</span>
                </div>
              </div>

              <div className="flex gap-2">
                {showLoginButtons && (
                  <Button 
                    className="flex-1 gap-2" 
                    size="sm"
                    onClick={() => handleAccessCouncil(selectedDepartment.id)}
                  >
                    <LogIn className="h-4 w-4" />
                    Accéder
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetView}
                >
                  Retour
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          🖱️ Cliquez sur un marqueur pour voir les détails • 
          🔍 Utilisez la molette pour zoomer • 
          ✋ Glissez pour naviguer
        </p>
      </div>
    </div>
  );
};

export default MapboxGabonMap;
