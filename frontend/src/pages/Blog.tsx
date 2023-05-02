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
import { fromNowFormat, timeFormat } from "../utils/formats"
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
      <div className="grid lg:grid-cols-2 justify-items-stretch my-6 gap-6">
        <div>
          <span className="text-grey text-xs uppercase">
            PUBLISHED {timeFormat(blog.createdAt, "MMM Do YY")}
          </span>
          <h1 className="font-title font-bold text-4xl">{blog.title}</h1>
          <div className="flex gap-3 items-center">
            <Avatar className="bg-goldenOrange" aria-label="recipe">
              {blog.user.userName[0].toUpperCase()}
            </Avatar>
            <h1 className="text-sm font-bold">{blog.user.userName}</h1>
          </div>
        </div>
        <img src={blog.image} alt={blog.title} className="h-96" />
      </div>
      <div className="flex flex-col gap-6">
        <p className="">{blog.caption}</p>
        <div className="flex justify-between">
          <IconButton
            aria-label="add to favorites"
            onClick={handleLike}
            className="flex gap-3 text-black"
          >
            <ThumbUpIcon />
            <span className="text-xl">{blog.likes}</span>
          </IconButton>
          {blog.user._id === user?._id && (
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon className="text-black" />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
