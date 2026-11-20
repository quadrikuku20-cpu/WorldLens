import { weatherApi } from './api';

// Current weather at a position (we use the capital city's latitude and longitude)
export async function getCurrentWeather(latitude, longitude) {
  const response = await weatherApi.get('/forecast', {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    },
  });
  const current = response.data.current;
  return {
    temperature: Math.round(current.temperature_2m), // degrees Celsius
    humidity: current.relative_humidity_2m,          // percent
    windSpeed: current.wind_speed_10m,               // km/h
    code: current.weather_code,                      // turned into words by weatherDescription()
  };
}