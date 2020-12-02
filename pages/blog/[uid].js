import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import DefaultLayout from "../../layouts/default";
import SliceZone from "../../components/slicezone";
import { Client } from "../../utils/prismic-helpers";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Post = ({ post }) => {
  if (post && post.data) {
    const titleImageURL = post.data["title-image"].url;
    const date = formatDate(post.data.date);
    const title = RichText.asText(post.data.title);

    return (
      <DefaultLayout parentHref="/research-blog" parentText="Blog">
        <Head>
          <title>{title}</title>
        </Head>
        <div>
          <div className="mx-auto w-full">
            <img className="mx-auto" src={titleImageURL} alt={title} />
            <div className="text-sm text-silver pb-4">{date}</div>
          </div>
          <SliceZone sliceZone={post.data.body1} />
        </div>
      </DefaultLayout>
    );
  }

  return null;
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
    paths: documents.map((doc) => `/research-blog/${doc.uid}`),
    fallback: false,
  };
}

export default Post;
