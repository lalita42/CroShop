import React from 'react';
import logo from '../assets/Logo.jpg';

export const Footer = () => {
  return (
    <div className="w-full mb-[77px] md:mb-0 bg-[#dbfcfcec]">
      <div className="flex md:flex-row items-center md:items-start justify-between px-5 md:px-12 py-10 gap-8">
        
        {/* Logo and Description */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <p className="text-xl font-semibold text-black">OneCart</p>
          </div>
          <p className="text-[15px] text-[#1e2223] ">
            OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery — all backed by trusted service designed to make your life easier every day.
          </p>
          <p className="text-[15px] text-[#1e2223] mt-2 md:hidden">
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/4 text-center">
          <h3 className="text-xl font-semibold text-[#1e2223] mb-3">COMPANY</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-[#1e2223]">Home</li>
            <li className="cursor-pointer text-[#1e2223]">About Us</li>
            <li className="cursor-pointer text-[#1e2223]">Delivery</li>
            <li className="cursor-pointer text-[#1e2223]">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/4 text-center">
          <h3 className="text-xl font-semibold text-[#1e2223] mb-3 ">Get In Touch</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-[#1e2223]">9779797997</li>
            <li className="cursor-pointer text-[#1e2223]">one@gmail.com</li>
            <li className="cursor-pointer text-[#1e2223]">2099939393y</li>
            <li className="cursor-pointer text-[#1e2223]">adminCART@gmail.com</li>
          </ul>
        </div>

      </div> 
      <div className='w-[100%] h-[1px] bg-slate-400'></div>
      <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center'> Copyright 2025@OneCart.com-All Rights Reserved</div>
    </div>
  );
};
