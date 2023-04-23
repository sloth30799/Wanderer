import { apiSlice } from "./apiSlice"

export const mainApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProfile: builder.query({
      query: () => "profile",
    }),
    fetchFeed: builder.query({
      query: () => "feed",
    }),
  }),
})

export const { useFetchProfileQuery, useFetchFeedQuery } = mainApiSlice
