import React, { useContext, useState } from 'react'
import { Titile } from '../Component/Titile'
import { CartTotal } from '../Component/CartTotal'
// import rozarpay from '../assets/rojar.png' ❌ Razorpay image disabled
import { ShopDataContext } from '../Context/ShopContext'
import { AuthDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const PlaceOrder = () => {

  // Payment method (ONLY COD ENABLED)
  const [method, setMethod] = useState('cod')

  const { serverUrl } = useContext(AuthDataContext)
  const navigate = useNavigate()

  const {
    cartItem,
    setCartItem,
    getCartAmount,
    delivery_fee,
    product
  } = useContext(ShopDataContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  // Handle input change
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  /* ===============================
     Razorpay Payment (DISABLED)
     =============================== */

  // const initPay = (order) => {
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: 'Order Payment',
  //     description: 'Order Payment',
  //     order_id: order.id,
  //     handler: async (response) => {
  //       console.log(response)
  //     }
  //   }
  //   const rzp = new window.Razorpay(options)
  //   rzp.open()
  // }

  // Submit order (COD ONLY)
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      let orderItems = []

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              product.find(p => p._id === items)
            )
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod': {
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          )

          if (result.data) {
            setCartItem({})
            navigate("/order")
          } else {
            console.log(result.data.message)
          }
          break
        }

        // case 'razorpay': {
        //   const resultRozorPay = await axios.post(
        //     serverUrl + "/api/order/razorpay",
        //     orderData,
        //     { withCredentials: true }
        //   )
        //   if (resultRozorPay.data) {
        //     initPay(resultRozorPay.data)
        //   }
        //   break
        // }

        default:
          break
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#0c2021] to-[#141414]
                    flex items-center justify-start flex-col md:flex-row gap-[50px]
                    relative pb-[90px]'>

      {/* ================= LEFT FORM ================= */}
      <div className='lg:w-[50%] w-[100%] flex items-center justify-center lg:mt-0 mt-[90px]'>
        <form
          onSubmit={onSubmitHandler}
          className='lg:w-[70%] w-[95%]'
        >
          <div className='py-[10px]'>
            <Titile text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='flex gap-[10px] px-[10px]'>
            <input type="text" placeholder='First Name' name="firstName"
              value={formData.firstName} onChange={onChangeHandler} required
              className='w-[50%] h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />

            <input type="text" placeholder='Last Name' name="lastName"
              value={formData.lastName} onChange={onChangeHandler} required
              className='w-[50%] h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />
          </div>

          <div className='px-[10px] mt-[10px]'>
            <input type="email" placeholder='Email' name="email"
              value={formData.email} onChange={onChangeHandler} required
              className='w-full h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />
          </div>

          <div className='px-[10px] mt-[10px]'>
            <input type="text" placeholder='Street' name="street"
              value={formData.street} onChange={onChangeHandler} required
              className='w-full h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />
          </div>

          <div className='flex gap-[10px] px-[10px] mt-[10px]'>
            <input type="text" placeholder='City' name="city"
              value={formData.city} onChange={onChangeHandler} required
              className='w-[50%] h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />

            <input type="text" placeholder='State' name="state"
              value={formData.state} onChange={onChangeHandler} required
              className='w-[50%] h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />
          </div>

          <div className='flex gap-[10px] px-[10px] mt-[10px]'>
            <input type="text" placeholder='Pincode' name="pinCode"
              value={formData.pinCode} onChange={onChangeHandler} required
              className='w-[50%] h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />

            <input type="text" placeholder='Country' name="country"
              value={formData.country} onChange={onChangeHandler} required
              className='w-[50%] h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />
          </div>

          <div className='px-[10px] mt-[10px]'>
            <input type="text" placeholder='Phone' name="phone"
              value={formData.phone} onChange={onChangeHandler} required
              className='w-full h-[50px] rounded-md bg-slate-700 text-white px-[20px]' />
          </div>

          <button
            type="submit"
            className='mt-[30px] bg-[#3bcee8] text-white px-[50px] py-[12px] rounded-xl'
          >
            PLACE ORDER
          </button>
        </form>
      </div>

      {/* ================= RIGHT SUMMARY ================= */}
      <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
        <div className='lg:w-[70%] w-[90%] flex flex-col gap-[20px]'>
          <CartTotal />
          <Titile text1={'PAYMENT'} text2={'METHOD'} />

          {/* COD ONLY */}
          <button
            className='w-[200px] h-[50px] bg-gradient-to-t from-[#95b3fb] to-white
                       text-[#332f6f] font-bold border-[4px] border-blue-900'>
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </div>
  )
}
