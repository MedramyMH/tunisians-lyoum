import { useState, useEffect } from 'react';
import { liveNewsTicker } from '@/lib/newsData';

interface LiveNewsTickerProps {
  language: 'ar' | 'fr';
}

export default function LiveNewsTicker({ language }: LiveNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveNewsTicker.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-white text-red-600 px-3 py-1 text-xs font-bold rounded mr-4 flex-shrink-0">
            {language === 'ar' ? 'مباشر' : 'LIVE'}
          </div>
          <div className="flex-1 overflow-hidden">
            <div 
              className="animate-marquee whitespace-nowrap text-sm font-medium"
              style={{
                animation: 'marquee 30s linear infinite'
              }}
            >
              {liveNewsTicker[currentIndex][language]}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
