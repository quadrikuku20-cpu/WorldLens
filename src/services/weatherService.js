import { weatherApi } from './api';

// Current weather at a latitude/longitude (we use the capital city's position)
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

// TODO (Yaa): add a 3-day forecast. Add `daily: 'temperature_2m_max,temperature_2m_min'`
// to the params and return the next 3 days. Show them in the weather section.