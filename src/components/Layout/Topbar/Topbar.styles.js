import { styled } from "@mui/material";
import { Box } from "@mui/material";

export const TopbarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isPinned",
})(({ theme, isPinned }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1, 3), // Reducir padding vertical
  backgroundColor: theme.palette.background.paper,
  boxShadow: isPinned ? "none" : theme.shadows[1],
  width: "100%",
  height: "56px", // Altura estándar más limpia
  zIndex: theme.zIndex.appBar - 1, // Menor que el sidebar
  // Asegurar que el topbar se mantenga en su lugar
  flexShrink: 0,
}));

export const ActionContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px", // Espacio más consistente
});
