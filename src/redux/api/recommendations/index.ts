import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getRecomend: build.query<RECOMEND.GetResponse, RECOMEND.GetRequest>({
      query: ({ movie_tv, id }) => ({
        url: `/${movie_tv}/${id}/recommendations
`,
        method: "GET",
      }),
      providesTags: ["recommendations"],
    }),
  }),
});

export const { useGetRecomendQuery } = api;
