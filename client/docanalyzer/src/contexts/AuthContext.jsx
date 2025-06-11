// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { verifyToken } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyToken();
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
