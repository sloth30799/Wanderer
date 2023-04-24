import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  useLocation,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom"
import { OutletContextProps } from "../types"
import { selectAuth } from "../services/store"

const msg = {
  info: [
    {
      msg: "Please Log in.",
    },
  ],
}

const AuthRequired = () => {
  const { displayMessage } = useOutletContext() as OutletContextProps
  const { user, loading } = useSelector(selectAuth)
  const location = useLocation()

  useEffect(() => {
    if (!loading && user === null) {
      displayMessage(msg)
    }
  }, [loading, user])

  if (loading) return <h1>Loading...</h1>

  return user ? (
    <Outlet context={useOutletContext()} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default AuthRequired
