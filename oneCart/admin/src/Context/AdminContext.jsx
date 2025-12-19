import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'
export const adminDataContext = createContext()
export const AdminContext = ({children}) => {
    const [adminData,setAdminData] = useState(null)
    const {serverUrl} = useContext(AuthDataContext)
    const getAdmin = async() => {
    try{
        const result = await axios.post(serverUrl + "/api/user/getadmin",{},{withCredentials:true})
        setAdminData(result.data)
        console.log(result.data)
    } catch (error){
        setAdminData(null)
        console.log(error)
    }
}
 useEffect(()=> {
    getAdmin()
 },[] )
    let value ={
        adminData,setAdminData,getAdmin
    }
  return ( 
    <adminDataContext.Provider value={value}>
        {children}</adminDataContext.Provider>
 
  )
}
