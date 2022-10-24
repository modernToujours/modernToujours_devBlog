import { NextApiHandler } from "next";
import {} from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectDatabase } from "../../../lib/connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PATCH") return;

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  console.log(session);
  const userEmail = session?.user?.email;

  const newImageUrl = req.body.imageUrl;

  const client = await connectDatabase();

  const usersCollection = client.db("devblog").collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { image: newImageUrl } }
  );

  client.close();
  res.status(200).json({ message: "Image changed!" });
};

export default handler;
