import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import axios from "axios";

import { Divider, TextField, Typography, Button } from "@mui/material";

import CardForm from "../layout/main/CardForm";

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const inputNameHandler: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const inputEmailHandler: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const inputMessageHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const submitContactHandler: MouseEventHandler<HTMLButtonElement> = () => {
    console.log(name, email, message);
    try {
      axios.post("api/contact", { name, email, message });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardForm>
      <Typography
        sx={{ fontSize: { xs: "35px", sm: "50px" }, textAlign: "center" }}
      >
        Contact
      </Typography>
      <Divider sx={{ marginTop: "20px" }} />
      <TextField
        sx={{ marginTop: "20px" }}
        type="name"
        label="Name"
        value={name}
        onChange={inputNameHandler}
      />
      <TextField
        sx={{ marginTop: "20px" }}
        type="email"
        label="Email"
        value={email}
        onChange={inputEmailHandler}
      />
      <TextField
        sx={{ marginTop: "20px" }}
        type="text"
        multiline
        rows={6}
        label="Message"
        value={message}
        onChange={inputMessageHandler}
      />
      <Button
        sx={{
          width: "250px",
          height: "60px",
          margin: "15px auto",
        }}
        variant="outlined"
        onClick={submitContactHandler}
      >
        <Typography variant="h5">Submit</Typography>
      </Button>
    </CardForm>
  );
};

export default ContactForm;
