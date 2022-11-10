import styled from "@emotion/styled";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Hero from "../components/main-page/Hero";
import { usePrefetchPosts } from "../components/posts/hooks/usePosts";

const Home: NextPage = () => {
  usePrefetchPosts();
  return (
    <Fragment>
      <Head>
        <title>modernToujours.dev</title>
        <meta
          name="description"
          content="modernToujours.dev 기술 블로그 메인 페이지 입니다!"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Hero />
    </Fragment>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 600,
  };
};
