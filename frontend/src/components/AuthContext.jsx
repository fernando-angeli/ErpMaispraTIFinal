import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [JwtToken, setJwtToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setJwtToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setJwtToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, JwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
