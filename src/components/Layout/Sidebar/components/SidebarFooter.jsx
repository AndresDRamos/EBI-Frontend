import PropTypes from "prop-types";
import { ListItemIcon, ListItemText } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/auth/hooks/useAuth.js";
import { StyledFooterItem } from "./SidebarFooter.styles.js";

/**
 * ============================================
 * COMPONENTE SIDEBARFOOTER
 * ============================================
 * 
 * Footer del Sidebar con opción de cerrar sesión
 * Todo el ancho del ListItem es clickeable (icono + texto)
 */
const SidebarFooter = ({ isExpanded }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <StyledFooterItem 
      onClick={handleLogout}
      sx={{ cursor: "pointer" }}
    >
      <ListItemIcon sx={{ minWidth: "40px", color: "secondary.main" }}>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText
        primary="Cerrar sesión"
        sx={{
          opacity: isExpanded ? 1 : 0,
          transition: "opacity 0.5s ease",
          ml: 2,
        }}
      />
    </StyledFooterItem>
  );
};

SidebarFooter.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
};

export default SidebarFooter;
