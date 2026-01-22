import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WoleuHeader } from '@/components/conseil/woleu/WoleuHeader';
import { WoleuFooter } from '@/components/conseil/woleu/WoleuFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Newspaper, Calendar, Clock, ArrowRight, Search, 
  Filter, Building2, HeartPulse, GraduationCap, Users, Sprout 
} from 'lucide-react';

// Import images
import actualitesMediaImg from '@/assets/woleu/actualites-media.jpg';
import energieSolaireImg from '@/assets/woleu/energie-solaire.jpg';
import chantierSanteImg from '@/assets/woleu/chantier-sante.jpg';
import chantierInfrastructureImg from '@/assets/woleu/chantier-infrastructure.jpg';
import chantierEducationImg from '@/assets/woleu/chantier-education.jpg';
import cercleCitoyenImg from '@/assets/woleu/cercle-citoyen.jpg';

const categories = [
  { id: 'all', label: 'Tous', icon: Newspaper },
  { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
  { id: 'sante', label: 'Santé', icon: HeartPulse },
  { id: 'education', label: 'Éducation', icon: GraduationCap },
  { id: 'participation', label: 'Participation', icon: Users },
  { id: 'environnement', label: 'Environnement', icon: Sprout }
];

const actualites = [
  {
    id: 1,
    title: "Lancement du programme d'électrification solaire",
    excerpt: "Le Conseil Départemental lance un ambitieux programme d'électrification solaire pour les villages non connectés au réseau.",
    category: 'environnement',
    date: '2025-01-20',
    readTime: '5 min',
    featured: true,
    image: energieSolaireImg
  },
  {
    id: 2,
    title: "Inauguration du centre de santé de Mitzic",
    excerpt: "Un nouveau centre de santé moderne a été inauguré pour améliorer l'accès aux soins dans le canton de Mitzic.",
    category: 'sante',
    date: '2025-01-18',
    readTime: '3 min',
    featured: true,
    image: chantierSanteImg
  },
  {
    id: 3,
    title: "Réhabilitation de la route Oyem-Bitam",
    excerpt: "Les travaux de réhabilitation de l'axe Oyem-Bitam avancent avec 45% du tracé déjà bitumé.",
    category: 'infrastructure',
    date: '2025-01-15',
    readTime: '4 min',
    featured: false,
    image: chantierInfrastructureImg
  },
  {
    id: 4,
    title: "Formation des enseignants du département",
    excerpt: "Plus de 200 enseignants ont bénéficié d'une formation aux nouvelles méthodes pédagogiques.",
    category: 'education',
    date: '2025-01-12',
    readTime: '3 min',
    featured: false,
    image: chantierEducationImg
  },
  {
    id: 5,
    title: "Premier Cercle Citoyen du canton de Kyé",
    excerpt: "Le premier Cercle Citoyen du canton de Kyé a réuni plus de 50 habitants pour discuter des priorités locales.",
    category: 'participation',
    date: '2025-01-10',
    readTime: '4 min',
    featured: false,
    image: cercleCitoyenImg
  },
  {
    id: 6,
    title: "Distribution de kits scolaires",
    excerpt: "Le Conseil Départemental a distribué 5000 kits scolaires aux élèves les plus défavorisés du département.",
    category: 'education',
    date: '2025-01-08',
    readTime: '2 min',
    featured: false,
    image: chantierEducationImg
  }
];

export const WoleuActualitesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActualites = actualites.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredActualites.filter(item => item.featured);
  const regularNews = filteredActualites.filter(item => !item.featured);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[0];
  };

  return (
    <div className="min-h-screen bg-background">
      <WoleuHeader onNavigate={() => {}} activeSection="actualites" />
      
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={actualitesMediaImg} 
            alt="Actualités Woleu" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              <Newspaper className="w-3 h-3 mr-1" />
              Restez informé
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
              Actualités du Woleu
            </h1>
            <p className="text-lg text-white/80">
              Suivez les dernières nouvelles et avancées du Conseil Départemental
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-card sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une actualité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Featured news */}
          {featuredNews.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-serif mb-6">À la une</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredNews.map((item, index) => {
                  const categoryInfo = getCategoryInfo(item.category);
                  const CategoryIcon = categoryInfo.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all h-full">
                        <div className="relative h-48 md:h-64 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {categoryInfo.label}
                          </Badge>
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(item.date).toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.readTime}
                            </span>
                          </div>
                          <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {item.excerpt}
                          </CardDescription>
                          <Button variant="ghost" className="mt-4 p-0 h-auto text-green-600 group/btn">
                            Lire la suite
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular news grid */}
          <div>
            <h2 className="text-2xl font-bold font-serif mb-6">Toutes les actualités</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((item, index) => {
                const categoryInfo = getCategoryInfo(item.category);
                const CategoryIcon = categoryInfo.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all h-full">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 left-3 bg-white/90 text-foreground">
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {categoryInfo.label}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.readTime}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {filteredActualites.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune actualité trouvée</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </section>

      <WoleuFooter />
    </div>
  );
};
