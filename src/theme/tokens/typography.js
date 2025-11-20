const FONT_FAMILY = ["Montserrat", "sans-serif"].join(",");

export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 32,
  "5xl": 40,
  "6xl": 48,
};

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
  loose: 2,
};

export const typographyConfig = {
  fontFamily: FONT_FAMILY,
  fontSize: fontSizes.sm,
  fontWeightLight: fontWeights.light, // 300
  fontWeightRegular: fontWeights.regular, // 400
  fontWeightMedium: fontWeights.medium, // 500
  fontWeightBold: fontWeights.bold, // 700
  // Headings
  h1: {
    fontFamily: FONT_FAMILY,
    fontSize: fontSizes["5xl"],
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.tight,
    letterSpacing: "-0.025em",
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontSize: fontSizes["4xl"],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: FONT_FAMILY,
    fontSize: fontSizes["3xl"],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    letterSpacing: "-0.01em",
  },
  h5: {
    fontFamily: FONT_FAMILY,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },
  h6: {
    fontFamily: FONT_FAMILY,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },
};
