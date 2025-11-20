import { Box, Typography } from "@mui/material";
import { LazyReportItem } from "@/components/Report";
import PropTypes from "prop-types";

/**
 * ============================================
 * REPORT PAGE - Página dinámica de reportes
 * ============================================
 *
 * Renderiza reportes de Power BI basado en el item del menú (nivel 3)
 *
 * Props:
 * - reportItem: Item de nivel 3 del menú con información del reporte
 *
 * Características:
 * - Recibe el item del reporte desde las rutas dinámicas
 * - Extrae la URL del reporte directamente del item
 * - Renderiza el componente LazyReportItem con capacidad de lazy loading
 * - Ocupa toda la pantalla disponible
 *
 * Lazy Loading:
 * - El iframe se precarga cuando el usuario accede a la página
 * - IntersectionObserver detecta cuando entra en viewport
 * - Carga más rápida al hacer clic en la opción del reporte
 *
 * Ejemplo:
 * Ruta: /operaciones/doblez/eficiencia_doblez
 * → reportItem.urlReporte: "https://app.powerbi.com/view?r=..."
 * → Se pasa a LazyReportItem para precarga inteligente
 */
const ReportPage = ({ reportItem }) => {
  // Extraer la URL del reporte directamente desde el item
  const reportUrl = reportItem?.urlReporte || "";

  if (!reportItem) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Reporte no encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Contenedor del reporte con lazy loading */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: "background.default",
        }}
      >
        {reportUrl ? (
          <LazyReportItem reportUrl={reportUrl} />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              URL del reporte no disponible
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

ReportPage.propTypes = {
  reportItem: PropTypes.shape({
    MenuName: PropTypes.string,
    MenuPath: PropTypes.string,
    FullPath: PropTypes.string,
  }),
};

export default ReportPage;
