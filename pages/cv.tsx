import Client from '../prismic/helpers'
import Education from '../components/cv/education'
import { GetStaticProps } from 'next'
import Jobs from '../components/cv/jobs'
import Layout from '../components/layout'
import Link from 'next/link'
import Other from '../components/cv/other'
import { RichText } from 'prismic-reactjs'
import Tools from '../components/cv/tools'
import { linkResolver } from '../prismic/resolvers'

const CV = ({ overview, jobs, tools, education, other }) => {
  return (
    <Layout
      title={RichText.asText(overview.data.title)}
      description={RichText.asText(overview.data.description)}
      favicon={RichText.asText(overview.data.favicon)}
    >
      <div className="space-y-4">
        <div className="prose">
          <Link href="/" className="no-underline" passHref>
            <h1>{RichText.asText(overview.data.title)}</h1>
          </Link>
          <div className="text-sm">
            <RichText
              render={overview.data.description}
              linkResolver={linkResolver}
            />
          </div>
        </div>

        <Jobs data={jobs} />
        <Education data={education} />
        <Tools data={tools} />
        <Other data={other} />
        <section>
          <a
            href="javascript:window.print()"
            className="text-sm text-gray no-underline dark:text-light-gray print:hidden"
          >
            Download this as a PDF
          </a>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = Client()
  const overview = await client.getByUID('page', 'cv', {})
  const jobs = await client.getSingle('cv-jobs', {})
  const tools = await client.getSingle('cv-tools', {})
  const education = await client.getSingle('cv-education', {})

  const other = await client.getSingle('cv-other', {})
  return { props: { overview, jobs, tools, education, other } }
}

export default CV
