import Head from 'next/head'
import { Client } from '../prismic/helpers'
import { RichText } from 'prismic-reactjs'
import BackButton from '../components/backButton'
import Talk from '../components/talk'
import DefaultLayout from '../components/defaultLayout'

const Talks = ({ talks }) => {
  const title = RichText.asText(talks.data.title)
  const description = RichText.asText(talks.data.description)
  const favicon = RichText.asText(talks.data.favicon)

  return (
    <DefaultLayout favicon={favicon}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <BackButton />
      <div>
        {talks.data.body.map((talk, idx) => (
          <div key={idx}>
            <Talk talk={talk} />
          </div>
        ))}
      </div>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const talks = (await Client().getSingle('talks')) || {}
  return {
    props: {
      talks,
    },
  }
}

export default Talks
