import { Box, Button, TextField } from "@mui/material";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSaveComment } from "../hooks/useComments";
import { Comment } from "../types";

const AddComment = () => {
  const router = useRouter();
  const postId = router.query.id as string;
  const mutateComment = useSaveComment();

  const [commentContent, setCommentContent] = useState<string>("");

  const onAddComment = () => {
    getSession().then((session) => {
      let email: string;
      let name: string;

      if (!session?.user) {
        email = "notuser@moderntoujour.dev";
        name = "비회원";
      } else {
        email = session.user.email as string;
        name = session.user.name as string;
      }
      const comment: Comment = {
        email: email,
        name: name,
        comment: commentContent,
        upperComment: null,
        postId: postId,
      };
      setCommentContent("");
      mutateComment.mutateAsync(comment);
    });
  };

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
        <TextField
          label="댓글 작성하기"
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
          sx={{ margin: "10px 0" }}
          multiline
          rows={5}
        />
        <Button
          variant="contained"
          sx={{ margin: "auto 0 0 auto", fontSize: "15px" }}
          onClick={onAddComment}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddComment;
