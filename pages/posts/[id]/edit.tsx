import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type PostPageProps = { id: string };
import dynamic from "next/dynamic";
import { usePost } from "../../../components/posts/hooks/usePosts";

const EditPost = dynamic(
  () =>
    import("../../../components/posts/EditPost").then(
      (module) => module.default
    ),
  {
    ssr: false,
  }
);

type Post = { _id: string; title: string; image: string; post: string };

const EditPage: NextPage<PostPageProps> = (props) => {
  const router = useRouter();
  const postId = router.query.id as string;

  const { data } = usePost(postId);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <EditPost post={data!.post} />;
};

export default EditPage;
