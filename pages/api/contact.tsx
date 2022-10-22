import { connectDatabase, closeConnect } from "../../lib/connect";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { InsertOneResult, MongoClient } from "mongodb";
import { ContactSupportOutlined } from "@mui/icons-material";

type newMessageType = {
  id?: string;
  name: string;
  email: string;
  message: string;
};

type messageResultType = {
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

    const newMessage: newMessageType = {
      email,
      name,
      message,
    };

    let client: MongoClient;
    let result: InsertOneResult<messageResultType>;

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

      res.end(JSON.stringify(newMessage));
    } catch (error) {
      closeConnect(client);
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }
  }
};

export default handler;
