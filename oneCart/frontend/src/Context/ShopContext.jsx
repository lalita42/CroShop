import React, { createContext, useContext, useEffect, useState } from 'react'

import axios from 'axios'
import { AuthDataContext } from './AuthContext'
import { UserDataContext } from './UserContext'


const ShopDataContext = createContext()
const ShopContext = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [product,setProducts] =useState([])
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const {serverUrl} = useContext(AuthDataContext)
    const [cartItem, setCartItem] = useState({})
    const {userData} = useContext(UserDataContext)
    const currency ='₹';

    const delivery_fee = 40;

    const getProducts = async ()=>{
        try{
            const result = await axios.get(serverUrl + "/api/product/list")
            console.log(result.data)
            setProducts(result.data)
        } catch(error){
            console.log(error)
        }
    }

    const addToCart= async (itemId , size) =>{
        if(!size) {
            console.log("Select Product Size")
            return;
        }

    let cartData = structuredClone(cartItem);
    if(cartData [itemId]){
        if(cartData[itemId][size]) {
            cartData[itemId][size] +=1;
        } else {
            cartData[itemId][size] =1;
        }
    } else{
        cartData[itemId] ={};
        cartData[itemId][size] = 1;   
    }

    setCartItem(cartData);
       if (userData) {
        try {
      
            let result = await axios.post(serverUrl + '/api/cart/add' , { itemId,size} , {withCredentials: true})
            setLoading(false)
            console.log(result.data)
        }
     catch (error){
        console.log(error)
     } 
     }
    
    }

    const getUserCart =async ()=>{
        try{
            const result = await axios.post(serverUrl + '/api/cart/get' , {} , {withCredentials: true})
        setCartItem(result.data)

    } catch (error) {
        console.log(error)
    }
}
    const updateQuantity = async (itemId,size ,quantity) =>{
        let cartData = structuredClone(cartItem)
        cartData[itemId][size]= quantity 
        setCartItem(cartData)

    if(userData) {     
        try{
            await axios.post(serverUrl + '/api/cart/update' , { itemId,size,quantity} , {withCredentials: true})

        } catch (error){
            console.log(error)
            toast.error(error.message)
        }
    }
    }
    const getCartCount =() =>{
        let totalCount = 0;
        for (const items in cartItem){
            for (const item in cartItem[items]){
                try{
                    if(cartItem[items][item]> 0){
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {

                }
            }
        } return totalCount
    }

    const getCartAmount = ()=>{
        let totalAmount= 0;
        for (const items in cartItem) {
            let itemInfo = product.find((product)=> product._id === items)
            for(const item in cartItem[items]){
                try{
                    if (cartItem[items][item]> 0){
                        totalAmount += itemInfo.price * cartItem[items][item];
                    
                }

        } catch(error){
            console.log(error);
        }
    }
}
    return totalAmount;

    }
    useEffect(()=>{
        getProducts()
    },[])

     useEffect(()=>{
        getUserCart()
    },[])


    const value = {
        product,
        currency,
        delivery_fee,
        showSearch,search, 
        setShowSearch,setSearch, 
        getProducts,
        cartItem,
        addToCart,
        getCartCount, 
        setCartItem,
        getUserCart,
        updateQuantity,
        getCartAmount
    }
  return (
    <ShopDataContext.Provider value={value}>
        {children}</ShopDataContext.Provider>
  )
}

export {ShopDataContext,ShopContext};