import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { NavLink } from "react-router-dom"

const styles = {
  activeNavbar: `no-underline text-goldenOrange font-extrabold`,
  inactiveNavbar: `no-underline text-black hover:font-semibold`,
}

type OneListProps = {
  text: string
  icon: React.ReactNode
  link: string
  sideBarOpen: boolean
}

const OneList = ({ text, icon, link, sideBarOpen }: OneListProps) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? styles.activeNavbar : styles.inactiveNavbar
      }
    >
      <ListItem
        disablePadding
        className="block hover:bg-white hover:text-brightOrange"
      >
        <ListItemButton
          sx={{
            minHeight: 30,
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
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: sideBarOpen ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  )
}

export default OneList
