import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../prismic/queries";
import { Client, customLink } from "../../prismic/helpers";
import { linkResolver } from "../../prismic/resolvers";
import BackButton from "../../components/backButton";
import Post from "../../components/post";
import DefaultLayout from "../../layouts/default";

const Blog = ({ blog, posts }) => {
  const title = RichText.asText(blog.data.title);
  const description = RichText.asText(blog.data.description);
  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <BackButton />
      <div>
        {posts.map((thisPost) => (
          <Post post={thisPost} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const blog = await Client().getByUID("page", "blog");
  const posts = await queryRepeatableDocuments(
    (doc) => doc.type === "blog-post"
  );

  return {
    props: {
      blog,
      posts: posts,
    },
  };
}

export default Blog;
