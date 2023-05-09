import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  TextField,
  IconButton,
  ToggleButton,
  // Switch,
  // FormControlLabel,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import GearList from "../components/GearList"
import {
  deleteBackpackingContent,
  updateBackpackingContent,
} from "../services/features/profile/profileSlice"
import {
  useDeleteGearMutation,
  useUpdateGearMutation,
} from "../api/gearApiSlice"
import { useSelector } from "react-redux"
import { selectGears } from "../services/store"
import { GearType } from "../types"
import { toast } from "react-hot-toast"

const Gear = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const [updateGearList, { isSuccess }] = useUpdateGearMutation()
  const [deleteGear] = useDeleteGearMutation()

  const gears = useSelector(selectGears) as GearType[]
  const gearData = gears.find((gear) => gear._id === id) as GearType

  const [edit, setEdit] = useState(false)
  const [gear, setGear] = useState(gearData)

  async function handleDelete() {
    await deleteGear(gear._id) // api call
    dispatch(deleteBackpackingContent({ category: "gears", id: gear._id }))
    navigate(-1)
  }

  // async function updateGear() {
  //   await updateGearList({ gear })
  //   dispatch(updateBackpackingContent({ category: "gears", content: gear }))
  //   if (isSuccess) toast.success("Updated!")
  // }

  // async function handleChange() {
  //   await updateGearList({ gear })
  //   dispatch(updateBackpackingContent({ category: "gears", content: gear }))
  //   if (isSuccess) toast.success("Updated!")
  // }

  if (gear === undefined) return <h1>Gear Not Found!</h1>

  return (
    <div className="flex flex-col">
      {/* <Link to="" relative="path" className="no-underline text-black">
        &larr; <span>Back to Gears</span>
      </Link> */}
      <div className="flex flex-col gap-3">
        {edit ? (
          <TextField
            variant="standard"
            label="Name"
            value={gear.name}
            name="name"
            onChange={(e) => setGear({ ...gear, name: e.target.value })}
          />
        ) : (
          <h2 className="my-0 font-title">{gear.name}</h2>
        )}
        {edit ? (
          <TextField
            variant="standard"
            label="Description"
            value={gear.note}
            name="note"
            multiline
            rows={4}
            onChange={(e) => setGear({ ...gear, note: e.target.value })}
          />
        ) : (
          <p className="font-light my-0">{gear.note}</p>
        )}
        <div className="text-black self-end">
          <ToggleButton
            value="check"
            selected={edit}
            onChange={() => {
              setEdit(!edit)
            }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </ToggleButton>
          <IconButton
            aria-label="delete"
            color="inherit"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {/* <FormControlLabel
        control={<Switch />}
        checked={gear.public}
        onChange={updateGear}
        label="Public"
      />
      <FormControlLabel control={<Switch defaultChecked />} label="Template" /> */}
      <GearList gearData={gear} />
    </div>
  )
}

export default Gear
