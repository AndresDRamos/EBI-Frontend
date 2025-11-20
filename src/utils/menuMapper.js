/**
 * ============================================
 * MENU MAPPER
 * ============================================
 *
 * Utilidad para mapear la respuesta del backend al formato
 * esperado por los componentes del frontend
 * 
 * Nueva estructura (desde Admin.spGet_MenuByIdAcceso):
 * - Páginas → Contenedores → Reportes
 * - Cada nivel incluye: nombre, icono, slug, orden
 * - Los reportes incluyen la URL para embed
 */

/**
 * Mapea un reporte desde el formato del backend
 * @param {Object} report - Reporte desde el backend
 * @returns {Object} Reporte mapeado para el frontend
 */
const mapReport = (report) => {
  return {
    idMenu: Number(report.idReporte), // idMenu = idReporte para compatibilidad
    idReporte: Number(report.idReporte),
    MenuName: report.nombreReporte,
    MenuPath: report.slugReporte,
    FullPath: report.paginaCompleta,
    MenuIcon: "", // Los reportes no tienen icono
    SortOrder: Number(report.ordenReporte),
    Nivel: 3,
    urlReporte: report.urlReporte,
    paginaCompleta: report.paginaCompleta,
  };
};

/**
 * Mapea un contenedor desde el formato del backend
 * @param {Object} container - Contenedor desde el backend
 * @returns {Object} Contenedor mapeado para el frontend
 */
const mapContainer = (container) => {
  return {
    idMenu: Number(container.idContenedor), // idMenu = idContenedor para compatibilidad
    idContenedor: Number(container.idContenedor),
    MenuName: container.nombreContenedor,
    MenuPath: container.slugContenedor,
    FullPath: `${container.slugContenedor}`, // Se construirá en el padre
    MenuIcon: container.iconoContenedor,
    SortOrder: Number(container.ordenContenedor),
    Nivel: 2,
    children: container.children?.map(mapReport) || [],
  };
};

/**
 * Mapea una página desde el formato del backend
 * @param {Object} page - Página desde el backend
 * @returns {Object} Página mapeada para el frontend
 */
const mapPage = (page) => {
  return {
    idMenu: Number(page.idPagina), // idMenu = idPagina para compatibilidad
    idPagina: Number(page.idPagina),
    MenuName: page.nombrePagina,
    MenuPath: page.slugPagina,
    FullPath: `/${page.slugPagina}`,
    MenuIcon: page.iconoPagina,
    SortOrder: Number(page.ordenPagina),
    Nivel: 1,
    children: page.children?.map((container) => {
      const mappedContainer = mapContainer(container);
      
      // Construir FullPath del contenedor: /pagina/contenedor
      mappedContainer.FullPath = `/${page.slugPagina}/${mappedContainer.MenuPath}`;
      
      // Construir FullPath de los reportes: /pagina/contenedor/reporte
      mappedContainer.children = mappedContainer.children.map((report) => {
        report.FullPath = `/${page.slugPagina}/${mappedContainer.MenuPath}/${report.MenuPath}`;
        return report;
      });
      
      return mappedContainer;
    }) || [],
  };
};

/**
 * Mapea el menú completo desde el backend al formato del frontend
 * @param {Array} menuFromBackend - Array de páginas desde el backend (Admin.spGet_MenuByIdAcceso)
 * @returns {Array} Menú mapeado para el frontend
 */
export const mapMenuFromBackend = (menuFromBackend) => {
  if (!Array.isArray(menuFromBackend)) {
    console.warn(
      "[menuMapper] El menú recibido no es un array:",
      menuFromBackend
    );
    return [];
  }

  return menuFromBackend.map(mapPage);
};

/**
 * Valida que el menú tenga la estructura correcta
 * @param {Array} menu - Menú a validar
 * @returns {boolean} True si el menú es válido
 */
export const validateMenu = (menu) => {
  if (!Array.isArray(menu)) {
    console.error("[menuMapper] El menú no es un array");
    return false;
  }

  const hasRequiredFields = (item) => {
    return (
      item.idMenu !== undefined &&
      item.MenuName !== undefined &&
      item.FullPath !== undefined &&
      item.Nivel !== undefined
    );
  };

  const validateItem = (item) => {
    // Para páginas (nivel 1)
    if (item.Nivel === 1) {
      if (!hasRequiredFields(item)) {
        console.error("[menuMapper] Página inválida:", item);
        return false;
      }
      
      // Validar contenedores (nivel 2)
      if (item.children && item.children.length > 0) {
        return item.children.every((container) => {
          if (container.Nivel !== 2) {
            console.error("[menuMapper] Contenedor con nivel inválido:", container);
            return false;
          }
          
          // Validar reportes (nivel 3)
          if (container.children && container.children.length > 0) {
            return container.children.every((report) => {
              if (report.Nivel !== 3 || !report.urlReporte) {
                console.error("[menuMapper] Reporte inválido:", report);
                return false;
              }
              return true;
            });
          }
          return true;
        });
      }
      return true;
    }

    return false;
  };

  return menu.every(validateItem);
};
