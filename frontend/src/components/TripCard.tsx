import { TripType } from "../types"
import { timeFormat } from "../utils/formats"

type TripCardProps = {
  trip: TripType
}

const styles = {
  completedText: `text-xs tracking-tight p-2 text-center bg-brightGreen text-white rounded-lg`,
  inCompletedText: `text-xs tracking-tight p-2 text-center bg-deepBlue text-white rounded-lg`,
}

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <div className="rounded-lg text-black p-3 shadow-black border-solid border-black border">
      <div className="grid items-center gap-3">
        <div>
          <span className="text-xs font-title text-grey uppercase">
            {timeFormat(trip.startDate, "LL")} -{" "}
            {timeFormat(trip.endDate, "LL")}
          </span>
          <h2 className="my-0 font-title text-xl">{trip.destination}</h2>
        </div>
        <span
          className={
            trip.completed ? styles.completedText : styles.inCompletedText
          }
        >
          {trip.completed ? "Completed" : "In progress"}
        </span>
      </div>
    </div>
  )
}

export default TripCard
