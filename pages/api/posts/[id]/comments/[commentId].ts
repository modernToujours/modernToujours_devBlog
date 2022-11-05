import { ObjectId } from "mongodb";
import { NextApiHandler } from "next";
import { connectDatabase } from "../../../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  const commentId = req.query.commentId as string;
  if (req.method === "DELETE") {
    const client = await connectDatabase();
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("comments");
    const result = await collection.deleteOne({ _id: new ObjectId(commentId) });
    console.log(result);
    res.status(200).json({ message: "Success!" });
    client.close();
  } else {
    return;
  }
};

export default handler;
