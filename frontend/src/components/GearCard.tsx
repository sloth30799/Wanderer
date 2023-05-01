import { Card, CardActionArea, CardContent, Chip } from "@mui/material"
import { GearType } from "../types"

type GearCardProps = {
  gear: GearType
}

const GearCard = ({ gear }: GearCardProps) => {
  return (
    <div className="font-title">
      <div className="bg-deepBlue text-white rounded-t-lg p-3">
        <h3 className="font-bold my-0">{gear.name}</h3>
      </div>
      <div className="bg-whiteSmoke text-deepBlue font-bold grid grid-cols-3 gap-3 py-3">
        <span className="flex flex-col gap-2 items-center text-sm">
          Equipments
          <Chip label={gear.equipments.length} color="info" size="small" />
        </span>
        <span className="flex flex-col gap-2 items-center text-sm">
          Accessories
          <Chip label={gear.accessories.length} color="success" size="small" />
        </span>
        <span className="flex flex-col gap-2 items-center text-sm">
          Essentials
          <Chip label={gear.essentials.length} color="error" size="small" />
        </span>
      </div>
    </div>
  )
}

export default GearCard
