import React, { useContext, useEffect, useState } from 'react'
import { Titile } from './Titile' 
import { ShopDataContext } from '../Context/ShopContext';
import { Card } from './Card';

export const LatestCollection = () => {
    const {product} = useContext(ShopDataContext)
    const[latestProducts,setLatestProducts] = useState([])

    useEffect(()=>{
        setLatestProducts(product.slice(0,8))
    },[product])
      const LATEST = "LATEST";
  const COLLECTIONS = "COLLECTIONS";
  return (
    <div>
    <div className='h-[8%] w-[100%] text-center md:mt-50[px]'>
    <Titile text1={LATEST} text2={COLLECTIONS}/><p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>Step Into Style New Collection Dropping this season!</p></div>
    <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>{
        latestProducts.map((item,index)=>(
            <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
        ))}</div>
  </div>
  )
}
