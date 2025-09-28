import { NewsArticle } from './newsData';

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image?: string;
  category?: string;
}

export interface ParsedRSSFeed {
  title: string;
  description: string;
  items: RSSItem[];
}

// Simulate RSS parsing with realistic data structure
export async function parseRSSFeed(url: string, sourceName: string): Promise<NewsArticle[]> {
  // In a real implementation, you would use a CORS proxy or backend service
  // to fetch and parse RSS feeds. For now, we'll simulate with realistic data.
  
  const mockRSSData: { [key: string]: RSSItem[] } = {
    'https://www.tap.info.tn/rss': [
      {
        title: 'تونس: اجتماع مجلس الوزراء لمناقشة الميزانية العامة للدولة',
        description: 'عقد مجلس الوزراء اجتماعاً استثنائياً لمناقشة مشروع الميزانية العامة للدولة للسنة المالية القادمة',
        link: 'https://www.tap.info.tn/Portal-Politics/15234567',
        pubDate: new Date().toISOString(),
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=400&fit=crop',
        category: 'politics'
      },
      {
        title: 'إطلاق برنامج جديد لدعم المؤسسات الصغرى والمتوسطة',
        description: 'أعلنت وزارة الصناعة عن إطلاق برنامج جديد لدعم المؤسسات الصغرى والمتوسطة بقيمة 100 مليون دينار',
        link: 'https://www.tap.info.tn/Portal-Economy/15234568',
        pubDate: new Date(Date.now() - 3600000).toISOString(),
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
        category: 'business'
      }
    ],
    'https://www.assabah.com.tn/rss': [
      {
        title: 'المنتخب التونسي يستعد لمواجهة مصر في تصفيات كأس العالم',
        description: 'يخوض المنتخب التونسي لكرة القدم مباراة حاسمة أمام نظيره المصري في إطار تصفيات كأس العالم',
        link: 'https://www.assabah.com.tn/sports/article123456',
        pubDate: new Date(Date.now() - 7200000).toISOString(),
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
        category: 'sports'
      }
    ],
    'https://www.businessnews.com.tn/rss': [
      {
        title: 'ارتفاع صادرات الفوسفات التونسي بنسبة 15% خلال الربع الأول',
        description: 'سجلت صادرات الفوسفات التونسي ارتفاعاً ملحوظاً خلال الأشهر الثلاثة الأولى من السنة الجارية',
        link: 'https://www.businessnews.com.tn/phosphate-exports-rise',
        pubDate: new Date(Date.now() - 10800000).toISOString(),
        image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=400&fit=crop',
        category: 'business'
      }
    ]
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const items = mockRSSData[url] || [];
      const articles: NewsArticle[] = items.map((item, index) => ({
        id: `rss-${Date.now()}-${index}`,
        title: {
          ar: item.title,
          fr: translateToFrench(item.title) // In real app, use translation service
        },
        summary: {
          ar: item.description,
          fr: translateToFrench(item.description)
        },
        content: {
          ar: item.description + ' - محتوى مفصل للخبر سيتم استخراجه من المصدر الأصلي.',
          fr: translateToFrench(item.description) + ' - Contenu détaillé à extraire de la source originale.'
        },
        category: item.category || 'general',
        source: sourceName,
        sourceUrl: item.link,
        publishedAt: item.pubDate,
        imageUrl: item.image,
        isExclusive: false
      }));
      
      resolve(articles);
    }, 2000); // Simulate network delay
  });
}

// Simple translation function (in real app, use proper translation service)
function translateToFrench(arabicText: string): string {
  const translations: { [key: string]: string } = {
    'تونس': 'Tunisie',
    'اجتماع': 'réunion',
    'مجلس الوزراء': 'Conseil des ministres',
    'الميزانية': 'budget',
    'المنتخب التونسي': 'équipe nationale tunisienne',
    'كرة القدم': 'football',
    'صادرات': 'exportations',
    'الفوسفات': 'phosphate'
  };

  let translated = arabicText;
  Object.entries(translations).forEach(([ar, fr]) => {
    translated = translated.replace(new RegExp(ar, 'g'), fr);
  });

  return translated;
}

export async function fetchRSSArticles(sourceId: string, sourceUrl: string, sourceName: string): Promise<NewsArticle[]> {
  try {
    return await parseRSSFeed(sourceUrl, sourceName);
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return [];
  }
}
