import { Route } from "react-router-dom";
import { useMenuRoutes } from "@/hooks/useMenuRoutes";
import Index from "@/pages/Index";
import ReportPage from "@/pages/ReportPage";
import Loading from "@/components/common/Loading";

/**
 * ============================================
 * DYNAMIC ROUTES - Rutas generadas dinámicamente
 * ============================================
 *
 * Genera y retorna un array de componentes <Route> basados en el menú del usuario
 *
 * Tipos de rutas:
 * - index: Renderiza página Index con tarjetas de nivel 2
 *   Ejemplo: /operaciones → muestra tarjetas "Corte", "Doblez", etc.
 *
 * - report: Renderiza página ReportPage con el reporte específico
 *   Ejemplo: /operaciones/corte/merma → muestra reporte "Merma"
 *
 * IMPORTANTE: Este hook retorna un array de <Route> que debe ser expandido
 * directamente dentro de <Routes> usando el operador spread
 */
export const useDynamicRoutes = () => {
  const { routes, loading } = useMenuRoutes();

  if (loading) {
    return [<Route key="loading" path="*" element={<Loading />} />];
  }

  if (!routes || routes.length === 0) {
    console.warn("[DynamicRoutes] No hay rutas generadas");
    return [];
  }


  return routes
    .map((route) => {
      // Rutas tipo Index (nivel 1 con hijos)
      if (route.type === "index") {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Index parentItem={route.item} />}
          />
        );
      }

      // Rutas tipo Report (nivel 3)
      if (route.type === "report") {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<ReportPage reportItem={route.item} />}
          />
        );
      }

      return null;
    })
    .filter(Boolean);
};
