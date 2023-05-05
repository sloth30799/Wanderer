import { NavLink, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../services/store"
import { useFetchProfileQuery } from "../api/mainApiSlice"
import { LoadingScreen } from "../components/loading"

const styles = {
  navLink: `no-underline text-black font-title`,
  activeLink: `no-underline text-black font-title font-bold rounded-lg `,
}

const Profile = () => {
  const user = useSelector(selectCurrentUser)
  const { isLoading } = useFetchProfileQuery()

  if (isLoading) return <LoadingScreen />

  return (
    <div>
      <div>
        <h2 className="font-title">Welcome back {user?.userName}!</h2>
        <nav className="flex gap-6 items-center border-solid border-0 border-whiteSmoke border-b-2 p-1">
          <NavLink
            to="trip"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Trips
          </NavLink>
          <NavLink
            to="gear"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Gears
          </NavLink>
          <NavLink
            to="blog"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Blogs
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}

export default Profile
