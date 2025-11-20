import PropTypes from "prop-types";
import { TopbarContainer, ActionContainer } from "./Topbar.styles";
import { Box } from "@mui/material";
import TopbarMenu from "./components/TopbarMenu";

/**
 * ============================================
 * TOPBAR - Barra superior de navegación
 * ============================================
 * 
 * Incluye:
 * - TopbarMenu: Renderiza dinámicamente los hijos del item activo del Sidebar
 * - leftContent: Contenido adicional del lado izquierdo (opcional)
 * - rightContent: Acciones del lado derecho (ThemeToggle, Notificaciones, etc.)
 */
const Topbar = ({ leftContent = null, rightContent = null, isPinned = false }) => {
  return (
    <TopbarContainer isPinned={isPinned}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TopbarMenu />
        {leftContent}
      </Box>
      <ActionContainer>{rightContent}</ActionContainer>
    </TopbarContainer>
  );
};

Topbar.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
  isPinned: PropTypes.bool,
};

export default Topbar;
