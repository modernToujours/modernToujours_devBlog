import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#000000",
    },
    secondary: {
      main: "#222222",
      light: "#222222",
      dark: "#dddddd",
    },
    error: {
      main: "#ff0000",
    },
    warning: {
      main: "#fb6b00",
    },
    background: {
      default: "#111111",
      paper: "#444444",
    },
  },
});

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#000000",
    },
    secondary: {
      main: "#222222",
      light: "#222222",
      dark: "#dddddd",
    },
    error: {
      main: "#ff0000",
    },
    warning: {
      main: "#fb6b00",
    },
    background: {
      default: "#bbbbbb",
      paper: "#ffffff",
    },
  },
});
