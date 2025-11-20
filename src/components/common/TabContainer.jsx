import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Componente de tabs reutilizable
 * @param {Object} props
 * @param {Array} props.tabs - Array de objetos con { label, value, component }
 * @param {string} props.defaultTab - Tab por defecto
 * @param {string} props.indicatorColor - Color del indicador
 * @param {string} props.textColor - Color del texto
 * @param {boolean} props.showDivider - Mostrar línea divisora debajo de tabs
 */
const TabContainer = ({ 
  tabs, 
  defaultTab, 
  indicatorColor = "secondary", 
  textColor = "secondary",
  showDivider = true 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const activeTabData = tabs.find(tab => tab.value === activeTab);

  return (
    <>
      {/* Header con tabs */}
      <Box sx={{ 
        flexShrink: 0, // No se encoge
        paddingBottom: showDivider ? 2 : 0,
        borderBottom: showDivider ? '1px solid' : 'none',
        borderColor: 'divider',
      }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor={indicatorColor}
          textColor={textColor}
        >
          {tabs.map((tab) => (
            <Tab 
              key={tab.value} 
              label={tab.label} 
              value={tab.value} 
            />
          ))}
        </Tabs>
      </Box>
      
      {/* Contenido del tab activo */}
      <Box sx={{ 
        flex: 1, // Ocupa todo el espacio disponible
        minHeight: 0, // Importante para que funcione el flex
        display: 'flex',
        flexDirection: 'column'
      }}>
        {activeTabData?.component}
      </Box>
    </>
  );
};

TabContainer.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultTab: PropTypes.string,
  indicatorColor: PropTypes.string,
  textColor: PropTypes.string,
  showDivider: PropTypes.bool,
};

export default TabContainer; 