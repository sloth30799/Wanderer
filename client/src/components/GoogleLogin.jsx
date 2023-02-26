import React from "react"
import { Button } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"

const GoogleLogin = () => {
  function google() {
    window.open("http://localhost:1230/auth/google", "_self")
  }

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<GoogleIcon />}
      onClick={google}
    >
      Log in with Google
    </Button>
  )
}

export default GoogleLogin
