import { Box } from "@mui/material";
import Head from "next/head";
import LoginForm from "../../components/login/LoginForm";

const LoginPage = () => {
  return (
    <Box>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="login modernToujours.dev" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
