import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectTrips } from "../services/store"
import { TripType } from "../types"
import TripCard from "../components/TripCard"

const ProfileTrips = () => {
  const trips: TripType[] = useSelector(selectTrips)

  const tripsRender = trips.map((trip: TripType) => {
    return (
      <Link to={`/trip/${trip._id}`} key={trip._id} className="no-underline">
        <TripCard trip={trip} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tripsRender}
        </div>
      )}
    </main>
  )
}

export default ProfileTrips
