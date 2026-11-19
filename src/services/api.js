import axios from 'axios';

// Shared Axios instance for the REST Countries API.
// baseURL means we only write the endpoint (like "/name/nigeria") when we call it.
export const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000, // stop waiting after 10 seconds so the app doesn't hang
});

// TODO (Yaa): add one instance per API as you build its service file:
// - weatherApi:  baseURL 'https://api.open-meteo.com/v1'
// - wikiApi:     baseURL 'https://en.wikipedia.org/api/rest_v1'
// - locationApi: baseURL 'https://countriesnow.space/api/v0.1'