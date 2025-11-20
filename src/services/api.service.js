// src/services/api.js
import axios from "axios";
import { storage } from "@/auth/utils/storage";

const api = axios.create({
  // Usar ruta relativa - Vite proxy redirige /api a backend:4000
  baseURL: "/api",
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
