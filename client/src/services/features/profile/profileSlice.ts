import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  BackpackingCategory,
  BackpackingContent,
  BackpackingData,
  BlogType,
  GearType,
  TripType,
} from "../../../types"

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
    deleteBackpackingContent: (
      state,
      action: PayloadAction<{ category: BackpackingCategory; id: string }>
    ) => {
      const { category, id } = action.payload

      switch (category) {
        case "trips":
          state.trips = state.trips.filter((data: TripType) => data._id !== id)
          break
        case "gears":
          state.gears = state.gears.filter((data: GearType) => data._id !== id)
          break
        case "blogs":
          state.blogs = state.blogs.filter((data: BlogType) => data._id !== id)
          break
      }
    },
    emptyProfileData: (state) => {
      state.trips = []
      state.gears = []
      state.blogs = []
    },
  },
})

export const {
  fetchProfileData,
  addBackpackingContent,
  deleteBackpackingContent,
  emptyProfileData,
} = profileSlice.actions

export default profileSlice.reducer
