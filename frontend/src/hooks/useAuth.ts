import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getToken = () => localStorage.getItem('token');

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (getToken()) setIsAuthenticated(true);
  }, []);

  return {
    isAuthenticated,
    getToken,
    login,
    logout,
  };
};