import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "../../../react-query/contants";
import queryClient from "../../../react-query/queryClient";
import { Comment, Comments } from "../types";

const getComments = async (postId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${postId}/comments`
  );
  return data.comments;
};

const addComment = async (comment: Comment) => {
  const {
    email,
    name,
    comment: commentContent,
    upperComment,
    postId,
  } = comment;
  const { data } = await axios.post(`/api/posts/${postId}/comments`, {
    email,
    name,
    comment: commentContent,
    upperComment,
    postId,
  });

  return data;
};

const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${postId}/comments/${commentId}`
  );
  return data;
};

export const useComments = (postId: string) => {
  const fallback: Comments = [];

  const { data: comments = fallback } = useQuery<Comments>({
    queryKey: [queryKeys.comments, postId],
    queryFn: () => getComments(postId),
  });

  return { comments };
};

export const useSaveComment = () => {
  return useMutation(
    [queryKeys.comments],
    (comment: Comment) => addComment(comment),
    {
      onSuccess: () => queryClient.invalidateQueries([queryKeys.comments]),
    }
  );
};

export const useDeleteComment = () => {
  return useMutation(
    [queryKeys.comments],
    ({ postId, commentId }: { postId: string; commentId: string }) =>
      deleteComment({ postId, commentId }),
    {
      onSuccess: () => queryClient.invalidateQueries([queryKeys.comments]),
    }
  );
};
