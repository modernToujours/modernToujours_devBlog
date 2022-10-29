import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useState, useEffect, useRef } from "react";
import { useS3Upload } from "next-s3-upload";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const FormEditor = () => {
  const editorRef = useRef<Editor>(null);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const router = useRouter();

  const { uploadToS3 } = useS3Upload();

  const saveHandler = async () => {
    const md = editorRef?.current!.getInstance().getMarkdown();

    const file = new File([md], `${title}.md`, {
      type: "text/markup",
    });

    const { url } = await uploadToS3(file);

    axios
      .post("/api/posts/add", { title: title, image: imgUrl, post: url })
      .then((res) => router.push("/posts"));
  };

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
        initialEditType="wysiwyg"
        previewStyle="tab"
        ref={editorRef}
        useCommandShortcut={true}
        theme="light"
        usageStatistics={false}
      />
      <Button onClick={saveHandler}>저장하기</Button>
    </Box>
  );
};

export default FormEditor;
