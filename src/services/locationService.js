import { locationApi } from './api';

// All states or provinces of a country. Each item looks like { name, state_code }.
export async function getStates(country) {
  const response = await locationApi.post('/countries/states', { country });
  return response.data?.data?.states ?? [];
}

// All cities of one state. Use the state name exactly as getStates returned it.
export async function getCities(country, state) {
  const response = await locationApi.post('/countries/state/cities', { country, state });
  return response.data?.data ?? [];
}

// TODO (Yaa): test both functions with Nigeria and Canada (console.log the result).
// This API sometimes answers with { error: true, msg: '...' }. Handle that case
// by returning an empty array so the screen can show "No cities found".