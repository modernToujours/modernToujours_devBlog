import { Box } from "@mui/material";
import Head from "next/head";
import LoginForm from "../../components/user/login/LoginForm";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
