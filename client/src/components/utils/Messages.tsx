import { Snackbar } from "@mui/material"
import { MessagesType } from "../../types"
import React, { useEffect, useState } from "react"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { Outlet } from "react-router-dom"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function Messages() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<MessagesType>({})

  function displayMessage(message: MessagesType): void {
    setMessages(message)
  }

  function resetMessage() {
    setMessages({})
  }

  useEffect(() => {
    if (messages != null) setOpen(true)
  })

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setMessages({})
    setOpen(false)
  }
  return (
    <>
      <Outlet context={{ displayMessage }} />
      {messages.errors != null
        ? messages.errors.map((el, index) => (
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: index === 0 ? "left" : "right",
              }}
            >
              <Alert
                key={el.msg}
                variant="filled"
                severity="error"
                onClose={handleClose}
              >
                {el.msg}
              </Alert>
            </Snackbar>
          ))
        : null}
      {messages.success != null
        ? messages.success.map((el, index) => (
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: index === 0 ? "left" : "right",
              }}
            >
              <Alert
                key={el.msg}
                variant="filled"
                severity="success"
                onClose={handleClose}
              >
                {el.msg}
              </Alert>
            </Snackbar>
          ))
        : null}
      {messages.info != null
        ? messages.info.map((el, index) => (
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: index === 0 ? "left" : "right",
              }}
            >
              <Alert
                key={el.msg}
                variant="filled"
                severity="info"
                onClose={handleClose}
              >
                {el.msg}
              </Alert>
            </Snackbar>
          ))
        : null}
    </>
  )
}

export default Messages
