import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Login, { action as loginAction } from "./pages/auth/Login.tsx"
import Signup, { action as signupAction } from "./pages/auth/Signup.tsx"
import Feed, { loader as feedLoader } from "./pages/Feed.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"
import HomePage from "./pages/HomePage.tsx"
import Logout from "./pages/auth/Logout.tsx"
import AuthRequired from "./components/AuthRequired.tsx"
import SideBar from "./components/sidebar/SideBar.tsx"
import Profile from "./pages/profile/Profile.tsx"
import ProfileTrips from "./pages/profile/ProfileTrips.tsx"
import ProfileGears from "./pages/profile/ProfileGears.tsx"
import ProfileBlogs from "./pages/profile/ProfileBlogs.tsx"
import Explore from "./pages/Explore.tsx"
import Favorite from "./pages/Favorite.tsx"
import Trip from "./pages/Trip.tsx"
import Gear from "./pages/Gear.tsx"
import Blog from "./pages/Blog.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="signup" element={<Signup />} action={signupAction} />
      <Route path="logout" element={<Logout />} />

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
