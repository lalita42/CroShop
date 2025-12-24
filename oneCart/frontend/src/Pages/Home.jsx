import React, { useState } from 'react'
import { Background } from '../Component/Background'
import { Hero } from '../Component/Hero'
import { Nav } from '../Component/Nav';
import { Product } from './Product'
import { OurPolicy } from '../Component/OurPolicy'
import { NewLetterBox } from '../Component/NewLetterBox'
import { Footer } from '../Component/Footer'

export const Home = () => {
  const heroData = [ 
    { text1: "30% off limited offer", text2: "Style that inspires" },
    { text1: "Discover bold fashion", text2: "Limited time only" },
    { text1: "Explore our best collection", text2: "Shop now" },
    { text1: "Choose your perfect fit", text2: "Now on sale!" }
  ]

  const [heroCount, setHeroCount] = useState(0)

  return (
    <div className='overflow-x-hidden relative top-[70px]'>
    <div className="w-screen h-screen flex flex-col md:flex-row bg-gradient-to-l from-[#141414] to-[#0c2025]">
     
      <Hero 
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
      />
      <Background heroCount={heroCount} />
    </div>
    <Product/>
    <OurPolicy/>
    <NewLetterBox/>
    <Footer/>
    </div>
  )
}
