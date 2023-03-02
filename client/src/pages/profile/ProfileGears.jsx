import React from "react"
import { Link } from "react-router-dom"
import { useBackpackerContext } from "../../context/BackpackerContext"

const styles = {
  container: `container my-6 m-auto flex flex-col justify-center`,
  row: `flex space-between text-whit border-solid border-0 border-b border-black text-purple hover:bg-whiteSmoke`,
  name: `w-1/2 md:w-1/4 text-center m-0 p-1 font-bold`,
  mobileColumn: `w-1/2 text-center m-0 p-1 md:hidden`,
  column: `hidden w-1/2 text-center m-0 p-1 md:w-1/4 md:block`,
}

const GearCard = ({ gear }) => {
  return (
    <Link to={`/gear/${gear._id}`} key={gear._id} className="no-underline">
      <div className={styles.row}>
        <p className={styles.name}>{gear.name}</p>
        <p className={styles.mobileColumn}>
          {gear.equipments.length +
            gear.essentials.length +
            gear.accessories.length}
        </p>
        <p className={styles.column}>{gear.equipments.length}</p>
        <p className={styles.column}>{gear.essentials.length}</p>
        <p className={styles.column}>{gear.accessories.length}</p>
      </div>
    </Link>
  )
}

const ProfileGears = () => {
  const { backpacker } = useBackpackerContext()

  if (backpacker === undefined) return null
  else if (backpacker === null) return <h2>Data not found!</h2>

  const { gears } = backpacker

  if (gears.length < 1) return <h2>Create a template!</h2>

  const gearsRender = gears.map((gear) => {
    return <GearCard key={gear._id} gear={gear} />
  })

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <p className={styles.name}></p>
        <p className={styles.mobileColumn}>Gears</p>
        <p className={styles.column}>Equipments</p>
        <p className={styles.column}>Essentials</p>
        <p className={styles.column}>Accessories</p>
      </div>
      {gearsRender}
    </div>
  )
}

export default ProfileGears
