import { Link } from "react-router-dom"
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

type LogoutBtnProps = {
  sideBarOpen: boolean
}

const LogoutBtn = ({ sideBarOpen }: LogoutBtnProps) => {
  return (
    <Link
      to="/logout"
      className="no-underline text-scarletRed hover:font-semibold text-sm"
    >
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: sideBarOpen ? "initial" : "center",
            py: 0.5,
            px: 2,
            ":hover": {
              backgroundColor: "#fff",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: sideBarOpen ? 2 : "auto",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            <LogoutOutlinedIcon className="bg-scarletRed text-white p-1 rounded-lg" />
          </ListItemIcon>
          <ListItemText
            primary={"Log Out"}
            sx={{ opacity: sideBarOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}

export default LogoutBtn
