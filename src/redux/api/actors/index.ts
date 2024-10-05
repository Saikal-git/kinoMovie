import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getCredits: build.query<CREDITS.GetResponse, CREDITS.GetRequest>({
      query: ({ movie_tv, id }) => ({
        url: `/${movie_tv}/${id}/credits`,
        method: "GET",
      }),
      providesTags: ["credits"],
    }),
  }),
});

export const { useGetCreditsQuery } = api;
