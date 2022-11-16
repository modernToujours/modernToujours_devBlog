import { NextApiHandler } from "next";
import { connectDatabase } from "../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { name } = req.body;
    const client = await connectDatabase();

    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("category");

    await collection.insertOne({ name: name });

    res.status(201).json({ message: "Success!" });
    client.close();
  } else if (req.method === "GET") {
    const client = await connectDatabase();

    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("category");

    const categories = await collection.find().toArray();
    res.status(200).json({ categories: categories });
    client.close();
  } else {
    return;
  }
};

export default handler;
