import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDeleteLike, useLikes, useSaveLike } from "./hooks/useLikes";
import Likes from "./Likes";

const PostContent: React.FC<{ post: string; title: string }> = (props) => {
  const { title, post } = props;
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
    <Box sx={{ maxWidth: "100vw" }}>
      <Paper
        elevation={3}
        sx={{
          margin: "50px auto",
          borderRadius: "10px",
          maxWidth: "90%",
          textAlign: "left",
        }}
      >
        {markdown && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{ padding: "15px", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h2">{title}</Typography>
              <React.Fragment>
                {isAdmin && (
                  <Link
                    href={{
                      pathname: `${router.pathname}/edit`,
                      query: { ...router.query },
                    }}
                  >
                    <Button>Edit</Button>
                  </Link>
                )}
              </React.Fragment>
            </Box>
            <Divider />
            <Box sx={{ padding: "20px" }}>
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <Box
                      sx={{
                        width: { xs: "250px", sm: "500px" },
                        height: { xs: "250px", sm: "500px" },
                        margin: "3px auto",
                      }}
                    >
                      <Image
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        src={props.src!}
                        alt=""
                      />
                    </Box>
                  ),
                  code: ({ node, ...props }) => (
                    <Box sx={{ overflow: "scroll" }}>
                      <code>{props.children}</code>
                    </Box>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
              <Divider />
              <Likes />
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PostContent;
