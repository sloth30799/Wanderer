import React, { useEffect } from "react"
import {
  Link,
  Form,
  useActionData,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom"
import { Button, FormControl, InputAdornment, TextField } from "@mui/material"
// import GoogleIcon from "@mui/icons-material/Google"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"
import PersonPinIcon from "@mui/icons-material/PersonPin"
import { useUserContext } from "../context/UserContext"

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  try {
    return { email, password }
  } catch (error) {
    console.log(error)
  }
}

const Login = () => {
  const { displayMessage } = useOutletContext()
  const { userObject, loginUser } = useUserContext()
  const formData = useActionData()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from || "/profile"

  useEffect(() => {
    if (formData?.email && formData?.password) {
      const { email, password } = formData
      loginUser(email, password).then((data) => displayMessage(data.messages))
    }
    if (userObject?._id) navigate(from, { replace: true })
  }, [formData, userObject])

  // function google() {
  //   window.open("http://localhost:1230/api/auth/google", "_self")
  // }

  return (
    <main className="h-screen flex justify-center items-center bg-whiteSmoke">
      <div className="mx-6 p-6 shadow-md rounded-lg bg-white md:mx-0 md:w-1/2 md:p-12">
        <div className="text-center text-tealBlue">
          <PersonPinIcon fontSize="large" />
        </div>
        <Form action="/login" method="post">
          <FormControl className="flex flex-col gap-3 mb-6">
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="text-tealBlue" />
                  </InputAdornment>
                ),
              }}
              name="email"
              type="email"
              label="Email address"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon className="text-tealBlue" />
                  </InputAdornment>
                ),
              }}
              name="password"
              type="password"
              label="Password"
            />
            <Button
              variant="contained"
              className=" w-full m-auto bg-tealBlue"
              type="submit"
            >
              Log In
            </Button>
          </FormControl>
        </Form>
        {/* <p className="text-center mx-3">Or Login with</p>
        <div>
          <Button
            variant="contained"
            className="w-full bg-scarletRed"
            startIcon={<GoogleIcon />}
            onClick={google}
          >
            Log in with Google
          </Button>
        </div> */}
        <p className="text-center mx-3">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?{" "}
          <Link
            to="/signup"
            replace={true}
            className="font-extrabold text-goldenYellow"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login
