import React, { MouseEvent } from "react";
import styled from "@emotion/styled";
import { MenuItem as MuiMenuItem } from "@mui/material";
import Link from "next/link";

export type MenuItemProps = {
  name: string;
  linkName?: string;
  onClick?: () => void;
};

const MenuItemWrap = styled.div`
  width: 100px;
  height: 50px;
  display: border-box;
  font-size: 24px;
`;

const MenuItem: React.FC<MenuItemProps> = ({ name, linkName, onClick }) => {
  let hrefLink: string;

  if (linkName) {
    hrefLink = linkName;
  } else {
    hrefLink = name;
  }

  return (
    <MenuItemWrap>
      {!onClick && (
        <Link href={`/${hrefLink}`}>
          <MuiMenuItem
            sx={{
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            {name}
          </MuiMenuItem>
        </Link>
      )}
      {onClick && (
        <MuiMenuItem
          sx={{
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
          onClick={onClick}
        >
          {name}
        </MuiMenuItem>
      )}
    </MenuItemWrap>
  );
};

export default MenuItem;
