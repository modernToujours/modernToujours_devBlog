import { InsertOneResult, MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { connectDatabase } from "../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  console.log(req.body);
  const { title, image, post } = req.body;

  const newPost = { title, image, post };

  let client: MongoClient;
  let result: InsertOneResult;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Could not connect to database." });
    return;
  }
  try {
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("posts");

    result = await collection.insertOne({
      title: title,
      image: image,
      post: post,
    });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Storing posts failed!" });
    return;
  }
  console.log(result);
  res.status(201).json({ message: "Success!" });
  client.close();
};

export default handler;
