import api from "./api.service.js";

/**
 * Obtiene la lista de reportes disponibles
 * @returns {Promise<Array>} Lista de reportes
 * @deprecated - Las rutas de reportes ahora se obtienen desde el menú
 */
export const getReportList = async () => {
  try {
    const response = await api.get("/reportes");
    return response.data.reportes;
  } catch (error) {
    console.error("Error fetching report list: ", error);
    throw error;
  }
};

/**
 * Obtiene la información de embebido de un reporte específico
 * @param {string} reportName - Nombre del reporte
 * @returns {Promise<Object>} Información de embebido
 * @deprecated - Las URLs de reportes ahora vienen desde el menú
 */
export const getReportEmbedInfo = async (reportName) => {
  try {
    const response = await api.get(`/report/${reportName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching report embed info:", error);
    throw error;
  }
};

/**
 * DEPRECATED - Ya no se utiliza
 * 
 * Obtiene la información de embebido de un reporte público
 * @param {string} reportName - Nombre del reporte público
 * @returns {Promise<Object>} Información de embebido público (incluye embedUrl)
 * 
 * CAMBIO ARQUITECTÓNICO:
 * Las URLs de los reportes ahora vienen directamente desde Admin.spGet_MenuByIdAcceso
 * Por lo que esta función ya no es necesaria.
 * El endpoint /report/public/:reportName ha sido deprecado
 * 
 * @deprecated
 */
// export const getPublicReportEmbedInfo = async (reportName) => {
//   try {
//     const response = await api.get(`/report/public/${reportName}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching public report embed info:", error);
//     throw error;
//   }
// };
