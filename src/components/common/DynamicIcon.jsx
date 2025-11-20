import * as MuiIcons from '@mui/icons-material'

/**
 * Componente para renderizar iconos dinámicamente
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.iconName] - Nombre del icono a renderizar
 * @returns {JSX.Element|null} Icono renderizado o null
 */
const DynamicIcon = ({ iconName }) => {
  if (!iconName) return null
  const Icon = MuiIcons[iconName]

  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in MuiIcons`)
    return <MuiIcons.Help />
  }

  return <Icon />
}

export default DynamicIcon 