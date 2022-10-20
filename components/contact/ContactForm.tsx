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
        rows={6}
        label="Content"
      />
      <Button
        sx={{
          width: "250px",
          margin: "auto",
          height: "60px",
          margin: "15px auto",
        }}
        variant="outlined"
      >
        <Typography variant="h5">Submit</Typography>
      </Button>
    </CardForm>
  );
};

export default ContactForm;
