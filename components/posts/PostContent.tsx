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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const newUrl = post!.replace(
    "https://forus-s3.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/",
    "/s3/"
  ) as string;

  useEffect(() => {
    axios.get(encodeURI(newUrl)).then((res) => {
      setMarkdown(res.data);
    });
    axios.get(`/api/posts/${router.query.id}/like`).then((res) => {
      const { likes, isLiked } = res.data;
      setLikeCount(likes);
      setIsLiked(isLiked);
    });
  }, [newUrl, router.query.id]);

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

  const onLikeHandler = () => {
    axios.post(`/api/posts/${router.query.id}/like`);

    setLikeCount((prevState) => prevState + 1);
    setIsLiked(true);
  };
  const onDislikeHandler = () => {
    axios.delete(`/api/posts/${router.query.id}/like`);

    setLikeCount((prevState) => prevState - 1);
    setIsLiked(false);
  };

  return (
    <React.Fragment>
      <Paper
        elevation={3}
        sx={{
          margin: "50px 20px",
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
                        width="500"
                        height="500"
                        layout="intrinsic"
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {!isLiked && (
                  <IconButton onClick={onLikeHandler}>
                    <FavoriteBorderIcon sx={{ fontSize: 50 }} />
                  </IconButton>
                )}
                {isLiked && (
                  <IconButton onClick={onDislikeHandler}>
                    <FavoriteIcon sx={{ fontSize: 50 }} />
                  </IconButton>
                )}
                <Typography>{likeCount} likes</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default PostContent;
