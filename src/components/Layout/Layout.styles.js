import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

/**
 * ============================================
 * LAYOUT STYLES
 * ============================================
 *
 * Estilos para el layout principal de la aplicación.
 * - Integra estilos de PageLayout (eliminado) en PageContainer
 */

export const LayoutRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  position: "relative",
}));

export const LayoutContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$isPinned",
})(({ $isPinned }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  marginLeft: $isPinned ? "250px" : "58px",
  transition: "margin-left 0.3s ease",
  position: "relative",
  zIndex: 1,
  overflow: "hidden",
}));

export const ContentArea = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minHeight: 0,
}));

export const PageContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden", // Los componentes hijos manejan su propio scroll
  padding: "24px",
  gap: "24px",
  boxSizing: "border-box",
  minHeight: 0, // Importante para que funcione el flex (fusionado de PageLayout)
}));
