import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock } from 'lucide-react';
import { NewsArticle, categories } from '@/lib/newsData';

interface NewsCardProps {
  article: NewsArticle;
  language: 'ar' | 'fr';
}

export default function NewsCard({ article, language }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-TN' : 'fr-TN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const categoryLabels = categories[language];

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {article.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title[language]}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={article.isExclusive ? 'destructive' : 'secondary'} className="text-xs">
            {article.isExclusive ? (language === 'ar' ? 'حصري' : 'Exclusif') : categoryLabels[article.category as keyof typeof categoryLabels]}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(article.publishedAt)}
          </div>
        </div>
        <h3 className="text-lg font-bold leading-tight line-clamp-2">
          {article.title[language]}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {article.summary[language]}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {article.source}
          </span>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            {language === 'ar' ? 'المصدر' : 'Source'}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
