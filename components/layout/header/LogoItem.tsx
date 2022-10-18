import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import Box from "@mui/material/Box";
import { MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";

const LogoItem: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
        justifyContent: "center",
        display: "flex",
        marginLeft: { xs: "0px", sm: "15px" },
      }}
    >
      <Link href={"/"}>
        <MenuItem>
          <CodeIcon sx={{ fontSize: { xs: "30px", sm: "45px" } }} />
          <Typography
            sx={{
              fontFamily: "Arial",
              fontWeight: "bold",
              fontSize: { xs: "20px", sm: "25px" },
              marginLeft: { xs: "3px", sm: "10px" },
            }}
          >
            modernToujours.dev
          </Typography>
        </MenuItem>
      </Link>
    </Box>
  );
};

export default LogoItem;
