import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Box, Typography } from "@mui/material";

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
  const { title, post } = postProp;
  const [markdown, setMarkdown] = useState("");
  const newUrl = post!.replace(
    "https://forus-s3.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/",
    "/s3/"
  ) as string;

  useEffect(() => {
    axios.get(encodeURI(newUrl)).then((res) => {
      setMarkdown(res.data);
    });
  });
  return (
    <React.Fragment>
      {markdown && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h2">{title}</Typography>
          <Box>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default PostContent;
