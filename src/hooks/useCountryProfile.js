import useApiData from './useApiData';
import { getCountryDetails } from '../services/countriesService';
import { getCurrentWeather } from '../services/weatherService';
import { getWikiSummary } from '../services/wikiService';
import { getLeaders } from '../services/wikidataService';
import { getStates } from '../services/locationService';

// Loads every section of the profile page. Each section uses its own useApiData,
// so each one has its own loading and error state and one failure never breaks the rest.
export default function useCountryProfile(name) {
  const country = useApiData(() => getCountryDetails(name), [name]);

  // Values from the country details, needed by the other sections
  const info = country.data;
  const alpha3 = info?.codes?.alpha_3;
  // TODO (Yaa): console.log(info.capitals) to see the exact names of the coordinate fields,
  // then fix these two lines.
  const lat = info?.capitals?.[0]?.coordinates?.lat;
  const lng = info?.capitals?.[0]?.coordinates?.lng;

  const wiki = useApiData(() => getWikiSummary(name), [name]);
  // Wait for the country details before asking for these (return null until ready)
  const weather = useApiData(() => (lat != null ? getCurrentWeather(lat, lng) : Promise.resolve(null)), [lat, lng]);
  const leaders = useApiData(() => (alpha3 ? getLeaders(alpha3) : Promise.resolve(null)), [alpha3]);
  const states = useApiData(() => getStates(name), [name]);

  return { country, wiki, weather, leaders, states };
}

// TODO (Yaa): add neighbors with getNeighbors(alpha3) from countriesService.