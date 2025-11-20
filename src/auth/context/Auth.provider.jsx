import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth.context";
import { authService } from "../services/auth.service";
import { storage } from "../utils/storage";

export const AuthProvider = ({ children }) => {
  // Inicializar con datos de storage si existen
  const [user, setUser] = useState(() => storage.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!storage.getUser());
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  const signin = async (credentials) => {
    try {
      setErrors([]);
      setLoading(true);
      const response = await authService.login(credentials);

      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      } else {
        storage.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
        setErrors([response.message]);
        return response;
      }
    } catch (error) {
      console.error("[AuthProvider] Error en signin:", error);
      const errorMessage = "Error de conexión con el servidor";
      setErrors([errorMessage]);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    authService.logout();
    storage.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    setMenu([]);
    setErrors([]);
    navigate("/login");
  }, [navigate]);

  // Verificar autenticación al iniciar/refrescar
  useEffect(() => {
    const validateAuth = async () => {
      try {
        setLoading(true);
        
        const storedUser = storage.getUser();
        
        if (storedUser) {
          const isValid = await authService.validateSession();
          
          if (isValid) {
            setUser(storedUser);
            setIsAuthenticated(true);
            
            const menuResponse = await authService.getMenu();
            if (menuResponse.success) {
              setMenu(menuResponse.menu);
            }
          } else {
            storage.clearAuth();
            setUser(null);
            setIsAuthenticated(false);
            setMenu([]);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setMenu([]);
        }
      } catch (error) {
        console.error("[AuthProvider] Error validando sesión:", error);
        storage.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
        setMenu([]);
      } finally {
        setLoading(false);
      }
    };

    validateAuth();
  }, []);

  // Cargar menú cuando el usuario está autenticado
  useEffect(() => {
    const loadMenu = async () => {
      if (isAuthenticated && user && menu.length === 0) {
        try {
          const menuResponse = await authService.getMenu();
          if (menuResponse.success) {
            setMenu(menuResponse.menu);
          }
        } catch (error) {
          console.error("[AuthProvider] Error al cargar menú:", error);
        }
      }
    };

    loadMenu();
  }, [isAuthenticated, user, menu.length]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        errors,
        menu,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
