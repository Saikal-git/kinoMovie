import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getSearchResult: build.query<SEARCH.GetResponse, SEARCH.GetRequest>({
      query: (query) => ({
        url: `search/multi?query=${query}`,
        method: "GET",
      }),
    }),
  }),
  
});

export const { useGetSearchResultQuery } = api;

