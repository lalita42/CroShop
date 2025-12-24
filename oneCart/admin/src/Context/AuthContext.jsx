import React, { createContext } from 'react'

export const AuthDataContext = createContext()

export const AuthContext = ({children}) => {
    const serverUrl = "https://croshop-backend-zwm2.onrender.com"
    const value = {
        serverUrl
    }

  return (
    <div><AuthDataContext.Provider value={value}>
        {children}
        </AuthDataContext.Provider></div>
  )
}
