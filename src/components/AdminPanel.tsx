import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Download, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import { rssSources, categories, fetchRSSArticles, NewsArticle } from '@/lib/newsData';
import { toast } from 'sonner';

interface AdminPanelProps {
  language: 'ar' | 'fr';
  onArticleAdd: (article: NewsArticle) => void;
}

export default function AdminPanel({ language, onArticleAdd }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: { ar: '', fr: '' },
    summary: { ar: '', fr: '' },
    content: { ar: '', fr: '' },
    category: 'general',
    isExclusive: false,
    imageUrl: ''
  });
  const [rssSourcesState, setRssSourcesState] = useState(rssSources);

  const handleSubmitArticle = () => {
    if (!newArticle.title.ar || !newArticle.title.fr || !newArticle.content.ar || !newArticle.content.fr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    const article: NewsArticle = {
      id: `manual-${Date.now()}`,
      title: newArticle.title,
      summary: newArticle.summary,
      content: newArticle.content,
      category: newArticle.category,
      source: language === 'ar' ? 'التوانسة اليوم - حصري' : 'Tunisiens Aujourd\'hui - Exclusif',
      sourceUrl: '#',
      publishedAt: new Date().toISOString(),
      imageUrl: newArticle.imageUrl || undefined,
      isExclusive: newArticle.isExclusive
    };

    onArticleAdd(article);
    toast.success(language === 'ar' ? 'تم نشر المقال بنجاح' : 'Article publié avec succès');
    
    // Reset form
    setNewArticle({
      title: { ar: '', fr: '' },
      summary: { ar: '', fr: '' },
      content: { ar: '', fr: '' },
      category: 'general',
      isExclusive: false,
      imageUrl: ''
    });
  };

  const handleFetchRSS = async (sourceId: string) => {
    setIsLoading(true);
    try {
      const articles = await fetchRSSArticles(sourceId);
      articles.forEach(article => onArticleAdd(article));
      toast.success(language === 'ar' ? `تم استخراج ${articles.length} مقال` : `${articles.length} articles extraits`);
    } catch (error) {
      toast.error(language === 'ar' ? 'خطأ في استخراج المقالات' : 'Erreur lors de l\'extraction des articles');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRSSSource = (sourceId: string) => {
    setRssSourcesState(prev => 
      prev.map(source => 
        source.id === sourceId ? { ...source, isActive: !source.isActive } : source
      )
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'الإدارة' : 'Admin'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'لوحة الإدارة' : 'Panneau d\'Administration'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="write" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write">
              {language === 'ar' ? 'كتابة مقال' : 'Écrire un article'}
            </TabsTrigger>
            <TabsTrigger value="rss">
              {language === 'ar' ? 'مصادر RSS' : 'Sources RSS'}
            </TabsTrigger>
            <TabsTrigger value="settings">
              {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'إنشاء مقال جديد' : 'Créer un nouvel article'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title in both languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title-ar">
                      {language === 'ar' ? 'العنوان (عربي)' : 'Titre (Arabe)'}
                    </Label>
                    <Input
                      id="title-ar"
                      value={newArticle.title.ar}
                      onChange={(e) => setNewArticle(prev => ({
                        ...prev,
                        title: { ...prev.title, ar: e.target.value }
                      }))}
                      placeholder={language === 'ar' ? 'أدخل العنوان بالعربية' : 'Entrez le titre en arabe'}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title-fr">
                      {language === 'ar' ? 'العنوان (فرنسي)' : 'Titre (Français)'}
                    </Label>
                    <Input
                      id="title-fr"
                      value={newArticle.title.fr}
                      onChange={(e) => setNewArticle(prev => ({
                        ...prev,
                        title: { ...prev.title, fr: e.target.value }
                      }))}
                      placeholder={language === 'ar' ? 'أدخل العنوان بالفرنسية' : 'Entrez le titre en français'}
                    />
                  </div>
                </div>

                {/* Summary in both languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="summary-ar">
                      {language === 'ar' ? 'الملخص (عربي)' : 'Résumé (Arabe)'}
                    </Label>
                    <Textarea
                      id="summary-ar"
                      value={newArticle.summary.ar}
                      onChange={(e) => setNewArticle(prev => ({
                        ...prev,
                        summary: { ...prev.summary, ar: e.target.value }
                      }))}
                      placeholder={language === 'ar' ? 'أدخل ملخص المقال بالعربية' : 'Entrez le résumé en arabe'}
                      className="text-right"
                      dir="rtl"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="summary-fr">
                      {language === 'ar' ? 'الملخص (فرنسي)' : 'Résumé (Français)'}
                    </Label>
                    <Textarea
                      id="summary-fr"
                      value={newArticle.summary.fr}
                      onChange={(e) => setNewArticle(prev => ({
                        ...prev,
                        summary: { ...prev.summary, fr: e.target.value }
                      }))}
                      placeholder={language === 'ar' ? 'أدخل ملخص المقال بالفرنسية' : 'Entrez le résumé en français'}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Content in both languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="content-ar">
                      {language === 'ar' ? 'المحتوى (عربي)' : 'Contenu (Arabe)'}
                    </Label>
                    <Textarea
                      id="content-ar"
                      value={newArticle.content.ar}
                      onChange={(e) => setNewArticle(prev => ({
                        ...prev,
                        content: { ...prev.content, ar: e.target.value }
                      }))}
                      placeholder={language === 'ar' ? 'أدخل محتوى المقال بالعربية' : 'Entrez le contenu en arabe'}
                      className="text-right"
                      dir="rtl"
                      rows={8}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content-fr">
                      {language === 'ar' ? 'المحتوى (فرنسي)' : 'Contenu (Français)'}
                    </Label>
                    <Textarea
                      id="content-fr"
                      value={newArticle.content.fr}
                      onChange={(e) => setNewArticle(prev => ({
                        ...prev,
                        content: { ...prev.content, fr: e.target.value }
                      }))}
                      placeholder={language === 'ar' ? 'أدخل محتوى المقال بالفرنسية' : 'Entrez le contenu en français'}
                      rows={8}
                    />
                  </div>
                </div>

                {/* Category and settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>
                      {language === 'ar' ? 'التصنيف' : 'Catégorie'}
                    </Label>
                    <Select value={newArticle.category} onValueChange={(value) => setNewArticle(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categories[language]).map(([key, label]) => (
                          key !== 'all' && (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          )
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image-url">
                      {language === 'ar' ? 'رابط الصورة' : 'URL de l\'image'}
                    </Label>
                    <Input
                      id="image-url"
                      value={newArticle.imageUrl}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="exclusive"
                      checked={newArticle.isExclusive}
                      onCheckedChange={(checked) => setNewArticle(prev => ({ ...prev, isExclusive: checked }))}
                    />
                    <Label htmlFor="exclusive">
                      {language === 'ar' ? 'خبر حصري' : 'Exclusif'}
                    </Label>
                  </div>
                </div>

                <Button onClick={handleSubmitArticle} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'نشر المقال' : 'Publier l\'article'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rss" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'مصادر الأخبار التلقائية' : 'Sources d\'actualités automatiques'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rssSourcesState.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{source.name[language]}</h4>
                          <Badge variant="outline">{categories[language][source.category as keyof typeof categories[typeof language]]}</Badge>
                          {source.isActive ? (
                            <ToggleRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{source.url}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={source.isActive}
                          onCheckedChange={() => toggleRSSSource(source.id)}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFetchRSS(source.id)}
                          disabled={!source.isActive || isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          {language === 'ar' ? 'استخراج' : 'Extraire'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'إعدادات النظام' : 'Paramètres système'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {language === 'ar' 
                    ? 'إعدادات إضافية ستكون متاحة في الإصدارات القادمة'
                    : 'Paramètres supplémentaires seront disponibles dans les prochaines versions'
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
