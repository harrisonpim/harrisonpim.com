import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../prismic/queries";
import { Client } from "../../prismic/helpers";
import SliceZone from "../../components/slicezone";
import BackButton from "../../components/backButton";
import { formatDate } from "../../components/date";
import DefaultLayout from "../../components/defaultLayout";

const Post = ({ post }) => {
  const title = RichText.asText(post.data.title);
  const description = RichText.asText(post.data.standfirst);
  const date = formatDate(post.data.date);
  const emoji = RichText.asText(post.data.favicon);

  return (
    <DefaultLayout faviconEmoji={emoji}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div>
        <BackButton text="back to the blog" href="/blog" />
        <div className="py-4">
          <h1>{title}</h1>
          <div className="text-gray">{date}</div>
        </div>
        <SliceZone sliceZone={post.data.body} />
      </div>
    </DefaultLayout>
  );
};

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;
  const post =
    (await Client().getByUID("blog-post", params.uid, ref ? { ref } : null)) ||
    {};
  return {
    props: {
      preview,
      post,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "blog-post"
  );
  return {
    paths: documents.map((doc) => `/blog/${doc.uid}`),
    fallback: false,
  };
}

export default Post;
