import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, X, ZoomIn, MapPin, Building2, Users, Sun, 
  GraduationCap, HeartPulse, TreePine, Home, Palmtree, Music, ShoppingBag,
  Leaf, Mountain, Droplets, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';

// Import images - Landscapes
import landscapeForest from '@/assets/woleu/landscape-forest.jpg';
import discoverAerial from '@/assets/woleu/discover-landscape-aerial.jpg';
import discoverWaterfall from '@/assets/woleu/discover-waterfall.jpg';
import heroForestAerial from '@/assets/woleu/hero-forest-aerial.jpg';

// Import images - Infrastructure
import infrastructureRoad from '@/assets/woleu/infrastructure-road.jpg';
import healthCenter from '@/assets/woleu/health-center.jpg';
import schoolBuilding from '@/assets/woleu/school-building.jpg';
import solarEnergy from '@/assets/woleu/solar-energy.jpg';
import pontConstruction from '@/assets/woleu/pont-construction.jpg';
import chantierRoutes from '@/assets/woleu/chantier-routes.jpg';

// Import images - Community
import communityMeeting from '@/assets/woleu/community-meeting.jpg';
import cercleCitoyen from '@/assets/woleu/cercle-citoyen.jpg';
import discoverVillage from '@/assets/woleu/discover-village-life.jpg';
import discoverCulture from '@/assets/woleu/discover-culture.jpg';
import discoverMarket from '@/assets/woleu/discover-market.jpg';
import discoverAgriculture from '@/assets/woleu/discover-agriculture.jpg';

const categories = [
  { id: 'all', label: 'Tout', icon: MapPin },
  { id: 'paysages', label: 'Paysages', icon: Mountain },
  { id: 'infrastructure', label: 'Infrastructures', icon: Building2 },
  { id: 'vie', label: 'Vie Quotidienne', icon: Home },
  { id: 'culture', label: 'Culture', icon: Music },
];

const galleryImages = [
  // Paysages
  {
    src: discoverAerial,
    title: "Vue aérienne de la forêt",
    category: "paysages",
    description: "La majestueuse forêt tropicale du Woleu vue du ciel",
    icon: TreePine,
    featured: true
  },
  {
    src: discoverWaterfall,
    title: "Cascades du Woleu",
    category: "paysages",
    description: "Les magnifiques chutes d'eau au cœur de la jungle",
    icon: Droplets
  },
  {
    src: landscapeForest,
    title: "Forêt tropicale",
    category: "paysages",
    description: "La richesse naturelle de notre département",
    icon: Leaf
  },
  {
    src: heroForestAerial,
    title: "Canopée verdoyante",
    category: "paysages",
    description: "L'immensité verte du patrimoine forestier",
    icon: Palmtree
  },
  
  // Infrastructure
  {
    src: infrastructureRoad,
    title: "Route bitumée moderne",
    category: "infrastructure",
    description: "Désenclavement des villages du Woleu",
    icon: Building2,
    featured: true
  },
  {
    src: healthCenter,
    title: "Centre de santé rénové",
    category: "infrastructure",
    description: "Accès aux soins pour tous les citoyens",
    icon: HeartPulse
  },
  {
    src: schoolBuilding,
    title: "École rénovée",
    category: "infrastructure",
    description: "Un avenir meilleur pour nos enfants",
    icon: GraduationCap
  },
  {
    src: solarEnergy,
    title: "Électrification solaire",
    category: "infrastructure",
    description: "Énergie propre pour les villages",
    icon: Sun
  },
  {
    src: pontConstruction,
    title: "Pont en construction",
    category: "infrastructure",
    description: "Relier les communautés isolées",
    icon: Building2
  },
  {
    src: chantierRoutes,
    title: "Travaux routiers",
    category: "infrastructure",
    description: "Modernisation du réseau routier",
    icon: Building2
  },
  
  // Vie quotidienne
  {
    src: discoverVillage,
    title: "Vie de village",
    category: "vie",
    description: "Le quotidien chaleureux des communautés",
    icon: Home,
    featured: true
  },
  {
    src: discoverMarket,
    title: "Marché local",
    category: "vie",
    description: "Le commerce vibrant et les produits locaux",
    icon: ShoppingBag
  },
  {
    src: discoverAgriculture,
    title: "Agriculture durable",
    category: "vie",
    description: "Les agriculteurs au travail dans les plantations",
    icon: Leaf
  },
  {
    src: communityMeeting,
    title: "Assemblée communautaire",
    category: "vie",
    description: "La démocratie participative en action",
    icon: Users
  },
  {
    src: cercleCitoyen,
    title: "Cercle citoyen",
    category: "vie",
    description: "Citoyens engagés pour leur département",
    icon: Users
  },
  
  // Culture
  {
    src: discoverCulture,
    title: "Danses traditionnelles",
    category: "culture",
    description: "Les festivités colorées du Woleu",
    icon: Music,
    featured: true
  },
];

const stats = [
  { value: "23 000", label: "km² de superficie", icon: MapPin },
  { value: "150 000+", label: "habitants", icon: Users },
  { value: "4", label: "cantons", icon: Building2 },
  { value: "85%", label: "couverture forestière", icon: TreePine },
];

export const WoleuDecouvrirPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
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

  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader onNavigate={() => {}} activeSection="decouvrir" />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={discoverAerial} 
            alt="Forêt du Woleu" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-green-900/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              Explorez notre territoire
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
              Découvrez le <span className="text-amber-400">Woleu</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Paysages majestueux, infrastructures modernes et moments de vie authentiques 
              qui font la richesse de notre département.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                >
                  <stat.icon className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs & Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Galerie du Département
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explorez les différentes facettes du Woleu à travers notre collection d'images
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? "default" : "outline"}
                  className={`${isActive ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.label}
                </Button>
              );
            })}
          </div>

          {/* Bento Grid Gallery */}
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => {
                const Icon = image.icon;
                const isLarge = image.featured;
                
                return (
                  <motion.div
                    key={image.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                      isLarge ? 'col-span-2 row-span-2' : ''
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    <div className={`relative ${isLarge ? 'aspect-[4/3]' : 'aspect-square'}`}>
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <Badge 
                          className="w-fit mb-2 bg-white/20 text-white border-0 backdrop-blur-sm text-xs"
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {categories.find(c => c.id === image.category)?.label}
                        </Badge>
                        <h3 className={`font-semibold text-white ${isLarge ? 'text-xl' : 'text-sm'}`}>
                          {image.title}
                        </h3>
                        <p className={`text-white/80 mt-1 ${isLarge ? 'text-sm' : 'text-xs hidden md:block'}`}>
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
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Discover More CTA */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Envie d'en savoir plus ?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Découvrez notre programme de développement et les projets en cours 
              pour transformer le Woleu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-900">
                Voir le Programme 2025
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Explorer les Chantiers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

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
                    src={filteredImages[selectedImage].src}
                    alt={filteredImages[selectedImage].title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <Badge className="mb-2 bg-green-600 text-white">
                    {categories.find(c => c.id === filteredImages[selectedImage].category)?.label}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-white/80 mt-1">
                    {filteredImages[selectedImage].description}
                  </p>
                </div>

                {/* Dots indicator */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                  {filteredImages.map((_, index) => (
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

      <WoleuFooter />
    </div>
  );
};
