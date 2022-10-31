import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { ObjectId } from "mongodb";
import PostItem from "./PostItem";

type post = { _id: ObjectId; title: string; image: string; post: string };

type posts = post[];

const AllPosts: React.FC<{ posts: posts }> = ({ posts }) => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!userSession) {
      getSession().then((session) => {
        if (session) {
          setUserSession(session);

          const { email } = session.user!;

          axios.get(`/api/user/provider?email=${email}`).then((res) => {
            if (res.data.userType === "admin") {
              setIsAdmin(true);
            }
          });
        }
      });
    }
  }, [userSession]);

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

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {posts.map((post) => (
          <PostItem key={post._id.toString()} post={post} />
        ))}
      </Grid>
    </Box>
  );
};

export default AllPosts;
