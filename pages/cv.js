import Client from '../prismic/helpers'
import Education from '../components/cv/education'
import Head from 'next/head'
import Jobs from '../components/cv/jobs'
import Layout from '../components/defaultLayout'
import Other from '../components/cv/other'
import Projects from '../components/cv/projects'
import { RichText } from 'prismic-reactjs'
import Tools from '../components/cv/tools'
import { linkResolver } from '../prismic/resolvers'

const CV = ({ overview, jobs, tools, education, projects, other }) => {
  const title = RichText.asText(overview.data.title)
  const favicon = RichText.asText(overview.data.favicon)

  return (
    <Layout wide favicon={favicon}>
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
    </Layout>
  )
}
export async function getStaticProps() {
  const client = Client()
  const overview = await client.getByUID('page', 'cv')
  const jobs = await client.getSingle('cv-jobs')
  const tools = await client.getSingle('cv-tools')
  const education = await client.getSingle('cv-education')
  const projects = await client.getSingle('cv-projects')
  const other = await client.getSingle('cv-other')
  return {
    props: {
      overview,
      jobs,
      tools,
      education,
      projects,
      other,
    },
  }
}

export default CV
