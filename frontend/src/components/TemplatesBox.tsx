import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import GearCard from "./GearCard"
import LoadingScreen from "./loading/LoadingScreen"
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material"
import { addBackpackingContent } from "../services/features/profile/profileSlice"
import { useAddGearMutation, useFetchTemplatesQuery } from "../api/gearApiSlice"
import { GearType, MessagesType } from "../types"
import { toast } from "react-hot-toast"

type TemplatesBoxProps = {
  loadTemplate: (template: GearType) => void
}

const TemplatesBox = ({ loadTemplate }: TemplatesBoxProps) => {
  const { data, isLoading, isError } = useFetchTemplatesQuery()

  const templates = data?.templates
  const [addGear, { isSuccess }] = useAddGearMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  async function addNewTemplate() {
    try {
      const { gear } = (await addGear().unwrap()) as {
        gear: GearType
        messages: MessagesType
      }
      if (gear) navigate(`/gear/${gear._id}`)
      dispatch(addBackpackingContent({ category: "gears", content: gear }))
      if (isSuccess) toast.success("Template Created!")
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) return <LoadingScreen />

  if (isError) return <h1>Something went Wrong!</h1>

  const templateCards = templates.map((template: GearType) => {
    return (
      <GearCard
        gear={template}
        templateBox={true}
        loadTemplate={() => loadTemplate(template)}
      />
    )
  })

  return (
    <main>
      <Button variant="contained" onClick={handleOpen}>
        Templates
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <DialogTitle className="font-title font-bold">
          Start with existing template or Make Your Own
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-3 gap-3">{templateCards}</div>
          <Button variant="contained" onClick={addNewTemplate}>
            Make Your Own!
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default TemplatesBox
