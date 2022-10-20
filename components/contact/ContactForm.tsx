import { Divider, TextField } from "@mui/material";
import { Card, Typography, Button } from "@mui/material";
import CardForm from "../layout/main/CardForm";

const ContactForm = () => {
  return (
    <CardForm>
      <Typography
        sx={{ fontSize: { xs: "35px", sm: "50px" }, textAlign: "center" }}
      >
        Contact
      </Typography>
      <Divider sx={{ marginTop: "20px" }} />
      <TextField sx={{ marginTop: "20px" }} type="name" label="Name" />
      <TextField sx={{ marginTop: "20px" }} type="email" label="Email" />
      <TextField
        sx={{ marginTop: "20px" }}
        type="text"
        multiline
        rows={10}
        label="Content"
      />
      <Button
        sx={{
          margin: "20px auto",
          minWidth: "250px",
          width: "300px",
          height: "60px",
        }}
        variant="outlined"
      >
        <Typography variant="h5">Submit</Typography>
      </Button>
    </CardForm>
  );
};

export default ContactForm;
