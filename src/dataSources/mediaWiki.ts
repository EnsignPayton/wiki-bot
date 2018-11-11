import Axios from 'axios';

const SEARCH_PARAMS = {
  action: 'query',
  list: 'search',
  format: 'json',
  srnamespace: '*',
};

export interface MediaWikiSearchResult {
  title: string;
  snippet: string;
}

export type MediaWikiSearch = (searchTerm: string) => Promise<MediaWikiSearchResult[]>;

export function searchMediaWiki(apiUrl: string): MediaWikiSearch {
  return async (searchTerm: string) => {
    const result = await Axios.get(apiUrl, {
      params: {
        ...SEARCH_PARAMS,
        srsearch: searchTerm,
      },
    });

    if (!result.data) {
      throw new Error('No Data');
    }

    return result.data.query.search.map((sr: MediaWikiSearchResult) => {
      return {
        title: sr.title,
        snippet: sr.snippet.replace(/<[^>]*>/gm, ''),
      };
    });
  };
}

export function getMediaWikiSearchLink(searchUrl: string) {
  return (searchTerm: string) => searchUrl + encodeURIComponent(searchTerm);
}

export interface Source {
  name: string;
  search: MediaWikiSearch;
  link: (searchTerm: string) => string;
  color: number;
}

export interface SourceDictionary {
  [key: string]: Source;
}

export const mediaWikiSources: SourceDictionary = {
  uesp: {
    name: 'UESP',
    search: searchMediaWiki('https://en.uesp.net/w/api.php'),
    link: getMediaWikiSearchLink('https://en.uesp.net/wiki/Special:Search?search='),
    color: 0x884422,
  },
  wikipedia: {
    name: 'Wikipedia',
    search: searchMediaWiki('https://en.wikipedia.org/w/api.php'),
    link: getMediaWikiSearchLink('https://en.wikipedia.org/wiki/Special:Search?search='),
    color: 0x444488,
  },
};
