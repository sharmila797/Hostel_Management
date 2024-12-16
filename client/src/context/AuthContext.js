import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem('users');
    console.log("stored",storedUser)
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user) => {
    console.log("auth",user)
    setAuth(user);
    localStorage.setItem('users', JSON.stringify(user));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('users');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
