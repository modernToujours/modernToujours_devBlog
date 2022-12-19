import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import { useDeleteLike, useLikes, useSaveLike } from "./hooks/useLikes";

const Likes = () => {
  const router = useRouter();
  const postId = router.query.id as string;
  const { data, isLoading } = useLikes(postId);
  const { likes: likeCount, isLiked } = data;
  const addLike = useSaveLike(postId);
  const deleteLike = useDeleteLike(postId);

  const onLikeHandler = () => {
    addLike.mutateAsync();
  };
  const onDislikeHandler = () => {
    deleteLike.mutateAsync();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      {!isLoading && !isLiked && (
        <IconButton onClick={onLikeHandler}>
          <FavoriteBorderIcon sx={{ fontSize: 50 }} />
        </IconButton>
      )}
      {!isLoading && isLiked && (
        <IconButton onClick={onDislikeHandler}>
          <FavoriteIcon sx={{ fontSize: 50 }} />
        </IconButton>
      )}
      <Typography>{likeCount} likes</Typography>
    </Box>
  );
};

export default Likes;
