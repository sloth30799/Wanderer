import { Button, DialogActions, TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { addBackpackingContent } from "../services/features/profile/profileSlice"
import { useNavigate } from "react-router-dom"
import { useAddBlogMutation } from "../api/blogApiSlice"
import { Link } from "react-router-dom"

const AddBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [createBlog, { isLoading }] = useAddBlogMutation()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const { data }: any = await createBlog(formData)
      if (data.blog) {
        dispatch(
          addBackpackingContent({ category: "blogs", content: data.blog })
        )
        navigate(`/blog/${data.blog._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container m-auto">
      <Link
        to="/profile/blog"
        relative="path"
        className="no-underline text-black"
      >
        &larr; <span className="text-xs">Back</span>
      </Link>
      <h1 className="font-title text-xl text-deepBlue font-extrabold">
        Write Blog
      </h1>
      <form
        action="/api/blog/createBlog"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <TextField
          variant="standard"
          id="title"
          name="title"
          label="Title"
          required
        />
        <TextField
          variant="standard"
          id="tag"
          name="tag"
          label="Tag"
          placeholder="Eg. New Zealand"
          required
        />
        <TextField
          id="caption"
          name="caption"
          label="Caption"
          multiline
          rows={8}
        />
        <TextField type="file" id="imageUpload" name="file" required />
        <DialogActions className="mt-3">
          <Button
            type="submit"
            value="Upload"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Adding" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </div>
  )
}

export default AddBlog
