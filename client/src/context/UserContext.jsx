import React, { createContext, useContext, useEffect } from "react"
import { useState } from "react"
import { fetchUser, postLogin, postLogout } from "../api/api"

export const UserContext = createContext({})

export const useUserContext = () => {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [userObject, setUserObject] = useState()

  async function getData() {
    const user = await fetchUser()
    setUserObject(user)
  }

  async function loginUser(email, password) {
    const data = await postLogin(email, password)
    setUserObject(data.user)
    return data
  }

  async function changeUser(user) {
    setUserObject(user)
  }

  async function logoutUser() {
    const data = await postLogout()
    if (data === "Logout success") setUserObject(null)
    return data
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <UserContext.Provider
      value={{ userObject, loginUser, logoutUser, changeUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
