import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMovie: build.query<MOVIE.GetResponse, MOVIE.GetRequest>({
      query: ({ genre, sort }) => ({
        url: `/discover/movie`,
        method: "GET",
        params: {
          with_genres: genre,
          sort_by: sort,
        },
      }),
      providesTags: ["movie"],
    }),
  }),
});

export const { useGetMovieQuery } = api;
