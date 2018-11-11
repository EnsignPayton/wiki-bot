import { searchMediaWiki } from './mediaWiki';

const API_URL = 'https://en.wikipedia.org/w/api.php';
const SEARCH_URL = 'https://en.wikipedia.org/wiki/Special:Search?search=';

export const searchWikipedia = searchMediaWiki(API_URL);

export function getWikipediaSearchLink(searchTerm: string): string {
  return SEARCH_URL + encodeURIComponent(searchTerm);
}
