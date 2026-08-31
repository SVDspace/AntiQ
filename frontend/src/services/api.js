import axios from 'axios';
import { disconnectSocket } from '../socket.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('antiq_token');

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('antiq_token');
      localStorage.removeItem('antiq_user');
      disconnectSocket();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
