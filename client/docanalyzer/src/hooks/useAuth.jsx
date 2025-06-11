import { createContext, useState, useEffect, useContext } from 'react';
import {
  login as apiLogin,
  register as apiRegister,
  verifyToken,
  getProfile as apiGetProfile,
} from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const verifyRes = await verifyToken();
          const profileRes = await apiGetProfile();

          const combinedUser = {
            id: verifyRes.data.user.id,
            role: verifyRes.data.user.role,
            ...profileRes.data, 
          };

          setUser(combinedUser);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await apiLogin(credentials);
    localStorage.setItem('token', data.accessToken);

    const profileRes = await apiGetProfile();

    const combinedUser = {
      id: data.user.id,
      role: data.user.role,
      ...profileRes.data,
    };

    setUser(combinedUser);
  };

  const register = async (userData) => {
    const { data } = await apiRegister(userData);
    localStorage.setItem('token', data.accessToken);

    const profileRes = await apiGetProfile();

    const combinedUser = {
      id: data.user.id,
      role: data.user.role,
      ...profileRes.data,
    };

    setUser(combinedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const getProfile = async () => {
    const profileRes = await apiGetProfile();
    setUser((prev) => ({
      ...prev,
      ...profileRes.data,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
