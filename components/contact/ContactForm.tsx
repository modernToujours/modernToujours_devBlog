import React, {
  ChangeEvent,
  SyntheticEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
  useEffect,
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
  const [nameInputError, setNameInputError] = useState<string | null>(null);
  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [messageInputError, setMessageInputError] =
    useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name !== "" && name.length < 2)
        setNameInputError("이름은 최소 두글자를 입력해주세요!");
      else setNameInputError("");

      if (email !== "" && !email.includes("@"))
        setEmailInputError("잘못된 이메일 형식입니다!");
      else setEmailInputError("");

      if (message !== "" && message.length < 10)
        setMessageInputError("최소 열글자를 입력해주세요!");
      else setMessageInputError("");
    }, 800);
    return () => clearTimeout(timer);
  }, [name, email, message]);

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
    const timer: NodeJS.Timeout = setTimeout(() => {
      console.log("hi");
    }, 1000);
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
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !message ||
      name.trim() === "" ||
      message.trim() === ""
    ) {
      setOpenFail(true);
    }
    axios
      .post("api/contact", { name, email, message })
      .then((res) => {
        setOpenSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
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
        error={nameInputError ? true : false}
        sx={{ marginTop: "20px" }}
        helperText={nameInputError}
        type="name"
        label="Name"
        value={name}
        onChange={inputNameHandler}
      />
      <TextField
        error={emailInputError ? true : false}
        sx={{ marginTop: "20px" }}
        helperText={emailInputError}
        type="email"
        label="Email"
        value={email}
        onChange={inputEmailHandler}
      />
      <TextField
        error={messageInputError ? true : false}
        sx={{ marginTop: "20px" }}
        helperText={messageInputError}
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
