import { createContext, useEffect, useState } from 'react';
import {
  fetchUserProfile,
  loginUser,
  registerUser,
} from '../utils/authService.js';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const profile = await fetchUserProfile(token);
          setUser(profile);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        const savedToken = Cookies.get('token');
        if (savedToken && !token) {
          setToken(savedToken);
        } else {
          setIsLoading(false);
        }
      }
    };

    loadUser();
  }, [token]);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginUser({ username, password });
      setToken(data.token);
      Cookies.set('token', data.token);
      setUser(data.user);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await registerUser({ username, email, password });
      setToken(data.token); // Если API возвращает токен сразу после регистрации
      setUser(data.user);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
