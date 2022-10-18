import React from "react";
import { useState, useMemo, Provider } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";
import ColorModeContext from "./ColorModeContext";
import { darkTheme, lightTheme } from "./theme";

const ColorModeContextProvider = (props: any) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme: ThemeOptions = mode === "light" ? darkTheme : lightTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeContextProvider;
