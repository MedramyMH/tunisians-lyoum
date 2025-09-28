export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: {
    day: string;
    high: number;
    low: number;
    description: string;
    icon: string;
  }[];
}

interface WeatherAPIResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          code: number;
        };
      };
    }>;
  };
}

const API_KEY = 'ea4abc7de66048e3b8b85049252809';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherData(lat?: number, lon?: number): Promise<WeatherData> {
  try {
    // Use provided coordinates or default to Tunis
    const latitude = lat || 36.8065;
    const longitude = lon || 10.1815;
    
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }
    
    const data: WeatherAPIResponse = await response.json();
    
    return {
      location: `${data.location.name}, ${data.location.country}`,
      temperature: Math.round(data.current.temp_c),
      description: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_kph),
      icon: getWeatherIcon(data.current.condition.code),
      forecast: data.forecast.forecastday.map((day, index) => ({
        day: index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: 'short' }),
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c),
        description: day.day.condition.text,
        icon: getWeatherIcon(day.day.condition.code)
      }))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Fallback to mock data
    return getMockWeatherData();
  }
}

function getWeatherIcon(code: number): string {
  const iconMap: { [key: number]: string } = {
    1000: '☀️', // Sunny
    1003: '⛅', // Partly cloudy
    1006: '☁️', // Cloudy
    1009: '☁️', // Overcast
    1030: '🌫️', // Mist
    1063: '🌦️', // Patchy rain possible
    1066: '🌨️', // Patchy snow possible
    1069: '🌨️', // Patchy sleet possible
    1072: '🌨️', // Patchy freezing drizzle possible
    1087: '⛈️', // Thundery outbreaks possible
    1114: '❄️', // Blowing snow
    1117: '❄️', // Blizzard
    1135: '🌫️', // Fog
    1147: '🌫️', // Freezing fog
    1150: '🌦️', // Patchy light drizzle
    1153: '🌦️', // Light drizzle
    1168: '🌨️', // Freezing drizzle
    1171: '🌨️', // Heavy freezing drizzle
    1180: '🌦️', // Patchy light rain
    1183: '🌧️', // Light rain
    1186: '🌦️', // Moderate rain at times
    1189: '🌧️', // Moderate rain
    1192: '🌧️', // Heavy rain at times
    1195: '🌧️', // Heavy rain
    1198: '🌨️', // Light freezing rain
    1201: '🌨️', // Moderate or heavy freezing rain
    1204: '🌨️', // Light sleet
    1210: '🌨️', // Patchy light snow
    1213: '❄️', // Light snow
    1216: '🌨️', // Patchy moderate snow
    1219: '❄️', // Moderate snow
    1222: '🌨️', // Patchy heavy snow
    1225: '❄️', // Heavy snow
    1237: '🌨️', // Ice pellets
    1240: '🌦️', // Light rain shower
    1243: '🌧️', // Moderate or heavy rain shower
    1246: '🌧️', // Torrential rain shower
    1249: '🌨️', // Light sleet showers
    1252: '🌨️', // Moderate or heavy sleet showers
    1255: '🌨️', // Light snow showers
    1258: '❄️', // Moderate or heavy snow showers
    1261: '🌨️', // Light showers of ice pellets
    1264: '🌨️', // Moderate or heavy showers of ice pellets
    1273: '⛈️', // Patchy light rain with thunder
    1276: '⛈️', // Moderate or heavy rain with thunder
    1279: '⛈️', // Patchy light snow with thunder
    1282: '⛈️'  // Moderate or heavy snow with thunder
  };
  
  return iconMap[code] || '☀️';
}

function getMockWeatherData(): WeatherData {
  return {
    location: 'Tunis, Tunisia',
    temperature: 22,
    description: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: '⛅',
    forecast: [
      { day: 'Today', high: 24, low: 18, description: 'Partly Cloudy', icon: '⛅' },
      { day: 'Tomorrow', high: 26, low: 20, description: 'Sunny', icon: '☀️' },
      { day: 'Wed', high: 23, low: 17, description: 'Cloudy', icon: '☁️' },
      { day: 'Thu', high: 25, low: 19, description: 'Sunny', icon: '☀️' },
      { day: 'Fri', high: 21, low: 16, description: 'Rainy', icon: '🌧️' },
      { day: 'Sat', high: 22, low: 18, description: 'Partly Cloudy', icon: '⛅' },
      { day: 'Sun', high: 24, low: 19, description: 'Sunny', icon: '☀️' }
    ]
  };
}

export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        // Fallback to Tunis coordinates
        resolve({ lat: 36.8065, lon: 10.1815 });
      }
    );
  });
}

