import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "../../../react-query/contants";
import { Post, Posts } from "../../../components/posts/types";
import queryClient from "../../../react-query/queryClient";

const getPosts = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`
  );

  return data.posts;
};

const getMarkdown = async (markdownAddress: string) => {
  const newUri = markdownAddress.replace(
    "https://forus-s3.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/",
    "/s3/"
  );
  const { data } = await axios.get(encodeURI(newUri));

  return data;
};

const getCategorizedPosts = async (category: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts?category=${category}`
  );

  return data.posts;
};

const getPost = async (postId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts?id=${postId}`
  );

  const post = data.post[0];

  const markdownAddress = post.post;

  const markdown = await getMarkdown(markdownAddress);

  return { post, markdown };
};

const addPost = async (post: Post) => {
  const { data } = await axios.post<Post>(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`,
    post
  );

  return data._id;
};

const deletePost = async (postId: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${postId}`
  );
  return data;
};

export const usePosts = () => {
  const fallback: Posts = [];

  const {
    data: posts = fallback,
    isLoading,
    isInitialLoading,
  } = useQuery<Posts>([queryKeys.posts], getPosts);

  return { posts, isLoading, isInitialLoading };
};

export const useCategorizedPosts = (category: string) => {
  const fallback: Posts = [];

  const {
    data: posts = fallback,
    isLoading,
    isInitialLoading,
  } = useQuery<Posts>([queryKeys.posts, category], () =>
    getCategorizedPosts(category)
  );

  return { posts, isLoading, isInitialLoading };
};

export const usePost = (postId: string) => {
  const fallback = undefined;

  const { data = fallback, isLoading } = useQuery<{
    post: Post;
    markdown: string;
  }>({
    queryKey: [queryKeys.posts, postId],
    queryFn: () => getPost(postId),
  });

  return { data, isLoading };
};

export const usePrefetchPosts = () => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({ queryKey: [queryKeys.posts], queryFn: getPosts });
};

export const useSavePost = () => {
  return useMutation([queryKeys.posts], (post: Post) => addPost(post), {
    onSuccess: () => queryClient.invalidateQueries([queryKeys.posts]),
  });
};

export const useDeletePost = () => {
  return useMutation(
    [queryKeys.posts],
    (postId: string) => deletePost(postId),
    {
      onSuccess: () => queryClient.invalidateQueries([queryKeys.posts]),
    }
  );
};
