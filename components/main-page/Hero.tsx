import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const Hero: React.FC = () => {
  return (
    <section>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "background.paper",
          color: "text.primary",
          flexDirection: "column",
        }}
      >
        <Card
          sx={{
            borderRadius: "50%",
            width: "300px",
            height: "300px",
            background: "background.paper",
            margin: "30px auto",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/main-logo.png"
            alt="main-image"
            width={300}
            height={300}
          />
        </Card>
        <Box sx={{ fontWeight: "bold", fontFamily: "Roboto" }}>
          <h2>안녕하세요. 반갑습니다.</h2>
          <h2>맛집블로거 modernToujours 입니다.</h2>
        </Box>
      </Box>
    </section>
  );
};

export default Hero;
