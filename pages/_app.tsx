import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/header/Header";
import ColorModeContextProvider from "../components/context/ColorModeContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeContextProvider>
      <Header />

      <Component {...pageProps} />
    </ColorModeContextProvider>
  );
}

export default MyApp;
