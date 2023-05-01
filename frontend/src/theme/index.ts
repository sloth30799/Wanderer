import { createTheme } from "@mui/material/styles"

const rootElement = document.getElementById("root")

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f39811",
      light: "#e6a02d",
      dark: "#a1701f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#59a9a1",
      light: "#8ddad5",
      dark: "#1f766f",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "py-1 px-4",
          fontSize: "0.75rem",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        inputProps: {
          style: {
            fontSize: "0.8rem",
            fontFamily: "Pilcrow rounded",
          },
        },
        InputLabelProps: {
          style: {
            fontSize: "0.9rem",
            padding: 0,
            color: "#000",
            fontFamily: "Pilcrow rounded",
          },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        style: {
          fontSize: "0.8rem",
          fontFamily: "Pilcrow rounded",
        },
      },
    },
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
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "inherit",
          color: "inherit",
          fontWeight: "inherit",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Archivo", "Pilcrow Rounded", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
})
