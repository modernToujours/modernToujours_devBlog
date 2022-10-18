import React from "react";
import Image from "next/image";
import { Typography, Box, Card } from "@mui/material";

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
          <Typography
            variant="h3"
            sx={{
              margin: "10px 10px",
              wordBreak: "keep-all",
              wordWrap: "keep-all",
              fontWeight: "bolder",
            }}
          >
            안녕하세요. 반갑습니다.
          </Typography>
          <Typography
            variant="h4"
            sx={{
              margin: "15px 15px",
              wordBreak: "keep-all",
              wordWrap: "keep-all",
              fontWeight: "bold",
            }}
          >
            맛집블로거 <strong>modernToujours</strong> 입니다.
          </Typography>
        </Box>
      </Box>
    </section>
  );
};

export default Hero;
