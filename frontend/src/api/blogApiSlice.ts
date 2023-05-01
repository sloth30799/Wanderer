import { apiSlice } from "./apiSlice"

const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBlog: builder.query({
      query: (blogId) => `blog/${blogId}`,
    }),
    addBlog: builder.mutation({
      query: (formData) => ({
        url: "blog/createBlog",
        method: "POST",
        body: formData,
      }),
    }),
    likeBlog: builder.mutation({
      query: (id) => ({
        url: `blog/likeBlog/${id}`,
        method: "PUT",
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blog/deleteBlog/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useFetchBlogQuery,
  useLikeBlogMutation,
} = blogApiSlice
