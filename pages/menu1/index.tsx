import { GetStaticProps } from "next";
import React from "react";

const Menu2 = () => {
  return <div>Menu2</div>;
};

export default Menu2;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 600,
  };
};
