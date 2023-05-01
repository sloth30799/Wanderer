import { styled } from "@mui/material/styles"
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  IconButtonProps,
} from "@mui/material"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useNavigate } from "react-router-dom"
import { fromNowFormat } from "../utils/formats"
import { useState } from "react"
import { BlogType } from "../types"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

type BlogCardProps = {
  blog: BlogType
  handleLike: (id: string) => Promise<void>
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

export const BlogCard = ({ blog, handleLike }: BlogCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className="w-full shadow-none border-solid border-0 border-b rounded-none p-6">
      <CardHeader
        avatar={
          <Avatar className="bg-scarletRed" aria-label="recipe">
            {blog.user.userName[0]}
          </Avatar>
        }
        title={blog.user.userName}
        subheader={fromNowFormat(blog.createdAt)}
        onClick={() => navigate(`/blog/${blog._id}`)}
        className="hover:cursor-pointer"
      />
      <CardMedia
        component="img"
        image={blog.image}
        alt={blog.title}
        onClick={() => navigate(`/blog/${blog._id}`)}
        className="hover:cursor-pointer rounded-lg  md:h-[500px] object-contain"
      />
      <CardContent>
        <h3 className="my-0">{blog.title}</h3>
        <span className={`${expanded ? "hidden" : ""} font-body`}>
          {blog.caption.split(".", 1)[0]}...
        </span>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <span className="font-body">{blog.caption}</span>
        </CardContent>
      </Collapse>
      <CardActions>
        <div>
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleLike(blog._id)}
          >
            <ThumbUpIcon className="text-black" />
          </IconButton>
          <span>{blog.likes}</span>
        </div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  )
}
