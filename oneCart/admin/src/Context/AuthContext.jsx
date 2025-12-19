import React, { createContext } from 'react'

export const AuthDataContext = createContext()

export const AuthContext = ({children}) => {
    const serverUrl = "http://localhost:8000"
    const value = {
        serverUrl
    }

  return (
    <div><AuthDataContext.Provider value={value}>
        {children}
        </AuthDataContext.Provider></div>
  )
}
