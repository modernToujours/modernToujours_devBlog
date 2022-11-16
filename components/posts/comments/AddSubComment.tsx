import { SubdirectoryArrowRight } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Comment } from "../types";
import React, { useState } from "react";
import { useSaveComment } from "../hooks/useComments";

const AddSubComment = ({ commentId }: { commentId: string }) => {
  const router = useRouter();
  const postId = router.query.id as string;
  const mutateComment = useSaveComment();

  const [commentContent, setCommentContent] = useState<string>("");
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);

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
        upperComment: commentId,
        postId: postId,
      };
      setCommentContent("");
      mutateComment.mutateAsync(comment);
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: { xs: "10%", sm: "5%" },
            margin: "auto auto",
          }}
        >
          <SubdirectoryArrowRight
            sx={{ fontSize: { xs: "30px", sm: "40px" } }}
          />
        </Box>
        <TextField
          label="대댓글 작성하기"
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
          onFocus={() => setIsOnFocus(true)}
          onBlur={() => setIsOnFocus(false)}
          multiline
          rows={isOnFocus ? 5 : 1}
          sx={{ width: { xs: "90%", sm: "95%" }, margin: "10px 0 10px auto" }}
        />
      </Box>

      <Box sx={{ marginLeft: "auto" }}>
        <Button
          variant="contained"
          sx={{ fontSize: "15px" }}
          onClick={onAddComment}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddSubComment;
