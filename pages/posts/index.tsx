import React from "react";
import { GetStaticProps } from "next";
import AllPosts from "../../components/posts/AllPosts";

const AllPostsPage = () => {
  return <AllPosts />;
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 600,
  };
};
