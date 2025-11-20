import { cookies } from "./cookies";

const USER_KEY = "userData";

export const storage = {
  getUser: () => {
    try {
      const userData = localStorage.getItem(USER_KEY);
      const user = userData ? JSON.parse(userData) : null;
      
      // Enriquecer los datos del usuario con el nombre de la cookie si existe
      if (user) {
        const cookieUserName = cookies.getUserName();
        if (cookieUserName) {
          user.Nombre = decodeURIComponent(cookieUserName);
        }
      }
      
      return user;
    } catch (error) {
      console.error("Error getting user from storage:", error);
      return null;
    }
  },

  setUser: (user) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user to storage:", error);
    }
  },

  clearAuth: () => {
    localStorage.removeItem(USER_KEY);
  },
};
