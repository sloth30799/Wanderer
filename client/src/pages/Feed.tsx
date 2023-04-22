import { Suspense, useState } from "react"
import { Await, defer, useLoaderData } from "react-router-dom"
import PostSkeleton from "../components/PostSkeleton"
import { BlogCard } from "../components/BlogCard"
import { PostType } from "../types"
import { fetchFeed, postLike } from "../api"

interface responseType {
  posts: PostType[]
  success: boolean
}

export function loader() {
  return defer({ feed: fetchFeed() })
}

const Feed = () => {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof fetchFeed>>

  function RenderFeed(res: responseType) {
    const [posts, setPosts] = useState(res.posts)

    const handleLike = async (id: string) => {
      const data = await postLike(id)

      const newPosts = await posts.map((post: PostType) => {
        if (post._id === id) {
          return { ...post, likes: data.data }
        }
        return post
      })
      setPosts(newPosts)
    }

    const postsRender = posts.map((post: PostType) => {
      return <BlogCard key={post._id} post={post} handleLike={handleLike} />
    })
    return postsRender
  }

  return (
    <div className="container m-auto flex flex-col">
      <Suspense fallback={<PostSkeleton />}>
        <Await resolve={loaderData.feed}>{RenderFeed}</Await>
      </Suspense>
    </div>
  )
}

export default Feed
