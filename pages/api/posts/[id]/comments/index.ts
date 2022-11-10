import { NextApiHandler } from "next";
import { connectDatabase } from "../../../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  const postId = req.query.id as string;
  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    const client = await connectDatabase();
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("comments");
    await collection.insertOne({
      postId: postId,
      email: email,
      name: name,
      comment: comment,
      upperComment: null,
    });
    res.status(200).json({ message: "Success!" });
    client.close();
  }
  if (req.method === "GET") {
    const client = await connectDatabase();
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("comments");
    const result = await collection.find({ postId: postId }).toArray();

    res.status(200).json({ comments: result });
    client.close();
  }
};

export default handler;
