import { ObjectId } from "mongodb";
import { NextApiHandler } from "next";
import { connectDatabase } from "../../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    const id = req.query.id as string;

    const client = await connectDatabase();
    const db = client.db(process.env.mongodb_database);
    const collection = db.collection("posts");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    res.status(202).json({ message: "Success!" });
    client.close();
  }
};

export default handler;
