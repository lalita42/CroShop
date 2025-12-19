import React from 'react'
import { Titile } from './Titile';
import { RiExchangeFundsLine } from "react-icons/ri"
import { TbRosetteDiscountCheckFilled } from "react-icons/tb"
import { BiSupport } from "react-icons/bi"

export const OurPolicy = () => {
  return (
    <div className="w-full min-h-[100vh] md:h-[70vh] flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0e2025] gap-[50px] py-[40px]">
      <div className="text-center">
        <Titile text1="OUR" text2="POLICY" />
        <p className="text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Customer-Friendly Policies - Committed to Your Satisfaction and Safety.
        </p>
      </div>

      <div className="w-full flex items-center justify-center flex-wrap gap-[40px] md:gap-[50px] px-[10px]">
        {/* Exchange Policy */}
        <div className="w-[300px] max-w-[90%] flex items-center justify-center flex-col gap-[10px]">
          <RiExchangeFundsLine className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] text-[#90e0ef]" />
          <h2 className="font-semibold md:text-[25px] text-[18px]">Easy Exchange Policy</h2>
          <p className="font-semibold text-[18px] text-[aliceblue] text-center">
            Exchange Made Easy 🔁 Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Return Policy */}
        <div className="w-[300px] max-w-[90%] flex items-center justify-center flex-col gap-[10px]">
          <TbRosetteDiscountCheckFilled className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] text-[#90e0ef]" />
          <h2 className="font-semibold md:text-[25px] text-[18px]">7 Days Return Policy</h2>
          <p className="font-semibold text-[18px] text-[aliceblue] text-center">
            Shop With Confidence - 7 days Easy Return Guarantee.
          </p>
        </div>

        {/* Support */}
        <div className="w-[300px] max-w-[90%] flex items-center justify-center flex-col gap-[10px]">
          <BiSupport className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] text-[#90e0ef]" />
          <h2 className="font-semibold md:text-[25px] text-[18px]">Best Customer Support</h2>
          <p className="font-semibold text-[18px] text-[aliceblue] text-center">
            Trusted Customer Support - Your Satisfaction is Our Priority
          </p>
        </div>
      </div>
    </div>
  );
}
