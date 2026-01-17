import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Search, Calendar, ArrowRight, Clock } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { InstitutionSubHeader } from "@/components/layout/InstitutionSubHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "Toutes", color: "bg-muted" },
  { id: "social", label: "Social", color: "bg-pink-500" },
  { id: "education", label: "Éducation", color: "bg-blue-500" },
  { id: "routes", label: "Routes", color: "bg-orange-500" },
  { id: "environnement", label: "Environnement", color: "bg-green-500" },
  { id: "culture", label: "Culture", color: "bg-purple-500" },
  { id: "budget", label: "Budget", color: "bg-yellow-500" },
];

const articles = [
  {
    id: 1,
    title: "Nouveau plan départemental pour l'autonomie des personnes âgées",
    excerpt: "Le Conseil départemental lance un ambitieux programme de soutien aux seniors avec la création de 15 nouvelles résidences autonomie sur le territoire.",
    category: "social",
    date: "2026-01-15",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Rénovation énergétique des collèges : 50 millions d'euros investis",
    excerpt: "Un vaste plan de rénovation thermique permettra de réduire de 40% la consommation énergétique des établissements scolaires.",
    category: "education",
    date: "2026-01-12",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "Modernisation du réseau routier départemental",
    excerpt: "Les travaux de réfection de la RD 45 débuteront au printemps pour améliorer la sécurité des usagers.",
    category: "routes",
    date: "2026-01-10",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "Biodiversité : création de 3 nouvelles réserves naturelles",
    excerpt: "Le Département renforce son engagement écologique avec la protection de 2 000 hectares supplémentaires.",
    category: "environnement",
    date: "2026-01-08",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "Festival départemental de la culture : 10ème édition",
    excerpt: "Plus de 100 événements gratuits dans 50 communes pour célébrer la richesse culturelle du territoire.",
    category: "culture",
    date: "2026-01-05",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    featured: false,
  },
  {
    id: 6,
    title: "Vote du budget 2026 : priorité à la solidarité",
    excerpt: "L'assemblée départementale a adopté un budget de 1,2 milliard d'euros avec un accent sur l'action sociale.",
    category: "budget",
    date: "2026-01-03",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    featured: false,
  },
];

const getCategoryColor = (categoryId: string) => {
  const cat = categories.find(c => c.id === categoryId);
  return cat?.color || "bg-muted";
};

const getCategoryLabel = (categoryId: string) => {
  const cat = categories.find(c => c.id === categoryId);
  return cat?.label || categoryId;
};

export const ActualitesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <PublicLayout>
      <InstitutionSubHeader 
        icon={Newspaper}
        title="Actualités"
        description="Suivez toute l'actualité du Conseil Départemental et de ses actions sur le territoire"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Featured Article */}
        {featuredArticle && activeCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500">
              <div className="relative h-[400px] md:h-[500px]">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-secondary text-secondary-foreground">À la Une</Badge>
                    <Badge variant="outline" className={`${getCategoryColor(featuredArticle.category)} text-white border-0`}>
                      {getCategoryLabel(featuredArticle.category)}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-serif">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-white/80 text-lg max-w-3xl mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="text-white/60 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredArticle.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </span>
                    <Button className="bg-white text-primary hover:bg-white/90 group/btn">
                      Lire l'article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={activeCategory === category.id ? "" : "hover:bg-muted"}
              >
                {category.id !== "all" && (
                  <span className={`w-2 h-2 rounded-full ${category.color} mr-2`} />
                )}
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge 
                    className={`absolute top-3 left-3 ${getCategoryColor(article.category)} text-white border-0`}
                  >
                    {getCategoryLabel(article.category)}
                  </Badge>
                </div>
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-primary group/btn">
                    Lire l'article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun article ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};
