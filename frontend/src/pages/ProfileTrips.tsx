import {
  CardActionArea,
  CardActions,
  CardContent,
  Card,
  Button,
} from "@mui/material"
import { Link } from "react-router-dom"
import { timeFormat } from "../utils/formats"
import { useSelector } from "react-redux"
import { selectTrips } from "../services/store"
import { TripType } from "../types"

const styles = {
  card: `bg-whiteSmoke rounded-lg text-black`,
  completedText: `text-sm text-brightGreen font-bold font-title`,
  inCompletedText: `text-sm text-brightOrange font-bold font-title`,
}

const ProfileTrips = () => {
  const trips: TripType[] = useSelector(selectTrips)

  const tripsRender = trips.map((trip: TripType) => {
    return (
      <Link to={`/trip/${trip._id}`} key={trip._id} className="no-underline">
        <Card className={styles.card}>
          <CardActionArea>
            <CardContent className="flex flex-col gap-6">
              <h2 className="my-0 font-title">{trip.destination}</h2>
              <span className="text-sm font-title text-tealBlue font-bold">
                {timeFormat(trip.startDate, "LL")} -{" "}
                {timeFormat(trip.endDate, "LL")}
              </span>
              <span
                className={
                  trip.completed ? styles.completedText : styles.inCompletedText
                }
              >
                {trip.completed ? "Journey complete" : "Journey in progress"}
              </span>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  })

  return (
    <main className="flex flex-col my-6 gap-6">
      <Link to="/addTrip" className="place-self-end">
        <Button variant="contained">Start Trip</Button>
      </Link>
      {trips.length < 1 ? (
        <>
          <h3>Start Your Adventure!</h3>
        </>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tripsRender}
        </div>
      )}
    </main>
  )
}

export default ProfileTrips
