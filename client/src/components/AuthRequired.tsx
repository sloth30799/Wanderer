import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  useLocation,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom"
import { OutletContextProps } from "../types"
import { selectAuth, store } from "../services/store"
import { mainApiSlice } from "../api/mainApiSlice"

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

  if (loading) return <h1>Loading...</h1>

  if (!loading && user === null) {
    useEffect(() => {
      displayMessage(msg)
    }, [])
  }

  if (user != null)
    store.dispatch(mainApiSlice.endpoints.fetchProfile.initiate({}))

  return user ? (
    <Outlet context={useOutletContext()} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default AuthRequired
