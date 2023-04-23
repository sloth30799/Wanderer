import { useSelector } from "react-redux"
import {
  useLocation,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom"
import { selectCurrentUser } from "../api/authApiSlice"
import { OutletContextProps } from "../types"
import { useEffect } from "react"

const msg = {
  info: [
    {
      msg: "Please Log in.",
    },
  ],
}

const AuthRequired = () => {
  const { displayMessage } = useOutletContext() as OutletContextProps
  const user = useSelector(selectCurrentUser)
  const location = useLocation()

  useEffect(() => {
    if (user === null) displayMessage(msg)
  }, [])

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default AuthRequired
