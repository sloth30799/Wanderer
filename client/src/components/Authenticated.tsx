import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import Messages from "./Messages"
import { MessagesType } from "../types"

const Authenticated = () => {
  const { userObject } = useUserContext()
  const [messages, setMessages] = useState({})

  function displayMessage(message: MessagesType) {
    setMessages(message)
  }

  function resetMessage() {
    setMessages({})
  }

  if (userObject?._id) {
    return <Navigate to="/profile" />
  }
  return (
    <>
      <Messages messages={messages} resetMessage={resetMessage} />
      <Outlet context={{ displayMessage }} />
    </>
  )
}

export default Authenticated
