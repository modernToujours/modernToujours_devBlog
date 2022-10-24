import { GetStaticProps } from "next";
import React from "react";
import SignUpForm from "../../components/login/SignUpForm";

const signup = () => {
  return <SignUpForm />;
};

export default signup;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
