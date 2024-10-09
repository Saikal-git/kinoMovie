import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getSimilar: build.query<SIMILAR.GetResponse, SIMILAR.GetRequest>({
      query: ({ movie_tv, id }) => ({
        url: `/${movie_tv}/${id}/similar
`,
        method: "GET",
      }),
      providesTags: ["similar"],
    }),
  }),
});

export const { useGetSimilarQuery } = api;
