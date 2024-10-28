import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [JwtToken, setJwtToken] = useState(() => {
    return localStorage.getItem('token'); 
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setJwtToken(token);
    localStorage.setItem('token', token);

  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    setJwtToken(null);
  };

  const JwtCheckTime = (token) =>{
  if (!token) {
    return false;
  }
  try {
    const { exp } = jwtDecode(token); 
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  } catch (error) {
    console.log("Erro ao decodificar o token:", error);
    return false; 
  }
}

if (JwtToken) {
  console.log('acheguei')
  if(!JwtCheckTime (JwtToken)){
    logout();
    console.log('a')
  }
 }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, JwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
