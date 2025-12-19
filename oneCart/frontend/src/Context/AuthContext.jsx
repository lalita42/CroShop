import React, { createContext } from 'react'

const AuthDataContext= createContext()
const AuthContext = ({children}) => {
    const serverUrl = "http://localhost:8000"
    const value = {
        serverUrl
    }
  return (
    <AuthDataContext.Provider value={value}>
        {children}
        </AuthDataContext.Provider>
  )
}

export {AuthContext,AuthDataContext};