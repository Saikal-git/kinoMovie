import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getDetails: build.query<DETAILS.GetResponse, DETAILS.GetRequest>({
      query: ({ movie_tv, id }) => ({
        url: `/${movie_tv}/${id}`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
  }),
});

export const { useGetDetailsQuery } = api;
