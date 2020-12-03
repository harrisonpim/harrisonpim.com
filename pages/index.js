import Head from "next/head";
import { Client } from "../prismic/helpers";
import { RichText } from "prismic-reactjs";
import { customLink } from "../prismic/helpers";
import { linkResolver } from "../prismic/resolvers";

const Index = ({ index }) => {
  if (index && index.data) {
    const title = RichText.asText(index.data.title);
    const description = RichText.asText(index.data.description);

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="Description" content={description} />
        </Head>
        <div className="prose">
          <RichText
            render={index.data.body}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
        </div>
      </div>
    );
  }
  return null;
};

export async function getStaticProps() {
  const index = (await Client().getSingle("index")) || {};
  return {
    props: {
      index,
    },
  };
}

export default Index;
