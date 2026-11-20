// Population with commas, or "N/A" when missing
export function formatPopulation(number) {
  return number == null ? 'N/A' : number.toLocaleString();
}

// Area in square kilometers
export function formatArea(km) {
  return km == null ? 'N/A' : `${Math.round(km).toLocaleString()} km²`;
}

// Turn the weather code from Open-Meteo into words
export function weatherDescription(code) {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code === 45 || code === 48) return 'Fog';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Unknown';
}