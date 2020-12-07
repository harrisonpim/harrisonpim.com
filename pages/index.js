import Head from "next/head";
import { Client } from "../prismic/helpers";
import { RichText } from "prismic-reactjs";
import DefaultLayout from "../components/defaultLayout";
import SliceZone from "../components/slicezone";

const Index = ({ index }) => {
  return (
    <DefaultLayout faviconEmoji={RichText.asText(index.data.favicon)}>
      <Head>
        <title>{RichText.asText(index.data.title)}</title>
        <meta
          name="description"
          content={RichText.asText(index.data.description)}
        />
      </Head>
      <SliceZone sliceZone={index.data.body} />
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const index = (await Client().getByUID("page", "index")) || {};
  return {
    props: {
      index,
    },
  };
}

export default Index;
