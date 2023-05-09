import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { IconButton, Divider } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Templates from "../components/TemplatesBox"
import GearList from "../components/GearList"
import { GearType } from "../types"
import { timeFormat } from "../utils/formats"
import { dollarFormat } from "../utils/formats"
import {
  chooseTemplate,
  deleteBackpackingContent,
  updateBackpackingContent,
} from "../services/features/profile/profileSlice"
import {
  useCompletedTripMutation,
  useDeleteTripMutation,
} from "../api/tripApiSlice"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { selectGears, selectTrips } from "../services/store"
import { useUpdateGearMutation } from "../api/gearApiSlice"

const styles = {
  timeText: `text-xs font-pally font-thin text-tealBlue`,
  incompleteTextColor: `text-brightOrange`,
  completedTextColor: `text-brightGreen`,
}

const Trip = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [edit, setEdit] = useState(false)

  const trips = useSelector(selectTrips)
  const trip = trips.find((trip) => trip._id === id)

  const gears = useSelector(selectGears)
  const gear = gears.find((gear) => gear._id === trip?.gear._id)

  const [completedTrip] = useCompletedTripMutation()
  const [deleteTrip, { isSuccess: deleteSuccess }] = useDeleteTripMutation()
  const [updateGearList] = useUpdateGearMutation()

  if (trip === undefined) return <h2>Trip not Found!</h2>
  if (gear === undefined) return <h2>Gear not Found!</h2>

  async function handleCompleted() {
    if (trip !== undefined) {
      await completedTrip({
        id: trip._id,
        completed: trip.completed,
      })
      dispatch(updateBackpackingContent({ category: "trips", content: trip }))
      toast.success("Updated")
    }
  }

  const handleDelete = async () => {
    await deleteTrip(trip._id) // api call
    dispatch(deleteBackpackingContent({ category: "trips", id: trip._id }))
    if (deleteSuccess) toast.success("Deleted")
    navigate(-1)
  }

  const loadTemplate = async (template: GearType) => {
    await updateGearList({ gear })
    if (gear !== undefined) dispatch(chooseTemplate({ id: trip._id, template }))
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Link
          to="/profile/trip"
          relative="path"
          className="no-underline text-black"
        >
          &larr; <span>Back to Trips</span>
        </Link>
        <div className="flex flex-col">
          <h2 className="my-0">{trip.destination}</h2>
          <span className={styles.timeText}>
            {timeFormat(trip.startDate, "LL")} -{" "}
            {timeFormat(trip.endDate, "LL")}
          </span>
          <span
            className={`text-sm font-thin ${
              trip.completed
                ? styles.completedTextColor
                : styles.incompleteTextColor
            }`}
          >
            {trip.completed ? "Journey complete" : "Journey in progress"}
          </span>
        </div>
        <p className="text-lg tracking-wide my-3">
          <strong>Notes: </strong>
          {trip.note}
        </p>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="font-medium">Budget</span>
            <span className="tracking-wide tracking-widest">
              {dollarFormat(trip.budget)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{trip.accommodations.name}</span>
            <span className="tracking-wide tracking-widest">
              {dollarFormat(trip.accommodations.cost)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{trip.transportation.name}</span>
            <span className="tracking-widest">
              {dollarFormat(trip.transportation.cost)}
            </span>
          </div>
          <Divider className="my-1" />
          <div className="flex justify-between">
            <span className="font-medium">Remaining</span>
            <span className="tracking-widest">
              {dollarFormat(
                trip.budget -
                  trip.accommodations.cost -
                  trip.transportation.cost
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          {/* <FormControlLabel
            control={<Switch />}
            label={"Completed"}
            onChange={handleCompleted}
            checked={trip.completed}
          /> */}
          <IconButton
            aria-label="delete"
            className="place-self-end text-black"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-3">
        <Templates loadTemplate={loadTemplate} />
        {gear ? <GearList gearData={gear} /> : <h1>No gear List</h1>}
      </div>
    </div>
  )
}

export default Trip
