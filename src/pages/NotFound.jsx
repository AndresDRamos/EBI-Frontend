import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
      <Typography variant="h4" component="h1">
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary">
        La página que buscas no existe o no está disponible.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/Inicio")}
        sx={{ mt: 2 }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
