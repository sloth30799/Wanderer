import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import AuthRequired from "./components/AuthRequired"
import PostSkeleton from "./components/utils/PostSkeleton"
import HomePage from "./pages/HomePage"
import Login, { action as loginAction } from "./pages/Auth/Login"
import Signup, { action as signupAction } from "./pages/Auth/Signup"
import Logout from "./pages/Auth/Logout"
import Feed, { loader as feedLoader } from "./pages/Feed"
import Favorite from "./pages/Favorite"
import Explore from "./pages/Explore"
import Blog from "./pages/Blog"
import Trip from "./pages/Trip"
import Gear from "./pages/Gear"
import ErrorPage from "./pages/ErrorPage"
import SideBar from "./components/sidebar/SideBar.tsx"
import Profile from "./pages/Profile/Profile.tsx"
import ProfileTrips from "./pages/Profile/ProfileTrips.tsx"
import ProfileGears from "./pages/Profile/ProfileGears.tsx"
import ProfileBlogs from "./pages/Profile/ProfileBlogs.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="signup" element={<Signup />} action={signupAction} />
      <Route path="logout" element={<Logout />} />
      <Route path="skeleton" element={<PostSkeleton />} />

      <Route element={<AuthRequired />}>
        <Route element={<SideBar />}>
          <Route path="profile" element={<Profile />}>
            <Route path="trip" element={<ProfileTrips />} />
            <Route path="gear" element={<ProfileGears />} />
            <Route path="post" element={<ProfileBlogs />} />
          </Route>
          <Route path="feed" element={<Feed />} loader={feedLoader} />
          <Route path="explore" element={<Explore />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="trip/:id" element={<Trip />} />
          <Route path="gear/:id" element={<Gear />} />
          <Route path="post/:id" element={<Blog />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
