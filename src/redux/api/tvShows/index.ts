import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTvShows: build.query<TV.GetResponse, TV.GetRequest>({
      query: (genres) => ({
        url: `/discover/tv${
          genres !== "undefined" ? `?with_genres=${genres}` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["tv"],
    }),
  }),
});

export const { useGetTvShowsQuery } = api;
