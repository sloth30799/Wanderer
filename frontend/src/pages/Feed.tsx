import { Suspense } from "react"
import { Await, defer, useLoaderData } from "react-router-dom"
import BlogSkeleton from "../components/loading/BlogSkeleton"
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

export function loader() {
  return defer({ feed: fetchFeed() })
}

const Feed = () => {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof fetchFeed>>

  function RenderFeed(res: responseType) {
    const blogs = res.blogs

    const blogsRender = blogs.map((blog: BlogType) => {
      return <BlogCard key={blog._id} blog={blog} />
    })
    return blogsRender
  }

  return (
    <>
      {/* <div className="flex gap-3 items-center border-solid border-0 border-whiteSmoke border-b-2 p-1 mb-6">
        <span className="tracking-wider text-sm text-grey">Filter By City</span>
        <nav className=""></nav>
      </div> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Suspense fallback={<BlogSkeleton />}>
          <Await resolve={loaderData.feed}>{RenderFeed}</Await>
        </Suspense>
      </div>
    </>
  )
}

export default Feed
