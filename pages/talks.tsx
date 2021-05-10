import BackButton from '../components/backButton'
import { Client } from '../prismic/helpers'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/defaultLayout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatDate } from '../components/date'
import { linkResolver } from '../prismic/resolvers'

const Talks = ({ talks }) => {
  const title = RichText.asText(talks.data.title)
  const description = RichText.asText(talks.data.description)
  const favicon = RichText.asText(talks.data.favicon)

  return (
    <Layout favicon={favicon}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <BackButton />
      <div>
        {talks.data.body.map((talk, i) => (
          <div className="py-4" key={i}>
            <Link
              as={linkResolver(talk.primary.url)}
              href={linkResolver(talk.primary.url)}
            >
              <a className="no-underline pb-none font-normal">
                <h3>{RichText.asText(talk.primary.title)}</h3>
              </a>
            </Link>
            <div className="text-gray">{formatDate(talk.primary.date)}</div>
            <div>{RichText.asText(talk.primary.host)}</div>
            <div>{RichText.asText(talk.primary.location)}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const talks = (await Client().getSingle('talks', {})) || {}
  return {
    props: {
      talks,
    },
  }
}

export default Talks
