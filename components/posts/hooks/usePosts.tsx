import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { queryKeys } from "../../../react-query/contants";
import { post } from "../../../components/posts/types";

const getPosts = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`
  );

  return data.posts;
};

const getPost = async (postId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts?id=${postId}`
  );
  return data.post[0];
};

export const usePosts = () => {
  // const queryClient = useQueryClient();

  const fallback: post[] = [];

  const { data: posts = fallback } = useQuery<post[]>(
    [queryKeys.posts],
    getPosts
  );

  return { posts };
};

export const usePost = (postId: string) => {
  const fallback = undefined;

  const { data: post = fallback } = useQuery<post>({
    queryKey: [queryKeys.posts, postId],
    queryFn: () => getPost(postId),
  });

  return { post };
};

export const usePrefetchPosts = () => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({ queryKey: [queryKeys.posts], queryFn: getPosts });
};
