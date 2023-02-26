import React from "react"
import {
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material"
import { Link } from "react-router-dom"
import { useBackpackerContext } from "../../context/BackpackerContext"
import { timeFormat } from "../../utils/timeFormat"

const styles = {
  container: `container my-6 m-auto flex flex-wrap justify-center gap-6`,
  card: `max-w-sm rounded-lg`,
  timeText: `text-xs font-pally font-thin text-tealBlue`,
  completedText: `text-sm font-thin text-brightGreen`,
  inCompletedText: `text-sm font-thin text-purple`,
}

const ProfileTrips = () => {
  const { backpacker } = useBackpackerContext()

  const { trips } = backpacker

  const tripsRender = trips.map((trip) => {
    return (
      <Link to={`/trip/${trip._id}`} key={trip._id} className="no-underline">
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={"https://i.imgur.com/MO9NEVF.png"}
              alt={"beaver"}
            />
            <CardContent>
              <h2>{trip.destination}</h2>
              <span className={styles.timeText}>
                {timeFormat(trip.startDate, "LL")} -{" "}
                {timeFormat(trip.endDate, "LL")}
              </span>
            </CardContent>
          </CardActionArea>
          <CardActions className="flex justify-between p-3">
            <span
              className={
                trip.completed ? styles.completedText : styles.inCompletedText
              }
            >
              {trip.completed ? "Journey complete" : "Journey in progress"}
            </span>
          </CardActions>
        </Card>
      </Link>
    )
  })

  return <main className={styles.container}>{tripsRender}</main>
}

export default ProfileTrips
