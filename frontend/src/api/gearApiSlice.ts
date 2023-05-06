import { apiSlice } from "./apiSlice"

const gearApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchGear: builder.query({
      query: (gearId) => `gear/${gearId}`,
    }),
    fetchTemplates: builder.query<any, void>({
      query: () => "gear/fetchTemplates",
    }),
    addGear: builder.mutation<any, void>({
      query: () => ({
        url: `gear/createGear`,
        method: "POST",
      }),
    }),
    updateGear: builder.mutation({
      query: ({ gear }) => ({
        url: `gear/updateGear`,
        method: "PUT",
        body: gear,
      }),
    }),
    deleteGear: builder.mutation<any, string>({
      query: (id) => ({
        url: `gear/deleteGear/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useFetchGearQuery,
  useFetchTemplatesQuery,
  useAddGearMutation,
  useUpdateGearMutation,
  useDeleteGearMutation,
} = gearApiSlice
