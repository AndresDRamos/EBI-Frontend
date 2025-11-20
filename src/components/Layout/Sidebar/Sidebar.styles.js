import { styled } from "@mui/material/styles";
import { Box, ListItem, Typography } from "@mui/material";

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isexpanded" && prop !== "isPinned",
})(({ theme, isexpanded, isPinned }) => ({
  position: "fixed",
  left: 0,
  height: "100vh",
  backgroundColor: theme.palette.background.paper,
  transition: "width 0.3s ease",
  width: isexpanded === "true" ? "250px" : "58px",
  boxShadow: isPinned === "true" ? "none" : theme.shadows[4],
  overflowX: "hidden",
  whiteSpace: "nowrap",
  zIndex: 1200,
  display: "flex",
  flexDirection: "column",
}));
