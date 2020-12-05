import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../prismic/queries";
import { Client } from "../../prismic/helpers";
import SliceZone from "../../components/slicezone";
import BackButton from "../../components/backButton";
import { formatDate } from "../../components/date";
import DefaultLayout from "../../layouts/default";

const Post = ({ post }) => {
  const title = RichText.asText(post.data.title);
  const date = formatDate(post.data.date);
  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <BackButton text="back to the blog" href="/blog" />
        <h1 className="py-0">{title}</h1>
        <div className="text-gray">{date}</div>
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
