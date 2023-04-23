import { apiSlice } from "./apiSlice"

const tempateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllTemplates: builder.query({
      query: () => "template/AllTemplates",
    }),
    addTemplate: builder.mutation({
      query: () => ({
        url: "template/createGearTemplate",
        method: "POST",
      }),
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `template/deleteGearTemplate/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useFetchAllTemplatesQuery,
} = tempateApiSlice
