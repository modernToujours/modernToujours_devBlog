import React, {
  ChangeEvent,
  SyntheticEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";
import Link from "next/link";
import { Divider, TextField, Box } from "@mui/material";
import { Typography, Button } from "@mui/material";
import CardForm from "../layout/main/CardForm";

const SignUpForm: React.FC = () => {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openFail, setOpenFail] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameInputError, setNameInputError] = useState<string | null>(null);
  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [passwordInputError, setPasswordInputError] =
    useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name !== "" && name.length < 2)
        setNameInputError("이름은 최소 두글자를 입력해주세요!");
      else setNameInputError("");

      if (email !== "" && !email.includes("@"))
        setEmailInputError("잘못된 이메일 형식입니다!");
      else setEmailInputError("");

      if (password !== "" && password.length < 10)
        setPasswordInputError("최소 열글자를 입력해주세요!");
      else setPasswordInputError("");
    }, 800);

    return () => clearTimeout(timer);
  }, [name, email, password]);

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

  const inputPasswordHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  return (
    <CardForm>
      <Typography
        sx={{ fontSize: { xs: "35px", sm: "50px" }, textAlign: "center" }}
      >
        Sign Up
      </Typography>
      <Divider sx={{ marginTop: "20px" }} />
      <TextField
        error={nameInputError ? true : false}
        helperText={nameInputError}
        sx={{ marginTop: "20px" }}
        type="name"
        label="name"
        value={name}
        onChange={inputNameHandler}
      />
      <TextField
        error={emailInputError ? true : false}
        helperText={emailInputError}
        sx={{ marginTop: "20px" }}
        type="email"
        label="email"
        value={email}
        onChange={inputEmailHandler}
      />
      <TextField
        error={passwordInputError ? true : false}
        helperText={passwordInputError}
        sx={{ marginTop: "20px", marginBottom: "30px" }}
        type="password"
        label="password"
        value={password}
        onChange={inputPasswordHandler}
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Link href="/login/signup">
          <Button
            sx={{
              width: "250px",
              height: "60px",
              margin: "auto",
              marginBottom: "15px",
            }}
            variant="outlined"
          >
            <Typography sx={{ fontSize: "14px" }}>SignUp</Typography>
          </Button>
        </Link>
      </Box>
    </CardForm>
  );
};

export default SignUpForm;
