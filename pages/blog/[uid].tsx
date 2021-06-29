import { GetStaticPaths, GetStaticProps } from 'next'

import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import Layout from '../../components/layout'
import { RichText } from 'prismic-reactjs'
import SliceZone from '../../components/sliceZone'
import { formatDate } from '../../components/date'
import { queryRepeatableDocuments } from '../../prismic/queries'

const Post = ({ post }) => {
  return (
    <Layout
      title={RichText.asText(post.data.title)}
      description={RichText.asText(post.data.standfirst)}
      favicon={RichText.asText(post.data.favicon)}
    >
      <div>
        <BackButton text="back to the blog" href="/blog" />
        <div className="pt-4 pb-2">
          <h1 className="leading-snug">{RichText.render(post.data.title)}</h1>
          <p className="text-gray">{formatDate(post.data.date)}</p>
        </div>
        <SliceZone sliceZone={post.data.body} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post =
    (await Client().getByUID('blog-post', params.uid as string, {})) || {}
  return { props: { post } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === 'blog-post'
  )
  return {
    paths: documents.map((doc) => `/blog/${doc.uid}`),
    fallback: false,
  }
}

export default Post
