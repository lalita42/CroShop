import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { Titile } from '../Component/Titile.jsx'
import { Card } from '../Component/Card.jsx'

export const RelatedProduct = ({ category, subCategory, currentProductId }) => {
  const { product } = useContext(ShopDataContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (product.length > 0) {
      let productCopy = product.slice()
      productCopy = productCopy.filter((item) => category === item.category)
      // Temporarily disable this line if no products show up
      productCopy = productCopy.filter((item) => subCategory === item.subCategory)
      productCopy = productCopy.filter((item) => currentProductId !== item._id)
      setRelated(productCopy.slice(0, 4))
      console.log("Related Products:", productCopy)
    }
  }, [product, category, subCategory, currentProductId])

  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>
      <div className='ml-[20px] lg:ml-[80px]'>
        <Titile text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='w-full mt-[30px] flex flex-wrap gap-[20px] justify-center'>
        {
          related.length > 0 ? (
            related.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className='text-white'>No related products found.</p>
          )
        }
      </div>
    </div>
  )
}

