import React from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Titile } from '../Component/Titile'
import { FcFullTrash } from "react-icons/fc";
import { CartTotal } from '../Component/CartTotal'
export const Cart = () => {
    const { product, currency,cartItem , updateQuantity} = useContext(ShopDataContext)
    const [cartData, setCartData] =useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const tempData=[];
        for (const items in cartItem){
            for (const item in cartItem[items]){
                    if(cartItem[items][item]> 0){
                        tempData.push({
                            _id:items,
                            size:item,
                            quantity:cartItem[items][item],
                        })
                    }
            }
        }
        setCartData(tempData);
    },[cartItem])
  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <div className='h-[8%] w-[100%] text-center mt-[80px]'>
            <Titile text1={'YOUR'} text2={'CART'}/></div>
            <div className='w-[100%] h-[92%] flex-wrap gap-[20px]'>
                {
                    cartData.map((item,index)=>{
                        const productData = product.find((product)=>
                        product._id === item._id)
                        return(
                            <div key={index} className="w-full h-[10%] border-b">
                        <div className="w-full h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative">
                     <img className="w-[100px] h-[100px] rounded-md" src={productData.image1} alt="Product" />
                   
                 <div className="flex items-start justify-center flex-col gap-[10px]">
  <p className="md:text-[25px] text-[20px] text-[#f3f9fc]">
  {productData.name}
</p>

<div className="flex items-center gap-[20px]">
  <p className="text-[20px] text-[#aaf4e7]">
    {currency} {productData.price}
  </p>

  <p className="w-[40px] h-[40px] text-[16px] text-white bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9f9f9f]">
    {item.size}
  </p>
  </div>  </div>
<input
  type="number"
  min={1}
  defaultValue={item.quantity}
  className="md:max-w-20 max-w-10 md:px-2 md:py-2 px-[10px] py-[5px] text-white text-[18px] font-semibold bg-[#518080b4] absolute top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9f9f9f] rounded-md"
  onChange={(e) =>
    e.target.value === '' || e.target.value === '0'
      ? null
      : updateQuantity(item._id, item.size, Number(e.target.value))
  }
/>

<FcFullTrash className='text-[#9ff9f9] h-[25%] w-[50px] absolute top-[45%] md:top-[45%] md:right-[5%] right-1' onClick={()=>updateQuantity(item._id, item.size, 0)}/>

  </div>
  </div>
                        )
                    })
                }</div>
               <div className="flex justify-start items-end my-20">
  <div className="w-full sm:w-[450px]">
    <CartTotal />

    <button
      className="text-[18px] hover:bg-slate-500 cursor-pointer bg-[#518080b4] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]"
      onClick={() => {
       if (cartData.length>0){
        navigate("/placeorder")
       } else{
        console.log("Your Cart is Empty")
       }
      }}
    >
      PROCEED TO CHECKOUT
    </button>
  </div>
</div>

</div>
  )
}

                        