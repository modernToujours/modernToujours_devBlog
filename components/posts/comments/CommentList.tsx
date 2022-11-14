import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useComments } from "../hooks/useComments";
import Comment from "./Comment";

const CommentList: React.FC = () => {
  const router = useRouter();
  const postId = router.query.id as string;

  const { comments } = useComments(postId);

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
          return <Comment key={comment._id!.toString()} comment={comment} />;
        })}
      </Box>
    </Box>
  );
};

export default CommentList;
