import api from "@services/api.service.js";
import { storage } from "../utils/storage";
import { mapMenuFromBackend, validateMenu } from "@/utils/menuMapper";

const handleApiError = (error) => {
  // 1) Si el backend envía un mensaje, usarlo y salir
  const backendMessage = error?.message;

  if (backendMessage) {
    return {
      success: false,
      message: backendMessage,
    };
  }

  // 2) Errores sin respuesta (problemas de red)
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return {
        success: false,
        message: "Tiempo de espera agotado. Por favor, intente nuevamente.",
      };
    }
    return {
      success: false,
      message: "Error de conexión con el servidor",
    };
  }

  // 3) Errores HTTP sin mensaje específico
  switch (error.response.status) {
    case 401:
      return {
        success: false,
        message: "Credenciales incorrectas",
      };
    case 503:
      return {
        success: false,
        message: "Error de conexión con la base de datos",
      };
    default:
      return {
        success: false,
        message: "Error en el servidor",
      };
  }
};

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      
      if (response.data.success) {
        storage.setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } finally {
      storage.clearAuth();
    }
  },

  /**
   * Valida la sesión actual usando el token httpOnly
   * @returns {boolean} isValid
   */
  validateSession: async () => {
    try {
      const response = await api.get("/validate-session");
      // Solo verificamos que el backend confirme que el token es válido
      // Los datos del usuario ya están en localStorage desde el login
      return response.data.success;
    } catch (error) {
      console.error("[authService] Error validando sesión:", error);
      storage.clearAuth();
      return false;
    }
  },

  getMenu: async () => {
    try {
      const response = await api.get("/menu");
      
      if (response.data.success && response.data.menu) {
        // Mapear el menú desde el formato del backend al formato del frontend
        const mappedMenu = mapMenuFromBackend(response.data.menu);
        
        // Validar el menú mapeado
        if (!validateMenu(mappedMenu)) {
          console.error("[authService] El menú mapeado no es válido");
          return {
            success: false,
            menu: [],
            message: "Error al procesar el menú",
          };
        }
        
        return {
          success: true,
          menu: mappedMenu,
          userContext: response.data.userContext,
        };
      }
      
      return response.data;
    } catch (error) {
      return {
        success: false,
        menu: [],
        message: error.response?.data?.message || "Error al cargar menú",
      };
    }
  },
};
