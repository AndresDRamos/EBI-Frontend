import { useMemo } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Container from "@/components/Container";
import PropTypes from "prop-types";

/**
 * ============================================
 * GRID CONTAINER - Styled component
 * ============================================
 * 
 * Contenedor Grid CSS para renderizar 4 columnas uniformes
 */
const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(280px, 1fr))",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  alignContent: "start",
  minHeight: "100%",
  width: "100%",

  // Responsive: 3 columnas en pantallas medianas
  "@media (max-width: 1400px)": {
    gridTemplateColumns: "repeat(3, minmax(280px, 1fr))",
  },

  // Responsive: 2 columnas en tablets
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
  },

  // Responsive: 1 columna en móviles
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
}));

/**
 * ============================================
 * GRID ITEM - Styled component
 * ============================================
 * 
 * Item individual del grid con altura fija
 */
const GridItem = styled(Box)(() => ({
  display: "flex",
  minHeight: 320,
  maxHeight: 320,
}));

/**
 * ============================================
 * INDEX - Página de índice dinámico
 * ============================================
 *
 * Renderiza un grid de componentes Container con las opciones disponibles
 * basado en el item padre (nivel 1) recibido desde las rutas dinámicas.
 *
 * Estructura:
 * - Grid responsivo que contiene componentes Container (nivel 2)
 * - Cada Container maneja su propio encabezado y contenido (nivel 3)
 * - Los datos se pasan dinámicamente desde el backend
 *
 * Props:
 * - parentItem: Item de nivel 1 del menú (con sus hijos de nivel 2)
 *
 * Ejemplo:
 * Ruta: /operaciones
 * → Index recibe parentItem: "Operaciones" (nivel 1)
 * → Renderiza tarjetas: "Corte", "Doblez" (nivel 2)
 * → Cada tarjeta muestra opciones: "Merma", "Eficiencia" (nivel 3)
 */
const Index = ({ parentItem }) => {
  // Filtrar solo items de nivel 2 (headers de tarjetas)
  const nivel2Items = useMemo(() => {
    if (!parentItem?.children) return [];
    return parentItem.children.filter((item) => item.Nivel === 2);
  }, [parentItem]);

  // Estado vacío - Sin item activo
  if (!parentItem) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No hay contenido disponible
        </Typography>
      </Box>
    );
  }

  // Estado vacío - Sin opciones disponibles
  if (nivel2Items.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No hay opciones disponibles
        </Typography>
      </Box>
    );
  }

  // Renderizar grid con componentes Container
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "background.default",
      }}
    >
      <GridContainer>
        {nivel2Items.map((child) => (
          <GridItem key={child.idMenu}>
            <Container item={child} />
          </GridItem>
        ))}
      </GridContainer>
    </Box>
  );
};

Index.propTypes = {
  parentItem: PropTypes.shape({
    children: PropTypes.array,
  }),
};

export default Index;
