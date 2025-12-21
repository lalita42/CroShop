import React, { createContext } from 'react'

const AuthDataContext= createContext()
const AuthContext = ({children}) => {
    const serverUrl = "https://croshop-backend-zwm2.onrender.com"
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
