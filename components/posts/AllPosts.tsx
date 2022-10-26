import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

const AllPosts: React.FC = () => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!userSession) {
      getSession().then((session) => {
        if (session) {
          setUserSession(session);

          const { email } = session.user!;

          axios.get(`/api/user/provider?email=${email}`).then((res) => {
            console.log(res.data.userType);
            if (res.data.userType === "admin") {
              setIsAdmin(true);
            }
          });
        }
      });
    }
  }, []);

  return (
    <Box
      sx={{ width: "90%", maxWidth: "60rem", margin: "40px auto", flexGrow: 1 }}
    >
      <React.Fragment>
        {isAdmin && (
          <Link href="/posts/add">
            <Button variant="contained" sx={{ left: 0 }}>
              Add Posts
            </Button>
          </Link>
        )}
      </React.Fragment>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "50px", sm: "70px" },
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        All Posts
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Paper
              sx={{ padding: "2px", textAlign: "center", margin: "0 10px" }}
            >
              posts
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllPosts;
