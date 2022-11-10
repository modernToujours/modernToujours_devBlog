import { ObjectId } from "mongodb";

export type post = {
  _id?: ObjectId;
  title: string;
  image: string;
  post: string;
};

export type posts = post[];
