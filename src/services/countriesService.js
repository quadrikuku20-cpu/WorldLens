import { countriesApi } from './api';

// The list screen only needs a few fields, so we ask the API for just those.
// This keeps the response small and fast.
const LIST_FIELDS = 'name,capital,population,flags,cca3,region';

// Search countries by name. Partial matches work ("niger" returns Niger and Nigeria).
export async function searchCountries(text) {
  try {
    const response = await countriesApi.get(`/name/${encodeURIComponent(text)}`, {
      params: { fields: LIST_FIELDS },
    });
    return response.data; // an array of countries
  } catch (error) {
    // The API answers 404 when nothing matches. That is not a real error,
    // so we return an empty list and let the screen show "No countries found".
    if (error.response && error.response.status === 404) return [];
    throw error; // anything else (no internet, timeout) is passed to the caller
  }
}

// Get every country in a region: "africa", "americas", "asia", "europe", "oceania"
export async function getCountriesByRegion(region) {
  const response = await countriesApi.get(`/region/${encodeURIComponent(region.toLowerCase())}`, {
    params: { fields: LIST_FIELDS },
  });
  return response.data;
}

// TODO (Yaa): getCountryDetails(name)
// Call `/name/${name}` with params { fullText: true } so only the exact country is returned.
// The response is an array, so return response.data[0].
// The profile screen needs: capital, capitalInfo, population, area, subregion,
// languages, currencies, timezones, borders, idd, flags, latlng.

// TODO (Yaa): getCountriesByCodes(codes)
// Neighbors come as short codes like ["BEN", "NER"]. Call `/alpha` with
// params { codes: codes.join(','), fields: 'name,cca3,flags' }.
// If the array is empty (an island country), return [] without calling the API.