import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getUpcoming: builder.query<UPCOMING.GetResponse, UPCOMING.GetRequest>({
      query: () => ({
        url: "/movie/upcoming",
        method: "GET",
      }),
      providesTags: ["upcoming"],
    }),
  }),
});

export const { useGetUpcomingQuery } = api;
