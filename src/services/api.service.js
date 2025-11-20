// src/services/api.js
import axios from "axios";
import { storage } from "@/auth/utils/storage";

// Determinar la baseURL según el entorno
// En desarrollo: usar proxy de Vite (/api -> localhost:4000)
// En producción: usar URL completa de Azure desde variable de entorno
const getBaseURL = () => {
  // Si existe VITE_API_URL, usarla (producción)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // En desarrollo, usar el proxy
  return "/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // Permite enviar cookies httpOnly
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para el manejo de errores global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar error 401 (token expirado o inválido)
    if (error.response?.status === 401) {
      // Limpiar autenticación local
      storage.clearAuth();
      
      // Redirigir a login solo si no estamos ya en login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
