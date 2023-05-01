import { useState } from "react"
import { Outlet } from "react-router-dom"
import MuiDrawer from "@mui/material/Drawer"
import { styled, Theme, CSSObject } from "@mui/material/styles"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { Box, Toolbar, List, Divider, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import OneList from "./OneList"
import LogoutBtn from "./LogoutBtn"

const styles = {
  logo: `text-xl font-extrabold font-title tracking-tighter cursor-default`,
  drawerLogo: `text-xl font-extrabold font-title tracking-tighter cursor-default`,
  icon: `bg-goldenOrange text-white hover:bg-brightOrange p-1 rounded-lg`,
}

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function SideBar() {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const renderLinks = [
    {
      text: "Profile",
      icon: (
        <FolderSharedOutlinedIcon fontSize="inherit" className={styles.icon} />
      ),
      link: "profile",
    },
    {
      text: "Feed",
      icon: <FeedOutlinedIcon fontSize="inherit" className={styles.icon} />,
      link: "feed",
    },
    {
      text: "Explore",
      icon: (
        <TravelExploreOutlinedIcon fontSize="inherit" className={styles.icon} />
      ),
      link: "explore",
    },
    {
      text: "Favorite",
      icon: (
        <FavoriteBorderOutlinedIcon
          fontSize="inherit"
          className={styles.icon}
        />
      ),
      link: "favorite",
    },
  ].map((list) => (
    <OneList
      key={list.text}
      text={list.text}
      icon={list.icon}
      link={list.link}
      sideBarOpen={open}
    />
  ))

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-white text-black">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 4,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <span className={open ? "hidden" : `${styles.logo}`}>#Wanderer</span>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <span className={open ? `${styles.drawerLogo}` : "hidden"}>
            #WANDERER
          </span>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="text-sm">{renderLinks}</List>
        <Divider />
        <LogoutBtn sideBarOpen={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}
