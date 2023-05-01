import { useEffect } from "react"
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom"
import { Button, FormControl, InputAdornment, TextField } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"
import PersonPinIcon from "@mui/icons-material/PersonPin"
import { useDispatch } from "react-redux"
import { useSignupMutation } from "../api/authApiSlice"
import { setUser } from "../services/features/auth/authSlice"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const credentials = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  return credentials
}

const Signup = () => {
  const credentials = useActionData()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [postSignup, { isLoading, isError }] = useSignupMutation()

  async function signup() {
    try {
      const data = await postSignup(credentials).unwrap()
      const { user, messages } = data

      if (isError) {
        toast.error("Network Error")
      }

      if (messages.errors) {
        messages.errors.map((message: any) => {
          return toast.error(message.msg)
        })
      } else if (user != null) {
        toast.success("Sign up Successful!")
        dispatch(setUser({ user }))
        navigate("/profile", { replace: true })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (credentials !== null) signup()
  }, [credentials])

  return (
    <main className="h-screen flex justify-center items-center bg-whiteSmoke">
      <div className="bg-white p-3 m-3 md:p-12 text-sm rounded-xl shadow-2xl w-96">
        <h1 className="text-center font-extrabold text-4xl font-title uppercase tracking-tighter cursor-default mt-0 mb-6 text-deepBlue">
          #WANDERER
        </h1>
        <Form action="/signup" method="POST">
          <FormControl className="flex flex-col gap-3 mb-6">
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonPinIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              label="Username"
              name="userName"
              color="primary"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              name="email"
              type="email"
              label="Email address"
              color="primary"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              name="password"
              type="password"
              label="Password"
              color="primary"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              color="primary"
            />
            <Button
              variant="contained"
              className="shadow-black"
              type="submit"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Creating New Account" : "Sign Up"}
            </Button>
          </FormControl>
        </Form>
        <p className="text-center mx-3">
          Already has an account?{" "}
          <Link to="/login" replace={true} className="font-bold text-tealBlue">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Signup
