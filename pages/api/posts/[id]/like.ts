import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { connectDatabase } from "../../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req: req });
  const id = req.query.id as string;

  if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const email = session.user?.email;

    const client = await connectDatabase();
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("likes");
    await collection.insertOne({ email: email, postId: id });
    res.status(200).json({ message: "Success!" });
    client.close();
  }

  if (req.method === "GET") {
    const email = session?.user?.email;
    const client = await connectDatabase();
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("likes");
    const count = await collection.countDocuments({ postId: id });
    const isLiked = await collection.findOne({ email: email });
    res.status(200).json({ likes: count, isLiked: isLiked ? true : false });
    client.close();
  }

  if (req.method === "DELETE") {
    const email = session?.user?.email;
    const client = await connectDatabase();
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("likes");
    await collection.deleteOne({ postId: id, email: email });
    res.status(200).json({ message: "Success!" });
    client.close();
  }
};

export default handler;
