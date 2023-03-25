import BackButton from '../components/backButton'
import { Client } from '../prismic/helpers'
import { GetStaticProps } from 'next'
import Layout from '../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatDate } from '../components/date'
import { linkResolver } from '../prismic/resolvers'

const Talks = ({ talks }) => {
  return (
    <Layout
      title={RichText.asText(talks.data.title)}
      description={RichText.asText(talks.data.description)}
      favicon={RichText.asText(talks.data.favicon)}
    >
      <BackButton />
      <div className="space-y-6 pt-4">
        {talks.data.body.map((talk, i) => (
          <div key={i}>
            <Link
              as={linkResolver(talk.primary.url)}
              href={linkResolver(talk.primary.url)}
              className="no-underline"
              passHref
            >
              <h2 className="text-xl">
                {RichText.asText(talk.primary.title)}
              </h2>
              <div className="text-sm">
                <div className="text-gray dark:text-light-gray">
                  <div>{formatDate(talk.primary.date)}</div>
                  <div>{RichText.asText(talk.primary.host)}</div>
                  <div>{RichText.asText(talk.primary.location)}</div>
                </div>
              </div>
            </Link>
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
