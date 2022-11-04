import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ObjectId } from "mongodb";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type CommentPropsType = {
  comment: {
    _id: ObjectId;
    postId: string;
    email: string;
    name: string;
    comment: string;
    upperComment: string;
    img: string | null;
  };
};

const Comment: React.FC<CommentPropsType> = ({ comment }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const postId = router.query.id;
  const [imgUrl, setImgUrl] = useState<string>("/images/no-profile-image.png");
  useEffect(() => {
    axios.get(`/api/user/image/${comment.email}`).then((res) => {
      if (res.data.imgUrl) {
        setImgUrl(res.data.imgUrl);
      }
    });
  }, [comment.email]);

  const deleteCommentHandler = () => {
    axios.delete(`/api/posts/${postId}/comments/${comment._id.toString()}`);
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
    </Box>
  );
};

export default Comment;
