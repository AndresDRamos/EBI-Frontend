import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import themeSettings from "../theme/index";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("theme-mode") || "light";
    }
    return "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          if (typeof window !== "undefined") {
            window.localStorage.setItem("theme-mode", newMode);
          }
          return newMode;
        });
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode, mode];
};
