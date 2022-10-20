import React from "react";
import Box from "@mui/material/Box";
import LogoItem from "./LogoItem";
import Menu from "./Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header: React.FC = () => {
  return (
    <header>
      <Box
        sx={{
          width: "100%",
          height: "70px",
          top: "0",
          justifyContent: "space-between",
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
          position: "fixed",
          zIndex: "1000",
        }}
      >
        <LogoItem />
        <Menu />
      </Box>
    </header>
  );
};

export default Header;
