import { MongoClient, ObjectId, UpdateResult } from "mongodb";
import { NextApiHandler } from "next";
import { connectDatabase } from "../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { _id, title, image, post } = req.body;

  let client: MongoClient;
  let result: UpdateResult;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Could not connect to database." });
    return;
  }
  try {
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("posts");

    result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          title: title,
          image: image,
          post: post,
        },
      }
    );
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Update posts failed!" });
    return;
  }
  res.status(201).json({ result, message: "Success!" });
  client.close();
};

export default handler;
