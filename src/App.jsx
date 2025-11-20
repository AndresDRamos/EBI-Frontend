import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/auth/context/Auth.provider";
import { ColorModeContext, useMode } from "@/context/ColorMode.context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Routes from "./routes/routes";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
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
