import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { ShopDataContext } from '../Context/ShopContext';



export const Card = ({ name, image ,id, price }) => {
  const { currency } = useContext(ShopDataContext);
  const navigate = useNavigate()
  return (
    <div className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]' onClick={()=> navigate(`/productdetail/${id}`)}>
      <img src={image} alt='' className='w-[100%] h-[80%] object-cover rounded-sm' />
      <div className='text-[#3cf6fa] text-[18px] py-[10px]'>{name}</div>
      <div className='text-[#f3fafa] text-[14px]'>{currency} {price}</div>
    </div>
  );
}