import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostContent from "../../components/posts/PostContent";

type PostPageProps = { id: string };

const PostPage: NextPage<PostPageProps> = (props) => {
  const [postId, setPostId] = useState<string | null>(props?.id);
  const [post, setPost] = useState(null);
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
  return post && <PostContent post={post} />;
};

export default PostPage;

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context as {
    params: { id: string };
  };

  const { id } = params;

  console.log("id : " + id);

  return {
    props: {
      id,
    },
    revalidate: 6000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const path: {
    params: {
      id: string;
    };
  }[] = [];

  await axios
    .get(`https://www.moderntoujours.dev/api/posts`)
    .then((res) => {
      return res.data.posts;
    })
    .then((posts) => {
      posts.forEach((post: any) => {
        path.push({
          params: {
            id: post._id.toString(),
          },
        });
      });
    })
    .catch((err) => console.log(err));

  return {
    paths: path,
    fallback: false,
  };
};
