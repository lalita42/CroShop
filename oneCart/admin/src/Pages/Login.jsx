import React, { useState, useContext } from 'react';
import Logo from '../assets/Logo.jpg';
import Google from '../assets/google.png';

import { IoEyeOutline, IoEye } from 'react-icons/io5';
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext';
import { adminDataContext } from '../Context/AdminContext';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {serverUrl} = useContext(AuthDataContext)
  const {adminData , getAdmin} = useContext(adminDataContext)
  const navigate = useNavigate()
  const AdminLogin = async (e) => {
    e.preventDefault()
    try{
        const result = await axios.post(serverUrl + '/api/auth/adminLogin',{email ,password} ,{withCredentials:true})
        console.log(result.data)
        getAdmin()
        navigate("/")
    } catch(error){
        console.log(error)
    }
  }
  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center px-8 gap-4 cursor-pointer">
        <img src={Logo} alt="Logo" className="w-[40px]" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      {/* Page Title */}
      <div className="flex flex-col items-center justify-center mt-2">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px] text-gray-300">
          Welcome to OneCart, Apply to Admin Login
        </span>
      </div>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-[600px] w-[90%] h-[390px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
          <form action="" onSubmit={AdminLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
            {/* Google Button */}
            

            {/* Divider */}
           
            {/* Form Inputs */}
            <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]">
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              />

              {/* Password Field with Toggle */}
              <div className="w-full relative">
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
                />
                <div
                  className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer text-white"
                  onClick={() => setShow(prev => !prev)}
                >
                  {show ? <IoEye /> : <IoEyeOutline />}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold"
              >
                Login
              </button>

              {/* Redirect */}

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
