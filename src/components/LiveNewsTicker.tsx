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
    }, 15000); // Change every 15 seconds (slower)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-white text-red-600 px-3 py-1 text-xs font-bold rounded mr-4 flex-shrink-0 animate-pulse">
            {language === 'ar' ? 'مباشر' : 'LIVE'}
          </div>
          <div className="flex-1 overflow-hidden">
            <div 
              className="whitespace-nowrap text-sm font-medium transition-all duration-1000 ease-in-out"
              key={currentIndex}
              style={{
                animation: 'slideIn 1s ease-in-out'
              }}
            >
              {liveNewsTicker[currentIndex][language]}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          0% { 
            opacity: 0;
            transform: translateX(20px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
