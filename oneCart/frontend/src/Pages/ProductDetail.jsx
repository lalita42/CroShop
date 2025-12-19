import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../Context/ShopContext'
import {FaStar} from 'react-icons/fa'
import { FaStarHalfAlt } from 'react-icons/fa'
import { RelatedProduct } from '../Component/RelatedProduct'

export const ProductDetail = () => {
  const {productId} = useParams()
  const {product,currency,addToCart} = useContext(ShopDataContext)
  const [productData,setProductData] = useState(false)

  const [image,setImage] = useState('')
  const [image1,setImage1] = useState('')
  const [image2,setImage2] = useState('')
  const [image3,setImage3] = useState('')
  const [image4,setImage4] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {

    product.map((item) => {
      if(item._id === productId){
        setProductData(item)
        console.log(productId)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData()
  },[productId,product])

  return productData ? (
    <div>
    <div className='w-[99vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px] '>
      <div className='lg:w-[50vw] md:w-[90vw] lg:h-[100vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row'>
      <div className='lg:w-[20%] md:w-[80%] lg:h-[80%] h-[10%] flex items-center justify-center lg:gap-[20px] gap-[50px] lg:flex-row flex-wrap'>
        <div className='md:w-[90px] w-[50px] h-[50px] md:h-[90px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
          <img src={image1} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md  ' onClick={()=>setImage(image1)}/>
        </div>
        <div className='md:w-[90px] w-[50px] h-[50px] md:h-[90px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
          <img src={image2} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md  ' onClick={()=>setImage(image2)}/>
        </div>
        <div className='md:w-[90px] w-[50px] h-[50px] md:h-[90px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
          <img src={image3} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md  'onClick={()=>setImage(image3)}/>
        </div>
        <div className='md:w-[90px] w-[50px] h-[50px] md:h-[90px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
          <img src={image4} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md  'onClick={()=>setImage(image4)}/>
        </div>
        </div>
       
        <div className='w-[80%] lg:w-[60%] h-[70%] md:h-[78%] border-[1px] border-[#80808049] rounded-md overflow-hidden '>
          <img
            src={image}
            alt='Selected Product'
            className='w-[100%] h-[100%] object-fill text-center text-white text-[30px] rounded-md'
          />
        </div>
        </div>

<div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start justify-start flex-col  py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px]'>
    <h1 className='text-[40px] font-semibold text-[aliceblue]'>
    {productData.name.toUpperCase()}
  </h1>

  
  <div className='flex items-center gap-[10px]'>
    <FaStar className='text-[20px]' fill='#FFD700' />
    <FaStar className='text-[20px]' fill='#FFD700' />
    <FaStar className='text-[20px]' fill='#FFD700' />
    <FaStar className='text-[20px]' fill='#FFD700' />
    <FaStarHalfAlt className='text-[20px]' fill='#FFD700' />
    <p className='text-[18px] font-semibold pl-[5px] text-[white]'>
  (124)
</p>
</div>
<p className='text-[30px] font-semibold pl-[5px] text-[white]'>
  {currency} {productData.price}
</p>

<p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]'>
  {productData.description} and Stylish, breathable cotton shirt with a modern slim fit.
  Easy to wash, super comfortable, and designed for effortless style.
</p>

<div className='flex flex-col gap-[10px] my-[10px]'>
  <p className='text-[25px] font-semibold pl-[5px] text-[white]'>Select Size</p>

  <div className='flex gap-2'>
    {
      productData.sizes.map((item, index) => (
        <button
          key={index}
          className={`border py-2 px-4 bg-slate-300 rounded-md ${item === size ? 'bg-black text-[#2f97f1] text-[20px]' : ''}`}
          onClick={() => setSize(item)}>{item} </button>
      ))
    }
  </div>

<button className='text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#88808894] text-white shadow-md shadow-black ' onClick={() =>addToCart(productData._id , size)}>
  Add to Cart</button>
</div>
<div className='w-[90%] h-[1px] bg-slate-700'></div>

<div className='w-[80%] text-[16px] text-white'>
  <p>✅ Original Product.</p>
  <p>💰 Cash on delivery is available on this product</p>
  <p>🔄 Fast return and exchange policy within 7 days</p>

    </div>
  </div>

</div>
<div className='w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col overflow-x-hidden pt-[80px] '>
<div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
  <p className='border px-5 py-3 text-sm text-white'>Description</p>
   <p className='border px-5 py-3 text-sm text-white'>Reviews (123)</p>
</div>
  <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3636369c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
  
    <p className='w-[95%] h-[90%] flex items-center justify-center'>
      Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
   </p>
  </div>
   <RelatedProduct 
   category={productData.category}  
   subCategory={productData.subCategory} 
   currentProductId={productData._id}/>
 </div>

</div>



  ):<div className='opacity-0'></div>
}






//       {/*  Right Side: Optional Product Info
//       <div className='text-white text-center lg:text-left'>
//         <h1 className='text-3xl font-semibold mb-2'>{productData.name}</h1>
//         <p className='text-xl mb-4'>{currency} {productData.price}</p>
//         <p className='text-base text-gray-300 mb-6'>{productData.description || 'No description available.'}</p>
//         {/* Add-to-cart button, size selector, etc. can go here */}
