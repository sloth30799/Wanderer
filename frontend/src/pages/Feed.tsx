import { Suspense, useState } from "react"
import { Await, defer, useLoaderData } from "react-router-dom"
import BlogSkeleton from "../components/utils/BlogSkeleton"
import { BlogCard } from "../components/BlogCard"
import { BlogType } from "../types"
import { api } from "../lib/axios"

interface responseType {
  blogs: BlogType[]
  success: boolean
}

async function fetchFeed() {
  const { data } = await api.get("/api/feed")
  return data
}

async function postLike(id: string) {
  const { data } = await api.put(`/api/blog/likeBlog/${id}`)
  return data
}

export function loader() {
  return defer({ feed: fetchFeed() })
}

const Feed = () => {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof fetchFeed>>

  function RenderFeed(res: responseType) {
    const [blogs, setBlogs] = useState(res.blogs)

    const handleLike = async (id: string) => {
      const data = await postLike(id)

      const newBlogs = await blogs.map((blog: BlogType) => {
        if (blog._id === id) {
          return { ...blog, likes: data.data }
        }
        return blog
      })
      setBlogs(newBlogs)
    }

    const blogsRender = blogs.map((blog: BlogType) => {
      return <BlogCard key={blog._id} blog={blog} handleLike={handleLike} />
    })
    return blogsRender
  }

  return (
    <div className="container m-auto flex flex-col">
      <Suspense fallback={<BlogSkeleton />}>
        <Await resolve={loaderData.feed}>{RenderFeed}</Await>
      </Suspense>
    </div>
  )
}

export default Feed
