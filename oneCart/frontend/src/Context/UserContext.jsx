// ✅ UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthDataContext } from './AuthContext';
import axios from 'axios';

const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/getcurrentuser`,
        {},
        { withCredentials: true }
      );
      console.log("✅ User data response:", result.data);
      setUserData(result.data.user || result.data); // fallback
    } catch (error) {
      if (error.response?.status === 401) {
      console.warn("User is not authenticated. Probably logged out.");
    } else {
      console.error("❌ getCurrentUser error:", error);
    }
    setUserData(null);   }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { userData, setUserData, getCurrentUser };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export {UserContext,UserDataContext};