import "@toast-ui/editor/dist/toastui-editor.css";
import React from "react";
import { Editor } from "@toast-ui/react-editor";
import { useState, useEffect, useRef } from "react";
import { useS3Upload } from "next-s3-upload";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Modal,
} from "@mui/material";
import { useRouter } from "next/router";
import { Post } from "./types";
import { useSavePost } from "./hooks/usePosts";
import AddCategoryModal from "./AddCategoryModal";
import { useCategories } from "./hooks/useCategories";

const FormEditor = () => {
  const editorRef = useRef<Editor | null>(null);
  const { categories, isLoading } = useCategories();
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState<string>("Next.js");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mutatePost = useSavePost();

  const { uploadToS3 } = useS3Upload();

  const saveHandler = async () => {
    const md = editorRef?.current!.getInstance().getMarkdown();

    const file = new File([md], `${title}.md`, {
      type: "text/markup",
    });

    const { url } = await uploadToS3(file);

    const post: Post = {
      title: title,
      image: imgUrl,
      post: url,
      category: category,
    };

    await mutatePost.mutateAsync(post);

    router.push("/posts");
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
      <React.Fragment>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {!isLoading &&
              categories.map((category) => (
                <MenuItem key={category._id?.toString()} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            <MenuItem onClick={() => setOpen(true)}>Add</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
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
      <Button onClick={saveHandler}>저장하기</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddCategoryModal />
      </Modal>
    </Box>
  );
};

export default FormEditor;
