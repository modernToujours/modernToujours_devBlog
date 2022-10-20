import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/header/Header";
import ColorModeContextProvider from "../context/ColorModeContextProvider";
import { Box } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeContextProvider>
      <Box sx={{ overflow: "hidden" }}>
        <Header />
        <Box
          sx={{
            display: "block",
            height: "70px",
            visibility: "hidden",
          }}
        />
        <Box
          sx={{
            width: "100%",
            minHeight: "calc(100vh - 70px)",
            display: "flex",
            backgroundColor: "background.paper",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            overflow: "scroll",
          }}
        >
          <Component {...pageProps} />
        </Box>
      </Box>
    </ColorModeContextProvider>
  );
}

export default MyApp;
