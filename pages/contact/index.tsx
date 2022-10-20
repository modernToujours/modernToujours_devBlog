import ContactForm from "../../components/contact/ContactForm";
import { Box } from "@mui/material";
import Head from "next/head";

const Menu3 = () => {
  return (
    <Box>
      <Head>
        <title>Contact</title>
        <meta name="description" content="contact modernToujours" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContactForm />;
    </Box>
  );
};

export default Menu3;
