import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getVideos: build.query<VIDEOS.GetResponse, VIDEOS.GetRequest>({
      query: ({ movie_tv, id }) => ({
        url: `/${movie_tv}/${id}/videos
`,
        method: "GET",
      }),
      providesTags: ["videos"],
    }),
  }),
});

export const { useGetVideosQuery } = api;
