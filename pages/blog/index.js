import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import DefaultLayout from '../../components/defaultLayout'
import Head from 'next/head'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatDate } from '../../components/date'
import { linkResolver } from '../../prismic/resolvers'
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
          <div className="py-4" key={RichText.asText(post.data.title)}>
            <Link as={linkResolver(post)} href={linkResolver(post)}>
              <a className="no-underline pb-none leading-snug">
                <h3>{RichText.asText(post.data.title)}</h3>
              </a>
            </Link>
            <div className="text-gray">{formatDate(post.data.date)}</div>
            <div>{RichText.asText(post.data.standfirst)}</div>
          </div>
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
