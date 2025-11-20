import { greyTokens, arcticTokens, accentTokens } from "./tokens/colors.js";
import { typographyConfig } from "./tokens/typography.js";
import { semanticTokens } from "./tokens/semantic.js";

export const tokens = (mode) => {
  const grey = greyTokens[mode];
  const arctic = arcticTokens[mode];
  const orange = accentTokens.orange[mode];
  const red = accentTokens.red[mode];
  const green = accentTokens.green[mode];
  const blue = accentTokens.blue[mode];

  return {
    grey,
    arctic,
    orange,
    red,
    green,
    blue,
  };
};

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  const semantic = semanticTokens(mode);

  return {
    palette: {
      mode: mode,
      // Colores principales
      primary: {
        main: colors.grey[500],
      },
      secondary: {
        main: colors.orange[500],
      },
      // Mantén tu configuración neutral existente
      neutral: {
        light: colors.arctic[100],
        main: colors.arctic[500],
        dark: colors.arctic[700],
      },
      // Fondos mejorados con tokens semánticos
      background: {
        default: semantic.surface.level0,
        paper: semantic.surface.paper,
      },
      // Integra colores semánticos
      text: semantic.text,
      action: semantic.action,
      navigation: semantic.navigation,
      border: semantic.border,
      // Añade colores de estado
      success: semantic.status.success,
      warning: semantic.status.warning,
      error: semantic.status.error,
      info: semantic.status.info,
      // Colores personalizados para acceso directo
      semantic: semantic,
    },
    // Usa la configuración de tipografía centralizada
    typography: typographyConfig,
    // Configuraciones adicionales
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
  };
};

export default themeSettings;

// Exporta también los tokens individuales para uso directo
export { greyTokens, arcticTokens, accentTokens } from "./tokens/colors.js";
export {
  typographyConfig,
  fontSizes,
  fontWeights,
} from "./tokens/typography.js";
export { semanticTokens } from "./tokens/semantic.js";
