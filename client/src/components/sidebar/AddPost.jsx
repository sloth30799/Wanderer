import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
} from "@mui/material"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"
import { useBackpackerContext } from "../../context/BackpackerContext"

const AddPost = ({ sideBarOpen }) => {
  const { updateBackpackerData } = useBackpackerContext()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  async function makePost(event) {
    event.preventDefault()
    const form = event.currentTarget
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
    const json = await response.json()
    if (json.post) {
      updateBackpackerData(json.post, "posts")
      setOpen(false)
      navigate(`/post/${json.post._id}`)
    }
  }

  // axios img path ??
  // const newPost = async (e) => {
  //   e.preventDefault()
  //   const form = e.currentTarget
  //   const formData = new URLSearchParams(new FormData(form))
  //   try {
  //     const data = await createPost(formData)
  //     if (data.post) navigate(`/post/${data.post._id}`)
  //     setOpen(false)
  //     updateBackpackerData(data.post, "posts")
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: sideBarOpen ? "initial" : "center",
            px: 2.5,
          }}
          onClick={handleClickOpen}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: sideBarOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <CreateOutlinedIcon className="text-black" />
          </ListItemIcon>
          <ListItemText
            primary={"Add a blog!"}
            sx={{ opacity: sideBarOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Add a post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Have to wait a bit after adding. xD
          </DialogContentText>
          <form
            action="/api/post/createPost"
            encType="multipart/form-data"
            method="POST"
            onSubmit={makePost}
            className="flex flex-col gap-6 p-1"
          >
            <TextField
              variant="standard"
              id="title"
              name="title"
              label="Title"
              required
            />
            <TextField
              id="caption"
              name="caption"
              label="Caption"
              multiline
              rows={4}
            />
            <TextField type="file" id="imageUpload" name="file" />
            <DialogActions className="mt-3">
              <Button
                onClick={handleClose}
                variant="outlined"
                className="text-purple border-purple"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                value="Upload"
                variant="outlined"
                className="text-purple border-purple"
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPost
