import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import all gallery images
import heroForestImg from '@/assets/woleu/hero-forest-aerial.jpg';
import communityMeetingImg from '@/assets/woleu/community-meeting.jpg';
import transparentMeetingImg from '@/assets/woleu/transparent-meeting.jpg';
import infrastructureRoadImg from '@/assets/woleu/infrastructure-road.jpg';
import healthCenterImg from '@/assets/woleu/health-center.jpg';
import schoolBuildingImg from '@/assets/woleu/school-building.jpg';
import solarEnergyImg from '@/assets/woleu/solar-energy.jpg';
import pontConstructionImg from '@/assets/woleu/pont-construction.jpg';
import cerclesCitoyenImg from '@/assets/woleu/cercle-citoyen.jpg';
import landscapeForestImg from '@/assets/woleu/landscape-forest.jpg';
import chantierInfrastructureImg from '@/assets/woleu/chantier-infrastructure.jpg';
import chantierSanteImg from '@/assets/woleu/chantier-sante.jpg';
// New images
import galleryRiverImg from '@/assets/woleu/gallery-river-aerial.jpg';
import galleryTraditionalHouseImg from '@/assets/woleu/gallery-traditional-house.jpg';
import galleryHarvestImg from '@/assets/woleu/gallery-harvest.jpg';
import galleryNewRoadImg from '@/assets/woleu/gallery-new-road.jpg';
import galleryChildrenImg from '@/assets/woleu/gallery-children-playing.jpg';
import galleryClinicImg from '@/assets/woleu/gallery-clinic-interior.jpg';
import galleryWaterfallPoolImg from '@/assets/woleu/gallery-waterfall-pool.jpg';
import galleryMarketWomenImg from '@/assets/woleu/gallery-market-women.jpg';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: heroForestImg, alt: "Vue aérienne de la forêt du Woleu", category: "Paysages" },
  { src: galleryRiverImg, alt: "Rivière serpentant dans la forêt", category: "Paysages" },
  { src: communityMeetingImg, alt: "Réunion communautaire", category: "Vie quotidienne" },
  { src: galleryMarketWomenImg, alt: "Femmes au marché local", category: "Vie quotidienne" },
  { src: transparentMeetingImg, alt: "Session de transparence budgétaire", category: "Vie quotidienne" },
  { src: infrastructureRoadImg, alt: "Travaux routiers", category: "Infrastructures" },
  { src: galleryNewRoadImg, alt: "Nouvelle route nationale", category: "Infrastructures" },
  { src: healthCenterImg, alt: "Centre de santé", category: "Infrastructures" },
  { src: galleryClinicImg, alt: "Intérieur de clinique moderne", category: "Infrastructures" },
  { src: schoolBuildingImg, alt: "Établissement scolaire", category: "Infrastructures" },
  { src: solarEnergyImg, alt: "Installation solaire", category: "Infrastructures" },
  { src: pontConstructionImg, alt: "Construction de pont", category: "Infrastructures" },
  { src: chantierInfrastructureImg, alt: "Chantier d'infrastructure", category: "Infrastructures" },
  { src: cerclesCitoyenImg, alt: "Cercle citoyen en action", category: "Vie quotidienne" },
  { src: galleryChildrenImg, alt: "Enfants jouant au football", category: "Vie quotidienne" },
  { src: landscapeForestImg, alt: "Paysage forestier", category: "Paysages" },
  { src: galleryWaterfallPoolImg, alt: "Cascade tropicale", category: "Paysages" },
  { src: galleryTraditionalHouseImg, alt: "Maison traditionnelle", category: "Vie quotidienne" },
  { src: chantierSanteImg, alt: "Projet de santé", category: "Infrastructures" },
  { src: galleryHarvestImg, alt: "Récolte agricole", category: "Vie quotidienne" },
];

const categories = ["Tous", "Paysages", "Infrastructures", "Vie quotidienne"];

// Parallax image component
const ParallaxImage: React.FC<{
  image: GalleryImage;
  index: number;
  pattern: { col: number; row: number };
  onClick: () => void;
}> = ({ image, index, pattern, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax effect based on position
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.02 }}
      className="relative group cursor-pointer overflow-hidden rounded-md"
      style={{
        gridColumn: `span ${pattern.col}`,
        gridRow: `span ${pattern.row}`,
      }}
      onClick={onClick}
    >
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-[calc(100%+40px)] h-[calc(100%+40px)] -mt-5 -ml-5 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
      
      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
      
      {/* Category badge - only on larger cells */}
      {(pattern.col >= 2 || pattern.row >= 2) && (
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <span className="inline-block px-2 py-0.5 bg-green-600/90 text-white text-[10px] font-medium rounded-full">
            {image.category}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export const WoleuPhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredImages = activeCategory === "Tous" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Create a perfect grid pattern based on number of images
  const getSpanPattern = (index: number, total: number) => {
    // Pattern optimized for a compact, filled grid
    const patterns = [
      { col: 2, row: 2 }, // 0 - Large feature
      { col: 1, row: 1 }, // 1
      { col: 1, row: 1 }, // 2
      { col: 1, row: 2 }, // 3 - Tall
      { col: 1, row: 1 }, // 4
      { col: 2, row: 1 }, // 5 - Wide
      { col: 1, row: 1 }, // 6
      { col: 1, row: 1 }, // 7
      { col: 2, row: 2 }, // 8 - Large feature
      { col: 1, row: 1 }, // 9
      { col: 1, row: 2 }, // 10 - Tall
      { col: 1, row: 1 }, // 11
      { col: 2, row: 1 }, // 12 - Wide
      { col: 1, row: 1 }, // 13
      { col: 1, row: 1 }, // 14
      { col: 2, row: 2 }, // 15 - Large feature
      { col: 1, row: 1 }, // 16
      { col: 1, row: 1 }, // 17
      { col: 2, row: 1 }, // 18 - Wide
      { col: 1, row: 1 }, // 19
    ];
    return patterns[index % patterns.length];
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-800"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Compact Gallery Grid with Parallax */}
      <motion.div 
        layout
        className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 auto-rows-[70px] md:auto-rows-[90px] lg:auto-rows-[110px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <ParallaxImage
              key={image.src}
              image={image}
              index={index}
              pattern={getSpanPattern(index, filteredImages.length)}
              onClick={() => openLightbox(index)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p className="text-white font-medium text-lg">{filteredImages[selectedImage].alt}</p>
                <p className="text-white/70 text-sm mt-1">
                  {filteredImages[selectedImage].category} • {selectedImage + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto px-4 py-2 bg-black/50 rounded-full">
              {filteredImages.map((image, index) => (
                <button
                  key={image.src}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(index); }}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all ${
                    index === selectedImage 
                      ? 'ring-2 ring-amber-400 scale-110' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
