import axios from 'axios';

// The API key is read from the .env file, so it is never written in the code
// or pushed to GitHub. Expo exposes variables that start with EXPO_PUBLIC_.
const API_KEY = process.env.EXPO_PUBLIC_RESTCOUNTRIES_KEY;

// Shared Axios instance for the REST Countries v5 API.
// Every request automatically carries our key in the Authorization header.
export const countriesApi = axios.create({
  baseURL: 'https://api.restcountries.com/countries/v5',
  timeout: 10000, // stop waiting after 10 seconds so the app doesn't hang
  headers: { Authorization: `Bearer ${API_KEY}` },
});

// TODO (Yaa): add one instance per API as you build its service file:
// - weatherApi:  baseURL 'https://api.open-meteo.com/v1'
// - wikiApi:     baseURL 'https://en.wikipedia.org/api/rest_v1'
// - locationApi: baseURL 'https://countriesnow.space/api/v0.1'