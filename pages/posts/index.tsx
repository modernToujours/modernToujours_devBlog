import { GetStaticProps, NextPage } from "next";
import AllPosts from "../../components/posts/AllPosts";
import axios from "axios";
import { usePosts } from "../../components/posts/hooks/usePosts";
import { Posts } from "../../components/posts/types";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

const AllPostsPage: NextPage<{ posts: Posts }> = (props) => {
  const [postsData, setPostsData] = useState<Posts>(props.posts);
  const [isLoading, setIsLoading] = useState(false);
  const { posts, isInitialLoading } = usePosts();

  useEffect(() => {
    if (!isInitialLoading) {
      setPostsData(posts);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isInitialLoading, posts]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <AllPosts posts={postsData} />;
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("https://www.moderntoujours.dev/api/posts");
  const posts = res.data.posts;

  return {
    props: { posts: posts },
    revalidate: 60,
  };
};
