import styled from "@emotion/styled";
import React from "react";
import MenuItem from "./MenuItem";
import { Menu as MuiMenu } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { Button } from "@mui/material";
import DarkModeToggler from "./DarkModeToggler";

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
      <DarkModeToggler />
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ marginRight: { xs: "10px", sm: "20px" } }}
      >
        <ListIcon fontSize="large" sx={{ color: "text.primary" }} />
      </Button>
      <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem name="menu1" linkName="menu1" />
        <MenuItem name="Login" linkName="login" />
        <MenuItem name="Contact" linkName="contact" />
      </MuiMenu>
    </MenuWrap>
  );
};

export default Menu;
