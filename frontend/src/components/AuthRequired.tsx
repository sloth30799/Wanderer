import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { selectAuth } from "../services/store"
import { toast } from "react-hot-toast"
import { LoadingScreen } from "./loading"

const AuthRequired = () => {
  const { user, loading } = useSelector(selectAuth)
  const location = useLocation()

  useEffect(() => {
    if (!loading && user === null) {
      toast("Please Log in.")
    }
  }, [loading, user])

  if (loading) return <LoadingScreen />

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default AuthRequired
