import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Cloud, Droplets, Wind } from 'lucide-react';
import { getWeatherData, getCurrentLocation, WeatherData } from '@/lib/weatherApi';

interface WeatherWidgetProps {
  language: 'ar' | 'fr';
}

export default function WeatherWidget({ language }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = await getCurrentLocation();
        const weatherData = await getWeatherData(location.lat, location.lon);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
        // Fallback to default location
        const weatherData = await getWeatherData();
        setWeather(weatherData);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Update weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getDayName = (day: string) => {
    if (language === 'fr') {
      const dayTranslations: { [key: string]: string } = {
        'اليوم': 'Aujourd\'hui',
        'غداً': 'Demain',
        'الأحد': 'Dimanche',
        'الإثنين': 'Lundi',
        'الثلاثاء': 'Mardi',
        'الأربعاء': 'Mercredi',
        'الخميس': 'Jeudi',
        'الجمعة': 'Vendredi',
        'السبت': 'Samedi'
      };
      return dayTranslations[day] || day;
    }
    return day;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            {language === 'ar' ? 'الطقس' : 'Météo'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Cloud className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'الطقس' : 'Météo'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{weather.location}</p>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-xs text-muted-foreground">{weather.description}</p>
            </div>
            <div className="text-3xl">{weather.icon}</div>
          </div>
          
          <div className="flex justify-between text-xs">
            <div className="flex items-center">
              <Droplets className="w-3 h-3 mr-1" />
              {weather.humidity}%
            </div>
            <div className="flex items-center">
              <Wind className="w-3 h-3 mr-1" />
              {weather.windSpeed} km/h
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-xs font-medium mb-2">
              {language === 'ar' ? 'توقعات الأسبوع' : 'Prévisions hebdomadaires'}
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {weather.forecast.slice(0, 6).map((day, index) => (
                <div key={index} className="text-center">
                  <p className="font-medium">{getDayName(day.day)}</p>
                  <p className="text-lg">{day.icon}</p>
                  <p>{day.high}°/{day.low}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
