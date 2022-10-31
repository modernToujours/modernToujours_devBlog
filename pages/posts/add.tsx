import React from "react";
import dynamic from "next/dynamic";

const AddPost = dynamic(
  () =>
    import("../../components/posts/AddPosts").then((module) => module.default),
  {
    ssr: false,
  }
);

const AddPage = () => {
  return (
    <div>
      <AddPost />
    </div>
  );
};

export default AddPage;
