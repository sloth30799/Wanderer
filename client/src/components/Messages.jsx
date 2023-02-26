import { Alert } from "@mui/material"
import React from "react"

function Messages({ messages, resetMessage }) {
  return (
    <>
      {messages.errors &&
        messages.errors.map((el) => (
          <Alert
            key={el.msg}
            variant="filled"
            severity="warning"
            onClose={resetMessage}
          >
            {el.msg}
          </Alert>
        ))}
      {messages.success &&
        messages.success.map((el) => (
          <Alert
            key={el.msg}
            variant="filled"
            severity="success"
            onClose={resetMessage}
          >
            {el.msg}
          </Alert>
        ))}
      {messages.info &&
        messages.info.map((el) => (
          <Alert
            key={el.msg}
            variant="filled"
            severity="info"
            onClose={resetMessage}
          >
            {el.msg}
          </Alert>
        ))}
    </>
  )
}

export default Messages
