import Head from "next/head";
import { RichText } from "prismic-reactjs";
import DefaultLayout from "../../layouts/default";
import PostList from "../../components/postlist";
import { queryRepeatableDocuments } from "../../utils/queries";
import { Client } from "../../utils/prismic-helpers";

const Blog = ({ index, posts }) => {
  return (
    <DefaultLayout parentHref="/" parentText="Home">
      <Head>
        <title>{RichText.asText(index.data.title)}</title>
        <meta
          name="description"
          content={RichText.asText(index.data.description)}
        />
      </Head>
      <div>{RichText.asText(index.data.description)}</div>
      <div className="pt-4">
        <PostList posts={posts} />
      </div>
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const client = Client();
  const index = await client.getSingle("blog-home");
  const posts = await queryRepeatableDocuments(
    (doc) => doc.type === "blog-post"
  );

  return {
    props: {
      index,
      posts: posts,
    },
  };
}

export default Blog;
