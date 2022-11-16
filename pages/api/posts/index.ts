import { ObjectId, InsertOneResult, MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { connectDatabase } from "../../../lib/connect";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { title, image, post, category } = req.body;

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
        category: category,
      });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing posts failed!" });
      return;
    }
    console.log(post);
    res.status(201).json({ message: "Success!", _id: result.insertedId });
    client.close();
  }

  if (req.method === "GET") {
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

      if (req.query.id) {
        const id = req.query.id as string;
        const posts = await postsCollection
          .find({
            _id: new ObjectId(id),
          })
          .toArray();
        res.status(200).json({ post: posts.reverse() });
      } else {
        const posts = await postsCollection.find().toArray();
        res.status(200).json({ posts: posts.reverse() });
      }
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing posts failed!" });
      return;
    }
    client.close();
  } else return;
};

export default handler;
