import { greyTokens, arcticTokens, accentTokens } from "./colors.js";
import { alpha } from "@mui/material";

const getColorByMode = (colorTokens, mode) => colorTokens[mode];

export const semanticTokens = (mode) => {
  const grey = getColorByMode(greyTokens, mode);
  const arctic = getColorByMode(arcticTokens, mode);
  const orange = getColorByMode(accentTokens.orange, mode);
  const blue = getColorByMode(accentTokens.blue, mode);
  const green = getColorByMode(accentTokens.green, mode);
  const red = getColorByMode(accentTokens.red, mode);

  return {
    // Estados de la aplicación
    status: {
      success: {
        main: green[500],
        light: green[300],
        dark: green[700],
        contrastText: mode === "dark" ? grey[900] : arctic[100],
      },
      warning: {
        main: orange[500],
        light: orange[300],
        dark: orange[700],
        contrastText: mode === "dark" ? grey[900] : arctic[100],
      },
      error: {
        main: red[500],
        light: red[300],
        dark: red[700],
        contrastText: arctic[100],
      },
      info: {
        main: blue[500],
        light: blue[300],
        dark: blue[700],
        contrastText: arctic[100],
      },
    },

    // Colores de texto
    text: {
      primary: arctic[100],
      secondary: arctic[300],
      disabled: arctic[600],
      hint: arctic[500],
      // Textos especiales
      inverse: mode === "dark" ? grey[900] : arctic[100],
      onSurface: arctic[100],
      onPrimary: arctic[100],
      onSecondary: grey[900],
    },

    // Superficies y fondos
    surface: {
      // Niveles de elevación
      level0: arctic[900],
      level1: arctic[800],
      level2: arctic[700],
      level3: arctic[600],

      // Superficies especiales
      paper: arctic[800],
      card: grey[700],
      overlay:
        mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
      backdrop: mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
    },

    // Bordes y divisores
    border: {
      primary: grey[600],
      secondary: grey[700],
      subtle: grey[700],
      focus: blue[500],
      error: red[500],
      success: green[500],
      accent: orange[500],
    },

    // Estados interactivos
    action: {
      // Estados de hover, focus, etc.
      hover:
        mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
      selected: blue[800],
      focus:
        mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
      disabled:
        mode === "dark" ? "rgba(255, 255, 255, 0.26)" : "rgba(0, 0, 0, 0.26)",
      disabledBackground:
        mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
    },

    // Navegación específica
    navigation: {
      background: arctic[800],
      item: {
        default: "transparent",
        hover: alpha(arctic[900], 0.5),
        active: arctic[900],
        selected: mode === "dark" ? grey[600] : arctic[700],
      },
      text: {
        default: arctic[200],
        active: arctic[100],
        selected: mode === "dark" ? arctic[100] : grey[900],
      },
    },

    // Elementos específicos de PowerBI/Dashboard
    dashboard: {
      widget: {
        background: mode === "dark" ? grey[700] : arctic[800],
        border: mode === "dark" ? grey[600] : arctic[600],
        shadow:
          mode === "dark"
            ? "0 4px 6px rgba(0, 0, 0, 0.3)"
            : "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      chart: {
        grid: mode === "dark" ? grey[600] : arctic[600],
        axis: mode === "dark" ? arctic[400] : grey[600],
        tooltip: mode === "dark" ? grey[600] : arctic[700],
      },
      data: {
        positive: green[500],
        negative: red[500],
        neutral: orange[500],
        trend: blue[500],
      },
    },
  };
};
