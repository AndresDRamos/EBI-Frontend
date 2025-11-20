import { styled, Box, Button } from "@mui/material";

/**
 * ============================================
 * TOPBAR MENU STYLES
 * ============================================
 */

// Contenedor principal del menú horizontal
export const TopbarMenuContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  height: "100%",
  marginLeft: theme.spacing(2),
}));

// Item de menú individual
export const TopbarMenuItem = styled(Button)(({ theme, isactive }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  padding: theme.spacing(1, 1.5),
  fontSize: "0.875rem",
  fontWeight: isactive === "true" ? 600 : 400,
  color: isactive === "true" 
    ? theme.palette.primary.main 
    : theme.palette.text.primary,
  textTransform: "none",
  borderRadius: theme.spacing(1),
  minWidth: "auto",
  whiteSpace: "nowrap",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },

  // Borde inferior para el item activo
  ...(isactive === "true" && {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
  }),
}));

// Indicador de dropdown (flecha hacia abajo)
export const TopbarDropdownIndicator = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: 4,
}));
