import React, { useContext } from 'react'
import {Routes,Route, Navigate, useLocation} from 'react-router-dom'
import { Registration } from './Pages/Registration'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Nav } from './Component/Nav'
import { UserDataContext } from './Context/UserContext'
import { About } from './Pages/About'
import { Collection } from './Pages/Collection'
import { Product } from './Pages/Product'
import { Contact } from './Pages/Contact'
import { ProductDetail } from './Pages/ProductDetail'
import { Cart } from './Pages/Cart'
import { PlaceOrder } from './Pages/PlaceOrder'
import { Order } from './Pages/Order'
import { NotFound } from './Pages/NotFound'
import { Ai } from './Component/Ai'

export const App = () => {
 const {userData} = useContext(UserDataContext)
 const location = useLocation()
  return (
    <>
    {userData && <Nav/>}
    <Routes>
       
        <Route path='/login' element={userData ?(<Navigate to={location.state?.from || "/"}/>) :(<Login/>)}/>

        <Route path='/signup' element={userData ?(<Navigate to={location.state?.from || "/"}/>) :(<Registration/>)} />
        <Route path='/' element={userData ? <Home/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/about' element={userData ? <About/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/collection' element={userData ? <Collection/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/product' element={userData ? <Product/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/registration' element={userData ? <Registration/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/contact' element ={userData ? <Contact/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/productdetail/:productId' element ={userData ? <ProductDetail/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/cart' element ={userData ? <Cart/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/placeorder' element ={userData ? <PlaceOrder/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
        <Route path='/order' element ={userData ? <Order/> : <Navigate to="/login" state={{ from: location.pathname }}/> } />
         <Route path='*' element ={<NotFound/>} />
    </Routes>
    <Ai/>
    </>
  )
}
