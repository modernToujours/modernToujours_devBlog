import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useState, useEffect, useRef } from "react";
import { useS3Upload } from "next-s3-upload";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const FormEditor = () => {
  const editorRef = useRef<Editor>(null);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const { uploadToS3 } = useS3Upload();

  const saveHandler = async () => {
    const md = editorRef?.current!.getInstance().getHTML();

    const file = new File([md], `${title}.html`, {
      type: "text/html;charset=utf-8;",
    });

    const { url } = await uploadToS3(file);
    const newUrl = url.replace("https://forus-s3.", "https://");

    axios
      .post("/api/posts/add", { title: title, image: imgUrl, post: newUrl })
      .then((res) => console.log(res));
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", async (blob, callback) => {
          const { url } = await uploadToS3(blob);
          const newUrl = url.replace("https://forus-s3.", "https://");
          callback(newUrl, "imageURL");
        });
    }
  }, [editorRef]);

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
