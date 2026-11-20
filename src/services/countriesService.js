import { countriesApi } from './api';

// Fields the list needs. Asking for only these keeps responses small.
const LIST_FIELDS = 'names.common,codes.alpha_3,codes.alpha_2,capitals,population,flag.url_png,region';

// Turn a v5 country into the simple shape the list screens use.
function simplify(country) {
  const alpha2 = country.codes?.alpha_2;
  const alpha3 = country.codes?.alpha_3;
  const name = country.names?.common;
  return {
    // Some entries have no 3-letter code, so we fall back. The list needs a unique key per row.
    code: alpha3 ?? alpha2 ?? name,
    name,
    capital: country.capitals?.[0]?.name ?? 'N/A',
    population: country.population,
    // Use the API flag, or build the image address from the 2-letter code
    flag:
      country.flag?.url_png ||
      (alpha2 ? `https://flags.restcountries.com/v5/w640/${alpha2.toLowerCase()}.png` : null),
    region: country.region,
  };
}

// v5 returns { data: { objects: [...] } }. Check the shape so a bad response
// becomes an error message instead of a crash. Entries without a name are skipped.
function getObjects(response) {
  const objects = response.data?.data?.objects;
  if (!Array.isArray(objects)) throw new Error('Unexpected response from the countries API');
  return objects.filter((object) => object.names?.common);
}

// The API may return an object, an array, or nothing. Always give back an array.
function toList(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') return Object.values(value);
  return [];
}

// Calling code can come in different shapes, so we handle each one.
function callingCodeText(value) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.length ? String(value[0]) : null;
  if (value.root) return `${value.root}${value.suffixes?.[0] ?? ''}`;
  return null;
}

// Search countries by common name ("niger" returns Niger and Nigeria)
export async function searchCountries(text) {
  try {
    const response = await countriesApi.get('/names.common', {
      params: { q: text, response_fields: LIST_FIELDS, limit: 100 },
    });
    return getObjects(response).map(simplify);
  } catch (error) {
    // Nothing matched is not a real error: return an empty list
    if (error.response && error.response.status === 404) return [];
    throw error;
  }
}

// Every country in a region: "Africa", "Americas", "Asia", "Europe", "Oceania"
export async function getCountriesByRegion(region) {
  const response = await countriesApi.get(`/region/${encodeURIComponent(region)}`, {
    params: { response_fields: LIST_FIELDS, limit: 100 },
  });
  return getObjects(response).map(simplify);
}

// Full details for one country. We ask for the whole object (no response_fields),
// then pick the exact name match, and flatten it into a simple shape.
export async function getCountryDetails(name) {
  const response = await countriesApi.get('/names.common', { params: { q: name, limit: 10 } });
  const objects = getObjects(response);
  const country = objects.find((object) => object.names.common === name) ?? objects[0];
  if (!country) throw new Error('Country not found');

  const base = simplify(country);
  return {
    ...base,
    alpha3: country.codes?.alpha_3,
    officialName: country.names?.official,
    // Capital position is used for the weather call
    lat: country.capitals?.[0]?.coordinates?.lat,
    lng: country.capitals?.[0]?.coordinates?.lng,
    area: country.area?.kilometers ?? (typeof country.area === 'number' ? country.area : null),
    subregion: country.subregion,
    languages: toList(country.languages)
      .map((language) => (typeof language === 'string' ? language : language?.name))
      .filter(Boolean),
    currencies: toList(country.currencies)
      .map((currency) =>
        typeof currency === 'string'
          ? currency
          : `${currency?.name ?? ''}${currency?.symbol ? ` (${currency.symbol})` : ''}`.trim()
      )
      .filter(Boolean),
    timezones: toList(country.timezones)
      .map((zone) => (typeof zone === 'string' ? zone : zone?.name))
      .filter(Boolean),
    callingCode: callingCodeText(country.calling_codes),
  };
}

// Countries that share a border with this one (a reverse lookup by 3-letter code).
// Island countries have none, and any failure just means "no neighbors to show".
export async function getNeighbors(alpha3) {
  if (!alpha3) return [];
  try {
    const response = await countriesApi.get(`/borders/${alpha3}`, {
      params: { response_fields: LIST_FIELDS, limit: 100 },
    });
    return getObjects(response).map(simplify);
  } catch (error) {
    return [];
  }
}