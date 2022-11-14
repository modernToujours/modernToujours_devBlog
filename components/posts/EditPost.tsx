import { TextField, Box, Button } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useS3Upload } from "next-s3-upload";
import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useRouter } from "next/router";
import { Post } from "./types";
import { useDeletePost } from "./hooks/usePosts";

const EditPost: React.FC<{ post: Post }> = ({ post }) => {
  const editorRef = useRef<Editor | null>(null);
  const [title, setTitle] = useState<string>(post.title);
  const [imgUrl, setImgUrl] = useState<string>(post.image);
  const [markdown, setMarkdown] = useState("");
  const router = useRouter();
  const newUrl = post.post!.replace(
    "https://forus-s3.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/",
    "/s3/"
  ) as string;

  const mutatePost = useDeletePost();

  const { uploadToS3 } = useS3Upload();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", async (blob, callback) => {
          const { url } = await uploadToS3(blob);
          callback(url, "imageURL");
        });
    }
  }, [editorRef, uploadToS3]);

  useEffect(() => {
    axios
      .get(encodeURI(newUrl))
      .then((res) => {
        setMarkdown(res.data);
      })
      .then(() => {
        editorRef.current?.getInstance().setMarkdown(markdown);
      });
  }, [markdown, newUrl]);

  const editHandler = async () => {
    const md = editorRef?.current!.getInstance().getMarkdown();

    const file = new File([md], `${title}.md`, {
      type: "text/markup",
    });

    const { url } = await uploadToS3(file);

    axios
      .post("/api/posts/edit", {
        _id: post._id,
        title: title,
        image: imgUrl,
        post: url,
      })
      .then((res) => {
        console.log(res);
        router.push("/posts");
      });
  };

  const deleteHandler = async () => {
    const postId = post._id!.toString();

    await mutatePost.mutateAsync(postId);

    router.push("/posts");
  };

  return (
    <Box>
      <TextField
        value={title}
        label="제목"
        onChange={(event) => setTitle(event?.target.value)}
      />
      <TextField
        value={imgUrl}
        label="대표 이미지"
        onChange={(event) => setImgUrl(event?.target.value)}
      />
      <Editor
        height="600px"
        initialEditType="markdown"
        previewStyle="tab"
        ref={editorRef}
        useCommandShortcut={true}
        theme="light"
        usageStatistics={false}
      />
      <Button onClick={editHandler}>수정하기</Button>
      <Button onClick={deleteHandler}>삭제하기</Button>
    </Box>
  );
};

export default EditPost;
