import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewsCard from '@/components/NewsCard';
import WeatherWidget from '@/components/WeatherWidget';
import RadioPlayer from '@/components/RadioPlayer';
import LanguageToggle from '@/components/LanguageToggle';
import CategoryFilter from '@/components/CategoryFilter';
import AdminPanel from '@/components/AdminPanel';
import LiveNewsTicker from '@/components/LiveNewsTicker';
import { mockNewsArticles, NewsArticle } from '@/lib/newsData';
import { Newspaper, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Index() {
  const [language, setLanguage] = useState<'ar' | 'fr'>('ar');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<NewsArticle[]>(mockNewsArticles);
  const [showAdmin, setShowAdmin] = useState(false);
  const location = useLocation();

  // Check if admin route is accessed
  useEffect(() => {
    if (location.pathname === '/admin') {
      setShowAdmin(true);
    }
  }, [location]);

  const handleAddArticle = (newArticle: NewsArticle) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') {
      return articles.sort((a, b) => {
        // Exclusive articles first, then by date
        if (a.isExclusive && !b.isExclusive) return -1;
        if (!a.isExclusive && b.isExclusive) return 1;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    }
    return articles
      .filter(article => article.category === selectedCategory)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [selectedCategory, articles]);

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Live News Ticker */}
      <LiveNewsTicker language={language} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Newspaper className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {language === 'ar' ? 'التوانسة اليوم' : 'Tunisiens Aujourd\'hui'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'أخبار تونس والعالم' : 'Actualités de Tunisie et du monde'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Only show admin panel if accessed via /admin route */}
              {showAdmin && (
                <AdminPanelWrapper language={language} onArticleAdd={handleAddArticle} />
              )}

              <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Breaking News Banner */}
            <Card className="mb-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-3 bg-white text-red-600">
                    {language === 'ar' ? 'عاجل' : 'URGENT'}
                  </Badge>
                  <p className="text-sm font-medium">
                    {language === 'ar' 
                      ? 'تابعوا آخر الأخبار العاجلة من تونس والعالم' 
                      : 'Suivez les dernières nouvelles urgentes de Tunisie et du monde'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              language={language}
            />

            {/* Exclusive News Section */}
            {selectedCategory === 'all' && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <h2 className="text-xl font-bold">
                    {language === 'ar' ? 'أخبار حصرية' : 'Nouvelles Exclusives'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {filteredArticles
                    .filter(article => article.isExclusive)
                    .slice(0, 2)
                    .map((article) => (
                      <NewsCard key={article.id} article={article} language={language} />
                    ))}
                </div>
              </div>
            )}

            {/* All News */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                {language === 'ar' ? 'جميع الأخبار' : 'Toutes les Nouvelles'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <NewsCard key={article.id} article={article} language={language} />
                ))}
              </div>
            </div>

            {/* Ad Space Placeholder */}
            <Card className="mt-8 bg-gray-100 border-2 border-dashed border-gray-300">
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">
                  {language === 'ar' ? 'مساحة إعلانية - Google AdSense' : 'Espace publicitaire - Google AdSense'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget language={language} />

            {/* Radio Player */}
            <RadioPlayer language={language} />

            {/* Ad Space Placeholder */}
            <Card className="bg-gray-100 border-2 border-dashed border-gray-300">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'إعلان' : 'Publicité'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">
                {language === 'ar' ? 'التوانسة اليوم' : 'Tunisiens Aujourd\'hui'}
              </h3>
              <p className="text-sm text-gray-400">
                {language === 'ar' 
                  ? 'منصة إخبارية شاملة تقدم آخر الأخبار من تونس والعالم'
                  : 'Plateforme d\'actualités complète offrant les dernières nouvelles de Tunisie et du monde'
                }
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">
                {language === 'ar' ? 'الأقسام' : 'Sections'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{language === 'ar' ? 'سياسة' : 'Politique'}</li>
                <li>{language === 'ar' ? 'رياضة' : 'Sport'}</li>
                <li>{language === 'ar' ? 'ثقافة' : 'Culture'}</li>
                <li>{language === 'ar' ? 'تكنولوجيا' : 'Technologie'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">
                {language === 'ar' ? 'اتصل بنا' : 'Contact'}
              </h4>
              <p className="text-sm text-gray-400">
                {language === 'ar' ? 'البريد الإلكتروني: info@tunisianstoday.tn' : 'Email: info@tunisianstoday.tn'}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 {language === 'ar' ? 'التوانسة اليوم' : 'Tunisiens Aujourd\'hui'}. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

