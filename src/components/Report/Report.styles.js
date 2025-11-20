import { styled } from "@mui/material/styles";
import { Box, Alert } from "@mui/material";

/**
 * ============================================
 * ESTILOS GLOBALES CSS PARA REPORTES PÚBLICOS DE POWER BI
 * ============================================
 * Inyección de estilos CSS globales mediante template literals
 * Estos estilos se aplican al documento completo y manejan:
 * - Estilos del iframe
 * - Estados de carga
 * - Responsividad
 * - Pantalla completa
 */

/**
 * Estilos CSS globales como string para inyectar en <style>
 */
export const globalPublicReportStyles = `
  :root {
    /* Variables CSS para reportes públicos */
    --public-report-bg-default: #ffffff;
    --public-report-border-radius: 8px;
  }

  /* 📦 Contenedor principal del reporte público */
  .public-report-container {
    overflow: hidden !important; /* Clave: oculta el contenido que sobresale */
    position: relative !important;
    border-radius: var(--public-report-border-radius);
    width: 100% !important;
    height: 100% !important;
  }

  /* 🖼️ Estilos del iframe - Recorte del navegador de páginas inferior */
  .public-report-container iframe {
    border: none !important;
    width: 100% !important;
    /* TÉCNICA 1: Altura extendida para empujar el navegador fuera */
    height: 115% !important; /* Hacer el iframe 15% más alto */
    /* TÉCNICA 2: Posicionamiento absoluto */
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    /* TÉCNICA 3: Transform origin para escalado */
    transform-origin: top left !important;
    /* El overflow:hidden del contenedor recortará el exceso */
    transition: opacity 0.3s ease;
    display: block !important;
  }

  /* 🎯 Optimizaciones de rendimiento */
  .public-report-container,
  .public-report-container * {
    box-sizing: border-box;
  }

  /* 📱 Responsividad */
  @media (max-width: 768px) {
    .public-report-container {
      border-radius: 0;
    }
  }

  /* 🎨 Estados de carga del iframe */
  .public-report-iframe-loading iframe {
    opacity: 0;
    pointer-events: none;
  }

  .public-report-iframe-loaded iframe {
    opacity: 1;
    transition: opacity 0.4s ease-in-out;
  }

  /* 🖥️ Estilos de pantalla completa */
  .public-report-container:fullscreen {
    background-color: var(--public-report-bg-default);
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Firefox */
  .public-report-container:-moz-full-screen {
    background-color: var(--public-report-bg-default);
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Webkit/Chrome/Safari */
  .public-report-container:-webkit-full-screen {
    background-color: var(--public-report-bg-default);
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/**
 * ============================================
 * INYECCIÓN DE ESTILOS GLOBALES
 * ============================================
 * Inyecta los estilos CSS en el <head> del documento
 * Se ejecuta una sola vez al cargar el módulo
 */
const injectGlobalStyles = () => {
  const styleId = "public-report-global-styles";

  // Evitar inyección duplicada
  if (document.getElementById(styleId)) return;

  const styleElement = document.createElement("style");
  styleElement.id = styleId;
  styleElement.textContent = globalPublicReportStyles;
  document.head.appendChild(styleElement);
};

// Ejecutar inyección al importar el módulo
injectGlobalStyles();

/**
 * ============================================
 * LÓGICA DE TEMAS DINÁMICOS
 * ============================================
 */

/**
 * Aplica variables CSS dinámicas para temas
 * @param {Object} theme - Tema de Material-UI
 */
export const applyPublicReportTheme = (theme) => {
  const root = document.documentElement;

  // Actualizar variables CSS
  root.style.setProperty(
    "--public-report-bg-default",
    theme.palette.background.default
  );
  root.style.setProperty(
    "--public-report-border-radius",
    `${theme.shape.borderRadius}px`
  );
};

/**
 * ============================================
 * STYLED COMPONENTS - Elementos de la UI
 * ============================================
 * Componentes React estilizados con Material-UI
 */

/**
 * Contenedor principal del reporte público
 * IMPORTANTE: overflow: hidden es crucial para recortar el navegador de páginas inferior
 */
export const PublicReportContainer = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  position: "relative",
  overflow: "hidden", // Recorta el contenido que sobresale

  // Forzar estilos en el iframe directamente
  "& iframe": {
    border: "none !important",
    position: "absolute !important",
    top: "0 !important",
    left: "0 !important",
    width: "100% !important",
    // Técnica: Hacer el iframe más grande para empujar el navegador fuera
    height: "calc(100% + 60px) !important",
    display: "block !important",
  },
}));

/**
 * Contenedor de error
 */
export const ErrorContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

/**
 * Alerta de error personalizada
 */
export const ErrorAlert = styled(Alert)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  borderRadius: theme.shape.borderRadius,
}));

/**
 * Overlay para el componente Loading mientras se carga el reporte
 */
export const LoadingOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  zIndex: 10,
});

/**
 * Iframe estilizado para el reporte público
 * Configurado para ocultar el navegador de páginas inferior mediante escalado
 *
 * TÉCNICA: Escalar el iframe ligeramente más grande y recortar con overflow: hidden del padre
 */
export const ReportIframe = styled("iframe")({
  border: "none !important",
  width: "100%",

  display: "block",
  position: "absolute",
  top: 0,
  left: 0,
  transformOrigin: "top left", // Anclar la escala en la esquina superior izquierda
  // Técnica alternativa: usar transform scale si la altura no funciona
  // transform: "scale(1.15) translateY(0%)",
});
