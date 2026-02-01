import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme,
  configureFonts,
} from "react-native-paper";

import fontConfig from "./font";

// Light theme
const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: "#2196F3", // matches MUI primary.main
    onPrimary: "#FFFFFF", // matches MUI primary.contrastText
    secondary: "#9C27B0", // matches MUI secondary.main
    error: "#D32F2F", // matches MUI error.main
    onError: "#FFFFFF",
    background: "#FFFFFF", // matches MUI common.white
    onBackground: "rgba(0, 0, 0, 0.87)", // matches MUI text.primary
    surface: "#FFFFFF",
    onSurface: "rgba(0, 0, 0, 0.87)",
    surfaceDisabled: "rgba(0, 0, 0, 0.12)", // matches MUI action.disabledBackground
    // Material 3 tertiary color (no direct MUI equivalent)
    tertiary: "#0288D1", // using MUI info.main
    // Additional semantic colors
    errorContainer: "#EF6C00", // using MUI warning.main
    onErrorContainer: "#FFFFFF",
  },
};

// Dark theme
const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#2196F3",
    onPrimary: "#FFFFFF",
    secondary: "#9C27B0",
    error: "#D32F2F",
    onError: "#FFFFFF",
    tertiary: "#0288D1",
    errorContainer: "#EF6C00",
    onErrorContainer: "#FFFFFF",
  },
};

// Export combined theme object
const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
