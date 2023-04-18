import React from "react"
import { createRoot } from "react-dom/client"
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import App from "./App"
import "./assets/main.css"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

const theme = createTheme({
  components: {
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  typography: {
    fontFamily: ["pally"],
  },
})

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
