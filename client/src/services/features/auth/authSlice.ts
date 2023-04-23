import { createSlice } from "@reduxjs/toolkit"
import { UserType } from "../../../types"

interface UserState {
  user: UserType | null
}

const initialState: UserState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload
      state.user = user
    },
    logOutUser: (state, _) => {
      state.user = null
    },
  },
})

export const { setUser, logOutUser } = authSlice.actions

export default authSlice.reducer
