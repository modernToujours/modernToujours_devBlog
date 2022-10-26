import React from "react";
import dynamic from "next/dynamic";

const DynamicEditor = dynamic(
  () =>
    import("../../components/posts/AddPosts").then((module) => module.default),
  {
    ssr: false,
  }
);

const AddPost = () => {
  return (
    <div>
      <DynamicEditor />
    </div>
  );
};

export default AddPost;
