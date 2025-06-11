import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// Interceptor para añadir token a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const uploadFiles = (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  return api.post('/process/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const askGemini = (prompt, files = []) => {
  if (files.length > 0) {
    const formData = new FormData();
    formData.append('prompt', prompt);
    files.forEach((file) => formData.append('files', file));
    return api.post('/documents/ask', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  return api.post('/documents/ask', { prompt });
};

export default api;