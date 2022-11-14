import { Divider, TextField, Typography, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardForm from "../../layout/main/CardForm";
import { useRouter } from "next/router";

const PasswordChangeForm = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPasswordInputError, setOldPasswordInputError] =
    useState<string | null>(null);
  const [newPasswordInputError, setNewPasswordInputError] =
    useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (oldPassword !== "" && oldPassword.length < 10)
        setOldPasswordInputError("최소 열글자를 입력해주세요!");
      else setOldPasswordInputError("");

      if (newPassword !== "" && newPassword.length < 10) {
        setNewPasswordInputError("최소 열글자를 입력해주세요!");
      } else if (newPassword !== "" && newPassword === oldPassword) {
        setNewPasswordInputError(
          "이전 비밀번호와 다른 비밀번호를 사용해주세요!!"
        );
      } else setNewPasswordInputError("");
    }, 800);

    return () => clearTimeout(timer);
  }, [oldPassword, newPassword]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const changePasswordHandler = () => {
    if (!!oldPasswordInputError || !!newPasswordInputError) {
      return;
    }
    setLoading(true);
    axios
      .patch("/api/user/password", { oldPassword, newPassword })
      .then((res) => {
        if (res.statusText === "OK") {
          router.back();
        } else {
          setOldPasswordInputError("비밀번호를 다시 확인해주세요");
          setLoading(false);
        }
      })
      .catch((error) => {
        setOldPasswordInputError("이전 비밀번호를 다시 확인해주세요");
        setLoading(false);
      });
  };

  return (
    <CardForm>
      <Typography
        sx={{ fontSize: { xs: "30px", sm: "40px" }, textAlign: "center" }}
      >
        Change Password!
      </Typography>
      <Divider sx={{ marginTop: "20px" }} />
      <TextField
        sx={{ marginTop: "20px" }}
        type="password"
        label="이전 비밀번호"
        value={oldPassword}
        helperText={oldPasswordInputError}
        error={!!oldPasswordInputError}
        onChange={(event) => setOldPassword(event.target.value)}
      />
      <TextField
        sx={{ marginTop: "20px" }}
        type="password"
        label="새 비밀번호"
        value={newPassword}
        helperText={newPasswordInputError}
        error={!!newPasswordInputError}
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <React.Fragment>
        {loading && (
          <LoadingButton
            sx={{
              width: "100px",
              height: "50px",
              margin: "auto",
              marginTop: "30px",
            }}
            loading
            variant="outlined"
          >
            변경하기
          </LoadingButton>
        )}
      </React.Fragment>
      <React.Fragment>
        {!loading && (
          <Button
            sx={{
              width: "100px",
              height: "50px",
              margin: "auto",
              marginTop: "30px",
            }}
            variant="outlined"
            onClick={changePasswordHandler}
          >
            변경하기
          </Button>
        )}
      </React.Fragment>
    </CardForm>
  );
};

export default PasswordChangeForm;
