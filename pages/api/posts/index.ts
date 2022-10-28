import { ObjectId, InsertOneResult, MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { connectDatabase } from "../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") return;

  let client: MongoClient;
  let result: InsertOneResult;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Could not connect to database." });
    return;
  }

  try {
    const db = client.db("devblog");

    const postsCollection = db.collection("posts");

    if (req.body.id) {
      const id = req.body.id;
      const posts = await postsCollection.find({ _id: new ObjectId(id) });
      res.status(200).json({ post: posts });
    } else {
      const posts = await postsCollection.find().toArray();
      res.status(200).json({ posts: posts });
    }
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Storing posts failed!" });
    return;
  }
  client.close();
};

export default handler;
