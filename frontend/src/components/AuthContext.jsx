import React, { createContext, useState, useContext } from 'react';

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

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, JwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
