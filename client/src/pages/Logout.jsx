import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBackpackerContext } from "../context/BackpackerContext"
import { useUserContext } from "../context/UserContext"

const Logout = () => {
  const { logoutUser } = useUserContext()
  const { logoutBackpacker } = useBackpackerContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLogout = async () => {
      const data = await logoutUser()
      logoutBackpacker()
      if (data === "Logout success") navigate("/")
    }
    fetchLogout()
  }, [navigate])

  return (
    <main className="container m-6 m-auto">
      <p>Logging out...</p>
    </main>
  )
}

export default Logout
