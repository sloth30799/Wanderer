import { Alert } from "@mui/material"
import { MessagesType } from "../types"

type MessagesProps = {
  messages: MessagesType
  resetMessage: () => void
}

function Messages({ messages, resetMessage }: MessagesProps) {
  return (
    <>
      {messages.errors != null &&
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
      {messages.success != null &&
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
      {messages.info != null &&
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
