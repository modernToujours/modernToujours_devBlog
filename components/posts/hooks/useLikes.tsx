import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "../../../react-query/contants";
import queryClient from "../../../react-query/queryClient";
import { Likes } from "../types";

const getLikes = async (postId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${postId}/like`
  );

  const { likes, isLiked } = data;

  return { likes, isLiked };
};

const postLike = async (postId: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${postId}/like`
  );
  return data;
};

export const deleteLike = async (postId: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${postId}/like`
  );

  return data;
};

export const useLikes = (postId: string) => {
  const likeData: Likes = { likes: 0, isLiked: false };

  const { data = likeData, isLoading } = useQuery<Likes>(
    [queryKeys.likes, postId],
    () => getLikes(postId)
  );

  return { data, isLoading };
};

export const useSaveLike = (postId: string) => {
  return useMutation([queryKeys.posts, postId], () => postLike(postId), {
    onSuccess: () => queryClient.invalidateQueries([queryKeys.likes, postId]),
  });
};

export const useDeleteLike = (postId: string) => {
  return useMutation([queryKeys.likes, postId], () => deleteLike(postId), {
    onSuccess: () => queryClient.invalidateQueries([queryKeys.likes, postId]),
  });
};
