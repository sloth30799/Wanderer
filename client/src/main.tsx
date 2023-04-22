import React from "react"
import { createRoot } from "react-dom/client"
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { AnimatePresence } from "framer-motion"
import { theme } from "./theme"
import App from "./App"
import "./assets/main.css"

const rootElement = document.getElementById("root")
if (rootElement !== null) {
  const root = createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <AnimatePresence>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AnimatePresence>
      </StyledEngineProvider>
    </React.StrictMode>
  )
}
