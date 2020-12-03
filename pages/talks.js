import Head from "next/head";
import { Client } from "../prismic/helpers";
import { RichText } from "prismic-reactjs";
import BackButton from "../components/backButton";
import Talk from "../components/talk";

const Talks = ({ talks }) => {
  if (talks && talks.data) {
    const title = RichText.asText(talks.data.title);
    const description = RichText.asText(talks.data.description);
    return (
      <div>
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
      </div>
    );
  }
  return null;
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
