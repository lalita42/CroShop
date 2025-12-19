import React, { useState, useContext } from 'react';
import Logo from '../assets/Logo.jpg';
import Google from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from 'react-icons/io5';
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../../utils/Firebase';
import { auth } from '../../utils/Firebase';
import { UserDataContext } from '../Context/UserContext';

export const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { serverUrl } = useContext(AuthDataContext);
  const {getCurrentUser} = useContext(UserDataContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        serverUrl + '/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      console.log("✅ Login successful:", res.data);
      await getCurrentUser();
      navigate('/');

    } catch (error) {
      console.log("❌ Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };
    const googleLogin = async () => {
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
    console.log(result.data)
    getCurrentUser()
    navigate("/")

    console.log("✅ Google login successful:", result.data);
    alert("Google Login Successful");
    await getCurrentUser(); 
    navigate("/");

  } catch (error) {
    console.log("❌ Google signup error:", error.response?.data || error);
    alert("Google Signup Failed");
  }
};

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center px-8 gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <img src={Logo} alt="Logo" className="w-[40px]" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      {/* Page Title */}
      <div className="flex flex-col items-center justify-center mt-2">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px] text-gray-300">
          Welcome to OneCart, please log in
        </span>
      </div>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-[600px] w-[90%] h-[430px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
          <form onSubmit={handleLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
            {/* Google Button */}
            <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[10px] cursor-pointer" onClick={googleLogin}>
              <img src={Google} alt="Google" className="w-[20px]" />
              Login with Google
            </div>

            {/* Divider */}
            <div className="w-full h-[20px] flex items-center justify-center gap-[10px] text-sm">
              <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
              OR
              <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            </div>

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
              <p className="flex gap-2 text-sm">
                Don't have an account?
                <span
                  className="text-[#5555f6cf] font-semibold cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Create New Account
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
