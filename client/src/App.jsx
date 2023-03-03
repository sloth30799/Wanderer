import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import { BackpackerProvider } from "./context/BackpackerContext"
import AuthRequired from "./components/AuthRequired"
import SideBar from "./components/sidebar/SideBar"
import ErrorPage from "./components/ErrorPage"
import HomePage from "./pages/homePage/HomePage"
import Profile from "./pages/profile/Profile"
import ProfileTrips from "./pages/profile/ProfileTrips"
import ProfileGears from "./pages/profile/ProfileGears"
import ProfilePosts from "./pages/profile/ProfilePosts"
import Trip from "./pages/trip/Trip"
import Login, { action as loginAction } from "./pages/Login"
import Signup, { action as signupAction } from "./pages/Signup"
import Logout from "./pages/Logout"
import Feed, { loader as feedLoader } from "./pages/Feed"
import Gear from "./pages/Gear"
import Post from "./pages/Post"
import Favorite from "./pages/Favorite"
import Explore from "./pages/Explore"
import Authenticated from "./components/Authenticated"
import PostSkeleton from "./components/PostSkeleton"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />

      <Route element={<Authenticated />}>
        <Route path="login" element={<Login />} action={loginAction} />
        <Route path="signup" element={<Signup />} action={signupAction} />
      </Route>
      <Route path="logout" element={<Logout />} />
      <Route path="skeleton" element={<PostSkeleton />} />

      <Route element={<AuthRequired />}>
        <Route element={<SideBar />}>
          <Route path="profile" element={<Profile />}>
            <Route path="trip" element={<ProfileTrips />} />
            <Route path="gear" element={<ProfileGears />} />
            <Route path="post" element={<ProfilePosts />} />
          </Route>
          <Route path="feed" element={<Feed />} loader={feedLoader} />
          <Route path="explore" element={<Explore />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="trip/:id" element={<Trip />} />
          <Route path="gear/:id" element={<Gear />} />
          <Route path="post/:id" element={<Post />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

function App() {
  return (
    <UserProvider>
      <BackpackerProvider>
        <RouterProvider router={router} />
      </BackpackerProvider>
    </UserProvider>
  )
}

export default App
