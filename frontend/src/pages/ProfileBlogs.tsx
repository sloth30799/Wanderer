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

const ProfileBlogs = () => {
  const blogs: BlogType[] = useSelector(selectBlogs)

  const blogsRender = blogs.map((blog: BlogType) => {
    return (
      <Link to={`/blog/${blog._id}`} key={blog._id} className="no-underline">
        <Card className="max-w-sm shadow-none">
          <CardActionArea>
            <CardMedia
              component="img"
              className="h-48"
              image={blog.image}
              alt={blog.title}
            />
            <CardContent>
              <h3 className="font-bold font-title">{blog.title}</h3>
              <Chip label={blog.tag} color="primary" size="small" />
            </CardContent>
          </CardActionArea>
        </Card>
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
