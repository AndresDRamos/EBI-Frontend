import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/auth/context/Auth.provider";
import { ColorModeContext, useMode } from "@/context/ColorMode.context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Routes from "./routes/routes";

function App() {
  const [theme, colorMode] = useMode();

  // Obtener el basename desde el import.meta.env para GitHub Pages
  // En desarrollo será '/', en producción será '/EBI-Frontend'
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
