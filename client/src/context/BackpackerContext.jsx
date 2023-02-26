import { useEffect } from "react"
import { useState, createContext, useContext } from "react"
import { fetchProfile } from "../api/api"
import { useUserContext } from "./UserContext"

export const BackpackerContext = createContext({})

export function useBackpackerContext() {
  return useContext(BackpackerContext)
}

export function BackpackerProvider({ children }) {
  const { userObject } = useUserContext()
  const [backpacker, setBackpacker] = useState()

  async function getBackpackerData() {
    const data = await fetchProfile()
    setBackpacker(data)
  }

  async function updateBackpackerData(data, dataType) {
    const dataList = await backpacker[dataType]
    dataList.push(data)
    setBackpacker({ ...backpacker, [dataType]: dataList })
  }

  async function deleteOneData(id, dataType) {
    const dataList = await backpacker[dataType]
    const newList = await dataList.filter((item) => item._id !== id)
    setBackpacker({ ...backpacker, [dataType]: newList })
  }

  function logoutBackpacker() {
    setBackpacker(null)
  }

  useEffect(() => {
    getBackpackerData()
  }, [userObject])

  return (
    <BackpackerContext.Provider
      value={{
        backpacker,
        updateBackpackerData,
        deleteOneData,
        logoutBackpacker,
      }}
    >
      {children}
    </BackpackerContext.Provider>
  )
}
