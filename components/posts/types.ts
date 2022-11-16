import { ObjectId } from "mongodb";

export type Post = {
  _id?: ObjectId;
  title: string;
  image: string;
  post: string;
  category: string;
};

export type Posts = Post[];

export type Comment = {
  _id?: ObjectId;
  postId: string;
  email: string;
  name: string;
  comment: string;
  upperComment: string | null;
};

export type Comments = Comment[];

export type Category = {
  _id?: ObjectId;
  name: string;
};

export type Categories = Category[];
