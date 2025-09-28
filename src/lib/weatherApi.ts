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

// Mock weather data for demonstration
export const mockWeatherData: WeatherData = {
  location: 'Tunis, Tunisia',
  temperature: 22,
  description: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  icon: '⛅',
  forecast: [
    { day: 'Today', high: 24, low: 18, description: 'Partly Cloudy', icon: '⛅' },
    { day: 'Tomorrow', high: 26, low: 20, description: 'Sunny', icon: '☀️' },
    { day: 'Wednesday', high: 23, low: 17, description: 'Cloudy', icon: '☁️' },
    { day: 'Thursday', high: 25, low: 19, description: 'Sunny', icon: '☀️' },
    { day: 'Friday', high: 21, low: 16, description: 'Rainy', icon: '🌧️' },
    { day: 'Saturday', high: 22, low: 18, description: 'Partly Cloudy', icon: '⛅' },
    { day: 'Sunday', high: 24, low: 19, description: 'Sunny', icon: '☀️' }
  ]
};

export async function getWeatherData(lat?: number, lon?: number): Promise<WeatherData> {
  // In a real implementation, you would call a weather API like OpenWeatherMap
  // For now, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData);
    }, 1000);
  });
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
