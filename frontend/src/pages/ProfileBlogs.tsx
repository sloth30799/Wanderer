import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Button,
  Chip,
} from "@mui/material"
import { BlogType } from "../types"
import { selectBlogs } from "../services/store"
import { BlogCard } from "../components/BlogCard"

const ProfileBlogs = () => {
  const blogs: BlogType[] = useSelector(selectBlogs)

  const blogsRender = blogs.map((blog: BlogType) => {
    return (
      <Link to={`/blog/${blog._id}`} key={blog._id} className="no-underline">
        <BlogCard blog={blog} />
      </Link>
    )
  })

  return (
    <main className="flex flex-col my-6 gap-6">
      <Link to="/addBlog" className="place-self-end">
        <Button variant="contained">Make Blog</Button>
      </Link>
      {blogs.length < 1 ? (
        <>
          <h3>Share Your Experience with others!</h3>
        </>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {blogsRender}
        </div>
      )}
    </main>
  )
}

export default ProfileBlogs
