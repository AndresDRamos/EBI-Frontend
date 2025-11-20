/**
 * Utilidades para manejar cookies del navegador
 */
export const cookies = {
  /**
   * Obtiene el valor de una cookie por nombre
   * @param {string} name - Nombre de la cookie
   * @returns {string|null} Valor de la cookie o null si no existe
   */
  get: (name) => {
    try {
      const nameEQ = name + "=";
      const cookieArray = document.cookie.split(";");
      
      for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length);
        }
      }
      return null;
    } catch (error) {
      console.error("Error reading cookie:", error);
      return null;
    }
  },

  /**
   * Obtiene el nombre del usuario desde la cookie
   * @returns {string|null} Nombre del usuario o null
   */
  getUserName: () => {
    return cookies.get("userName");
  },
};
