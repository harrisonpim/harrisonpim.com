import Head from "next/head";
import { Client } from "../prismic/helpers";
import { RichText } from "prismic-reactjs";
import BackButton from "../components/backButton";
import Talk from "../components/talk";
import DefaultLayout from "../layouts/default";
import Favicon from "../components/favicon";

const Talks = ({ talks }) => {
  const title = RichText.asText(talks.data.title);
  const description = RichText.asText(talks.data.description);
  const favicon = RichText.asText(talks.data.favicon);

  return (
    <DefaultLayout faviconEmoji={favicon}>
      <Head>
        <title>{title}</title>
        <meta name="Description" content={description} />
      </Head>
      <BackButton />
      <div>
        {talks.data.body.map((talk) => (
          <Talk talk={talk} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const talks = (await Client().getSingle("talks")) || {};
  return {
    props: {
      talks,
    },
  };
}

export default Talks;
