import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const AuthRequired = () => {
  const { userObject } = useUserContext()
  const location = useLocation()

  if (!userObject?._id) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first.",
          from: location.pathname,
        }}
        replace
      />
    )
  }
  return <Outlet />
}

export default AuthRequired
