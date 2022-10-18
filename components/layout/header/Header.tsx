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
          justifyContent: "space-between",
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
          position: "fixed",
        }}
      >
        <LogoItem />
        <Menu />
      </Box>
    </header>
  );
};

export default Header;
