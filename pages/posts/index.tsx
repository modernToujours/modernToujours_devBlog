import { GetStaticProps, NextPage } from "next";
import AllPosts from "../../components/posts/AllPosts";
import axios from "axios";
import { usePosts } from "../../components/posts/hooks/usePosts";
import { Posts } from "../../components/posts/types";
import { CircularProgress } from "@mui/material";

const AllPostsPage: NextPage<{ posts: Posts }> = (props) => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <CircularProgress />;
  }

  return <AllPosts posts={posts} />;
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
