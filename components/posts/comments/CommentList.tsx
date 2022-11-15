import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useComments } from "../hooks/useComments";
import { Comments } from "../types";
import Comment from "./Comment";

const CommentList: React.FC = () => {
  const router = useRouter();
  const postId = router.query.id as string;

  const { comments, isLoading } = useComments(postId);

  if (isLoading) {
    return <CircularProgress />;
  }

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
        {comments
          .filter((comment) => !comment.upperComment)
          .map((comment) => {
            let subComments: Comments = [];
            if (!comment.upperComment) {
              subComments = comments.filter(
                (subComment) =>
                  subComment.upperComment === comment._id?.toString()
              );
              return (
                <Comment
                  key={comment._id!.toString()}
                  comment={comment}
                  subComments={subComments}
                />
              );
            }
          })}
      </Box>
    </Box>
  );
};

export default CommentList;
