import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import GearCard from "./GearCard"
import LoadingScreen from "./loading/LoadingScreen"
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material"
import { addBackpackingContent } from "../services/features/profile/profileSlice"
import { useAddGearMutation, useFetchTemplatesQuery } from "../api/gearApiSlice"
import { GearType } from "../types"
import { toast } from "react-hot-toast"
import RefreshIcon from "@mui/icons-material/Refresh"

type TemplatesBoxProps = {
  loadTemplate: (template: GearType) => void
}

const TemplatesBox = ({ loadTemplate }: TemplatesBoxProps) => {
  const { data, isError, refetch, isFetching } = useFetchTemplatesQuery()

  const templates = data?.templates
  const [addGear] = useAddGearMutation()

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
      const { gear } = await addGear().unwrap()

      if (gear) {
        toast.success("Template Created!")
        dispatch(addBackpackingContent({ category: "gears", content: gear }))
        navigate(`/gear/${gear._id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function refreshTemplates() {
    refetch()
  }

  if (isError) return <h1>Something went Wrong!</h1>

  const templateCards = templates?.map((template: GearType) => {
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
        <DialogTitle className="font-title font-bold flex flex-col md:flex-row justify-between gap-1">
          <h4 className="my-0 text-sm md:text-lg">
            Use existing Gear List or Make Your Own
          </h4>
          <Button
            startIcon={<RefreshIcon />}
            onClick={refreshTemplates}
            className="self-start"
          >
            Refresh
          </Button>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-5">
          {isFetching ? (
            <LoadingScreen />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateCards}
            </div>
          )}
          <Button variant="contained" onClick={addNewTemplate}>
            Make Your Own!
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default TemplatesBox
