import { ReactNode, useState, MouseEvent } from "react"
import { NavLink } from "react-router-dom"
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material"

type OneListProps = {
  text: string
  icon: ReactNode
  link: string
  sideBarOpen: boolean
  listColor?: string
}

const OneList = ({
  text,
  icon,
  link,
  sideBarOpen,
  listColor,
}: OneListProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? `no-underline text-brightOrange font-extrabold`
          : `no-underline text-${listColor ?? "black"} hover:font-semibold`
      }
    >
      <ListItem
        disablePadding
        className={`hover:text-${listColor ?? "brightOrange"}`}
      >
        <ListItemButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{
            minHeight: 45,
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
              fontSize: "1.7rem",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            sx={{
              opacity: sideBarOpen ? 1 : 0,
              fontSize: "0.8rem",
            }}
          />
        </ListItemButton>
      </ListItem>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open && !sideBarOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography
          sx={{
            p: 0.5,
            fontSize: "0.7rem",
            backgroundColor: listColor ?? "orange",
            color: "white",
          }}
        >
          {text}
        </Typography>
      </Popover>
    </NavLink>
  )
}

export default OneList
