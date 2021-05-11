import { Client } from '../prismic/helpers'
import { GetStaticProps } from 'next'
import Layout from '../components/layout'
import { RichText } from 'prismic-reactjs'
import SliceZone from '../components/sliceZone'

const Index = ({ index }) => {
  return (
    <Layout
      title={RichText.asText(index.data.title)}
      favicon={RichText.asText(index.data.favicon)}
      description={RichText.asText(index.data.description)}
    >
      <SliceZone sliceZone={index.data.body} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const index = (await Client().getByUID('page', 'index', {})) || {}
  return { props: { index } }
}

export default Index
