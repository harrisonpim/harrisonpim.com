import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import DefaultLayout from '../../components/defaultLayout'
import Head from 'next/head'
import Post from '../../components/post'
import { RichText } from 'prismic-reactjs'
import { queryRepeatableDocuments } from '../../prismic/queries'

const Blog = ({ blog, posts }) => {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  const title = RichText.asText(blog.data.title)
  const description = RichText.asText(blog.data.description)
  const favicon = RichText.asText(blog.data.favicon)
  return (
    <DefaultLayout favicon={favicon}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <BackButton />
      <div>
        {sortedPosts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const blog = await Client().getByUID('page', 'blog')
  const posts = await queryRepeatableDocuments(
    (doc) => doc.type === 'blog-post'
  )

  return {
    props: {
      blog,
      posts: posts,
    },
  }
}

export default Blog
