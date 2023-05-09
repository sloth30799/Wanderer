import { Link } from "react-router-dom"
import { Chip, Button } from "@mui/material"
import InventoryIcon from "@mui/icons-material/Inventory"
import { GearType } from "../types"

type GearCardProps = {
  gear: GearType
  templateBox?: boolean
  loadTemplate?: (gear: GearType) => void
}

const GearCard = ({ gear, templateBox, loadTemplate }: GearCardProps) => {
  return (
    <div className="font-title text-black shadow-black rounded-lg p-3 border-solid border border-black">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <span className="uppercase text-grey text-xs">
              {gear.createdBy}
            </span>
            <h3 className="font-bold uppercase my-0">{gear.name}</h3>
          </div>
          <InventoryIcon className="bg-brightOrange rounded-lg p-1 text-white text-3xl ml-1" />
        </div>
        <p className="text-sm text-grey line-clamp-2">{gear.note}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Chip label={`Equipments: ${gear.equipments.length}`} size="small" />
        <Chip label={`Accessories: ${gear.accessories.length}`} size="small" />
        <Chip label={`Essentials: ${gear.essentials.length}`} size="small" />
      </div>
      {templateBox && loadTemplate && (
        <div className="mt-3 flex justify-between">
          <Link to={`/gear/${gear._id}`}>
            <Button variant="text">Preview</Button>
          </Link>
          <Button variant="contained" onClick={() => loadTemplate(gear)}>
            Use
          </Button>
        </div>
      )}
    </div>
  )
}

export default GearCard
