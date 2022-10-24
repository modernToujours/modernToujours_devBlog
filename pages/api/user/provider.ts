import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../../../lib/connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") return;
  const {
    query: { email },
  } = req;

  const client = await connectDatabase();

  const db = client.db("devblog");

  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }
  await client.close();

  const clientForAccount = await connectDatabase();

  const accountsCollection = clientForAccount
    .db("devblog")
    .collection("accounts");

  const account = await accountsCollection.findOne({ userId: user._id });

  res.status(200).json({ provider: account?.provider });
};

export default handler;
