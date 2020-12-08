import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import Client, { customLink } from "../prismic/helpers";
import Jobs from "../components/cv/jobs";
import Education from "../components/cv/education";
import Tools from "../components/cv/tools";
import Projects from "../components/cv/projects";
import Other from "../components/cv/other";
import { linkResolver } from "../prismic/resolvers";
import DefaultLayout from "../components/defaultLayout";

const CV = ({ overview, jobs, tools, education, projects, other }) => {
  const title = RichText.asText(overview.data.title);
  const favicon = RichText.asText(overview.data.favicon);

  return (
    <DefaultLayout wide favicon={favicon}>
      <Head>
        <title>CV - {title}</title>
        <meta
          name="description"
          content={RichText.asText(overview.data.description)}
        />
      </Head>
      <div className="max-w-2xl">
        <a className="no-underline" href="/">
          <h1>{title}</h1>
        </a>
        <div className="text-sm py-4">
          <RichText
            render={overview.data.description}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
        </div>
        <div>
          <Jobs data={jobs} />
          <Education data={education} />
          <Tools data={tools} />
          <Projects data={projects} />
          <Other data={other} />
        </div>
      </div>
    </DefaultLayout>
  );
};
export async function getStaticProps() {
  const client = Client();
  const overview = await client.getByUID("page", "cv");
  const jobs = await client.getSingle("cv-jobs");
  const tools = await client.getSingle("cv-tools");
  const education = await client.getSingle("cv-education");
  const projects = await client.getSingle("cv-projects");
  const other = await client.getSingle("cv-other");
  return {
    props: {
      overview,
      jobs,
      tools,
      education,
      projects,
      other,
    },
  };
}

export default CV;
