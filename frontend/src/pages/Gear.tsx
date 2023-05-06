import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  TextField,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import GearList from "../components/GearList"
import { deleteBackpackingContent } from "../services/features/profile/profileSlice"
import { useDeleteGearMutation } from "../api/gearApiSlice"
import { useSelector } from "react-redux"
import { selectGears } from "../services/store"

const Gear = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const gears = useSelector(selectGears)

  const gear = gears.find((gear) => gear._id === id)

  const [deleteGear] = useDeleteGearMutation()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (gear === undefined) return <h1>Gear Not Found!</h1>

  async function handleDelete() {
    if (gear !== undefined) {
      await deleteGear(gear._id) // api call
      dispatch(deleteBackpackingContent({ category: "gears", id: gear._id }))
      navigate(-1)
    }
  }

  return (
    <div className="flex flex-col">
      <Link
        to="/profile/gear"
        relative="path"
        className="no-underline text-black"
      >
        &larr; <span>Back to Gears</span>
      </Link>
      <div className="flex flex-col items-center tracking-wide">
        <h1>{gear.name}</h1>
        <p>{gear.note}</p>
        <span>Created By {gear.createdBy}</span>
      </div>
      <div className="flex justify-end">
        <IconButton
          className="text-black"
          aria-label="edit"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          className="text-black"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>After editing, click save.</DialogTitle>
          <DialogContent>
            <form className="flex flex-col gap-3 p-1">
              <TextField variant="standard" label="Name" name="name" />
              <TextField
                variant="standard"
                label="Description"
                name="note"
                multiline
                rows={4}
              />
              <Button type="submit" variant="outlined" className="text-teal">
                Add
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <GearList gearData={gear} />
    </div>
  )
}

export default Gear
