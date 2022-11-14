import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import AllPosts from "../../components/posts/AllPosts";
import axios from "axios";
import { ObjectId } from "mongodb";
import { usePosts } from "../../components/posts/hooks/usePosts";
import { Posts } from "../../components/posts/types";

const AllPostsPage: NextPage<{ posts: Posts }> = (props) => {
  const { posts } = usePosts();

  return <AllPosts posts={posts} />;
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("https://www.moderntoujours.dev/api/posts");
  const posts = res.data.posts;

  return {
    props: { posts: posts },
    revalidate: 600,
  };
};
