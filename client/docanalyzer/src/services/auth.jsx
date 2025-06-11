import api from './api';

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const verifyToken = () => {
  return api.post('/auth/verify');
};

export const getProfile = () =>{
  return api.get('/auth/profile');
}