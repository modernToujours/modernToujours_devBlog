import React from "react";
import { Divider, TextField, Box } from "@mui/material";
import { Card, Typography, Button } from "@mui/material";
import CardForm from "../layout/main/CardForm";

const LoginForm: React.FC = () => {
  return (
    <CardForm>
      <Typography
        sx={{ fontSize: { xs: "35px", sm: "50px" }, textAlign: "center" }}
      >
        Login
      </Typography>
      <Divider sx={{ marginTop: "20px" }} />
      <TextField sx={{ marginTop: "20px" }} type="email" label="email" />
      <TextField
        sx={{ marginTop: "20px", marginBottom: "30px" }}
        type="password"
        label="password"
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Button
          sx={{
            width: "250px",
            height: "60px",
            margin: "auto",
            marginBottom: "15px",
          }}
          variant="outlined"
        >
          <Typography sx={{ fontSize: "14px" }}>Login</Typography>
        </Button>
        <Button
          sx={{
            width: "250px",
            height: "60px",
            margin: "auto",
            marginBottom: "15px",
          }}
          variant="outlined"
        >
          <Typography sx={{ fontSize: "14px" }}>SignUp</Typography>
        </Button>
      </Box>
    </CardForm>
  );
};

export default LoginForm;
