import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledLoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

export const StyledLoginCard = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(6),
  width: "100%",
  maxWidth: "400px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));

export const StyledFormContainer = styled("form")({
  width: "100%",
});

export const StyledLogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  gap: theme.spacing(2), // Espacio entre el logo y el texto
}));
