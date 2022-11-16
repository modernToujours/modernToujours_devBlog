import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDeleteComment } from "../hooks/useComments";
import { Comment } from "../types";

const SubComment: React.FC<{ comment: Comment }> = ({ comment }) => {
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
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: { xs: "10%", sm: "5%" },
          margin: "auto auto",
        }}
      ></Box>
      <Box
        sx={{
          width: { xs: "90%", sm: "95%" },
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
              width: "30px",
              height: "30px",
              background: "background.paper",
            }}
          >
            <Image src={imgUrl} alt={comment.name} width={30} height={30} />
          </Card>
          <Typography sx={{ marginLeft: "5px" }}>{comment.name}</Typography>
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
      </Box>
    </Box>
  );
};

export default SubComment;
