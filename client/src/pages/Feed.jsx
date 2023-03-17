import React, { Suspense } from "react"
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
} from "@mui/material"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom"
import { fetchFeed, postLike } from "../api/api"
import { fromNowFormat } from "../utils/timeFormat"
import { useState } from "react"
import PostSkeleton from "../components/PostSkeleton"

export function loader() {
  return defer({ feed: fetchFeed() })
}

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

const PostCard = ({ post, handleLike }) => {
  const [expanded, setExpanded] = React.useState(false)
  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className="w-full shadow-none border-solid border-0 border-b rounded-none p-6">
      <CardHeader
        avatar={
          <Avatar className="bg-scarletRed" aria-label="recipe">
            {post.user.userName[0]}
          </Avatar>
        }
        title={post.user.userName}
        subheader={fromNowFormat(post.createdAt)}
        onClick={() => navigate(`/post/${post._id}`)}
        className="hover:cursor-pointer"
      />
      <CardMedia
        component="img"
        image={post.image}
        alt={post.title}
        onClick={() => navigate(`/post/${post._id}`)}
        className="hover:cursor-pointer rounded-lg  md:h-[500px] object-contain"
      />
      <CardContent>
        <h3 className="my-0">{post.title}</h3>
        <span className={`${expanded ? "hidden" : ""} font-body`}>
          {post.caption.split(".", 1)[0]}...
        </span>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <span className="font-body">{post.caption}</span>
        </CardContent>
      </Collapse>
      <CardActions>
        <div>
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleLike(post._id)}
          >
            <ThumbUpIcon className="text-black" />
          </IconButton>
          <span>{post.likes}</span>
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

const Feed = () => {
  const loaderData = useLoaderData()

  function renderFeed(res) {
    const [posts, setPosts] = useState(res.posts)

    const handleLike = async (id) => {
      const data = await postLike(id)
      const newPosts = await posts.map((post) => {
        if (post._id === id) {
          return { ...post, likes: data.data }
        }
        return post
      })
      setPosts(newPosts)
    }
    const postsRender = posts.map((post) => {
      return <PostCard key={post._id} post={post} handleLike={handleLike} />
    })
    return postsRender
  }

  return (
    <div className="container m-auto flex flex-col">
      <Suspense fallback={<PostSkeleton />}>
        <Await resolve={loaderData.feed}>{renderFeed}</Await>
      </Suspense>
    </div>
  )
}

export default Feed
