import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
import { useUserContext } from "../context/UserContext"
import { fromNowFormat } from "../utils/timeFormat"
import { fetchPost, postDelete, postLike } from "../api/api"
import { useBackpackerContext } from "../context/BackpackerContext"

const Post = () => {
  const { deleteOneData } = useBackpackerContext()
  const { userObject } = useUserContext()
  const navigate = useNavigate()
  const { id } = useParams()

  const [post, setPost] = useState()

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost(id)
      setPost(data.post)
    }
    getPost()
  }, [])

  if (post === undefined) return null
  else if (post === null) return <h2>Post not found!</h2>

  const handleLike = async () => {
    const data = await postLike(post._id)
    setPost({ ...post, likes: data.data })
  }

  const handleDelete = async () => {
    const data = await postDelete(post._id) // api call
    deleteOneData(id, "posts") // update state
    navigate(-1)
    return data
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className="bg-scarletRed" aria-label="recipe">
            W
          </Avatar>
        }
        title={post.title}
        subheader={fromNowFormat(post.createdAt)}
      />
      <CardMedia component="img" image={post.image} alt="Paella dish" />
      <CardContent>
        <p className="font-body">{post.caption}</p>
      </CardContent>
      <CardActions className="flex justify-between">
        <div>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <ThumbUpIcon className="text-black" />
          </IconButton>
          <span>{post.likes}</span>
        </div>
        {post.user === userObject._id && (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon className="text-black" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}

export default Post
