import axios from 'axios';

// The key is read from .env, so it is never written in the code or pushed to GitHub
const API_KEY = process.env.EXPO_PUBLIC_RESTCOUNTRIES_KEY;

// REST Countries v5: country facts (needs the key)
export const countriesApi = axios.create({
  baseURL: 'https://api.restcountries.com/countries/v5',
  timeout: 10000, // stop waiting after 10 seconds so the app doesn't hang
  headers: { Authorization: `Bearer ${API_KEY}` },
});

// The APIs below need no key
// Open-Meteo: current weather
export const weatherApi = axios.create({ baseURL: 'https://api.open-meteo.com/v1', timeout: 10000 });
// Wikipedia: the description and photo
export const wikiApi = axios.create({ baseURL: 'https://en.wikipedia.org/api/rest_v1', timeout: 10000 });
// Wikidata: leaders (SPARQL queries can be slow, so a longer timeout)
export const wikidataApi = axios.create({ baseURL: 'https://query.wikidata.org', timeout: 15000 });
// CountriesNow: states, provinces, and cities
export const locationApi = axios.create({ baseURL: 'https://countriesnow.space/api/v0.1', timeout: 15000 });