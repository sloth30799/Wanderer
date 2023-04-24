import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material"
import LoadingCircle from "./utils/LoadingCircle"
import { addBackpackingContent } from "../services/features/profile/profileSlice"
import { createTemplate, getAllTemplates } from "../api"
import { GearType } from "../types"

const styles = {
  button: `bg-brightGreen rounded-lg`,
  templateBox: `flex flex-col md:h-96 md:flex-wrap gap-3`,
  card: `md:w-1/2 rounded-lg shadow-md text-black bg-whiteSmoke hover:bg-tealBlue hover:text-white`,
}

type TemplatesProps = {
  chooseTemplate: (template: GearType) => void
}

const Templates = ({ chooseTemplate }: TemplatesProps) => {
  const [templates, setTemplates] = useState<GearType[]>([])
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function newGear() {
    const { gear } = await createTemplate()
    if (gear) navigate(`/gear/${gear._id}`)
    dispatch(addBackpackingContent({ category: "gears", content: gear }))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    async function getTemplates() {
      const data = await getAllTemplates()
      setTemplates(data.template)
    }
    getTemplates()
  }, [])

  if (templates === undefined) return <LoadingCircle progress={templates} />
  if (templates === null) return

  const templateCards = templates.map((template) => {
    return (
      <Card
        className={styles.card}
        key={template._id}
        onClick={() => chooseTemplate(template)}
      >
        <CardActionArea>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h3 className="m-0 font-pally">{template.name}</h3>
              <p>By {template.createdBy}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <span>Equipments: {template.equipments.length}</span>
              <span>Essentials: {template.essentials.length}</span>
              <span>Accessories: {template.accessories.length}</span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  })

  return (
    <main>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={styles.button}
      >
        Templates
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
        <DialogTitle className="">
          Start with existing template or Make Your Own
        </DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <div className={styles.templateBox}>{templateCards}</div>
          <Button variant="contained" onClick={newGear} className="bg-tealBlue">
            Make Your Own!
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default Templates
