import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

import { connectDatabase } from "../../../lib/connect";
import { verifyPassword } from "../../../lib/auth";

type User = {
  id: string;
  name: string;
  email: string;
  type: string;
};

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
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
          return null;
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password! Try again!");
          return null;
        }

        const loginUser: User = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          type: user.type,
        };

        client.close();
        return loginUser;
      },
    }),
  ],
  secret: process.env.SECRET,
});
