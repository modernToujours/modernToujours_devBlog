import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import styled from "@emotion/styled";
import { MenuItem } from "@mui/material";
import Link from "next/link";

export const LogoItemWrap = styled.div`
  width: 200px;
  height: 50px;
  background-color: black;
  justify-content: center;
  color: white;
  display: flex;
  margin-left: 15px;
`;

export const LogoText = styled.div`
  margin-left: 10px;
`;

const LogoItem: React.FC = () => {
  return (
    <LogoItemWrap>
      <Link href={"/"}>
        <MenuItem>
          <CodeIcon />
          <LogoText>modernToujours.dev</LogoText>
        </MenuItem>
      </Link>
    </LogoItemWrap>
  );
};

export default LogoItem;
