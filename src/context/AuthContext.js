import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { checkPasswordStatus, setMemoryTokens } from "../components/ApiService";
// import useSessionTimeout from "../customHooks/useSessionTimeout";

import {checkPasswordStatus , setMemoryTokens}  from "../Services/ApiService";
import useSessionTimeout from "../customHooks/useSessionTimeout";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(() => 
    sessionStorage.getItem("authToken") || null
  );
  
  const [refreshToken, setRefreshToken] = useState(() => 
    sessionStorage.getItem("refreshToken") || null
  );
  
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const [permissions, setPermissions]= useState([])
  const [isLoading, setIsLoading] = useState(false); 
  const [passwordStatus, setPasswordStatus] = useState(null);



  useEffect(() => {
    //const storedUser = localStorage.getItem("user");
    const storedUser = sessionStorage.getItem("user");
   // const storedUser = user;

    if (authToken && refreshToken && storedUser) {
      setUser(JSON.parse(storedUser));
     
    } 
    setLoading(false);
  }, [authToken,refreshToken]);
  useEffect(() => {
   //const storedUser = localStorage.getItem("user");
   const storedUser = sessionStorage.getItem("user");
    // const storedUser = user;
    // if (storedUser) {
    //   try {
    //     const parsedUser = JSON.parse(storedUser);
    //     if (parsedUser.permissions) {
    //       setPermissions(parsedUser.permissions.map((p) => p.permissionId));
    //     }
    //   } catch (error) {
    //     console.error("Failed to parse user data:", error);
    //   }
    // }
  }, []);

 
const checkPassword = async()=>{
    try {
      setIsLoading(true);
      const response = await checkPasswordStatus();
      setPasswordStatus(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to check password status:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
}


  const login = async  (token, refreshTkn,userData) => {
    setAuthToken(token);
    setRefreshToken(refreshTkn);
    const formattedUser = {
      userId: userData.userId,
      username: userData.username,
      firstName: userData.firstName,
      role: userData.roles,
      branchName: userData.branchName,
      active: userData.active,
      passwordChanged: userData.passwordChanged,
      newUser: userData.newUser, 
      // permissions: userData.permissions
    };

    setMemoryTokens(token, refreshTkn); 
    // // localStorage.setItem("authToken", token);
    // // localStorage.setItem("refreshToken", refreshTkn);
    // localStorage.setItem("user", JSON.stringify(formattedUser));

    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("refreshToken", refreshTkn);
    sessionStorage.setItem("user", JSON.stringify(formattedUser));

    console.log("Token set: ", token, "Refresh token set: ", refreshTkn);
    setUser(formattedUser);
  // setPermissions(userData.permissions.map((p ) => p.permissionId));


   const status = await checkPassword();
   setPasswordStatus(status);
    return status;
  };

  const logout = () => {
    setAuthToken(null);
    setRefreshToken(null)
    setUser(null);
    // setPermissions([]);
     sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
    setMemoryTokens(null, null);
    setLoading(false); 
    navigate("/login");

  };

 
  useSessionTimeout(logout); 
 


  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, loading,passwordStatus,checkPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;





