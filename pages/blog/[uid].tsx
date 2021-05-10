import { GetStaticPaths, GetStaticProps } from 'next'

import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import Head from 'next/head'
import Layout from '../../components/defaultLayout'
import { RichText } from 'prismic-reactjs'
import SliceZone from '../../components/sliceZone'
import { formatDate } from '../../components/date'
import { queryRepeatableDocuments } from '../../prismic/queries'

const Post = ({ post }) => {
  const title = RichText.asText(post.data.title)
  const description = RichText.asText(post.data.standfirst)
  const date = formatDate(post.data.date)
  const favicon = RichText.asText(post.data.favicon)

  return (
    <Layout favicon={favicon}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div>
        <BackButton text="back to the blog" href="/blog" />
        <div className="py-4">
          <h1 className="leading-snug pb-2">{title}</h1>
          <div className="text-gray">{date}</div>
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
