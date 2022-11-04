import { Box, Paper } from "@mui/material";
import React from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

type CommentsProps = { postId?: string };

const Comments: React.FC<CommentsProps> = (props) => {
  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          margin: "50px auto",
          borderRadius: "10px",
          maxWidth: "90%",
          textAlign: "left",
        }}
      >
        <CommentList />
        <AddComment />
      </Paper>
    </Box>
  );
};

export default Comments;
