import styled from "@emotion/styled";
import React from "react";
import LogoItem from "./LogoItem";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

const HeaderWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: black;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrap>
      <LogoItem />
      <Menu />
    </HeaderWrap>
  );
};

export default Header;
