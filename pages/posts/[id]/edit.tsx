import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type PostPageProps = { id: string };
import dynamic from "next/dynamic";

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
  const [postId, setPostId] = useState<string | null>(props?.id);
  const [post, setPost] = useState<Post>();
  const router = useRouter();

  useEffect(() => {
    if (!postId) {
      const id = router.query.id as string;

      setPostId(id);
    }
    if (postId) {
      axios
        .get("/api/posts?id=" + postId)
        .then((res) => {
          return res.data.post[0];
        })
        .then((res) => {
          setPost(res);
        });
    }
  }, [postId, router.query.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return <EditPost post={post} />;
};

export default EditPage;
