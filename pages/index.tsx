import styled from "@emotion/styled";
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Hero from "../components/main-page/Hero";

const Home: NextPage = () => {
  const Main = styled.main`
    padding-top: 70px;
  `;

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
      <Main>
        <Hero />
      </Main>
    </Fragment>
  );
};

export default Home;
