import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Comment as CommentType, Comments } from "../types";
import { useDeleteComment } from "../hooks/useComments";
import AddSubComment from "./AddSubComment";
import SubComment from "./SubComment";

const Comment: React.FC<{ comment: CommentType; subComments?: Comments }> = ({
  comment,
  subComments,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const postId = router.query.id as string;
  const commentId = comment._id?.toString() as string;
  const [imgUrl, setImgUrl] = useState<string>("/images/no-profile-image.png");
  const mutateComment = useDeleteComment();

  useEffect(() => {
    comment.name !== "비회원" &&
      axios.get(`/api/user/image/${comment.email}`).then((res) => {
        if (res.data.imgUrl) {
          setImgUrl(res.data.imgUrl);
        }
      });
  }, [comment.email, comment.name]);

  const deleteCommentHandler = async () => {
    await mutateComment.mutateAsync({ postId, commentId });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          margin: "5px",
        }}
      >
        <Card
          sx={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            background: "background.paper",
          }}
        >
          <Image src={imgUrl} alt={comment.name} width={50} height={50} />
        </Card>
        <Typography variant="h6" sx={{ marginLeft: "5px" }}>
          {comment.name}
        </Typography>
        {status === "authenticated" && session.user?.email === comment.email && (
          <IconButton
            sx={{ margin: "0 0 0 auto" }}
            onClick={deleteCommentHandler}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      <TextField sx={{ marginTop: "5px" }} disabled value={comment.comment} />
      {subComments &&
        subComments.map((comment) => {
          return <SubComment key={comment._id!.toString()} comment={comment} />;
        })}
      <AddSubComment commentId={commentId} />
    </Box>
  );
};

export default Comment;
