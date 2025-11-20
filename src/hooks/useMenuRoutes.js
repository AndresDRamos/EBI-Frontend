import { useMemo } from "react";
import { useAuth } from "@/auth/hooks/useAuth";

/**
 * ============================================
 * HOOK: useMenuRoutes
 * ============================================
 *
 * Genera las rutas dinámicas basadas en el menú del usuario
 *
 * Lógica de generación:
 * - Nivel 1: Genera ruta Index → /operaciones
 * - Nivel 2: No genera ruta (solo visual/header)
 * - Nivel 3: Genera ruta Report → /operaciones/corte/merma
 *
 * Retorna:
 * - routes: Array de objetos de ruta para react-router
 * - loading: Estado de carga del menú
 */
export const useMenuRoutes = () => {
  const { menu, loading } = useAuth();

  const routes = useMemo(() => {
    if (!menu || menu.length === 0) {
      return [];
    }

    const generatedRoutes = [];

    /**
     * Procesa items del menú recursivamente
     * @param {Array} items - Items del menú
     */
    const processMenuItems = (items) => {
      items.forEach((item) => {
        // Nivel 1: Items del sidebar → Generan ruta Index
        if (item.Nivel === 1) {
          // Solo crear ruta si tiene hijos (tarjetas nivel 2)
          if (item.children && item.children.length > 0) {
            generatedRoutes.push({
              path: item.FullPath, // Ejemplo: /operaciones
              type: "index",
              nivel: 1,
              item: item,
            });
          }
        }

        // Nivel 2: Headers de tarjetas → NO generan ruta
        // Solo sirven para organizar visualmente en el Index
        // PERO sí deben procesar sus hijos (nivel 3)

        // Nivel 3: Items seleccionables → Generan ruta Report
        if (item.Nivel === 3 && item.FullPath) {
          generatedRoutes.push({
            path: item.FullPath, // Ejemplo: /operaciones/corte/merma
            type: "report",
            nivel: 3,
            item: item,
            reportName: item.MenuPath?.replace(/^\//, "") || item.MenuName, // MenuPath sin slash, fallback a MenuName
          });
        }

        // Procesar hijos recursivamente (para todos los niveles)
        if (item.children && item.children.length > 0) {
          processMenuItems(item.children);
        }
      });
    };

    processMenuItems(menu);

    return generatedRoutes;
  }, [menu]);

  return { routes, loading };
};
