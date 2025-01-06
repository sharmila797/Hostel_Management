import React, { createContext, useState, useEffect, useContext } from 'react';
import {Cookies} from 'react-cookie'
import {fetchUser} from '../services/auth/authServices'
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const getUser = async ()=>{
      try{
        const token = cookies.get('token');
        const decoded = jwtDecode(token);
        const response = await fetchUser(decoded.userid);
        setUser(response.data.user)
        setIsAuthenticated(true)
      }catch(error){
        cookies.remove('token')
        setIsAuthenticated(false);
        setUser(null);
      }finally{
        setLoading(false);
      }
    }
    getUser();
  },[])


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, user, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);


















// import React, { createContext, useState, useContext, useEffect } from 'react';
// import {Cookies} from 'react-cookie'
// import { fetchUser } from '../services/userlogin/userServices';
// import {jwtDecode} from "jwt-decode";


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const cookies = new Cookies();
//   const [auth, setAuth] = useState(() => {
//     const storedUser = localStorage.getItem('users');
//     console.log("stored",JSON.parse(storedUser))
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // const login = (user) => {
//   //   console.log("auth",user)
//   //   setAuth(user);
//   //   localStorage.setItem('users', JSON.stringify(user));
//   // };


//   const login = async (user) => {
//     try {
//       const response = await fetchUser (user );
//       console.log("response",response)
//       if(response.data.success)
//       {
//         setAuth(response.data.data);
//       }
      
//     } catch (err) {
//       console.error(err);
//       throw new Error('Login failed');
//     }
//   };

//   const logout = () => {
//     setAuth(null);
//     // localStorage.removeItem('users');
//     document.cookie = 'authToken=; Max-Age=0';
//   };


//   // useEffect(() => {
//   //   // Attempt to read the token on page load
//   //   const token = document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1];
//   //   if (token) {
//   //     // Validate the token (optional) and fetch user details
//   //     axios.get("/api/validate-token", { headers: { Authorization: `Bearer ${token}` } })
//   //       .then((res) => setAuth(res.data.user))
//   //       .catch(() => logout());
//   //   }
//   // }, []);


//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
