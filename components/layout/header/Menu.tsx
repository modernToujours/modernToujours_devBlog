import styled from "@emotion/styled";
import React from "react";
import MenuItem from "./MenuItem";
import { Menu as MuiMenu } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { Button } from "@mui/material";

const MenuWrap = styled.div`
  display: flex;
`;

const Menu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MenuWrap>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="primary"
      >
        <ListIcon color="inherit" />
      </Button>
      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem name="menu1" linkName="menu1" />
        <MenuItem name="menu2" />
        <MenuItem name="menu3" />
      </MuiMenu>
    </MenuWrap>
  );
};

export default Menu;
