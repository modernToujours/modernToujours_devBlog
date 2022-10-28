import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import AllPosts from "../../components/posts/AllPosts";
import axios from "axios";
import { ObjectId } from "mongodb";

type post = { _id: ObjectId; title: string; image: string; post: string };

const AllPostsPage: NextPage = () => {
  const [posts, setPosts] = useState<post[]>([]);

  useEffect(() => {
    axios.get("/api/posts").then((res) => setPosts(res.data.posts));
  }, []);
  return <AllPosts posts={posts} />;
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps = async () => {
  // const res = await axios.get("/api/posts");
  // const posts = res.data.posts;
  return {
    // props: { posts: posts },
    props: {},
    revalidate: 600,
  };
};
