import { useDispatch } from "react-redux"
import { useNavigate, useOutletContext } from "react-router-dom"
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined"
import { addBackpackingContent } from "../../services/features/profile/profileSlice"
import { useAddTemplateMutation } from "../../api/templateApiSlice"
import { OutletContextProps } from "../../types"

type AddGearProps = {
  sideBarOpen: boolean
}

const AddGear = ({ sideBarOpen }: AddGearProps) => {
  const { displayMessage } = useOutletContext() as OutletContextProps
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addTemplate] = useAddTemplateMutation()

  async function handleClick() {
    try {
      const { gear, messages } = await addTemplate().unwrap()
      if (gear) navigate(`/gear/${gear._id}`)
      dispatch(addBackpackingContent({ category: "gears", content: gear }))
      displayMessage(messages)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: sideBarOpen ? "initial" : "center",
          px: 2.5,
        }}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: sideBarOpen ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <PostAddOutlinedIcon className="text-black" />
        </ListItemIcon>
        <ListItemText
          primary={"Make a template!"}
          sx={{ opacity: sideBarOpen ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default AddGear
