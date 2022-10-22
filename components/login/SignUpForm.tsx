import React, {
  ChangeEvent,
  SyntheticEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Divider, TextField, Box } from "@mui/material";
import { Typography, Button, Snackbar, Alert } from "@mui/material";
import CardForm from "../layout/main/CardForm";
import axios, { AxiosResponse } from "axios";

type UserType = { name: string; email: string; password: string };

const SignUpForm: React.FC = () => {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openFail, setOpenFail] = useState<boolean>(false);
  const [failMessage, setFailMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameInputError, setNameInputError] = useState<string | null>(null);
  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [passwordInputError, setPasswordInputError] =
    useState<string | null>(null);

  const router = useRouter();

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

  const createUser: (user: UserType) => Promise<UserType> = async ({
    name,
    email,
    password,
  }) => {
    const res = await axios.post(
      "/api/auth/signup",
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = res.data;
    if (res.status !== 201) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
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

  const inputPasswordHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const submitHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    setFailMessage("");
    let validate = true;

    if (name === "" || name.length < 2) {
      setNameInputError("이름은 최소 두글자를 입력해주세요!");
      setOpenFail(true);
      validate = false;
    }

    if (email === "" || !email.includes("@")) {
      setEmailInputError("잘못된 이메일 형식입니다!");
      setOpenFail(true);
      validate = false;
    }

    if (password === "" && password.length < 10) {
      setPasswordInputError("최소 열글자를 입력해주세요!");
      setOpenFail(true);
      validate = false;
    }

    if (!validate) return;

    try {
      const result: UserType = await createUser({
        name,
        email,
        password,
      });
    } catch (error: any) {
      setOpenFail(true);
      setFailMessage(error.response.data.message);
      setEmailInputError("사용중인 이메일 입니다!!");
      return;
    }
    setOpenSuccess(true);
    setTimeout(() => {
      router.push("/login");
    }, 500);
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
            onClick={submitHandler}
          >
            <Typography sx={{ fontSize: "14px" }}>SignUp</Typography>
          </Button>
        </Link>
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={closeAlert}>
          Success!
        </Alert>
      </Snackbar>
      <Snackbar open={openFail} autoHideDuration={3000}>
        <Alert severity="error" onClose={closeFailAlert} sx={{ width: "100%" }}>
          {failMessage || "입력란을 다시 확인해주세요!"}
        </Alert>
      </Snackbar>
    </CardForm>
  );
};

export default SignUpForm;
