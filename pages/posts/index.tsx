import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import AllPosts from "../../components/posts/AllPosts";
import axios from "axios";
import { ObjectId } from "mongodb";

type post = { _id: ObjectId; title: string; image: string; post: string };

const AllPostsPage: NextPage<{ posts: post[] }> = (props) => {
  const [posts, setPosts] = useState<post[]>(props?.posts);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data.posts);
    });
  }, []);
  return <AllPosts posts={posts} />;
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get(`https://www.moderntoujours.dev/api/posts`);
  const posts = res.data.posts;
  console.log(posts);
  return {
    props: { posts: posts },
    revalidate: 600,
  };
};
