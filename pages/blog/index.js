import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../prismic/queries";
import { Client } from "../../prismic/helpers";
import BackButton from "../../components/backButton";
import Post from "../../components/post";
import DefaultLayout from "../../components/defaultLayout";

const Blog = ({ blog, posts }) => {
  const title = RichText.asText(blog.data.title);
  const description = RichText.asText(blog.data.description);
  const favicon = RichText.asText(blog.data.favicon);
  return (
    <DefaultLayout favicon={favicon}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <BackButton />
      <div>
        {posts
          .slice(0) // prismic returns the oldest posts first, so we reverse
          .reverse() // the order to put the most recent ones at the top
          .map((thisPost, idx) => (
            <div key={idx}>
              <Post post={thisPost} />
            </div>
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
