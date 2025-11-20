import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useReportLazyLoad } from "@/hooks/useReportLazyLoad";
import PublicReport from "./Report";

/**
 * ============================================
 * LazyReportItem - Wrapper para reportes lazy-loaded
 * ============================================
 * 
 * Componente que envuelve PublicReport con capacidad de lazy loading.
 * Usa IntersectionObserver para cargar iframes cuando entran en viewport.
 * 
 * @param {string} reportUrl - URL del reporte a renderizar
 * @param {string} reportName - Nombre del reporte (para logging)
 * 
 * Características:
 * - Invisible en el DOM hasta que entra en viewport
 * - Al ser visible: comienza a cargar el iframe
 * - Al salir de viewport: se mantiene cargado (sin cleanup)
 * - Cleanup automático al desmontarse el componente padre
 */
export const LazyReportItem = ({ reportUrl }) => {
  const { containerRef, shouldLoad, isLoading } = useReportLazyLoad(
    reportUrl,
    {
      threshold: 0.1,
      rootMargin: "50px", // Comienza a cargar 50px antes de entrar en viewport
    }
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "background.default",
        position: "relative",
      }}
    >
      {/* Renderizar el reporte solo cuando IntersectionObserver lo indica */}
      {shouldLoad && !isLoading && (
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <PublicReport reportUrl={reportUrl} />
        </Box>
      )}

      {/* Placeholder mientras se carga */}
      {(isLoading || !shouldLoad) && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
            color: "text.secondary",
          }}
        >
          {isLoading ? "Cargando..." : "Scroll para ver el reporte"}
        </Box>
      )}
    </Box>
  );
};

LazyReportItem.propTypes = {
  reportUrl: PropTypes.string.isRequired,
};

export default LazyReportItem;
