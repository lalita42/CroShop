import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {Titile} from '../Component/Titile'
import {ShopDataContext} from '../Context/ShopContext'
import { AuthDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

export const Order = () => {
  let [orderData,setOrderData] = useState([])
  let {currency} = useContext(ShopDataContext)
  let {serverUrl} = useContext(AuthDataContext)

  const loadOrderData = async () =>{
    try{
      const result = await axios.post(serverUrl + '/api/order/userorder',{},{withCredentials:true})
      if(result.data){
      
          let allOrdersItem = []
          result.data.map((order)=>{
            order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
      })
          setOrderData(allOrdersItem.reverse())
      } 
    } catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    loadOrderData()
  },[])
  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
    <div className="h-[8%] w-[100%] text-center mt-[80px]">
  <Titile text1={'MY'} text2={'ORDER'} />
</div>

<div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
  {orderData.map((item, index) => (
    <div key={index} className="w-[100%] h-[10%] border-t border-b">
      <div className="w-[100%] h-[80%] flex items-start gap-6 bg-[#51880408] py-[10px] px-[20px] rounded-2xl relative">
        <img src={item.image1} alt="" className="w-[130px] h-[130px] rounded-md" />
      <div className='flex items-start justify-center flex-col gap-[5px]'>
  <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>
    {item.name}
  </p>

  <div className='flex items-center gap-[8px] md:gap-[20px]'>
    <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>
      {currency} {item.price}
    </p>
    <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>
      Quantity: {item.quantity}
    </p>
    <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>
      Size: {item.size}
    </p>
  </div>
  <div className='flex items-center gap-[8px] md:gap-[20px]'>
    <p className='md:text-[18px] text-[12px] text-[#aa4f4e7]'> Date:<span className='text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]'>{new Date(item.date).toDateString()}</span></p>
  

  {/* Payment Method */}
<div className="flex items-center gap-2 sm:gap-6">
  <p className="text-[12px] sm:text-[14px] text-[#aaf4e7]">
    Payment Method: {item.paymentMethod}
  </p>
</div></div>

{/* Status + Track Order */}
<div className="flex flex-wrap justify-between items-center md:gap-220 gap-2 mt-3 sm:mt-0">
  {/* Status */}
  <div className="flex items-center gap-1 sm:gap-2">
    <span className="w-2 h-2 rounded-full bg-green-500"></span>
    <p className="text-[10px] sm:text-[14px] text-[#f3f9fc]">{item.status}</p>
  </div>

  {/* Track Order Button */}
  <button
    className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] sm:text-[14px] cursor-pointer active:bg-slate-500"
    onClick={loadOrderData}
  >
    Track Order
  </button>
</div>

</div>
</div>
    </div>
      ))
      }
    </div>
    </div>
  )
}


{/* <div className="w-full min-h-screen p-4 pb-36 overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">
  <div className="text-center mt-20">
    <Titile text1={'MY'} text2={'ORDER'} />
  </div> */}

  {/* <div className="w-full flex flex-col gap-4 mt-6">
    {orderData.map((item, index) => (
      <div
        key={index}
        className="w-full border-t border-b bg-[#51880408] rounded-2xl p-3 flex flex-col sm:flex-row sm:items-start sm:gap-4"
      > */}
        {/* Image */}
        {/* <img
          src={item.image1}
          alt=""
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-md mx-auto sm:mx-0"
        /> */}

        {/* Details */}
        {/* <div className="flex flex-col gap-2 mt-3 sm:mt-0">
          Name */}
          {/* <p className="text-lg sm:text-xl text-[#f3f9fc] font-semibold">
            {item.name}
          </p> */}

          {/* Price / Qty / Size */}
          {/* <div className="flex flex-wrap gap-3 text-sm sm:text-base text-[#aaf4e7]">
            <p>{currency} {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Size: {item.size}</p>
          </div> */}

          {/* Date */}
          {/* <p className="text-xs sm:text-sm text-[#aa4bff]">
            Date: <span className="text-[#e4fbff]">{new Date(item.date).toDateString()}</span>
          </p> */}

          {/* Payment */}
          {/* <p className="text-xs sm:text-sm text-[#aaf4e7]">
            Payment Method: {item.paymentMethod}
          </p> */}

          {/* Status & Track Button */}
          {/* <div className="flex justify-between items-center mt-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <p className="text-xs sm:text-sm text-[#f3f9fc]">{item.status}</p>
            </div>
            <button
              className="px-3 py-1 rounded-md bg-[#101919] text-[#f3f9fc] text-xs sm:text-sm cursor-pointer active:bg-slate-500"
              onClick={loadOrderData}
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div> */}
