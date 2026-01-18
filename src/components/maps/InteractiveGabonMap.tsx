import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { provincesData, type DepartmentDetail } from "@/lib/departments-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Building2, Users, MapPin, ArrowRight } from "lucide-react";

// Fix default marker icon issue with Leaflet + Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Province colors mapping
const provinceColors: Record<string, string> = {
  estuaire: "#0ea5e9",
  "haut-ogooue": "#10b981",
  "moyen-ogooue": "#8b5cf6",
  ngounie: "#f59e0b",
  nyanga: "#ef4444",
  "ogooue-ivindo": "#14b8a6",
  "ogooue-lolo": "#f97316",
  "ogooue-maritime": "#3b82f6",
  "woleu-ntem": "#22c55e",
};

// Department coordinates (approximate centers)
const departmentCoordinates: Record<string, [number, number]> = {
  // Estuaire
  "komo-mondah": [0.3928, 9.7500],
  "komo-ocean": [0.4162, 9.4673],
  "komo": [0.5000, 9.8500],
  "noya": [0.9000, 9.5800],
  // Haut-Ogooué
  "djouori-agnili": [-1.6500, 13.6500],
  "djoue": [-1.4000, 13.2000],
  "lekoko": [-1.3000, 13.7500],
  "lemboumbi-leyou": [-1.5300, 13.1900],
  "lekabi-lewolo": [-1.9000, 12.9500],
  "mpassa": [-1.6333, 13.5833],
  "plateaux": [-1.5600, 14.2500],
  "sebe-brikolo": [-0.9500, 13.7800],
  // Moyen-Ogooué
  "abanga-bigne": [-0.1800, 10.7600],
  "ogooue-lacs": [-0.7000, 10.2400],
  // Ngounié
  "dola": [-2.4000, 11.0300],
  "douya-onoye": [-1.8600, 11.0500],
  "louetsi-wano": [-2.1600, 11.5300],
  "louetsi-bibaka": [-2.0800, 11.2000],
  "mougalaba": [-2.0000, 10.7500],
  "ndolou": [-1.9500, 10.3000],
  "ogoulou": [-2.3200, 11.9300],
  "tsamba-magotsi": [-1.7200, 10.6500],
  // Nyanga
  "basse-banio": [-2.8800, 10.8800],
  "douigny": [-2.5000, 11.2000],
  "doutsila": [-2.7500, 11.5500],
  "haute-banio": [-2.5000, 10.9000],
  "mongo": [-2.6500, 11.0000],
  "mougoutsi": [-2.8833, 11.1833],
  // Ogooué-Ivindo
  "ivindo": [0.4000, 12.2000],
  "lope": [-0.2000, 11.5000],
  "mvoung": [0.5500, 12.5000],
  "zadie": [0.9500, 13.3000],
  // Ogooué-Lolo
  "lolo-bouenguidi": [-1.0000, 12.4000],
  "lombo-bouenguidi": [-0.8000, 12.0000],
  "mulundu": [-1.2000, 11.6000],
  "offoue-onoye": [-0.9000, 11.3000],
  // Ogooué-Maritime
  "bendje": [-0.7200, 8.7800],
  "etimboue": [-1.8500, 9.6500],
  "ndougou": [-2.2000, 9.6500],
  // Woleu-Ntem
  "haut-como": [1.2000, 11.2000],
  "haut-ntem": [2.1000, 11.3500],
  "ntem": [2.2500, 11.5000],
  "okano": [0.9000, 10.5000],
  "woleu": [1.6500, 11.5000],
};

interface InteractiveGabonMapProps {
  onDepartmentClick?: (departmentId: string) => void;
  showMarkers?: boolean;
  height?: string;
  selectedProvince?: string | null;
}

const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};

const InteractiveGabonMap = ({ 
  onDepartmentClick, 
  showMarkers = true, 
  height = "500px",
  selectedProvince = null 
}: InteractiveGabonMapProps) => {
  const navigate = useNavigate();
  const [hoveredDepartment, setHoveredDepartment] = useState<DepartmentDetail | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-0.8, 11.8]);
  const [mapZoom, setMapZoom] = useState(6);

  // Get all departments
  const allDepartments = provincesData.flatMap((province) =>
    province.departments.map((dept) => ({
      ...dept,
      provinceName: province.name,
      provinceId: province.id,
      provinceColor: provinceColors[province.id] || "#6b7280",
    }))
  );

  // Filter departments by selected province
  const displayDepartments = selectedProvince
    ? allDepartments.filter((dept) => dept.provinceId === selectedProvince)
    : allDepartments;

  // Update map center when province is selected
  useEffect(() => {
    if (selectedProvince) {
      const provinceDepts = allDepartments.filter((d) => d.provinceId === selectedProvince);
      if (provinceDepts.length > 0) {
        const coords = provinceDepts
          .map((d) => departmentCoordinates[d.id])
          .filter(Boolean);
        if (coords.length > 0) {
          const avgLat = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
          const avgLng = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
          setMapCenter([avgLat, avgLng]);
          setMapZoom(8);
        }
      }
    } else {
      setMapCenter([-0.8, 11.8]);
      setMapZoom(6);
    }
  }, [selectedProvince]);

  const handleDepartmentClick = (departmentId: string) => {
    if (onDepartmentClick) {
      onDepartmentClick(departmentId);
    } else {
      navigate(`/conseil/${departmentId}`);
    }
  };

  const createCustomIcon = (color: string, isCapital: boolean) => {
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          background: ${color};
          width: ${isCapital ? "16px" : "12px"};
          height: ${isCapital ? "16px" : "12px"};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
        "></div>
      `,
      iconSize: [isCapital ? 16 : 12, isCapital ? 16 : 12],
      iconAnchor: [isCapital ? 8 : 6, isCapital ? 8 : 6],
    });
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg border border-border" style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Department markers */}
        {showMarkers &&
          displayDepartments.map((dept) => {
            const coords = departmentCoordinates[dept.id];
            if (!coords) return null;

            return (
              <Marker
                key={dept.id}
                position={coords}
                icon={createCustomIcon(dept.provinceColor, dept.isProvinceCapital || false)}
                eventHandlers={{
                  click: () => handleDepartmentClick(dept.id),
                  mouseover: () => setHoveredDepartment(dept),
                  mouseout: () => setHoveredDepartment(null),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-base">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">{dept.provinceName}</p>
                      </div>
                      {dept.isProvinceCapital && (
                        <Badge variant="outline" className="text-xs">
                          Capitale
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>Chef-lieu: {dept.chefLieu}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{dept.population?.toLocaleString("fr-FR")} habitants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span>{dept.activeCompetences} compétences actives</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleDepartmentClick(dept.id)}
                    >
                      Accéder au conseil
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {/* Hovered department info */}
      {hoveredDepartment && (
        <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-border z-[1000]">
          <h4 className="font-semibold">{hoveredDepartment.name}</h4>
          <p className="text-sm text-muted-foreground">{(hoveredDepartment as any).provinceName}</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-border z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Provinces</h4>
        <div className="space-y-1">
          {provincesData.slice(0, 5).map((province) => (
            <div key={province.id} className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: provinceColors[province.id] }}
              />
              <span>{province.name}</span>
            </div>
          ))}
          <div className="text-xs text-muted-foreground mt-1">
            +{provincesData.length - 5} autres...
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGabonMap;
