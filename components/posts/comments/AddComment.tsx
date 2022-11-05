import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const AddComment = () => {
  const router = useRouter();
  const postId = router.query.id;

  const [comment, setComment] = useState<string>("");

  const onAddComment = () => {
    getSession().then((session) => {
      if (!session?.user) return;
      const { email, name } = session.user;
      axios
        .post(`/api/posts/${postId}/comments`, { email, name, comment })
        .then((res) => console.log(res));
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
          value={comment}
          onChange={(event) => setComment(event.target.value)}
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
