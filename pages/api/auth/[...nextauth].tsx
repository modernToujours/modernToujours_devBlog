import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { connectDatabase } from "../../../lib/connect";
import { verifyPassword } from "../../../lib/auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials: any, _req): Promise<User | null> => {
        const client = await connectDatabase();
        const db = client.db(process.env.mongodb_database);
        const collection = db.collection("users");
        const user = await collection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();

          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password! Try again!");
        }

        const loginUser: User = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: null,
        };

        client.close();
        return loginUser;
      },
    }),
    GitHubProvider({
      id: "github",
      name: "Github",
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(connectDatabase(), {
    databaseName: process.env.mongodb_database,
  }),
});
