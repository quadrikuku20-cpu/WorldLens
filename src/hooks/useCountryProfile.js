import useApiData from './useApiData';
import { getCountryDetails, getNeighbors } from '../services/countriesService';
import { getCurrentWeather } from '../services/weatherService';
import { getWikiSummary } from '../services/wikiService';
import { getLeaders } from '../services/wikidataService';
import { getStates } from '../services/locationService';

// Loads every section of the profile page. Each section has its own useApiData,
// so each one has its own loading and error state, and one failure never breaks the rest.
export default function useCountryProfile(name) {
  const country = useApiData(() => getCountryDetails(name), [name]);

  // Values from the country details that the other sections need
  const info = country.data;
  const alpha3 = info?.alpha3;
  const lat = info?.lat;
  const lng = info?.lng;

  const wiki = useApiData(() => getWikiSummary(name), [name]);
  const states = useApiData(() => getStates(name), [name]);
  // These wait for the country details (they return null until the values are ready)
  const weather = useApiData(() => (lat != null ? getCurrentWeather(lat, lng) : Promise.resolve(null)), [lat, lng]);
  const leaders = useApiData(() => (alpha3 ? getLeaders(alpha3) : Promise.resolve(null)), [alpha3]);
  const neighbors = useApiData(() => getNeighbors(alpha3), [alpha3]);

  return { country, wiki, weather, leaders, states, neighbors };
}