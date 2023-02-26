import React from "react"
import { Link } from "react-router-dom"
import { useBackpackerContext } from "../../context/BackpackerContext"

const styles = {
  container: `flex flex-col md:flex-row my-3 gap-3`,
  card: ` md:w-1/2 p-3 rounded-lg shadow-md bg-brightGreen hover:bg-paleGreen`,
  cardContent: `flex flex-col gap-3 text-white`,
}

const GearCard = ({ gear }) => {
  return (
    <div className={styles.card}>
      <Link to={`/gear/${gear._id}`} key={gear._id} className="no-underline">
        <div className={styles.cardContent}>
          <span className="font-title">{gear.name}</span>
          <span className="font-span">
            Gears:{" "}
            {gear.equipments.length +
              gear.essentials.length +
              gear.accessories.length}
          </span>
        </div>
      </Link>
    </div>
  )
}

const ProfileGears = () => {
  const { backpacker } = useBackpackerContext()
  const { gears } = backpacker

  const gearsRender = gears.map((gear) => {
    return <GearCard key={gear._id} gear={gear} />
  })

  return <div className={styles.container}>{gearsRender}</div>
}

export default ProfileGears
