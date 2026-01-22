import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, MapPin, Building2, Users, Sun, GraduationCap, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Import images
import landscapeForest from '@/assets/woleu/landscape-forest.jpg';
import infrastructureRoad from '@/assets/woleu/infrastructure-road.jpg';
import healthCenter from '@/assets/woleu/health-center.jpg';
import communityMeeting from '@/assets/woleu/community-meeting.jpg';
import schoolBuilding from '@/assets/woleu/school-building.jpg';
import solarEnergy from '@/assets/woleu/solar-energy.jpg';

const galleryImages = [
  {
    src: landscapeForest,
    title: "Forêt tropicale du Woleu",
    category: "Paysage",
    description: "La richesse naturelle de notre département",
    icon: MapPin
  },
  {
    src: infrastructureRoad,
    title: "Route bitumée moderne",
    category: "Infrastructure",
    description: "Désenclavement des villages du Woleu",
    icon: Building2
  },
  {
    src: healthCenter,
    title: "Centre de santé rénové",
    category: "Santé",
    description: "Accès aux soins pour tous les citoyens",
    icon: HeartPulse
  },
  {
    src: communityMeeting,
    title: "Cercle Citoyen en action",
    category: "Participation",
    description: "La démocratie participative en marche",
    icon: Users
  },
  {
    src: schoolBuilding,
    title: "École rénovée",
    category: "Éducation",
    description: "Un avenir meilleur pour nos enfants",
    icon: GraduationCap
  },
  {
    src: solarEnergy,
    title: "Électrification solaire",
    category: "Énergie",
    description: "Énergie propre pour les villages",
    icon: Sun
  }
];

export const WoleuGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Découvrez le Woleu
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Galerie du Département
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Paysages, infrastructures et moments de vie qui font la richesse du Woleu
          </p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => {
            const Icon = image.icon;
            // Make first and fourth images larger
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className={`relative ${isLarge ? 'aspect-[16/10]' : 'aspect-square'}`}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    <Badge 
                      className="w-fit mb-2 bg-white/20 text-white border-0 backdrop-blur-sm text-xs"
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {image.category}
                    </Badge>
                    <h3 className={`font-semibold text-white ${isLarge ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
                      {image.title}
                    </h3>
                    <p className={`text-white/80 mt-1 ${isLarge ? 'text-sm md:text-base' : 'text-xs hidden md:block'}`}>
                      {image.description}
                    </p>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox */}
        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-0">
            <AnimatePresence mode="wait">
              {selectedImage !== null && (
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
                    onClick={closeLightbox}
                  >
                    <X className="h-6 w-6" />
                  </Button>

                  {/* Navigation buttons */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 h-12 w-12"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 h-12 w-12"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>

                  {/* Image */}
                  <div className="flex items-center justify-center min-h-[60vh] p-8">
                    <img
                      src={galleryImages[selectedImage].src}
                      alt={galleryImages[selectedImage].title}
                      className="max-w-full max-h-[70vh] object-contain rounded-lg"
                    />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <Badge className="mb-2 bg-green-600 text-white">
                      {galleryImages[selectedImage].category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-white">
                      {galleryImages[selectedImage].title}
                    </h3>
                    <p className="text-white/80 mt-1">
                      {galleryImages[selectedImage].description}
                    </p>
                  </div>

                  {/* Dots indicator */}
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === selectedImage 
                            ? 'bg-white w-6' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
