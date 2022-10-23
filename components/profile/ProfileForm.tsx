import Image from "next/image";
import CardForm from "../layout/main/CardForm";
import { Typography, Divider, Card, TextField } from "@mui/material";
import { Session } from "next-auth";

const ProfileForm = ({ session }: { session: Session | null }) => {
  const { name, email, image } = session?.user!;
  return (
    <CardForm>
      <Typography
        sx={{ fontSize: { xs: "35px", sm: "50px" }, textAlign: "center" }}
      >
        User Profile
      </Typography>
      <Card
        sx={{
          borderRadius: "50%",
          width: "150px",
          height: "150px",
          background: "background.paper",
          margin: "30px auto",
        }}
      >
        {image && (
          <Image src={image} alt="main-image" width={300} height={300} />
        )}
      </Card>
      <TextField
        sx={{ marginTop: "20px" }}
        type="name"
        label="name"
        value={name}
        disabled
      />
      <TextField
        sx={{ marginTop: "20px" }}
        type="email"
        label="email"
        value={email}
        disabled
      />
      <Divider sx={{ marginTop: "20px" }} />
    </CardForm>
  );
};

export default ProfileForm;
