import React, {
  ChangeEvent,
  SyntheticEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import axios from "axios";

import {
  Divider,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import CardForm from "../layout/main/CardForm";

const ContactForm: React.FC = () => {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openFail, setOpenFail] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const closeAlert = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const closeFailAlert = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFail(false);
  };

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
    axios
      .post("api/contact", { name, email, message })
      .then((res) => {
        setOpenSuccess(true);
        console.log(res);
      })
      .catch((_) => {
        setOpenFail(true);
      });
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
      <Snackbar open={openSuccess} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={closeAlert}>
          Success!
        </Alert>
      </Snackbar>
      <Snackbar open={openFail} autoHideDuration={3000}>
        <Alert severity="error" onClose={closeFailAlert} sx={{ width: "100%" }}>
          입력란을 다시 확인해주세요!
        </Alert>
      </Snackbar>
    </CardForm>
  );
};

export default ContactForm;
