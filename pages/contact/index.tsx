import Head from "next/head";
import { GetStaticProps } from "next";

import { Box } from "@mui/material";
import ContactForm from "../../components/contact/ContactForm";

const ContactPage = () => {
  return (
    <Box>
      <Head>
        <title>Contact Page</title>
        <meta name="description" content="contact modernToujours" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContactForm />;
    </Box>
  );
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 600,
  };
};
