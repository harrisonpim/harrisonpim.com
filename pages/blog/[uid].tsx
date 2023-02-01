import { GetStaticPaths, GetStaticProps } from 'next'
import { RichText, RichTextBlock } from 'prismic-reactjs'

import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import { FC } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import SliceZone from '../../components/sliceZone'
import { formatDate } from '../../components/date'
import { queryRepeatableDocuments } from '../../prismic/queries'

const baseUrl = {
  production: 'https://harrisonpim.com',
  preview: process.env.VERCEL_URL,
  development: 'http://localhost:3000',
}[process.env.VERCEL_ENV]

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
      <Head>
        <meta property="og:image" content={`${baseUrl}/api/og?title=${RichText.asText(post.data.title)}&emoji=${RichText.asText(post.data.favicon)}`} />
      </Head>
      <div>
        <BackButton text="back to the blog" href="/blog" />
        <h1 className="leading pt-3 text-3xl font-medium">
          {RichText.asText(post.data.title)}
        </h1>
        <p className="pt-1 text-gray dark:text-light-gray">
          {formatDate(post.data.date)}
        </p>
        <div className="prose">
          <SliceZone sliceZone={post.data.body} />
        </div>
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
