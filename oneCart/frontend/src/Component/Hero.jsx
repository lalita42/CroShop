import React from 'react'
import { FaCircle } from "react-icons/fa";

export const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-center px-6 md:px-10 py-10 md:py-0">
      <div className="space-y-4 text-center md:text-left">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-[24px] sm:text-[32px] md:text-[40px] lg:text-[55px] font-extrabold leading-snug drop-shadow-md">
          {heroData.text1}
        </p>
        <p className="text-white text-[18px] sm:text-[24px] md:text-[30px] lg:text-[40px] font-medium italic">
          {heroData.text2}
        </p>
      </div>

      <div className="absolute bottom-6 md:bottom-12 left-1/2 md:left-[10%] transform -translate-x-1/2 md:translate-x-0 flex items-center justify-center gap-3">
        {[0, 1, 2, 3].map(index => (
          <FaCircle
            key={index}
            className={`w-[12px] h-[12px] cursor-pointer ${
              heroCount === index ? "fill-orange-400 scale-110" : "fill-white opacity-70"
            }`}
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>
    </div>
  )
}
