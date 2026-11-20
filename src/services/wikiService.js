import { wikiApi } from './api';

// Short description and photo of a country from Wikipedia
export async function getWikiSummary(title) {
  // Wikipedia page titles use underscores instead of spaces
  const page = encodeURIComponent(title.replace(/ /g, '_'));
  const response = await wikiApi.get(`/page/summary/${page}`);
  return {
    extract: response.data.extract,                       // the description text
    image: response.data.thumbnail?.source ?? null,       // not every page has a photo
    url: response.data.content_urls?.mobile?.page ?? null, // link to the full article
  };
}

// TODO (Yaa): some titles open the wrong page (for example "Georgia" is also a US state).
// If the summary type is 'disambiguation', retry with `${title} (country)`.