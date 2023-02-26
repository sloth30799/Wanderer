import React from "react"
import { useNavigate } from "react-router-dom"
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined"
import { createTemplate } from "../../api/api"
import { useBackpackerContext } from "../../context/BackpackerContext"

const AddGear = ({ sideBarOpen }) => {
  const { updateBackpackerData } = useBackpackerContext()
  const navigate = useNavigate()

  async function handleClick() {
    const data = await createTemplate()
    if (data.gear) navigate(`/gear/${data.gear._id}`)
    updateBackpackerData(data.gear, "gears")
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
