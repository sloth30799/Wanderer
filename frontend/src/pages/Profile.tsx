import { NavLink, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser, selectProfileData } from "../services/store"
import { useFetchProfileQuery } from "../api/mainApiSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchProfileData } from "../services/features/profile/profileSlice"

const styles = {
  navBar: `flex gap-6 p-2 items-center`,
  navLink: `no-underline text-black p-1`,
  activeLink: `no-underline text-sm text-white bg-goldenOrange p-1 rounded-lg`,
}

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { data, isLoading } = useFetchProfileQuery()

  useEffect(() => {
    dispatch(fetchProfileData(data))
  }, [data, dispatch])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <div>
        <h2 className="font-title">Welcome back {user?.userName}!</h2>
        <nav className={styles.navBar}>
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
