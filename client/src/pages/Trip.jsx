import React from "react"
import { useState, useEffect } from "react"
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom"
import { IconButton, Divider, FormControlLabel, Checkbox } from "@mui/material"
import GearDisplay from "../components/GearDisplay"
import DeleteIcon from "@mui/icons-material/Delete"
import { timeFormat } from "../utils/timeFormat"
import { dollarFormat } from "../utils/moneyFormat"
import { useBackpackerContext } from "../context/BackpackerContext"
import Templates from "../components/Templates"
import ProgressSkeleton from "../components/ProgressSkeleton"
import { completedTrip, deleteTrip, fetchTrip } from "../api/api"

const styles = {
  timeText: `text-xs font-pally font-thin text-tealBlue`,
  incompleteTextColor: `text-purple`,
  completedTextColor: `text-brightGreen`,
}

const Trip = () => {
  const { dispatch } = useBackpackerContext()
  const { displayMessage } = useOutletContext()
  const { id } = useParams()
  const navigate = useNavigate()

  const [trip, setTrip] = useState()
  const [gear, setGear] = useState()

  useEffect(() => {
    const getTrip = async () => {
      const data = await fetchTrip(id)
      setTrip(data.trip)
      setGear(data.trip.gear)
    }
    getTrip()
  }, [id])

  if (trip === undefined) return <ProgressSkeleton progress={trip} />
  else if (trip === null) return <h2>Trip not found!</h2>

  const handleCompleted = async (e) => {
    e.preventDefault()
    const data = await completedTrip(trip._id, trip.completed)
    if (data.messages) displayMessage(data.messages)
    setTrip({ ...trip, completed: !trip.completed })
  }

  const handleDelete = async () => {
    const data = await deleteTrip(trip._id) // api call
    dispatch({ type: "DELETE_BACKPACKER", id, dataType: "trips" })
    navigate(-1)
    return data
  }

  const useTemplate = (template) => {
    setGear({
      ...gear,
      equipments: template.equipments,
      essentials: template.essentials,
      accessories: template.accessories,
    })
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
          <FormControlLabel
            control={<Checkbox />}
            label={"Completed"}
            onChange={handleCompleted}
            checked={trip.completed}
          />
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
        <h3 className="text-center">Gear List</h3>
        <Templates useTemplate={useTemplate} />
        <GearDisplay gearData={gear} />
      </div>
    </div>
  )
}

export default Trip
