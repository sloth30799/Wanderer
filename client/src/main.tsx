import React from "react"
import { createRoot } from "react-dom/client"
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { AnimatePresence } from "framer-motion"
import { Provider } from "react-redux"
import { store } from "./services/store.js"
import { theme } from "./theme"
import "./assets/main.css"
import App from "./App.jsx"
import { Toaster } from "react-hot-toast"

const rootElement = document.getElementById("root")
if (rootElement !== null) {
  const root = createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <AnimatePresence>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
              <Toaster />
            </ThemeProvider>
          </AnimatePresence>
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>
  )
}
