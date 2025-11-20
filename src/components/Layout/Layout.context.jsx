import { createContext, useContext, useState } from "react";

/**
 * ============================================
 * LAYOUT CONTEXT - Contexto del menú de navegación
 * ============================================
 * 
 * Maneja el estado global del menú para Layout:
 * - menuItems: Items de primer nivel del menú (renderizados en Sidebar)
 * - activeMenuItem: Item activo actual (sus hijos se renderizan en Topbar)
 * 
 * Nota: Movido de context/Menu.context.jsx → Layout.context.jsx
 * para mantener consistencia con Layout.jsx y Layout.styles.js
 */

// Creación del contexto
const MenuContext = createContext();

// Proveedor del contexto
export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  return (
    <MenuContext.Provider 
      value={{ 
        menuItems, 
        setMenuItems,
        activeMenuItem,
        setActiveMenuItem
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Hook para usar el contexto
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext debe ser usado dentro de MenuProvider");
  }
  return context;
};
