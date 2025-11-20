import { Box, styled } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const Logo = styled("img", {
  shouldForwardProp: (prop) => prop !== "isexpanded",
})(({ theme, isexpanded }) => ({
  height: "40px", // Altura fija para ambos estados
  width: isexpanded === "true" ? "auto" : "50px", // Control del ancho
  objectFit: "cover",
  objectPosition: "left", // Asegura que se muestre la parte izquierda
  clipPath:
    isexpanded === "true"
      ? "inset(0 0 0 0)" // Sin recorte cuando está expandido
      : "inset(0 25% 0 0)", // Recorta todo excepto los primeros 50px
  transition: theme.transitions.create(["width", "clip-path"], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
}));
export const UserInfo = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isexpanded",
})(({ isexpanded }) => ({
  width: "100%",
  opacity: isexpanded === "true" ? 1 : 0,
  transition: "opacity 0.3s ease",
  textAlign: "center",
}));
