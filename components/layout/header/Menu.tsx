import styled from "@emotion/styled";
import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import { Menu as MuiMenu } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { Button } from "@mui/material";
import DarkModeToggler from "./DarkModeToggler";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const MenuWrap = styled.div`
  display: flex;
`;

const Menu: React.FC = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(data);
    console.log(status);
  }, [data, status]);

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
        <MenuItem name="Posts" linkName="posts" />
        {!data && status !== "loading" && (
          <MenuItem name="Login" linkName="login" />
        )}
        {data && <MenuItem name="Profile" linkName="profile" />}
        {data && (
          <MenuItem
            name="Logout"
            linkName="logout"
            onClick={() => {
              signOut({ redirect: false });
              router.push("/");
            }}
          />
        )}
        <MenuItem name="Contact" linkName="contact" />
      </MuiMenu>
    </MenuWrap>
  );
};

export default Menu;
