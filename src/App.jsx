import { HashRouter } from "react-router-dom";
import { AuthProvider } from "@/auth/context/Auth.provider";
import { ColorModeContext, useMode } from "@/context/ColorMode.context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Routes from "./routes/routes";

function App() {
  const [theme, colorMode] = useMode();

  // HashRouter no necesita basename - perfecto para GitHub Pages
  // Las rutas serán: https://andresdramos.github.io/EBI-Frontend/#/login
  return (
    <HashRouter>
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
