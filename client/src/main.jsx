import React from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import App from "./App"
import "./assets/main.css"

const queryClient = new QueryClient()
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
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
