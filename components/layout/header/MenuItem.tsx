import React from "react";
import styled from "@emotion/styled";
import { MenuItem as MuiMenuItem } from "@mui/material";
import Link from "next/link";

export type MenuItemProps = { name: string; linkName?: string };

const MenuItemWrap = styled.div`
  width: 100px;
  height: 50px;
  display: border-box;
`;

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { name, linkName } = props;

  let hrefLink: string;

  if (linkName) {
    hrefLink = linkName;
  } else {
    hrefLink = name;
  }

  return (
    <MenuItemWrap>
      <Link href={hrefLink}>
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
    </MenuItemWrap>
  );
};

export default MenuItem;
