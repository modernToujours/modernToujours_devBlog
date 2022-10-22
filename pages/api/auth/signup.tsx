import { InsertOneResult, MongoClient } from "mongodb";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import { connectDatabase } from "../../../lib/connect";

type NewUserType = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

type UserType = {
  _id: string;
  type: "user" | "admin";
  name: string;
  email: string;
  message: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return;
  }

  const data: NewUserType = req.body;

  const { name, email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    !password ||
    name.trim() === "" ||
    password.trim() === ""
  ) {
    res.status(422).json({ message: "Invalid inputs." });
    return;
  }

  let client: MongoClient;
  let result: InsertOneResult<UserType>;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Could not connect to database." });
    return;
  }

  const db = client.db(process.env.mongodb_database);
  const collection = db.collection("users");

  const hashedPassword = await hashPassword(password);

  const existingUser = await collection.findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "이미 사용중인 이메일 입니다" });
    client.close();
    return;
  }

  try {
    result = await collection.insertOne({
      name: name,
      email: email,
      password: hashedPassword,
      type: "user",
    });

    data.id = result.insertedId;

    res.status(201).json({ message: "Created user!" });
    client.close();
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Signup failed!" });
    return;
  }
};

export default handler;
