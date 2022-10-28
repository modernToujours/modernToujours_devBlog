import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";

type post = { _id: ObjectId; title: string; image: string; post: string };

const PostItem: React.FC<{ post: post }> = ({ post }) => {
  return (
    <Grid item xs={4} sm={4} md={4}>
      <React.Fragment>
        <Card
          sx={{
            widths: "100%",
            height: "300px",
            position: "relative",
            backgroundColor: "backgroudn.secondary",
            borderRadius: "10px",
          }}
        >
          <CardMedia>
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </CardMedia>
        </Card>
        <Link
          href={{
            pathname: "/posts/[id]",
            query: { id: post._id.toString() },
          }}
        >
          <CardContent sx={{ cursor: "pointer" }}>
            <Typography>{post.title}</Typography>
          </CardContent>
        </Link>
      </React.Fragment>
    </Grid>
  );
};

export default PostItem;
