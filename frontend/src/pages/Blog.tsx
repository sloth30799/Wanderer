import { Link, useNavigate, useParams } from "react-router-dom"
import {
  IconButton,
  Card,
  CardActions,
  CardMedia,
  CardHeader,
  CardContent,
  Avatar,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import { fromNowFormat } from "../utils/formats"
import BlogSkeleton from "../components/utils/BlogSkeleton"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../services/store"
import { useDispatch } from "react-redux"
import { deleteBackpackingContent } from "../services/features/profile/profileSlice"
import {
  useDeleteBlogMutation,
  useFetchBlogQuery,
  useLikeBlogMutation,
} from "../api/blogApiSlice"

const Blog = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading, isError, refetch } = useFetchBlogQuery(id)
  const [likeBlog] = useLikeBlogMutation()
  const [deleteBlog] = useDeleteBlogMutation()

  if (isLoading) return <BlogSkeleton />
  else if (isError) return <h2>Blog not found!</h2>

  const blog = data.blog

  async function handleLike() {
    await likeBlog(blog._id)
    refetch()
  }

  async function handleDelete() {
    await deleteBlog(blog._id) // api call
    dispatch(deleteBackpackingContent({ category: "blogs", id: blog._id }))
    navigate(-1)
  }

  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/profile/blog"
        relative="path"
        className="no-underline text-black"
      >
        &larr; <span>Back to Blogs</span>
      </Link>
      <Card className="shadow-none">
        <CardHeader
          avatar={
            <Avatar className="bg-scarletRed" aria-label="recipe">
              W
            </Avatar>
          }
          title={blog.title}
          subheader={fromNowFormat(blog.createdAt)}
        />
        <CardMedia component="img" image={blog.image} alt={blog.title} />
        <CardContent>
          <p className="">{blog.caption}</p>
        </CardContent>
        <CardActions className="flex justify-between">
          <div className="flex place-items-center gap-2">
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <ThumbUpIcon className="text-black" />
            </IconButton>
            <span className="text-xl">{blog.likes}</span>
          </div>
          {blog.user === user?._id && (
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon className="text-black" />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </div>
  )
}

export default Blog
