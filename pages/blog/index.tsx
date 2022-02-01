import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import { GetStaticProps } from 'next'
import Layout from '../../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatDate } from '../../components/date'
import { linkResolver } from '../../prismic/resolvers'
import { queryRepeatableDocuments } from '../../prismic/queries'

const Blog = ({ blog, posts }) => {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return (
    <Layout
      title={RichText.asText(blog.data.title)}
      description={RichText.asText(blog.data.description)}
      favicon={RichText.asText(blog.data.favicon)}
    >
      <BackButton />
      <div className="space-y-6 py-4">
        {sortedPosts.map((post) => (
          <div key={RichText.asText(post.data.title)}>
            <Link as={linkResolver(post)} href={linkResolver(post)}>
              <a className="no-underline">
                <h2 className="text-xl font-medium">
                  {RichText.asText(post.data.title)}
                </h2>
                <div className="text-sm text-gray dark:text-light-gray">
                  <div>{formatDate(post.data.date)}</div>
                  <div>{RichText.asText(post.data.standfirst)}</div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blog = await Client().getByUID('page', 'blog', {})
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
