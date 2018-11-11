import Axios from 'axios';

const SEARCH_PARAMS = {
  action: 'query',
  list: 'search',
  format: 'json',
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
