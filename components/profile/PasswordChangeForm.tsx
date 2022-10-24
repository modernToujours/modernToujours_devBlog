import { Divider, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CardForm from "../layout/main/CardForm";

const PasswordChangeForm = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPasswordInputError, setOldPasswordInputError] =
    useState<string | null>(null);
  const [newPasswordInputError, setNewPasswordInputError] =
    useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (oldPassword !== "" && oldPassword.length < 10)
        setOldPasswordInputError("최소 열글자를 입력해주세요!");
      else setOldPasswordInputError("");

      if (newPassword !== "" && newPassword.length < 10) {
        setNewPasswordInputError("최소 열글자를 입력해주세요!");
      } else if (newPassword === oldPassword) {
        setNewPasswordInputError(
          "이전 비밀번호와 다른 비밀번호를 사용해주세요!!"
        );
      } else setNewPasswordInputError("");
    }, 800);

    return () => clearTimeout(timer);
  }, [oldPassword, newPassword]);

  const changePasswordHandler = () => {
    axios
      .patch("/api/user/password", { oldPassword, newPassword })
      .then((res) => console.log(res));
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
    </CardForm>
  );
};

export default PasswordChangeForm;
