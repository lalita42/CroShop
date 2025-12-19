import React from 'react'
import slid from '../assets/slid.jpg'
import slidee from '../assets/slidee.jpg'
import slidd from '../assets/slidd.jpg'
import slider from '../assets/slider.jpg'

const images = [slid, slidd, slidee, slider]

export const Background = ({ heroCount }) => {
  return (
    <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
      <img
        src={images[heroCount]}
        alt="background"
        className="w-full h-full object-cover transition duration-500 ease-in-out"
      />
    </div>
  )
}
