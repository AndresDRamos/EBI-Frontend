import { styled, Box } from "@mui/material";

/**
 * ============================================
 * CONTAINER STYLES
 * ============================================
 *
 * Estilos para el componente Container usando elementos básicos de MUI
 */

// Wrapper principal del contenedor
export const ContainerWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minWidth: 0, // Permite que el flex funcione correctamente
  flex: 1, // Toma todo el espacio disponible
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "all 0.2s ease-in-out",
}));

// Encabezado del contenedor
export const ContainerHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  minHeight: 64,

  // Estilos para el icono
  "& .MuiSvgIcon-root": {
    fontSize: 24,
    color: theme.palette.primary.main,
    flexShrink: 0,
  },

  // Estilos para el título
  "& .MuiTypography-h6": {
    fontWeight: 600,
    color: theme.palette.text.primary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

// Contenido del contenedor
export const ContainerContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1.5),
  overflow: "auto",

  // Estilos para la lista
  "& .MuiList-root": {
    padding: 0,

    "& .MuiListItemButton-root": {
      borderRadius: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      padding: theme.spacing(1, 1.5),
      transition: "all 0.15s ease-in-out",

      "&:hover": {
        backgroundColor: theme.palette.augmentColor,

        "& .MuiListItemIcon-root": {
          color: "inherit",
        },
      },

      "&:last-child": {
        marginBottom: 0,
      },
    },
  },

  // Estilos para los iconos de la lista
  "& .MuiListItemIcon-root": {
    minWidth: 36,

    "& .MuiSvgIcon-root": {
      fontSize: 18,
      color: theme.palette.text.secondary,
    },
  },
}));
