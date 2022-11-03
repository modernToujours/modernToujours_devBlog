import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Header from "../components/layout/header/Header";
import ColorModeContextProvider from "../context/ColorModeContextProvider";
import { Box } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps<{ session?: Session }>) => {
  return (
    <ColorModeContextProvider>
      <SessionProvider session={pageProps.session}>
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
            <Analytics />
          </Box>
        </Box>
      </SessionProvider>
    </ColorModeContextProvider>
  );
};

export default MyApp;
