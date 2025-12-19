import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Add } from './Pages/Add'
import { List } from './Pages/List'
import { Login } from './Pages/Login'
import { Order } from './Pages/Order'
import { Home } from './Pages/Home'
import { adminDataContext } from './Context/AdminContext'

export const App = () => {
  let {adminData} = useContext(adminDataContext)
  return (
    <>
    {!adminData ? <Login/> : <>
  <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/list' element={<List/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/order' element={<Order/>}/>
  </Routes> </>
  }
    </>
  )
}

