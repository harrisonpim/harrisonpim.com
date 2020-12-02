import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../utils/queries";
import DefaultLayout from "../layouts/default";
import Client from "../utils/prismic-helpers";
import SliceZone from "../components/slicezone";

const Page = ({ page }) => {
  if (page && page.data) {
    const title = RichText.asText(page.data.title);

    return (
      <DefaultLayout parentHref="/" parentText="Home">
        <Head>
          <title>{title}</title>
        </Head>
        <div>
          <h1>{title}</h1>
          <SliceZone sliceZone={page.data.body} />
        </div>
      </DefaultLayout>
    );
  }
  return null;
};

export async function getStaticProps({ params }) {
  const page = (await Client().getByUID("page", params.uid)) || {};
  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "page"
  );
  return {
    paths: documents.map((doc) => `/${doc.uid}`),
    fallback: false,
  };
}

export default Page;
