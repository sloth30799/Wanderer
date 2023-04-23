import { useEffect } from "react"
import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  useOutletContext,
  useNavigate,
} from "react-router-dom"
import { useDispatch } from "react-redux"
import { Button, FormControl, InputAdornment, TextField } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"
import PersonPinIcon from "@mui/icons-material/PersonPin"
import { setUser } from "../../store/features/auth/authSlice"
import { useLoginMutation } from "../../api/authApiSlice"
import { OutletContextProps } from "../../types"

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData()

  const credentials = {
    email: data.get("email"),
    password: data.get("password"),
  }

  return credentials
}

const Login = () => {
  const { displayMessage } = useOutletContext() as OutletContextProps
  const credentials = useActionData()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [postLogin, { isLoading }] = useLoginMutation()

  async function login() {
    try {
      const data = await postLogin(credentials).unwrap()
      const { user, messages } = data
      displayMessage(messages)
      dispatch(setUser({ user }))
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (credentials != null) login()
  }, [credentials])

  function google() {
    window.open("http://wanderer.onrender.com/api/auth/google", "_self")
  }

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
              disabled={isLoading}
            >
              {isLoading ? "Logging" : "Log In"}
            </Button>
          </FormControl>
        </Form>
        <p className="text-center mx-3">Or Login with</p>
        <div>
          <Button
            variant="contained"
            className="w-full bg-scarletRed"
            startIcon={<GoogleIcon />}
            onClick={google}
          >
            Log in with Google
          </Button>
        </div>
        <p className="text-center mx-3">
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
