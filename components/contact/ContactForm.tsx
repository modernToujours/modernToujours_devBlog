import { Divider, TextField } from "@mui/material";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ContactForm = () => {
  return (
    <Card
      sx={{
        width: {
          xs: "400px",
          sm: "700px",
        },
        borderRadius: "10px",
        padding: "25px",
        height: "700px",
        margin: "30px auto",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
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
      </CardContent>
    </Card>
  );
};

export default ContactForm;
