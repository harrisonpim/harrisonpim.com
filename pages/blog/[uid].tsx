import { GetStaticPaths, GetStaticProps } from 'next'
import { RichText, RichTextBlock } from 'prismic-reactjs'

import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import { FC } from 'react'
import Layout from '../../components/layout'
import SliceZone from '../../components/sliceZone'
import { formatDate } from '../../components/date'
import { queryRepeatableDocuments } from '../../prismic/queries'

type PostType = {
  post: {
    data: {
      title: RichTextBlock[]
      standfirst?: RichTextBlock[]
      favicon?: RichTextBlock[]
      date: string
      body: { slice: unknown[] }
    }
  }
}

const Post: FC<PostType> = ({ post }) => {
  return (
    <Layout
      title={RichText.asText(post.data.title)}
      description={RichText.asText(post.data.standfirst)}
      favicon={RichText.asText(post.data.favicon)}
    >
      <div>
        <BackButton text="back to the blog" href="/blog" />
        <div className="pt-4 pb-2">
          <h1 className="leading-snug text-3xl font-semibold">
            {RichText.render(post.data.title)}
          </h1>
          <p className="text-gray dark:text-light-gray">
            {formatDate(post.data.date)}
          </p>
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
