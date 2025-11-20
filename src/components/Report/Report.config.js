/**
 * ============================================
 * CONFIGURACIÓN DE REPORTES DE POWER BI
 * ============================================
 * 
 * DEPRECATED: La arquitectura de carga de reportes ha sido rediseñada.
 * 
 * ANTES (Deprecated):
 * - ReportPage → getPublicReportEmbedInfo(reportName)
 * - Backend → Consultar BD por nombre del reporte
 * - Retornar URL desde el backend
 * 
 * AHORA (Current):
 * - Admin.spGet_MenuByIdAcceso retorna URLs directamente
 * - ReportPage recibe el item con urlReporte incluida
 * - No se requiere consulta adicional al backend
 * 
 * Este archivo se mantiene como referencia histórica
 */

/**
 * DEPRECATED - Mantener para referencia histórica
 * Las URLs de los reportes ahora vienen directamente desde el menú
 * 
 * @deprecated
 * Normaliza datos de respuesta del backend para reportes públicos
 * @param {Object} response - Respuesta del backend
 * @returns {Object} Datos normalizados
 */
// export const normalizePublicReportData = (response) => {
//   const reportData = response.data || response;
//   return {
//     type: reportData.type || "public-report",
//     embedUrl: reportData.embedUrl,
//     reportName: reportData.reportName,
//     requiresAuth: reportData.requiresAuth || false
//   };
// };

/**
 * DEPRECATED - Mantener para referencia histórica
 * 
 * @deprecated
 * Valida que los datos del reporte público sean completos
 * @param {Object} normalizedData - Datos normalizados
 * @throws {Error} Si faltan datos esenciales
 */
// export const validatePublicReportData = (normalizedData) => {
//   if (!normalizedData.embedUrl) {
//     throw new Error("Datos del reporte incompletos: falta embedUrl");
//   }
//
//   if (!normalizedData.embedUrl.includes("app.powerbi.com")) {
//     throw new Error("El embedUrl no es una URL válida de Power BI");
//   }
// };

/**
 * DEPRECATED - Mantener para referencia histórica
 * 
 * @deprecated
 * Crea la configuración para el iframe de Power BI público
 * @param {Object} reportData - Datos normalizados del reporte
 * @returns {Object} Configuración lista para el iframe
 */
// export const createPublicEmbedConfig = (reportData) => {
//   return {
//     embedUrl: reportData.embedUrl,
//     reportName: reportData.reportName,
//     type: reportData.type,
//     requiresAuth: reportData.requiresAuth
//   };
// };

/**
 * DEPRECATED - Mantener para referencia histórica
 * 
 * @deprecated
 * Función completa para cargar y configurar un reporte público
 * @param {string} reportName - Nombre del reporte público
 * @returns {Promise<Object>} Configuración de embebido público
 */
// export const loadPublicReportConfig = async (reportName) => {
//   if (!reportName) {
//     throw new Error("Nombre del reporte es requerido");
//   }
//   const response = await getPublicReportEmbedInfo(reportName);
//   const normalizedData = normalizePublicReportData(response);
//   validatePublicReportData(normalizedData);
//   const embedConfig = createPublicEmbedConfig(normalizedData);
//   return embedConfig;
// };

/**
 * DEPRECATED - Mantener para referencia histórica
 * 
 * @deprecated
 * Extrae el report ID del embedUrl público
 * @param {string} embedUrl - URL de embebido público
 * @returns {string|null} ID del reporte o null si no se encuentra
 */
// export const extractReportIdFromUrl = (embedUrl) => {
//   try {
//     const url = new URL(embedUrl);
//     const reportParam = url.searchParams.get('r');
//     return reportParam;
//   } catch (error) {
//     console.error("[Public Report] Error extrayendo ID del reporte:", error);
//     return null;
//   }
// };
