import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { post } from "./types";

const PostItem: React.FC<{ post: post }> = ({ post }) => {
  return (
    <Grid item xs={4} sm={4} md={4}>
      <React.Fragment>
        <Card
          sx={{
            widths: "100%",
            height: "400px",
            position: "relative",
            backgroundColor: "backgroudn.secondary",
            borderRadius: "10px",
          }}
        >
          <CardMedia
            sx={{
              display: "block",
              width: "100%",
              height: "300px",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            <Image
              src={post.image}
              alt={post.title}
              width="300"
              height="300"
              objectFit="contain"
            />
          </CardMedia>

          <Link
            href={{
              pathname: "/posts/[id]",
              query: { id: post._id!.toString() },
            }}
          >
            <CardContent sx={{ cursor: "pointer" }}>
              <Typography>{post.title}</Typography>
            </CardContent>
          </Link>
        </Card>
      </React.Fragment>
    </Grid>
  );
};

export default PostItem;
