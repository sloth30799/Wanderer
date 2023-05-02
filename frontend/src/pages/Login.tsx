import { useEffect } from "react"
import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  useNavigate,
} from "react-router-dom"
import { useDispatch } from "react-redux"
import { Button, FormControl, InputAdornment, TextField } from "@mui/material"
// import GoogleIcon from "@mui/icons-material/Google"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"
import { setUser } from "../services/features/auth/authSlice"
import { useLoginMutation } from "../api/authApiSlice"
import { toast } from "react-hot-toast"
import { useFetchProfileQuery } from "../api/mainApiSlice"

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData()

  const credentials = {
    email: data.get("email"),
    password: data.get("password"),
  }

  return credentials
}

const Login = () => {
  const credentials = useActionData()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [postLogin, { isLoading, isError }] = useLoginMutation()
  const { refetch } = useFetchProfileQuery()

  async function login() {
    try {
      const data = await postLogin(credentials).unwrap()
      const { user, messages } = data

      if (isError) {
        toast.error("Network Error")
      }

      if (messages.errors) {
        messages.errors.map((message: any) => {
          return toast.error(message.msg)
        })
      } else if (user != null) {
        toast.success("Log in Successful!")
        navigate("/profile", { replace: true })
        dispatch(setUser({ user }))
        refetch()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (credentials != null) login()
  }, [credentials])

  // function google() {
  //   window.open("https://wanderer.onrender.com/api/auth/google", "_self")
  // }

  return (
    <main className="h-screen flex justify-center items-center bg-whiteSmoke">
      <div className="bg-white m-3 p-3 md:p-12 rounded-xl text-sm shadow-2xl">
        <h1 className="text-center font-extrabold text-3xl font-title uppercase tracking-tighter cursor-default mt-0 mb-6 text-deepBlue">
          #WANDERER
        </h1>
        <Form action="/login" method="POST">
          <FormControl className="flex flex-col gap-3 mb-6">
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="text-tealBlue" fontSize="small" />
                  </InputAdornment>
                ),
              }}
              name="email"
              type="email"
              label="Email address"
              color="secondary"
            />
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon className="text-tealBlue" fontSize="small" />
                  </InputAdornment>
                ),
              }}
              name="password"
              type="password"
              label="Password"
              color="secondary"
            />
            <Button
              variant="contained"
              color="secondary"
              className="shadow-black"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging" : "Log In"}
            </Button>
          </FormControl>
        </Form>
        {/* <p className="text-center mx-3">Or Login with</p> */}
        {/* <div>
          <Button
            variant="contained"
            color="error"
            className="w-full shadow-black"
            startIcon={<GoogleIcon fontSize="small" />}
            onClick={google}
          >
            Log in with Google
          </Button>
        </div> */}
        <p className="text-center mx-3">
          Don't have an account?{" "}
          <Link
            to="/signup"
            replace={true}
            className="font-extrabold text-brightOrange"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login
