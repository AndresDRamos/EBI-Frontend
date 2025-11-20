import { useContext } from "react";
import { IconButton, Tooltip, Box, useTheme, Icon } from "@mui/material";
import { styled } from "@mui/material";
import { DarkMode, LightMode, NightsStay, WbSunny } from "@mui/icons-material";
import { ColorModeContext } from "@/context/ColorMode.context";

const StyledIconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$isVisible" && prop !== "$isDark",
})(({ $isVisible, $isDark, theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  opacity: $isVisible ? 1 : 0,
  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  scale: $isVisible ? 1 : 0,
  rotate: $isVisible ? "0deg" : $isDark ? "180deg" : "-180deg",
  color: $isDark
    ? theme.palette.primary.contrastText
    : theme.palette.primary.main,
}));

const ThemeToggleButton = ({
  size = "medium",
  tooltipPlacement = "bottom",
}) => {
  const theme = useTheme(); // Accede al tema actual
  const colorMode = useContext(ColorModeContext); // Accede al contexto del modo de color
  const isDark = theme.palette.mode === "light";

  const tooltipText = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  const MoonIcon = isDark ? NightsStay : DarkMode;
  const SunIcon = isDark ? WbSunny : LightMode;

  return (
    <Tooltip title={tooltipText} placement={tooltipPlacement}>
      <Box>
        <IconButton
          onClick={colorMode.toggleColorMode}
          color="inherit"
          size={size}
          sx={{ transition: "all 0.3s ease-in-out" }}
          aria-label="toggle color theme"
        >
          <StyledIconWrapper $isVisible={!isDark} $isDark={isDark}>
            <SunIcon fontSize={size} />
          </StyledIconWrapper>
          <StyledIconWrapper $isVisible={isDark} $isDark={isDark}>
            <MoonIcon fontSize={size} />
          </StyledIconWrapper>
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export default ThemeToggleButton;
