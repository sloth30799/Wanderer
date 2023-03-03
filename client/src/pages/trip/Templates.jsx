import React, { useEffect, useState } from "react"
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
import { useBackpackerContext } from "../../context/BackpackerContext"
import { createTemplate } from "../../api/api"
import { getAllTemplates } from "../../api/api"

const styles = {
  button: `bg-brightGreen rounded-lg`,
  templateBox: `flex flex-col md:h-96 md:flex-wrap gap-3`,
  card: `md:w-1/2 rounded-lg shadow-md text-black bg-whiteSmoke hover:bg-tealBlue hover:text-white`,
}

const Templates = ({ useTemplate }) => {
  const [templates, setTemplates] = useState()
  const [open, setOpen] = useState(false)
  const { updateBackpackerData } = useBackpackerContext()
  const navigate = useNavigate()

  async function newGear() {
    const data = await createTemplate()
    if (data.gear) navigate(`/gear/${data.gear._id}`)
    updateBackpackerData(data.gear, "gears")
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

  if (templates === undefined) return null
  if (templates === null) return

  const templateCards = templates.map((template) => {
    return (
      <Card
        className={styles.card}
        key={template._id}
        onClick={() => useTemplate(template)}
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
