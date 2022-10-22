import React, {
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import Link from "next/link";
import { Divider, TextField, Box } from "@mui/material";
import { Typography, Button } from "@mui/material";
import CardForm from "../layout/main/CardForm";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [passwordInputError, setPasswordInputError] =
    useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email !== "" && !email.includes("@"))
        setEmailInputError("잘못된 이메일 형식입니다!");
      else setEmailInputError("");

      if (password !== "" && password.length < 10)
        setPasswordInputError("최소 열글자를 입력해주세요");
      else setPasswordInputError("");
    }, 800);
    return () => clearTimeout(timer);
  }, [email, password]);

  const inputEmailHandler: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const inputPasswordHandler: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  return (
    <CardForm>
      <Typography
        sx={{ fontSize: { xs: "35px", sm: "50px" }, textAlign: "center" }}
      >
        Login
      </Typography>
      <Divider sx={{ marginTop: "20px" }} />
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
        <Button
          sx={{
            width: "250px",
            height: "60px",
            margin: "auto",
            marginBottom: "15px",
          }}
          variant="outlined"
        >
          <Typography sx={{ fontSize: "14px" }}>Login</Typography>
        </Button>
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

export default LoginForm;
