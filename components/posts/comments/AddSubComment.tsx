import { SubdirectoryArrowRight } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

import React from "react";

const AddSubComment = () => {
  return (
    <Box sx={{ width: "100%", margin: "0 auto", display: "flex" }}>
      <Box
        sx={{
          width: { xs: "10%", sm: "5%" },
          margin: "auto auto",
        }}
      >
        <SubdirectoryArrowRight sx={{ fontSize: "40px" }} />
      </Box>
      <TextField
        sx={{ width: { xs: "90%", sm: "95%" }, margin: "10px 0 10px auto" }}
      />
    </Box>
  );
};

export default AddSubComment;
