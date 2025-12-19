import React, { useContext, useEffect, useState } from 'react';
import  {ShopDataContext}  from '../Context/ShopContext';
import { Card } from './Card';
import { Titile } from './Titile';


export const BestSeller = () => {
    const { product } = useContext(ShopDataContext);
  const [bestSeller, setBestSeller] = useState([]);
   useEffect(() => {
    const filterProduct = product.filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [product]);
  return (
    <div>
      <div className="h-[8%] w-[100%] text-center mt-[50px]">
        <Titile text1="BEST" text2="SELLER" />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Tried, Tested, Loved Discover Our All-Time Best Sellers.
        </p>
      </div>
      {/* map through bestSeller here if needed */}
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center flex-wrap gap-[50px]'>
        {
            bestSeller.map((item,index)=>(<Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>))
        }
      </div>
    </div>
  );
}