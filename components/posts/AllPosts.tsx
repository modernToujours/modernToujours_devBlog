import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import PostItem from "./PostItem";
import { Posts } from "./types";
import { useCategories } from "./hooks/useCategories";

const AllPosts: React.FC<{ posts: Posts }> = ({ posts }) => {
  const { categories, isLoading } = useCategories();
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("All");

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

  if (!posts) {
    return <div>Loading..</div>;
  }

  return (
    <Box
      sx={{ width: "90%", maxWidth: "60rem", margin: "40px auto", flexGrow: 1 }}
    >
      <React.Fragment>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {!isLoading &&
              categories.map((item) => {
                return (
                  <MenuItem key={item._id?.toString()} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </React.Fragment>
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
        {posts
          .filter((post) =>
            category === "All" ? true : post.category === category
          )
          .map((post) => (
            <PostItem key={post._id!.toString()} post={post} />
          ))}
      </Grid>
    </Box>
  );
};

export default AllPosts;
