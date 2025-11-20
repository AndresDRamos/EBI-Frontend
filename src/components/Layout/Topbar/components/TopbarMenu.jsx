import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuItem as MuiMenuItem, ListItemIcon, ListItemText } from "@mui/material";
import DynamicIcon from "@/components/common/DynamicIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TopbarMenuContainer, TopbarMenuItem, TopbarDropdownIndicator } from "./TopbarMenu.styles";
import { useMenuContext } from "../../Layout.context";

/**
 * ============================================
 * TOPBAR MENU - Menú horizontal dinámico
 * ============================================
 * 
 * Renderiza los hijos del item activo del Sidebar
 * - Items sin hijos: Navegación directa
 * - Items con hijos: Dropdown con submenú
 * - Marca el item activo según la ruta actual
 */
const TopbarMenu = () => {
  const { activeMenuItem } = useMenuContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuItemId, setOpenMenuItemId] = useState(null);

  // Si no hay item activo o no tiene hijos, no renderizar nada
  if (!activeMenuItem || !activeMenuItem.children || activeMenuItem.children.length === 0) {
    return null;
  }

  const handleMenuClick = (event, item) => {
    // Si el item tiene hijos, abrir dropdown
    if (item.children && item.children.length > 0) {
      setAnchorEl(event.currentTarget);
      setOpenMenuItemId(item.idMenu);
    } else {
      // Si no tiene hijos, navegar directamente
      navigate(item.FullPath);
    }
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setOpenMenuItemId(null);
  };

  const handleDropdownItemClick = (path) => {
    navigate(path);
    handleDropdownClose();
  };

  const isItemActive = (item) => {
    return location.pathname === item.FullPath || location.pathname.startsWith(item.FullPath + "/");
  };

  return (
    <TopbarMenuContainer>
      {activeMenuItem.children.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = isItemActive(item);
        const isDropdownOpen = openMenuItemId === item.idMenu;

        return (
          <div key={item.idMenu}>
            <TopbarMenuItem
              onClick={(event) => handleMenuClick(event, item)}
              isactive={isActive.toString()}
            >
              {item.MenuIcon && (
                <DynamicIcon iconName={item.MenuIcon} sx={{ fontSize: 20, marginRight: 1 }} />
              )}
              {item.MenuName}
              {hasChildren && (
                <TopbarDropdownIndicator>
                  <KeyboardArrowDownIcon fontSize="small" />
                </TopbarDropdownIndicator>
              )}
            </TopbarMenuItem>

            {/* Dropdown menu para items con hijos */}
            {hasChildren && (
              <Menu
                anchorEl={anchorEl}
                open={isDropdownOpen}
                onClose={handleDropdownClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    mt: 0.5,
                    minWidth: 200,
                  },
                }}
              >
                {item.children.map((child) => (
                  <MuiMenuItem
                    key={child.idMenu}
                    onClick={() => handleDropdownItemClick(child.FullPath)}
                    selected={isItemActive(child)}
                  >
                    {child.MenuIcon && (
                      <ListItemIcon>
                        <DynamicIcon iconName={child.MenuIcon} sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                    )}
                    <ListItemText>{child.MenuName}</ListItemText>
                  </MuiMenuItem>
                ))}
              </Menu>
            )}
          </div>
        );
      })}
    </TopbarMenuContainer>
  );
};

export default TopbarMenu;
