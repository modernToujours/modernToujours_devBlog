import { NextApiHandler } from "next";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../../../../lib/connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") return;

  const email = req.query.email;

  const client = await connectDatabase();

  const usersCollection = client.db("devblog").collection("users");

  const user = await usersCollection.findOne({ email: email });
  client.close();
  res.status(200).json({ imgUrl: user!.image });
};

export default handler;
