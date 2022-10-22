import { connectDatabase } from "../../lib/connect";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { InsertOneResult, MongoClient } from "mongodb";

type NewMessageType = {
  id?: string;
  name: string;
  email: string;
  message: string;
};

type MessageResultType = {
  _id: string;
  name: string;
  email: string;
  message: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !message ||
      name.trim() === "" ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage: NewMessageType = {
      email,
      name,
      message,
    };

    let client: MongoClient;
    let result: InsertOneResult<MessageResultType>;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    try {
      const db = client.db(process.env.mongodb_database);
      const collection = db.collection("message");

      result = await collection.insertOne(newMessage);

      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }
    res.status(201).json({ message: "Success!" });
    client.close();
  }
};

export default handler;
