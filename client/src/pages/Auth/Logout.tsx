import { useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useLogoutMutation } from "../../api/authApiSlice"
import { logOutUser } from "../../services/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { OutletContextProps } from "../../types"

// const msg = {
//   success: [
//     {
//       msg: "Successful Logout.",
//     },
//   ],
// }

const Logout = () => {
  const { displayMessage } = useOutletContext() as OutletContextProps
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [postLogout, { isSuccess }] = useLogoutMutation()

  async function logout() {
    try {
      const msg = await postLogout({}).unwrap()
      dispatch(logOutUser({}))
      navigate("/")
      if (isSuccess) displayMessage(msg)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <main className="container m-6 m-auto">
      <p>Logging out...</p>
    </main>
  )
}

export default Logout
