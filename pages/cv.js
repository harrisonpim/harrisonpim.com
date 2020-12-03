import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import Client from "../prismic/helpers";
import Jobs from "../components/cv/jobs";
import Education from "../components/cv/education";
import Tools from "../components/cv/tools";
import Projects from "../components/cv/projects";
import Other from "../components/cv/other";

const CV = ({ overview, jobs, tools, education, projects, other }) => {
  if (overview && overview.data) {
    const title = RichText.asText(overview.data.title);
    const description = RichText.asText(overview.data.description);

    return (
      <div>
        <Head>
          <title>CV - {title}</title>
          <meta name="Description" content={description} />
        </Head>
        <div>
          <h1>{title}</h1>
          <div>{description}</div>
          <div>
            <Jobs data={jobs} />
            <Education data={education} />
            <Tools data={tools} />
            <Projects data={projects} />
            <Other data={other} />
          </div>
        </div>
      </div>
    );
  }
  return null;
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
