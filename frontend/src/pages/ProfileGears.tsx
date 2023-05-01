import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { selectGears } from "../services/store"
import { GearType } from "../types"
import { addBackpackingContent } from "../services/features/profile/profileSlice"
import { useDispatch } from "react-redux"
import { useAddTemplateMutation } from "../api/templateApiSlice"
import { toast } from "react-hot-toast"
import GearCard from "../components/GearCard"

const ProfileGears = () => {
  const gears: GearType[] = useSelector(selectGears)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addTemplate, { isSuccess }] = useAddTemplateMutation()

  async function addGear() {
    try {
      const { gear } = await addTemplate().unwrap()
      if (gear) navigate(`/gear/${gear._id}`)
      dispatch(addBackpackingContent({ category: "gears", content: gear }))
      if (isSuccess) toast.success("Template Created!")
    } catch (error) {
      console.error(error)
    }
  }

  const gearsRender = gears.map((gear: GearType) => {
    return (
      <Link to={`/gear/${gear._id}`} key={gear._id} className="no-underline">
        <GearCard gear={gear} />
      </Link>
    )
  })

  return (
    <main className="flex flex-col my-6 gap-6">
      <Button variant="contained" className="place-self-end" onClick={addGear}>
        Create Your Own Gear
      </Button>
      {gears.length < 1 ? (
        <>
          <h3>Share Your Experience with others!</h3>
        </>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {gearsRender}
        </div>
      )}
    </main>
  )
}

export default ProfileGears
