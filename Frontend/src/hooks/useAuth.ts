import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth';
import Cookies from 'js-cookie'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('session'));
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await authApi.login(email, password);
      console.log(token)
      
      // Configura la cookie de sesión
      Cookies.set('session', token, { 
        expires: 7, // 7 días de expiración
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      setIsAuthenticated(true);
      navigate('/categories');
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('session');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return { isAuthenticated, login, logout };
};
