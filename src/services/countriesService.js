import { countriesApi } from './api';

// Ask the API for only the fields the list needs. This keeps responses small.
// capitals is an array of objects, flag.url_png is the flag image address.
const LIST_FIELDS = 'names.common,codes.alpha_3,capitals,population,flag.url_png,region';

// Convert one v5 country object into the simple shape our screens use.
// If the API ever changes its format again, this is the only place to fix.
function simplify(country) {
  return {
    code: country.codes?.alpha_3,
    name: country.names?.common,
    capital: country.capitals?.[0]?.name ?? 'N/A', // some countries have no capital
    population: country.population,
    flag: country.flag?.url_png,
    region: country.region,
  };
}

// v5 returns { data: { objects: [...] } }. Check the shape before using it,
// so a bad response becomes an error message instead of a crash.
function getObjects(response) {
  const objects = response.data?.data?.objects;
  if (!Array.isArray(objects)) throw new Error('Unexpected response from the countries API');
  return objects;
}

// Search countries by common name. Partial matches work ("niger" returns Niger and Nigeria).
export async function searchCountries(text) {
  try {
    const response = await countriesApi.get('/names.common', {
      params: { q: text, response_fields: LIST_FIELDS, limit: 100 },
    });
    return getObjects(response).map(simplify);
  } catch (error) {
    // Nothing matched is not a real error, so we return an empty list
    // and the screen shows "No countries found".
    if (error.response && error.response.status === 404) return [];
    throw error; // no internet, bad key, or too many requests go to the caller
  }
}

// Get every country in a region: "Africa", "Americas", "Asia", "Europe", "Oceania".
// The free plan allows up to 100 per request, which covers every region.
export async function getCountriesByRegion(region) {
  const response = await countriesApi.get(`/region/${encodeURIComponent(region)}`, {
    params: { response_fields: LIST_FIELDS, limit: 100 },
  });
  return getObjects(response).map(simplify);
}

// TODO (Yaa): getCountryDetails(name)
// Call `/names.common/${encodeURIComponent(name)}` (an exact match) and return
// getObjects(response)[0]. Use response_fields to ask for only what the profile needs:
// 'names,capitals,population,area.kilometers,subregion,languages,currencies,
//  timezones,borders,calling_codes,flag.url_png,coordinates,codes.alpha_3'.
// Note: capitals[0].coordinates gives the latitude/longitude for the weather call.

// TODO (Yaa): getNeighbors(alpha3)
// Call `/borders/${alpha3}` (a reverse lookup: it returns the countries that border
// this one) with response_fields 'names.common,codes.alpha_3,flag.url_png',
// and return getObjects(response).map(simplify). Return [] if there are no borders.