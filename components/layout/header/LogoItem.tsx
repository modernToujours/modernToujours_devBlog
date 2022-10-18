import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { MenuItem } from "@mui/material";
import Link from "next/link";

export const LogoText = styled.div`
  margin-left: 10px;
  size: 20px;
  font-size: 24px;
`;

const LogoItem: React.FC = () => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "100%",
        justifyContent: "center",
        display: "flex",
        marginLeft: "15px",
      }}
    >
      <Link href={"/"}>
        <MenuItem>
          <CodeIcon fontSize="large" />
          <LogoText>modernToujours.dev</LogoText>
        </MenuItem>
      </Link>
    </Box>
  );
};

export default LogoItem;
