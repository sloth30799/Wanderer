import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  BackpackingCategory,
  BackpackingContent,
  BackpackingData,
  BlogType,
  GearType,
  TripType,
} from "../../../types"
import { mainApiSlice } from "../../../api/mainApiSlice"
import { authApiSlice } from "../../../api/authApiSlice"

const initialState: BackpackingData = {
  trips: [],
  gears: [],
  blogs: [],
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfileData: (state, action: PayloadAction<BackpackingData>) => {
      state.trips = action.payload.trips
      state.gears = action.payload.gears
      state.blogs = action.payload.blogs
    },
    addBackpackingContent: (
      state,
      action: PayloadAction<{
        category: BackpackingCategory
        content: BackpackingContent
      }>
    ) => {
      const { category, content } = action.payload

      switch (category) {
        case "trips":
          state.trips = [...state.trips, content as TripType]
          break
        case "gears":
          state.gears = [...state.gears, content as GearType]
          break
        case "blogs":
          state.blogs = [...state.blogs, content as BlogType]
          break
      }
    },
    updateBackpackingContent: (
      state,
      action: PayloadAction<{
        category: BackpackingCategory
        content: BackpackingContent
      }>
    ) => {
      const { category, content } = action.payload

      switch (category) {
        case "trips":
          state.trips = state.trips.map((trip) => {
            if (trip._id === content._id) {
              trip = content as TripType
            }
            return trip
          })
          break
        case "gears":
          state.gears = state.gears.map((gear) => {
            if (gear._id === content._id) {
              gear = content as GearType
            }
            return gear
          })
          break
        case "blogs":
          state.blogs = state.blogs.map((blog) => {
            if (blog._id === content._id) {
              blog = content as BlogType
            }
            return blog
          })
          break
      }
    },
    deleteBackpackingContent: (
      state,
      action: PayloadAction<{ category: BackpackingCategory; id: string }>
    ) => {
      const { category, id } = action.payload

      switch (category) {
        case "trips":
          state.trips = state.trips.filter((trip: TripType) => trip._id !== id)
          break
        case "gears":
          state.gears = state.gears.filter((gear: GearType) => gear._id !== id)
          break
        case "blogs":
          state.blogs = state.blogs.filter((blog: BlogType) => blog._id !== id)
          break
      }
    },
    emptyProfileData: (state) => {
      state.trips = []
      state.gears = []
      state.blogs = []
    },
    chooseTemplate: (
      state,
      action: PayloadAction<{ id: string; template: GearType }>
    ) => {
      const { id, template } = action.payload

      state.trips = state.trips.map((trip) => {
        if (trip._id === id) {
          trip.gear.equipments = template.equipments
          trip.gear.accessories = template.accessories
          trip.gear.essentials = template.essentials
        }
        return trip
      })
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      mainApiSlice.endpoints.fetchProfile.matchFulfilled,
      (state, action) => {
        state.trips = action.payload.trips
        state.gears = action.payload.gears
        state.blogs = action.payload.blogs
      }
    )
    builder.addMatcher(
      authApiSlice.endpoints.logout.matchFulfilled,
      (state) => {
        state.trips = []
        state.gears = []
        state.blogs = []
      }
    )
  },
})

export const {
  fetchProfileData,
  addBackpackingContent,
  updateBackpackingContent,
  deleteBackpackingContent,
  emptyProfileData,
  chooseTemplate,
} = profileSlice.actions

export default profileSlice.reducer
