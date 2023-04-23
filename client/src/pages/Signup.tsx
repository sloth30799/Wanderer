import React, { useEffect } from "react"
import {
  Form,
  useActionData,
  useNavigate,
  useOutletContext,
} from "react-router-dom"
import { Button, FormControl, InputAdornment, TextField } from "@mui/material"
import { useUserContext } from "../context/UserContext"
import { postSignup } from "../api"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"
import PersonPinIcon from "@mui/icons-material/PersonPin"

export async function action({ request }) {
  const formData = await request.formData()
  const userName = formData.get("userName")
  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")
  try {
    const data = await postSignup(userName, email, password, confirmPassword)
    return data
  } catch (error) {
    console.log(error)
  }
}

const Signup = () => {
  const { displayMessage } = useOutletContext()
  const { changeUser } = useUserContext()
  const data = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    if (data?.user) {
      changeUser(data.user)
      navigate("/profile", { replace: true })
    }
    if (data?.messages) displayMessage(data.messages)
  }, [data?.user, data?.messages])

  return (
    <main className="h-screen flex justify-center items-center bg-whiteSmoke">
      <div className="mx-6 p-6 shadow-md rounded-lg bg-white md:mx-0 md:w-1/2 md:p-12">
        <Form action="/signup" method="post">
          <FormControl className="flex flex-col gap-3 mb-6">
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonPinIcon className="text-goldenYellow" />
                  </InputAdornment>
                ),
              }}
              label="Username"
              name="userName"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="text-goldenYellow" />
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
                    <KeyIcon className="text-goldenYellow" />
                  </InputAdornment>
                ),
              }}
              name="password"
              type="password"
              label="Password"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon className="text-goldenYellow" />
                  </InputAdornment>
                ),
              }}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
            <Button
              variant="contained"
              type="submit"
              className=" w-full m-auto bg-goldenYellow"
            >
              Sign Up
            </Button>
          </FormControl>
        </Form>
      </div>
    </main>
  )
}

export default Signup
