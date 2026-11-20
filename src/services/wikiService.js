import { wikiApi } from './api';

// Short description and photo of a country from Wikipedia
export async function getWikiSummary(title) {
  // Wikipedia page titles use underscores instead of spaces
  const load = (pageTitle) => wikiApi.get(`/page/summary/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`);

  let response = await load(title);
  // Some names open the wrong page (for example "Georgia" can mean the US state).
  // When Wikipedia says the page is ambiguous, ask for the country page instead.
  if (response.data.type === 'disambiguation') {
    response = await load(`${title} (country)`);
  }

  return {
    extract: response.data.extract,                          // the description text
    image: response.data.thumbnail?.source ?? null,          // not every page has a photo
    url: response.data.content_urls?.mobile?.page ?? null,   // link to the full article
  };
}