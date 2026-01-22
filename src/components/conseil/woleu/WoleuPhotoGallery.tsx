import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: heroForestImg, alt: "Vue aérienne de la forêt du Woleu", category: "Paysages" },
  { src: communityMeetingImg, alt: "Réunion communautaire", category: "Participation" },
  { src: transparentMeetingImg, alt: "Session de transparence budgétaire", category: "Gouvernance" },
  { src: infrastructureRoadImg, alt: "Travaux routiers", category: "Infrastructure" },
  { src: healthCenterImg, alt: "Centre de santé", category: "Santé" },
  { src: schoolBuildingImg, alt: "Établissement scolaire", category: "Éducation" },
  { src: solarEnergyImg, alt: "Installation solaire", category: "Énergie" },
  { src: pontConstructionImg, alt: "Construction de pont", category: "Infrastructure" },
  { src: cerclesCitoyenImg, alt: "Cercle citoyen en action", category: "Participation" },
  { src: landscapeForestImg, alt: "Paysage forestier", category: "Paysages" },
  { src: chantierInfrastructureImg, alt: "Chantier d'infrastructure", category: "Infrastructure" },
  { src: chantierSanteImg, alt: "Projet de santé", category: "Santé" },
];

const categories = ["Tous", "Paysages", "Participation", "Gouvernance", "Infrastructure", "Santé", "Éducation", "Énergie"];

export const WoleuPhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredImages = activeCategory === "Tous" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

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
  React.useEffect(() => {
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
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category 
              ? "bg-green-600 hover:bg-green-700" 
              : "hover:bg-green-50 dark:hover:bg-green-900/20"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn className="w-7 h-7 text-white" />
                </div>
              </div>
              
              {/* Category badge */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block px-3 py-1 bg-green-600/90 text-white text-xs font-medium rounded-full">
                  {image.category}
                </span>
              </div>
            </motion.div>
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
