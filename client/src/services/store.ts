import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"
import authReducer from "./features/auth/authSlice"
import profileReducer from "./features/profile/profileSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const selectCurrentUser = (state: RootState) => state.auth.user

export const selectProfileData = (state: RootState) => state.profile
export const selectTrips = (state: RootState) => state.profile.trips
export const selectGears = (state: RootState) => state.profile.gears
export const selectBlogs = (state: RootState) => state.profile.blogs
