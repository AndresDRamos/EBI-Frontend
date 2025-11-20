import { styled } from "@mui/material/styles";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const StyledMenuItem = styled(ListItem, {
  shouldForwardProp: (prop) =>
    prop !== "shouldHighlight" && prop !== "isOpen" && prop !== "level",
})(({ theme, shouldHighlight, level = 0 }) => {
  // Extraemos la navegación a una constante para acceso más corto
  const palette = theme.palette;

  return {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2 + level * 2), // Indentación basada en el nivel
    paddingRight: theme.spacing(2),
    minHeight: 32,
    cursor: "pointer",
    backgroundColor: shouldHighlight
      ? palette.navigation.item.active // También aplicando transparencia
      : "transparent",
    borderLeft: shouldHighlight
      ? `4px solid ${palette.border.accent}`
      : "4px solid transparent",
    "&:hover": {
      backgroundColor: shouldHighlight
        ? palette.navigation.item.active
        : palette.navigation.item.hover,
    },
  };
});

export const StyledMenuIcon = styled(
  ListItemIcon,
  // Evitar que las props personalizadas se pasen al DOM
  {
    shouldForwardProp: (prop) => prop !== "shouldHighlight",
  }
)(({ theme, shouldHighlight }) => ({
  minWidth: 40,
  color: shouldHighlight
    ? theme.palette.navigation.text.active
    : theme.palette.navigation.text.default,
}));

export const StyledMenuText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "shouldHighlight",
})(({ theme, shouldHighlight }) => ({
  "& .MuiListItemText-primary": {
    fontSize: 14,
    fontWeight: shouldHighlight ? "600" : "400",
    color: shouldHighlight
      ? theme.palette.navigation.text.active
      : theme.palette.navigation.text.default,
  },
}));
