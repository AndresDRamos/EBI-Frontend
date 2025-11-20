import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/hooks/useAuth";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loading from "@components/common/Loading.jsx";
import {
  StyledLoginContainer,
  StyledLoginCard,
  StyledFormContainer,
  StyledLogoBox,
} from "./Login.styles.js";

import logoDefault from "@assets/images/Logo.png";
import logoPositive from "@assets/images/Logo_positive.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signin, errors: authErrors } = useAuth();
  const theme = useTheme();

  const logoImage = theme.palette.mode === "dark" ? logoPositive : logoDefault;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      loginInput: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await signin(data);

      if (response.success) {
        navigate("/inicio");
      } else {
        setError(response.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error de inicio de sesión", error);
      setError("Error de conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  };
  const handdleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledLoginContainer>
      <StyledLoginCard>
        <StyledLogoBox>
          <Box
            component="img"
            src={logoImage}
            alt="EZI Logo"
            sx={{
              height: { xs: 30, sm: 40 }, // Tamaño responsivo
              marginRight: 2,
            }}
          />
          <Typography variant="h4">Business Intelligence</Typography>
        </StyledLogoBox>
        {authErrors.length > 0 && (
          <Typography color="error" mb={2} align="center">
            {authErrors[0]}
          </Typography>
        )}
        <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <TextField
              fullWidth
              id="loginInput"
              label="Nombre de usuario"
              variant="outlined"
              autoComplete="username"
              error={!!errors.loginInput}
              helperText={errors.loginInput?.message}
              {...register("loginInput", "El usuario es obligatorio")}
            />
          </Box>
          <Box mb={4}>
            <TextField
              fullWidth
              id="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handdleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", "La contraseña es obligatoria")}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Iniciar sesión
          </Button>
        </StyledFormContainer>
      </StyledLoginCard>
    </StyledLoginContainer>
  );
};

export default LoginPage;
