import { Client } from '../prismic/helpers'
import Head from 'next/head'
import Layout from '../components/defaultLayout'
import { RichText } from 'prismic-reactjs'
import SliceZone from '../components/sliceZone'

const Index = ({ index }) => {
  return (
    <Layout favicon={RichText.asText(index.data.favicon)}>
      <Head>
        <title>{RichText.asText(index.data.title)}</title>
        <meta
          name="description"
          content={RichText.asText(index.data.description)}
        />
      </Head>
      <SliceZone sliceZone={index.data.body} />
    </Layout>
  )
}

export async function getStaticProps() {
  const index = (await Client().getByUID('page', 'index')) || {}
  return {
    props: {
      index,
    },
  }
}

export default Index
