/**
 * ============================================
 * BARREL EXPORT PARA COMPONENTE PUBLIC REPORT
 * ============================================
 * Exporta todos los módulos del componente PublicReport
 */

export { default as PublicReport } from "./Report.jsx";
export { default as LazyReportItem } from "./LazyReportItem.jsx";

// DEPRECATED - Las siguientes exportaciones ya no se utilizan
// La arquitectura cambió para obtener URLs directamente desde el menú
// export {
//   loadPublicReportConfig,
//   normalizePublicReportData,
//   validatePublicReportData,
//   createPublicEmbedConfig,
//   extractReportIdFromUrl,
// } from "./Report.config.js";

// Exportar estilos
export {
  PublicReportContainer,
  ReportIframe,
  LoadingOverlay,
  ErrorContainer,
  ErrorAlert,
  applyPublicReportTheme,
} from "./Report.styles.js";
