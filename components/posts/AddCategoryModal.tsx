import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAddCategory } from "./hooks/useCategories";
import { Category } from "./types";

const AddCategoryModal = () => {
  const [name, setName] = useState<string>("");
  const addCategory = useAddCategory();

  const addHandler = () => {
    const newCategory: Category = { name: name };
    addCategory.mutateAsync(newCategory);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        dispaly: "flex",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      }}
    >
      <Box>
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button onClick={addHandler}>Add</Button>
      </Box>
    </Box>
  );
};

export default AddCategoryModal;
