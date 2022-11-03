import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Session } from "inspector";
import { getSession } from "next-auth/react";
import { SettingsSystemDaydreamOutlined } from "@mui/icons-material";
import { display } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { queries } from "@storybook/testing-library";

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
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [markdown, setMarkdown] = useState("");
  const newUrl = post!.replace(
    "https://forus-s3.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/",
    "/s3/"
  ) as string;

  useEffect(() => {
    axios.get(encodeURI(newUrl)).then((res) => {
      setMarkdown(res.data);
    });
  }, [newUrl]);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        const { email } = session.user!;

        axios
          .get(`/api/user/provider?email=${email}`)
          .then((res) => {
            if (res.data.userType === "admin") {
              setIsAdmin(true);
            }
          })
          .catch((error) => console.log(error));
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ margin: "50px 20px", borderRadius: "10px" }}>
        {markdown && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{ padding: "15px", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h2">{title}</Typography>
              <React.Fragment>
                <Link
                  href={{
                    pathname: `${router.pathname}/edit`,
                    query: { ...router.query },
                  }}
                >
                  <Button>Edit</Button>
                </Link>
              </React.Fragment>
            </Box>
            <Divider />
            <Box sx={{ padding: "20px" }}>
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <img style={{ maxWidth: "80%" }} {...props} alt="" />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </Box>
          </Box>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default PostContent;
