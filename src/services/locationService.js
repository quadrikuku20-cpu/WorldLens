import { locationApi } from './api';

// All states or provinces of a country. Each item looks like { name, state_code }.
export async function getStates(country) {
  try {
    const response = await locationApi.post('/countries/states', { country });
    return response.data?.data?.states ?? [];
  } catch (error) {
    // This API answers with an error when it doesn't know the country: show an empty list
    return [];
  }
}

// All cities of one state. The state name must match what getStates returned.
export async function getCities(country, state) {
  try {
    const response = await locationApi.post('/countries/state/cities', { country, state });
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    return [];
  }
}