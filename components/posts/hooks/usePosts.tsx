import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "../../../react-query/contants";
import { post } from "../../../components/posts/types";
import queryClient from "../../../react-query/queryClient";

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

const addPost = async (post: post) => {
  const { data } = await axios.post<post>(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`,
    post
  );

  return data._id;
};

export const usePosts = () => {
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

export const useSavePost = () => {
  return useMutation(["posts"], (post: post) => addPost(post), {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });
};
