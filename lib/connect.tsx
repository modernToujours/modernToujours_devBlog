import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.zbyacvk.mongodb.net/?retryWrites=true&w=majority`;

  const client: MongoClient = new MongoClient(connectionString);
  console.log("1");
  await client.connect();
  console.log("2");

  return client;
};

export const closeConnect = async (client: MongoClient): Promise<void> => {
  client.close();
};
