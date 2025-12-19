import React, { useContext, useState } from 'react';
import Logo from '../assets/Logo.jpg';
import Google from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../../utils/Firebase';
import { auth } from '../../utils/Firebase';
import { UserDataContext } from '../Context/UserContext';

export const Registration = () => {
  const[show,setShow] = useState(false)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {serverUrl} = useContext(AuthDataContext)
  const { userData, getCurrentUser } = useContext(UserDataContext)
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault()
      const data = { user, email, password }; // example
  console.log("Sending data:", data);
    try{
      const result = await axios.post(serverUrl + '/api/auth/registration',{name,email,password},{
        withCredentials:true});
        console.log(result.data)
          getCurrentUser()
          navigate("/");

    }catch(error){
      console.log(error)
    }
  }

  const googleSignup = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    const name = user.displayName;
    const email = user.email;

    // Generate a dummy password (should be at least 8 characters)
    const dummyPassword = (email + user.uid).slice(0, 12);

    // Send name, email, dummy password to your backend
    const result = await axios.post(
      serverUrl + "/api/auth/googleLogin",
      {
        name,
        email,
        password: dummyPassword, // ✅ send dummy password
      },
      { withCredentials: true }
    );

    console.log("✅ Google login successful:", result.data);
    alert("Google Login Successful");
   
    navigate("/");

  } catch (error) {
    console.log("❌ Google signup error:", error.response?.data || error);
    alert("Google Signup Failed");
  }
};

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col">
      {/* Header */}
      <div
        className="w-full h-[80px] flex items-center px-8 gap-4 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={Logo} alt="Logo" className="w-[40px]" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      {/* Page Title */}
      <div className="flex flex-col items-center justify-center mt-2">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px] text-gray-300">
          Welcome to OneCart, Place your order
        </span>
      </div>
       

      {/* Registration Card */}
      <div className='flex flex-1 items-center justify-center'>
        <div className='max-w-[600px] w-[90%] h-[430px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
          <form action="" onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>

            {/* Google Registration Button */}
            <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignup}>
              <img src={Google} alt="Google" className='w-[20px]' />
              Registration with Google
            </div>

            {/* OR Divider */}
            <div className='w-full h-[20px] flex items-center justify-center gap-[10px] text-sm'>
              <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
              OR
              <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>

            {/* Form Inputs */}
           <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]'>
  <input
    type="text"
    className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold relative'
    placeholder='UserName'
    required onChange={(e)=>setName(e.target.value)} value={name}
  />
  <input
    type="text"
    className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
    placeholder='Email'
    required onChange={(e)=>setEmail(e.target.value)} value={email}
  />
  <input
    type= {show?"text":"password"}
    className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
    placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
    {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[12%] top-[64.4%]' onClick={()=>setShow(prev => 
      !prev)}/> } 
    {show && <IoEye  className='w-[20px] h-[20px] cursor-pointer absolute right-[12%] top-[64.4%]' onClick={()=>setShow(prev => !prev)}/>}
  <button
    className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'> Create Account
  </button>
  <p className='flex gap=[10px]'>You have any account?
    <span className=' text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/login")}>Login</span>
  </p>
</div>
          </form>
        </div>
      </div>
   </div>
  );
};
