import { wikidataApi } from './api';

// Head of state and head of government, found with a SPARQL query.
// P298 = 3-letter country code, P35 = head of state, P6 = head of government.
export async function getLeaders(alpha3) {
  const query = `
    SELECT ?headLabel ?govLabel WHERE {
      ?country wdt:P298 "${alpha3}".
      OPTIONAL { ?country wdt:P35 ?head. }
      OPTIONAL { ?country wdt:P6 ?gov. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    } LIMIT 1`;
  const response = await wikidataApi.get('/sparql', { params: { query, format: 'json' } });
  const row = response.data.results.bindings[0];
  return {
    // Wikidata can lag behind new elections, so a missing value shows as not available
    headOfState: row?.headLabel?.value ?? null,
    headOfGovernment: row?.govLabel?.value ?? null,
  };
}