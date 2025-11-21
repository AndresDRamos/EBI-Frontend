import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/auth/hooks/useAuth";
import { HeaderContainer, UserInfo, Logo } from "./SidebarHeader.styles";
import logoDefault from "@assets/images/Logo.png";
import logoPositive from "@assets/images/Logo_positive.png";

const SidebarHeader = ({ isExpanded }) => {
  const { user, loading } = useAuth();
  const theme = useTheme();
  if (loading) {
    return (
      <HeaderContainer isexpanded={isExpanded.toString()}>
        Cargando...
      </HeaderContainer>
    );
  }

  const srcLogo = theme.palette.mode === "dark" ? logoPositive : logoDefault;

  return (
    <HeaderContainer isexpanded={isExpanded.toString()}>
      <Logo src={srcLogo} alt="Logo" isexpanded={isExpanded.toString()} />
      <UserInfo isexpanded={isExpanded.toString()}>
        {user ? (
          <Typography variant="subtitle1" noWrap>
            {user.Nombre || "Usuario"}
          </Typography>
        ) : (
          <Typography variant="subtitle1" noWrap>
            No hay datos de usuario
          </Typography>
        )}
      </UserInfo>
    </HeaderContainer>
  );
};

export default SidebarHeader;
