import ContactForm from "../../components/contact/ContactForm";
import { Box } from "@mui/material";
import Head from "next/head";

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
