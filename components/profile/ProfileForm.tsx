import { useEffect, useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { useS3Upload } from "next-s3-upload";
import { Typography, Divider, Card, TextField, Button } from "@mui/material";
import CardForm from "../layout/main/CardForm";
import axios from "axios";

const ProfileForm = ({ session }: { session: Session | null }) => {
  const { name, email, image } = session?.user!;

  let [imageUrl, setImageUrl] = useState<string>(
    "/images/no-profile-image.png"
  );
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  useEffect(() => {
    if (image) {
      setImageUrl(image);
    }
  }, [image]);

  const profileImageHandler = async (file: File) => {
    const { url } = await uploadToS3(file);
    const newImageUrl = url.replace("https://forus-s3.", "https://");
    setImageUrl(newImageUrl);
    axios
      .patch("/api/user/image", {
        imageUrl: newImageUrl,
      })
      .then((res) => console.log(res));
  };

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
        <Image src={imageUrl} alt="main-image" width={300} height={300} />
      </Card>
      <FileInput onChange={profileImageHandler} />
      <Button
        sx={{ width: "130px", height: "40px", margin: "auto" }}
        variant="outlined"
        onClick={openFileDialog}
      >
        Edit Image
      </Button>
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
