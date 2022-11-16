import { Box } from "@mui/material";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Comments from "../../../components/posts/comments/Comments";
import { usePost } from "../../../components/posts/hooks/usePosts";
import PostContent from "../../../components/posts/PostContent";

type PostPageProps = { id: string };

const PostPage: NextPage<PostPageProps> = (props) => {
  const router = useRouter();
  let postId: string;
  if (props.id) {
    postId = props.id;
  } else {
    postId = router.query.id as string;
  }

  const { post } = usePost(postId);

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    post && (
      <Box>
        <PostContent post={post.post} title={post.title} />
        <Comments postId={postId} />
      </Box>
    )
  );
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
    .get(encodeURI(`https://www.moderntoujours.dev/api/posts`))
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
