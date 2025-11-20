import {
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import DynamicIcon from "@components/common/DynamicIcon";
import { useMenuContext } from "../../Layout.context";

import {
  StyledMenuItem,
  StyledMenuIcon,
  StyledMenuText,
} from "./MenuItem.styles.js";

/**
 * ============================================
 * MENUITEM - Item del menú de Sidebar
 * ============================================
 * 
 * Cambio estructural:
 * - Ya NO renderiza hijos (sin Collapse ni recursión)
 * - Solo items de primer nivel en el Sidebar
 * - Los hijos se renderizan dinámicamente en el Topbar
 * - Al hacer click, actualiza el activeMenuItem en el contexto
 */
const MenuItem = ({
  item,
  isExpanded,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveMenuItem } = useMenuContext();

  // Función para verificar si una ruta está activa
  const isActiveRoute = (itemPath) => {
    if (!itemPath) return false;
    return (
      location.pathname === itemPath ||
      location.pathname.startsWith(itemPath + "/")
    );
  };

  // Verificar si el item actual o alguno de sus hijos está activo
  const isActive = isActiveRoute(item.FullPath);
  const hasActiveChild =
    item.children && item.children.length > 0 &&
    item.children.some(
      (child) =>
        isActiveRoute(child.FullPath) ||
        (child.children &&
          child.children.some((grandChild) =>
            isActiveRoute(grandChild.FullPath)
          ))
    );

  // Para elementos padre: están activos si ellos o sus hijos están activos
  const shouldHighlight = isActive || hasActiveChild;

  const handleClick = () => {
    // Actualizar el item activo en el contexto para que el Topbar lo use
    setActiveMenuItem(item);

    // Si el item tiene una ruta propia, navegar a ella
    if (item.FullPath) {
      navigate(item.FullPath);
    } 
    // Si no tiene ruta pero tiene hijos, navegar al primer hijo
    else if (item.children && item.children.length > 0) {
      const firstChild = item.children[0];
      if (firstChild.FullPath) {
        navigate(firstChild.FullPath);
      }
    }
    // Si no hay ruta ni hijos, mostrar mensaje de error
    else {
      navigate("/not-found", {
        state: {
          from: location.pathname,
          message: `La ruta ${item.MenuPath || "solicitada"} no existe`,
        },
      });
    }
  };

  return (
    <StyledMenuItem
      onClick={handleClick}
      shouldHighlight={shouldHighlight}
      isOpen={false}
      level={0}
    >
      <StyledMenuIcon shouldHighlight={shouldHighlight}>
        <DynamicIcon iconName={item.MenuIcon} />
      </StyledMenuIcon>
      <StyledMenuText primary={item.MenuName} />
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    idMenu: PropTypes.number.isRequired,
    MenuName: PropTypes.string.isRequired,
    MenuPath: PropTypes.string,
    FullPath: PropTypes.string,
    MenuIcon: PropTypes.string,
    SortOrder: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        idMenu: PropTypes.number.isRequired,
        MenuName: PropTypes.string.isRequired,
        MenuPath: PropTypes.string,
        FullPath: PropTypes.string,
        MenuIcon: PropTypes.string,
        SortOrder: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default MenuItem;
