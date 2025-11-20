import { TailSpin } from "react-loader-spinner";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";

const Loading = ({
  size = "medium",
  text,
  containerHeight = "100%",
  sx = {},
}) => {
  const color = useTheme().palette.secondary?.main;

  const sizeMap = {
    small: 24,
    medium: 40,
    large: 64,
  };

  const spinnerSize = sizeMap[size] || parseInt(size) || 40;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height={containerHeight}
      width="100%"
      sx={{
        minHeight: spinnerSize * 2,
        ...sx,
      }}
    >
      <TailSpin
        visible={true}
        height={spinnerSize}
        width={spinnerSize}
        color={color}
        ariaLabel="cargando contenido"
        radius="1"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
        }}
      />
      {text && (
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["small", "medium", "large"]),
    PropTypes.string,
    PropTypes.number,
  ]),
  text: PropTypes.string,
  containerHeight: PropTypes.string,
  sx: PropTypes.object,
};

export default Loading;
