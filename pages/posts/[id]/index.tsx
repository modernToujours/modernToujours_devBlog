import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Comments from "../../../components/posts/comments/Comments";
import { usePost } from "../../../components/posts/hooks/usePosts";
import PostContent from "../../../components/posts/PostContent";

type PostPageProps = { id: string; markdown: string };

const PostPage: NextPage<PostPageProps> = (props) => {
  const router = useRouter();
  let postId: string;
  if (props.id) {
    postId = props.id;
  } else {
    postId = router.query.id as string;
  }

  const { data, isLoading } = usePost(postId);

  // const { markdown, isLoading: markdownIsLoading } = useMarkdown(post!.post);

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <PostContent
        post={data!.post.post}
        title={data!.post.title}
        markdown={data!.markdown}
      />
      <Comments postId={postId} />
    </Box>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context as {
    params: { id: string };
  };

  const { id } = params;

  const res = await axios.get(
    `https://www.moderntoujours.dev/api/posts?id=${id}`
  );

  const { post } = res.data.post[0];

  const encodedUrl = encodeURI(post);

  const markdown = (await axios.get(encodedUrl)).data as string;

  return {
    props: {
      id,
      markdown,
    },
    revalidate: 60,
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
