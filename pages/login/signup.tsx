import { GetStaticProps } from "next";
import React from "react";
import SignUpForm from "../../components/user/login/SignUpForm";

const signup = () => {
  return <SignUpForm />;
};

export default signup;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
