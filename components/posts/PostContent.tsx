import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type postType = {
  post: {
    _id?: string;
    title?: string;
    image?: string;
    post?: string;
  };
};

const PostContent: React.FC<postType> = (props) => {
  const { post: postProp } = props;
  const { _id, title, image, post } = postProp;
  const [markdown, setMarkdown] = useState("");
  const newUrl = post!.replace(
    "https://forus-s3.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/",
    "/s3/"
  ) as string;

  useEffect(() => {
    axios.get(newUrl).then((res) => {
      console.log(res);
      console.log(res.data);
      setMarkdown(res.data);
    });
  });
  return <div>{markdown && <ReactMarkdown>{markdown}</ReactMarkdown>}</div>;
};

export default PostContent;
