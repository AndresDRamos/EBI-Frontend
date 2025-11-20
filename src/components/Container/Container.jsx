import { useNavigate } from "react-router-dom";
import {
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import DynamicIcon from "@components/common/DynamicIcon";
import {
  ContainerWrapper,
  ContainerHeader,
  ContainerContent,
} from "./Container.styles";

/**
 * ============================================
 * CONTAINER - Componente contenedor de sección
 * ============================================
 *
 * Renderiza una sección con encabezado y contenido dinámico.
 * Utiliza elementos básicos de MUI para una apariencia limpia.
 *
 * Props:
 * - item: Objeto del menú con datos del item de nivel 2
 * - item.MenuName: Nombre para el encabezado
 * - item.MenuIcon: Icono para el encabezado
 * - item.children: Array de items nivel 3 (opciones seleccionables)
 * - item.FullPath: Ruta directa si no tiene hijos
 */
const Container = ({ item }) => {
  const navigate = useNavigate();

  const hasChildren = item.children && item.children.length > 0;

  return (
    <ContainerWrapper>
      {/* Encabezado de la sección */}
      <ContainerHeader>
        {item.MenuIcon && <DynamicIcon iconName={item.MenuIcon} />}
        <Typography variant="h5" component="h2">
          {item.MenuName}
        </Typography>
      </ContainerHeader>

      {/* Contenido de la sección */}
      <ContainerContent>
        {hasChildren ? (
          // Renderizar lista de opciones (nivel 3)
          <List disablePadding>
            {item.children.map((child) => (
              <ListItemButton
                key={child.idMenu}
                onClick={() => navigate(child.FullPath)}
              >
                {child.MenuIcon && (
                  <ListItemIcon>
                    <DynamicIcon iconName={child.MenuIcon} />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={child.MenuName}
                  primaryTypographyProps={{
                    variant: "body1",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        ) : (
          // Contenido para items sin hijos
          <Typography variant="body2" color="text.secondary">
            Sin contenido
          </Typography>
        )}
      </ContainerContent>
    </ContainerWrapper>
  );
};

Container.propTypes = {
  item: PropTypes.shape({
    idMenu: PropTypes.number.isRequired,
    MenuName: PropTypes.string.isRequired,
    MenuIcon: PropTypes.string,
    FullPath: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        idMenu: PropTypes.number.isRequired,
        MenuName: PropTypes.string.isRequired,
        MenuIcon: PropTypes.string,
        FullPath: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default Container;
