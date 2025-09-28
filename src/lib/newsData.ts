export interface NewsArticle {
  id: string;
  title: {
    ar: string;
    fr: string;
  };
  summary: {
    ar: string;
    fr: string;
  };
  content: {
    ar: string;
    fr: string;
  };
  category: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  imageUrl?: string;
  isExclusive: boolean;
}

export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  country: string;
  streamUrl: string;
  logo?: string;
}

export interface RSSSource {
  id: string;
  name: {
    ar: string;
    fr: string;
  };
  url: string;
  isActive: boolean;
  category: string;
}

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: {
      ar: 'أخبار عاجلة من تونس: تطورات سياسية مهمة',
      fr: 'Nouvelles urgentes de Tunisie : développements politiques importants'
    },
    summary: {
      ar: 'تطورات سياسية مهمة في العاصمة التونسية اليوم',
      fr: 'Développements politiques importants dans la capitale tunisienne aujourd\'hui'
    },
    content: {
      ar: 'شهدت العاصمة التونسية اليوم تطورات سياسية مهمة حيث اجتمع المسؤولون لمناقشة القضايا الراهنة. وقد أكد المتحدثون على أهمية الحوار الوطني والعمل المشترك لتحقيق التقدم والازدهار للبلاد.',
      fr: 'La capitale tunisienne a connu aujourd\'hui d\'importants développements politiques alors que les responsables se sont réunis pour discuter des questions actuelles. Les intervenants ont souligné l\'importance du dialogue national et du travail commun pour réaliser le progrès et la prospérité du pays.'
    },
    category: 'politics',
    source: 'وكالة تونس أفريقيا للأنباء',
    sourceUrl: 'https://www.tap.info.tn',
    publishedAt: '2025-01-27T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=400&fit=crop',
    isExclusive: true
  },
  {
    id: '2',
    title: {
      ar: 'الفريق التونسي يحقق فوزاً مهماً في البطولة الأفريقية',
      fr: 'L\'équipe tunisienne remporte une victoire importante au championnat africain'
    },
    summary: {
      ar: 'انتصار باهر للمنتخب التونسي في المباراة الأخيرة',
      fr: 'Victoire éclatante de l\'équipe nationale tunisienne lors du dernier match'
    },
    content: {
      ar: 'حقق المنتخب التونسي لكرة القدم انتصاراً مهماً في البطولة الأفريقية، مما يعزز من فرصه في التأهل للمراحل النهائية. اللاعبون أظهروا مستوى متميزاً وروحاً قتالية عالية.',
      fr: 'L\'équipe nationale tunisienne de football a remporté une victoire importante au championnat africain, renforçant ses chances de qualification pour les phases finales. Les joueurs ont montré un niveau exceptionnel et un esprit combatif élevé.'
    },
    category: 'sports',
    source: 'الرياضة التونسية',
    sourceUrl: 'https://www.sport.tn',
    publishedAt: '2025-01-27T08:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    isExclusive: false
  },
  {
    id: '3',
    title: {
      ar: 'مهرجان قرطاج الدولي يستقبل نجوماً عالميين',
      fr: 'Le Festival International de Carthage accueille des stars mondiales'
    },
    summary: {
      ar: 'فعاليات ثقافية متنوعة في مهرجان قرطاج الدولي',
      fr: 'Événements culturels variés au Festival International de Carthage'
    },
    content: {
      ar: 'يشهد مهرجان قرطاج الدولي هذا العام حضور نجوم عالميين من مختلف أنحاء العالم، حيث تتنوع العروض بين المسرح والموسيقى والسينما، مما يجعله حدثاً ثقافياً مميزاً.',
      fr: 'Le Festival International de Carthage accueille cette année des stars mondiales de différentes parties du monde, avec des spectacles variés entre théâtre, musique et cinéma, en faisant un événement culturel exceptionnel.'
    },
    category: 'culture',
    source: 'الثقافة التونسية',
    sourceUrl: 'https://www.culture.tn',
    publishedAt: '2025-01-27T06:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    isExclusive: false
  },
  {
    id: '4',
    title: {
      ar: 'تونس تطلق مشروعاً تكنولوجياً جديداً للذكاء الاصطناعي',
      fr: 'La Tunisie lance un nouveau projet technologique d\'intelligence artificielle'
    },
    summary: {
      ar: 'مبادرة تكنولوجية جديدة لتطوير الذكاء الاصطناعي في تونس',
      fr: 'Nouvelle initiative technologique pour développer l\'IA en Tunisie'
    },
    content: {
      ar: 'أعلنت الحكومة التونسية عن إطلاق مشروع طموح في مجال الذكاء الاصطناعي، بهدف تطوير القطاع التكنولوجي وجذب الاستثمارات الأجنبية في هذا المجال الحيوي.',
      fr: 'Le gouvernement tunisien a annoncé le lancement d\'un projet ambitieux dans le domaine de l\'intelligence artificielle, visant à développer le secteur technologique et attirer les investissements étrangers dans ce domaine vital.'
    },
    category: 'technology',
    source: 'تكنولوجيا تونس',
    sourceUrl: 'https://www.tech.tn',
    publishedAt: '2025-01-27T05:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    isExclusive: true
  }
];

export const tunisianRadioStations: RadioStation[] = [
  {
    id: '1',
    name: 'Mosaique FM',
    frequency: '94.9 FM',
    country: 'Tunisia',
    streamUrl: 'https://radio.mosaiquefm.net/mosalive'
  },
  {
    id: '2',
    name: 'Express FM',
    frequency: '88.8 FM',
    country: 'Tunisia',
    streamUrl: 'https://expressfm.ice.infomaniak.ch/expressfm-64.mp3'
  },
  {
    id: '3',
    name: 'Jawhara FM',
    frequency: '102.5 FM',
    country: 'Tunisia',
    streamUrl: 'https://streaming2.toutech.net/jawharafm'
  },
  {
    id: '4',
    name: 'Knooz FM',
    frequency: '106.0 FM',
    country: 'Tunisia',
    streamUrl: 'http://streaming.knoozfm.net:8000/knoozfm'
  },
  {
    id: '5',
    name: 'Diwan FM',
    frequency: '104.1 FM',
    country: 'Tunisia',
    streamUrl: 'https://streaming.diwanfm.net/stream'
  },
  {
    id: '6',
    name: 'Radio Tunis Chaîne Internationale',
    frequency: '98.2 FM',
    country: 'Tunisia',
    streamUrl: 'https://radio.rtci.tn/rtci'
  },
  {
    id: '7',
    name: 'Shems FM',
    frequency: '88.8 FM',
    country: 'Tunisia',
    streamUrl: 'https://shemsfm.net/radio/8000/shems'
  },
  {
    id: '8',
    name: 'IFM',
    frequency: '100.6 FM',
    country: 'Tunisia',
    streamUrl: 'https://ifm.ice.infomaniak.ch/ifm-64.mp3'
  },
  {
    id: '9',
    name: 'Sabra FM',
    frequency: '100.2 FM',
    country: 'Tunisia',
    streamUrl: 'https://sabrafm.ice.infomaniak.ch/sabrafm-64.mp3'
  },
  {
    id: '10',
    name: 'Radio Zitouna',
    frequency: '103.0 FM',
    country: 'Tunisia',
    streamUrl: 'https://zitouna.net/live'
  },
  {
    id: '11',
    name: 'Oxygène FM',
    frequency: '95.5 FM',
    country: 'Tunisia',
    streamUrl: 'https://oxygene.ice.infomaniak.ch/oxygene-64.mp3'
  },
  {
    id: '12',
    name: 'Cap FM',
    frequency: '104.8 FM',
    country: 'Tunisia',
    streamUrl: 'https://capfm.ice.infomaniak.ch/capfm-64.mp3'
  }
];

export const rssSources: RSSSource[] = [
  {
    id: '1',
    name: {
      ar: 'وكالة تونس أفريقيا للأنباء',
      fr: 'Agence Tunis Afrique Presse'
    },
    url: 'https://www.tap.info.tn/rss',
    isActive: true,
    category: 'general'
  },
  {
    id: '2',
    name: {
      ar: 'الصباح',
      fr: 'Assabah'
    },
    url: 'https://www.assabah.com.tn/rss',
    isActive: true,
    category: 'general'
  },
  {
    id: '3',
    name: {
      ar: 'الشروق',
      fr: 'Alchourouk'
    },
    url: 'https://www.alchourouk.com/rss',
    isActive: true,
    category: 'general'
  },
  {
    id: '4',
    name: {
      ar: 'بيزنس نيوز',
      fr: 'Business News'
    },
    url: 'https://www.businessnews.com.tn/rss',
    isActive: true,
    category: 'business'
  },
  {
    id: '5',
    name: {
      ar: 'لابريس دو تونيزي',
      fr: 'La Presse de Tunisie'
    },
    url: 'https://lapresse.tn/rss',
    isActive: true,
    category: 'general'
  },
  {
    id: '6',
    name: {
      ar: 'كابيتاليس',
      fr: 'Kapitalis'
    },
    url: 'https://kapitalis.com/rss',
    isActive: true,
    category: 'politics'
  },
  {
    id: '7',
    name: {
      ar: 'تونيزيا لايف',
      fr: 'Tunisia Live'
    },
    url: 'https://www.tunisie-live.net/rss',
    isActive: true,
    category: 'general'
  },
  {
    id: '8',
    name: {
      ar: 'تونس نيوميريك',
      fr: 'Tunisie Numerique'
    },
    url: 'https://www.tunisienumerique.com/rss',
    isActive: true,
    category: 'technology'
  }
];

export const categories = {
  ar: {
    all: 'جميع الأخبار',
    politics: 'سياسة',
    sports: 'رياضة',
    culture: 'ثقافة',
    technology: 'تكنولوجيا',
    business: 'اقتصاد',
    general: 'عام'
  },
  fr: {
    all: 'Toutes les nouvelles',
    politics: 'Politique',
    sports: 'Sport',
    culture: 'Culture',
    technology: 'Technologie',
    business: 'Économie',
    general: 'Général'
  }
};

// Live news ticker data
export const liveNewsTicker = [
  {
    ar: 'عاجل: اجتماع طارئ للحكومة التونسية لمناقشة الأوضاع الاقتصادية',
    fr: 'URGENT: Réunion d\'urgence du gouvernement tunisien pour discuter de la situation économique'
  },
  {
    ar: 'المنتخب التونسي يتأهل للدور النهائي في البطولة الأفريقية',
    fr: 'L\'équipe nationale tunisienne se qualifie pour la finale du championnat africain'
  },
  {
    ar: 'إطلاق مشروع جديد لتطوير الطاقة المتجددة في تونس',
    fr: 'Lancement d\'un nouveau projet de développement des énergies renouvelables en Tunisie'
  },
  {
    ar: 'افتتاح معرض تونس الدولي للتكنولوجيا والابتكار',
    fr: 'Ouverture du Salon International de Technologie et d\'Innovation de Tunisie'
  }
];

// Simulate RSS feed fetching
export async function fetchRSSArticles(sourceId: string): Promise<NewsArticle[]> {
  // In a real implementation, this would fetch from actual RSS feeds
  // For now, we'll simulate with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockFetchedArticles: NewsArticle[] = [
        {
          id: `rss-${sourceId}-${Date.now()}`,
          title: {
            ar: `خبر جديد من المصدر ${sourceId}`,
            fr: `Nouvelle actualité de la source ${sourceId}`
          },
          summary: {
            ar: 'ملخص الخبر المستخرج تلقائياً من موجز RSS',
            fr: 'Résumé de l\'actualité extraite automatiquement du flux RSS'
          },
          content: {
            ar: 'محتوى الخبر الكامل المستخرج من موجز RSS. هذا مثال على كيفية عمل النظام التلقائي لاستخراج الأخبار.',
            fr: 'Contenu complet de l\'actualité extraite du flux RSS. Ceci est un exemple de fonctionnement du système automatique d\'extraction d\'actualités.'
          },
          category: 'general',
          source: rssSources.find(s => s.id === sourceId)?.name.ar || 'مصدر غير معروف',
          sourceUrl: rssSources.find(s => s.id === sourceId)?.url || '#',
          publishedAt: new Date().toISOString(),
          isExclusive: false
        }
      ];
      resolve(mockFetchedArticles);
    }, 1500);
  });
}