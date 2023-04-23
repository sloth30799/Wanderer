import { useEffect, useReducer } from "react"
import { createContext, useContext } from "react"
import { fetchProfile } from "../api"
import { backpackerReducer } from "./reducer/backpackerReducer"
import { useUserContext } from "./UserContext"

type BackpackerProviderProps = {
  children: React.ReactNode
}

export const BackpackerContext = createContext({})

export function useBackpackerContext() {
  return useContext(BackpackerContext)
}

export function BackpackerProvider({ children }: BackpackerProviderProps) {
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
