import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButtonProps,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { BlogType } from "../types"

type BlogCardProps = {
  blog: BlogType
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate()

  return (
    <Card>
      <CardMedia
        component="img"
        image={blog.image}
        alt={blog.title}
        className="h-48"
        onClick={() => navigate(`/blog/${blog._id}`)}
      />
      <CardContent>
        <h3 className="my-0 font-title">{blog.title}</h3>
        <span className="text-sm">{blog.caption.split(".", 1)[0]}</span>
      </CardContent>
      <CardActions className="p-3">
        <Chip label={blog.tag} color="primary" size="small" />
      </CardActions>
    </Card>
  )
}
