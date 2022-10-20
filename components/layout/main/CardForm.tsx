import React from "react";
import { Card, CardContent } from "@mui/material";

type CardFormProps = { children: JSX.Element | JSX.Element[] };

const CardForm: React.FC<CardFormProps> = ({ children }) => {
  return (
    <Card
      sx={{
        width: {
          xs: "400px",
          sm: "600px",
        },
        minWidth: {
          xs: "300px",
        },
        margin: {
          xs: "20px",
          sm: "30px 20px",
        },
        borderRadius: "10px",
        padding: "25px",
        height: "700px",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardForm;
