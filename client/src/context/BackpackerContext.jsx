import { useEffect, useReducer } from "react"
import { createContext, useContext } from "react"
import { fetchProfile } from "../api/api"
import { backpackerReducer } from "./reducer/backpackerReducer"
import { useUserContext } from "./UserContext"

export const BackpackerContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export function useBackpackerContext() {
  return useContext(BackpackerContext)
}

export function BackpackerProvider({ children }) {
  const { userObject } = useUserContext()
  const [state, dispatch] = useReducer(backpackerReducer, { backpacker: null })

  async function getBackpackerData() {
    const data = await fetchProfile()
    dispatch({ type: "SET_BACKPACKER", backpacker: data })
  }

  useEffect(() => {
    getBackpackerData()
  }, [userObject])

  return (
    <BackpackerContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BackpackerContext.Provider>
  )
}
