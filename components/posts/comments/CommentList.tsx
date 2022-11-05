import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";

type CommentType = {
  _id: ObjectId;
  postId: string;
  email: string;
  name: string;
  comment: string;
  upperComment: string;
  img: string | null;
};

const CommentList: React.FC = () => {
  const router = useRouter();
  const postId = router.query.id;

  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}/comments`)
      .then((res) => res.data.comments)
      .then((res) => {
        setComments(res);
      });
  }, [postId]);

  return (
    <Box
      sx={{
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        {comments.map((comment) => {
          return <Comment key={comment._id.toString()} comment={comment} />;
        })}
      </Box>
    </Box>
  );
};

export default CommentList;
